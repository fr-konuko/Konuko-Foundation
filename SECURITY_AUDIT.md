# Security audit — Konuko Foundation

Date: 15 October 2026
Scope: application routes, components, Sanity queries/schemas/client, Google contact integration, Next.js configuration, tracked files and dependency lockfile. No application code changed. No live submissions or exploit attempts were made.

## Priority findings

### 1. Vulnerable dependency versions — priority high; registry maximum critical
Evidence: package.json, package-lock.json; full registry response in security-audit-dependencies.json.
npm audit reports 28 affected packages: 1 critical, 15 high, 11 moderate, 1 low. This counts affected package entries, including inherited findings; it does not establish 28 independently exploitable vulnerabilities.

Next.js 16.3.4 is affected by several advisories. npm recommends 16.4.1 as a non-major fix at audit time. Upgrade to a supported patched release and update eslint-config-next compatibly, regenerate the lockfile, then verify production build and routes.

Applicability matters:
- Critical GHSA-vcvr-r3jv-pc5j affects attacker-controlled SVG in Node next/og ImageResponse. No next/og or ImageResponse use was found in the app. This critical execution path is not demonstrated in this repository.
- GHSA-4jqv-mc3x-m676 concerns self-hosted Pages Router SSG/ISR. This repository uses App Router; do not treat that advisory alone as proof this site is exploitable.
- Development MCP disclosure is relevant if the development server is reachable by untrusted users. The dev command does not restrict its bind address. Keep development local or on trusted networks; never use next dev as the production service.
- Image optimizer and App Router cache advisories need their individual deployment and request prerequisites assessed. The package version is affected; exploitation has not been demonstrated.
- sharp 0.35.4, undici 7.29.0, adm-zip 0.6.0, source-map-js 1.2.1 and additional packages have advisories. Some are in tooling paths despite being installed beneath production dependencies. Confirm runtime reachability before assigning application severity.

Do not run npm audit fix --force blindly: the proposed fixes include major downgrades of Sanity/next-sanity and eslint-config-next. Review updates and compatible transitive overrides individually.

Sources:
- https://github.com/advisories/GHSA-vcvr-r3jv-pc5j
- https://github.com/advisories/GHSA-4jqv-mc3x-m676
- https://github.com/advisories/GHSA-39w2-rjm5-chcv
- Other advisory URLs and installed dependency nodes are preserved in the JSON report.

### 2. Contact endpoint has no application rate limiting — medium
Evidence: app/api/contact/route.ts:1-45; integrations/google-contact/Code.gs:11-43.
A caller can repeatedly send valid requests and cause Google Form writes and server work. Origin checking is useful for browsers but is not bot authentication: a script can omit or supply Origin. The honeypot is optional and easily omitted. The shared Google secret protects the upstream script from unauthenticated direct writes; it does not limit callers to the website endpoint.
Impact: spammed responses, exhausted Apps Script/Form quotas and increased hosting usage when the integration is configured. Hosting protections may reduce exposure, but were not inspected.
Fix: enforce shared, deployment-safe rate limits before parsing or contacting Google; use trusted client identity from the hosting platform, a global quota and Retry-After/429 responses. Add server-verified bot challenges if abuse warrants them. Consider direct Google Form access when configuring spam protection.

### 3. Request JSON is read before bounding total size — medium
Evidence: app/api/contact/route.ts:8,14-23.
request.json() reads/parses the body before field lengths are checked. Huge strings, extra properties or a large invalid body still consume resources before rejection. A Content-Length check alone would not cover chunked or misleading requests.
Impact: avoidable memory/CPU consumption and request concurrency pressure. Provider request limits may cap the maximum impact; they are not an application-level fix and were not verified.
Fix: reject unsupported content types; enforce a small byte limit while streaming the body (e.g. 16–32 KiB), return 413 on overflow, then parse and validate. Apply matching proxy/hosting limits. Retain existing individual field bounds.

## Hardening gaps, not demonstrated exploits

### 4. No Content Security Policy in repository configuration — low / defense in depth
Evidence: next.config.ts:6-20.
Several useful headers exist, but no CSP limits scripts, connections, frames, objects or form destinations. This does not establish an XSS vulnerability; React text rendering is used and no dangerouslySetInnerHTML/eval sinks were found in application code.
Fix: introduce CSP in Report-Only mode, then enforce a policy compatible with Next.js, Sanity Studio, Google Maps, fonts and image hosts. Use nonces/hashes for executable inline scripts; avoid weakening the policy simply to silence errors. Hosting may already add CSP; verify deployed responses.

