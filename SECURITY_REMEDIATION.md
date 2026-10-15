# Security remediation status

15 October 2026. Local changes only; not committed or pushed.

## Implemented

- Upgraded Next.js 16.3.4 to 16.4.1 with matching eslint-config-next. Applied compatible npm audit updates and a scoped, same-major smol-toml override for @vercel/frameworks. Lockfile records exact resolved versions.
- Contact requests must be JSON, are read with an actual 32 KiB byte limit and a 10-second upload timeout, and preserve all existing field validation and Google submission payloads.
- Added a bounded per-process quota (120 requests/minute) and sender quota (5 attempts/10 minutes). No user-controlled forwarded-IP header is trusted. Process limits reset on restart and do not span serverless workers.
- Prepared an atomic Apps Script quota of 30 authenticated attempts/minute using Script Properties and a script lock. This quota is shared across workers only AFTER the updated script is deployed. The website understands the new rateLimited result and remains compatible with the existing script response.
- Added enforced CSP for object-src, base-uri and frame-ancestors. Added a stricter script/resource policy in Report-Only mode: it does not block resources, and violations are observable in browser developer tools; no collection endpoint is configured. Full script CSP enforcement is intentionally pending browser/Studio validation.
- Broadened environment ignore rules to .env* while allowing .env.example.
- Added asynchronous PDF MIME metadata validation in Studio and filtered non-PDF report download URLs in the public query. This does not scan PDFs for malware and schema validation is not an authorization boundary.

## Validation

- Production build passed after the Next.js upgrade, with all application routes generated.
- Eight focused tests pass, covering multibyte messages, oversized and misleading-length bodies, malformed JSON, content types, rate-limit expiry, normal mocked submissions, and Apps Script secret/quota/lock behaviour. Google calls are mocked; no real messages were submitted.
- Full ESLint run: zero errors; seven existing image optimization warnings.
- Production smoke checks: /, /about, /volunteer, /contact, /gallery, /donate, /transparency and /studio all returned HTTP 200. Contact HTML retained the Maps embed; enforced and report-only CSP headers were present.
- git diff --check passes.
- Final advisory results are in security-audit-after.json. The audit fell from 28 affected package entries (1 critical, 15 high, 11 moderate, 1 low) to 19 (0 critical, 10 high, 9 moderate, 0 low).

## Remaining work and limitations

1. Redeploy integrations/google-contact/Code.gs as a new version of the existing Apps Script web app deployment, preserving its URL and CONTACT_SECRET. The file is prepared and mock-tested; this environment has no authenticated deployment connection. Until redeployed, only the website's per-process limits apply. A hosting WAF or durable ingress limiter is still recommended to reduce distributed request/server cost before Apps Script is reached.
2. Nineteen dependency entries remain in Sanity CLI/codegen/framework discovery and ESLint/glob chains. Root advisories include braces, js-yaml 3.x, sprintf-js and uuid under typeid-js. Registry latest braces and sprintf-js versions remain flagged; npm proposes breaking downgrades of Sanity and matching packages. Do not silently force them. They require vendor updates or a separately tested tooling migration. No public request-to-vulnerable-parser path was established, but production-dependency installation labels alone do not prove isolation.
3. Verify Sanity roles/MFA/CORS/dataset visibility and Google Form/Sheet sharing in their authenticated dashboards. No account permissions were changed.
4. Report-Only CSP is preparation, not full script-injection mitigation. Enforce a nonce/hash strategy only after testing Next.js and Studio in a browser.
5. PDF metadata checks are useful validation, not malware scanning. Restrict publisher access and use an external scanning workflow if untrusted contributors can upload.
6. The first production smoke checks are HTTP/render checks, not browser interaction or visual regression tests. No absolute guarantee of unchanged operations is made.

Original findings are preserved in SECURITY_AUDIT.md. No secret values were printed or included in reports. Pre-existing tsconfig.tsbuildinfo modifications were left alone.

Final verification: the second production build passed after all updates. Repeated the eight public/Studio route checks with Sanity network access: all returned HTTP 200 with no server-render error markers or logged fetch errors. All five published team-message links also returned HTTP 200 without server-render error markers. Initial sandbox-only preview had revalidation network errors; the network-enabled repeat supersedes that result. Live HTTP rejection checks returned 400 for malformed JSON, 415 for wrong content type, 413 for an oversized body and 403 for a foreign Origin. The temporary production preview was stopped after verification.
