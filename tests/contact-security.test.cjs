/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS harness compiles TS and mocks upstream services without a test framework. */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const Module = require('node:module')
const ts = require('typescript')
const vm = require('node:vm')

function loadTs(file, dependencies = {}) {
  const filename = path.resolve(file)
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const loaded = new Module(filename, module)
  loaded.paths = module.paths
  const originalRequire = loaded.require.bind(loaded)
  loaded.require = name => dependencies[name] || originalRequire(name)
  loaded._compile(compiled, filename)
  return loaded.exports
}

const security = loadTs('lib/contact-security.ts')
const makeRequest = (body, headers = {}) => new Request('https://example.com/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body,
})

test('valid multibyte messages preserve their content', async () => {
  const body = { name: 'A learner', message: 'Hello 🌍 — karibu' }
  assert.deepEqual(await security.readContactBody(makeRequest(JSON.stringify(body))), body)
})

test('oversized bodies are rejected both with and without Content-Length', async () => {
  for (const headers of [{}, { 'content-length': '40000' }]) {
    await assert.rejects(security.readContactBody(makeRequest(JSON.stringify('x'.repeat(40000)), headers)), error => error.status === 413)
  }
})

test('streaming byte count cannot be bypassed using a small Content-Length', async () => {
  await assert.rejects(security.readContactBody(makeRequest(JSON.stringify('x'.repeat(40000)), { 'content-length': '1' })), error => error.status === 413)
})

test('malformed JSON and wrong content types are rejected', async () => {
  await assert.rejects(security.readContactBody(makeRequest('{invalid')))
  await assert.rejects(security.readContactBody(makeRequest('{}', { 'content-type': 'text/plain' })), error => error.status === 415)
})

test('sender limits ignore email casing and expire', () => {
  const helper = loadTs('lib/contact-security.ts')
  for (let i = 0; i < 5; i++) assert.equal(helper.allowContactSender('person@example.com', 100), true)
  assert.equal(helper.allowContactSender('PERSON@example.com', 100), false)
  assert.equal(helper.allowContactSender('person@example.com', 600101), true)
})

test('process-wide quota limits rotating senders', () => {
  const helper = loadTs('lib/contact-security.ts')
  for (let i = 0; i < 120; i++) assert.equal(helper.allowContactRequest(100), true)
  assert.equal(helper.allowContactRequest(100), false)
  assert.equal(helper.allowContactRequest(60101), true)
})

test('contact route preserves valid payloads and never forwards invalid submissions', async () => {
  const endpoint = process.env.GOOGLE_CONTACT_SCRIPT_URL
  const secret = process.env.GOOGLE_CONTACT_SCRIPT_SECRET
  const originalFetch = global.fetch
  process.env.GOOGLE_CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/test/exec'
  process.env.GOOGLE_CONTACT_SCRIPT_SECRET = 'test-only-secret'
  let calls = 0
  global.fetch = async (_url, options) => {
    calls++
    const data = JSON.parse(options.body)
    assert.equal(data.message, 'A normal message')
    assert.equal(data.secret, 'test-only-secret')
    assert.equal(data.website, undefined)
    return Response.json({ ok: true })
  }
  try {
    const { POST } = loadTs('app/api/contact/route.ts', { '@/lib/contact-security': loadTs('lib/contact-security.ts') })
    const fields = { name: 'Visitor', email: 'visitor@example.com', subject: 'General Inquiry', message: 'A normal message' }
    assert.equal((await POST(makeRequest(JSON.stringify(fields), { origin: 'https://evil.example' }))).status, 403)
    assert.equal((await POST(makeRequest(JSON.stringify({ ...fields, website: 'spam' })))).status, 400)
    assert.equal((await POST(makeRequest(JSON.stringify({ ...fields, email: 'invalid' })))).status, 400)
    assert.equal(calls, 0)
    for (let i = 0; i < 5; i++) assert.equal((await POST(makeRequest(JSON.stringify(fields)))).status, 200)
    const limited = await POST(makeRequest(JSON.stringify(fields)))
    assert.equal(limited.status, 429)
    assert.ok(limited.headers.get('retry-after'))
    assert.equal(calls, 5)
  } finally {
    global.fetch = originalFetch
    if (endpoint === undefined) delete process.env.GOOGLE_CONTACT_SCRIPT_URL
    else process.env.GOOGLE_CONTACT_SCRIPT_URL = endpoint
    if (secret === undefined) delete process.env.GOOGLE_CONTACT_SCRIPT_SECRET
    else process.env.GOOGLE_CONTACT_SCRIPT_SECRET = secret
  }
})

test('Apps Script authenticates, shares quota and releases its lock', () => {
  const properties = new Map([['CONTACT_SECRET', 'test-only-secret'], ['CONTACT_FORM_ID', 'test-form']])
  let submitted = 0
  let locked = false
  const context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key), setProperty: (key, value) => properties.set(key, value) }) },
    LockService: { getScriptLock: () => ({ tryLock: () => { locked = true; return true }, releaseLock: () => { locked = false } }) },
    FormApp: { openById: () => ({
      isAcceptingResponses: () => true,
      createResponse: () => ({ withItemResponse() {}, submit() { submitted++ } }),
      getItemById: () => ({ asTextItem: () => ({ createResponse: value => value }), asParagraphTextItem: () => ({ createResponse: value => value }) }),
    }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: text => ({ setMimeType: () => JSON.parse(text) }) },
  })
  vm.runInContext(fs.readFileSync('integrations/google-contact/Code.gs', 'utf8'), context)
  const send = secret => context.doPost({ postData: { contents: JSON.stringify({ secret, name: 'Visitor', email: 'visitor@example.com', subject: 'Hello', message: 'Test' }) } })
  assert.equal(send('wrong').ok, false)
  assert.equal(submitted, 0)
  for (let i = 0; i < 30; i++) assert.equal(send('test-only-secret').ok, true)
  assert.equal(send('test-only-secret').rateLimited, true)
  assert.equal(locked, false)
  assert.equal(submitted, 30)
})
