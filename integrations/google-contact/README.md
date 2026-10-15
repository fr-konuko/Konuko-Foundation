Contact page → website server → Apps Script → Google Form responses.

1. Open the Google Form in its editor and open its Script editor.
2. Paste Code.gs and run setup once. Authorize access to your form.
3. In Apps Script Project Settings, copy CONTACT_SECRET from Script Properties. Keep it private.
4. Deploy → New deployment → Web app. Execute as yourself; allow access to Anyone so the website server can call it. The script checks the secret before saving responses.
5. Copy the deployed /exec URL into GOOGLE_CONTACT_SCRIPT_URL and the secret into GOOGLE_CONTACT_SCRIPT_SECRET in .env.local and your hosting environment. Never use NEXT_PUBLIC_ for these values.
6. Restart the local server or redeploy the website.
7. Submit one clearly labeled test message and verify it appears in the Google Form Responses tab before treating the connection as live.

The public form URL is https://docs.google.com/forms/d/e/1FAIpQLSdXPz1hl4hpoyJAsGffan7BoquukkKEy4HVRnlQx5WXPgAnUQ/viewform.
The question IDs in Code.gs were read from this form. Update them if questions are deleted and recreated.
To store responses in Sheets, link a spreadsheet from the form's Responses tab.
No test response has been submitted automatically.

Security update: redeploy the updated Code.gs as a new version of the existing web app deployment (keep the same URL and CONTACT_SECRET). It adds an atomic, persistent limit of 30 authenticated requests per minute across all website instances. The website also limits requests per process and sender; those local limits alone do not span serverless instances. Existing form question IDs and submitted fields are unchanged.
