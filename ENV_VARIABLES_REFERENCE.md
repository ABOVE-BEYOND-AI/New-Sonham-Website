# Environment Variables Reference

## Required Environment Variables

Your application needs these environment variables to connect to Google Sheets:

### `GOOGLE_SHEET_ID`
**What it is:** The unique identifier for your Google Sheet  
**Where to find it:** In the Google Sheets URL between `/d/` and `/edit`  
**Example URL:**  
```
https://docs.google.com/spreadsheets/d/1abc123XYZ456-example-sheet-id/edit
                                      ^^^^^^^^^^^^^^^^^^^^^^^^
                                      This is your SHEET_ID
```
**Example value:**  
```
1abc123XYZ456-example-sheet-id
```

---

### `GOOGLE_SERVICE_ACCOUNT_KEY`
**What it is:** JSON credentials for your Google Cloud service account  
**Where to find it:** Download from Google Cloud Console when creating service account  
**Format:** Single-line JSON string  

**Example value:**  
```json
{"type":"service_account","project_id":"your-project-id","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n","client_email":"website-forms@your-project.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/website-forms%40your-project.iam.gserviceaccount.com"}
```

**Important:**  
- Must be a **single line** (no line breaks)
- Copy the **entire JSON object** from the downloaded file
- Keep this **secret** - never commit to git

---

## Where to Set These

### For Vercel (Production/Preview)
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add both variables
4. Select all environments (Production, Preview, Development)
5. Click Save

### For Local Development
1. Create `.env.local` in your project root
2. Add both variables:
```bash
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account"...}
```
3. Save the file
4. **Never commit this file to git** (already in .gitignore)

---

## Verification

After setting environment variables in Vercel:
1. Redeploy your application (Vercel may auto-deploy)
2. Test the contact form
3. Check your Google Sheet for the submission

If submissions aren't appearing:
- Check Vercel Function logs for errors
- Verify environment variables are set correctly
- Ensure Google Sheet is shared with the service account email

---

## Security Notes

✅ `.env.local` is already in `.gitignore`  
✅ Never commit service account credentials to git  
✅ Never share your service account key publicly  
✅ Vercel environment variables are encrypted and secure  
✅ Use separate service accounts for development/production if needed  