### 5. Environment ignore rules cover only two filenames — low / accidental disclosure risk
Evidence: .gitignore:3-4.
.env and .env.local are ignored, but .env.production, .env.development, .env.production.local and other variants are not covered by these rules. Such a file could be accidentally committed later. No current secret leak was confirmed.
Fix: ignore .env* with an explicit !.env.example exception. Add CI secret scanning and repository push protection where available.

### 6. PDF upload restriction is an editor hint — conditional content trust risk
Evidence: sanity/schemaTypes/annualReport.ts:12; app/transparency/page.tsx:65.
The file picker accepts .pdf, but this code does not independently inspect the uploaded content or scan files. A compromised or untrusted CMS writer could publish a harmful download. This is not an anonymous upload endpoint, and no malicious document was found.
Fix: restrict publisher roles; validate file metadata and actual content in a trusted upload/publishing workflow; scan documents where uploads are not fully trusted. Schema validation alone is not an authorization or malware-scanning boundary.

## External configuration requiring verification

- Sanity: inspect member roles, MFA, API tokens and credential-enabled CORS origins. /studio being public does not mean CMS writes are public; Sanity supplies its own access control.
- Dataset: unauthenticated client queries assume public content. Public datasets expose published root documents beyond the fields selected by website queries. Keep internal notes, donor details and contact submissions outside a public dataset. No confidential public document was demonstrated. Source: https://www.sanity.io/docs/content-lake/keeping-your-data-safe
- Google: verify deployed script matches Code.gs, secret strength/rotation, Form/Sheet sharing and collaborator access. Retention and access to contact personal data were not available for inspection.
- Hosting: verify actual production headers, TLS, WAF/rate limits, environment permissions, logs, dependency deployment version and that next build/next start or the managed production adapter is used.
- Network: local Next dev has previously advertised a LAN address. Check firewall exposure and bind to 127.0.0.1 when remote device access is unnecessary.

## Controls that looked sound

- .env.local is not tracked, and targeted Git filename history checks found no tracked .env.local/.env/.env.production/.env.development revisions.
- Pattern scan of tracked text files found no common private key, GitHub token, AWS access-key ID or OpenAI key patterns. This is a limited pattern scan, not a full secret-history guarantee.
- Contact secret remains server-side; no NEXT_PUBLIC secret variables were identified. Environment values were not printed.
- Contact input has type/length validation and generic upstream errors, and its upstream destination is constrained to HTTPS script.google.com /exec with a timeout.
- Apps Script checks its shared secret before submitting responses.
- GROQ parameters are bound separately from query strings; no SQL or shell execution of user input was found.
- Content uses React text escaping; story and team route identifiers are encoded in links.
- Security headers include nosniff, referrer policy, framing restriction and HSTS.
- Locked package URLs use the npm HTTPS registry; no alternative package sources were found.
- Donation UI currently has no payment backend, so this code does not process card details or authorize payment amounts. Its unfinished integration is a functional limitation, not evidence of payment fraud vulnerability.

## Recommended order

1. Patch Next.js and reachable vulnerable dependency paths with compatibility checks.
2. Add contact rate limiting and bounded JSON parsing.
3. Verify production and external account access controls.
4. Add CSP, broader environment ignores and automated advisory/secret checks.
5. Review upload validation according to who can publish reports.

No fixes, dependency changes, commits or pushes were performed as part of this audit. Report files are local artifacts. No conclusion of compromise or absence of all vulnerabilities is claimed.

## Dependency inventory flagged by npm

| Package | Severity | Installed version(s) |
|---|---|---|
| @module-federation/dts-plugin | moderate | 2.9.0 |
| @module-federation/vite | moderate | 1.21.0 |
| @next/eslint-plugin-next | high | 16.3.4 |
| @sanity/cli | high | 8.11.0 |
| @sanity/cli-build | moderate | 6.3.1 |
| @sanity/codegen | high | 8.1.0 |
| @sanity/workbench-cli | moderate | 2.5.1 |
| @vercel/frameworks | moderate | 3.29.0 |
| adm-zip | high | 0.6.0 |
| argparse | moderate | 1.0.10 |
| braces | high | 3.0.3 |
| chokidar | high | 3.6.0 |
| dompurify | low | 3.4.15 |
| eslint-config-next | high | 16.3.4 |
| fast-glob | high | 3.3.1 |
| globby | high | 11.1.0 |
| js-yaml | high | 3.13.1 |
| micromatch | high | 4.0.8 |
| next | critical | 16.3.4 |
| next-sanity | moderate | 13.3.4 |
| sanity | moderate | 6.14.0 |
| sharp | high | 0.35.4 |
| smol-toml | high | 1.5.2, 1.8.0 |
| source-map-js | high | 1.2.1 |
| sprintf-js | moderate | 1.0.3 |
| typeid-js | moderate | 1.2.0 |
| undici | high | 7.29.0 |
| uuid | moderate | 10.0.0 |
