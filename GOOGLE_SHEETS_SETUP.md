# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets integration for your contact form submissions.

## Overview

Form submissions will be automatically saved to a Google Sheet with the following data:
- Timestamp
- Name
- Email
- Phone
- Project Type
- Budget
- Timeline
- Message
- IP Address (for spam tracking)

---

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** → **"New Project"**
3. Enter a project name (e.g., "Sonham Group Website")
4. Click **"Create"**
5. Wait for the project to be created and select it

---

## Step 2: Enable Google Sheets API

1. In your Google Cloud Console, make sure your new project is selected
2. Go to **"APIs & Services"** → **"Library"**
3. Search for **"Google Sheets API"**
4. Click on it and click **"Enable"**
5. Wait for the API to be enabled

---

## Step 3: Create a Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Enter the following:
   - **Service account name**: `website-forms` (or any name you prefer)
   - **Service account ID**: Will auto-fill
   - **Description**: "Service account for website contact form"
4. Click **"Create and Continue"**
5. For the role, select **"Editor"** (or you can skip this step)
6. Click **"Continue"** and then **"Done"**

---

## Step 4: Create and Download Service Account Key

1. On the **Credentials** page, find your newly created service account in the **"Service Accounts"** section
2. Click on the service account email address
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** as the key type
6. Click **"Create"**
7. A JSON file will be downloaded to your computer
8. **IMPORTANT**: Keep this file secure! It contains sensitive credentials

---

## Step 5: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"Blank"** to create a new spreadsheet
3. Name it something like **"Sonham Group Contact Submissions"**
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```
   The ID is the long string between `/d/` and `/edit`

---

## Step 6: Share the Sheet with Your Service Account

1. In your Google Sheet, click the **"Share"** button (top right)
2. In the **"Add people and groups"** field, paste the service account email:
   - You can find this email in the JSON file you downloaded
   - It looks like: `website-forms@your-project.iam.gserviceaccount.com`
3. Give it **"Editor"** access
4. **UNCHECK** "Notify people" (it's an automated account, not a person)
5. Click **"Share"**

---

## Step 7: Set Up Environment Variables in Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **"Settings"** → **"Environment Variables"**
3. Add the following variables:

#### Variable 1: GOOGLE_SHEET_ID
- **Name**: `GOOGLE_SHEET_ID`
- **Value**: Paste your spreadsheet ID (from Step 5)
- **Environment**: Check all (Production, Preview, Development)

#### Variable 2: GOOGLE_SERVICE_ACCOUNT_KEY
- **Name**: `GOOGLE_SERVICE_ACCOUNT_KEY`
- **Value**: 
  1. Open the JSON file you downloaded in Step 4
  2. **Copy the ENTIRE contents** as a single line (it should be one long JSON string)
  3. Paste it here
- **Environment**: Check all (Production, Preview, Development)

4. Click **"Save"** for each variable

### Option B: Using Local Development (.env.local)

1. In your project root, create a file named `.env.local`
2. Add the following:

```bash
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account"...} # Paste entire JSON on one line
```

3. **IMPORTANT**: Never commit `.env.local` to git (it's already in .gitignore)

---

## Step 8: Initialize Your Google Sheet with Headers (Optional but Recommended)

You can add headers to your Google Sheet manually, or let the first submission create them automatically.

### Manual Method (Recommended):
1. Open your Google Sheet
2. In the first row (Row 1), add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Project Type`
   - F1: `Budget`
   - G1: `Timeline`
   - H1: `Message`
   - I1: `IP Address`

3. Format the headers (optional):
   - Make them bold
   - Add background color
   - Freeze the top row (View → Freeze → 1 row)

---

## Step 9: Deploy and Test

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **If testing locally:**
   ```bash
   npm run dev
   ```
   Visit the contact form and submit a test entry

3. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Add Google Sheets integration"
   git push
   ```
   Vercel will automatically deploy

4. **Test the live form:**
   - Visit your deployed website
   - Fill out the contact form
   - Submit it
   - Check your Google Sheet to see the submission appear!

---

## Spam Protection Features Included

Your form now includes multiple spam protection mechanisms:

1. **Rate Limiting**: Maximum 3 submissions per hour per IP address
2. **Honeypot Field**: Hidden field that catches bots
3. **Email Validation**: Server-side email format validation
4. **Required Fields**: Server-side validation for required fields

---

## Troubleshooting

### "GOOGLE_SHEET_ID is not configured" error
- Check that you added the environment variable in Vercel
- Redeploy after adding environment variables

### "Failed to save to Google Sheets" in logs
- Verify the service account email has Editor access to the sheet
- Check that the GOOGLE_SERVICE_ACCOUNT_KEY is valid JSON
- Make sure Google Sheets API is enabled in your Google Cloud project

### Submissions not appearing in the sheet
- Check Vercel Function logs for errors
- Verify the spreadsheet ID is correct
- Ensure the sheet is named "Sheet1" (or update the code to match your sheet name)

### Rate limiting issues during testing
- Rate limits are per IP address
- Wait 1 hour between tests, or temporarily increase the limit in `/app/api/contact/route.ts`

---

## Monitoring Submissions

### View Submissions in Google Sheets
Your Google Sheet will automatically populate with new submissions in real-time.

### View Logs in Vercel
1. Go to your Vercel Dashboard
2. Click on your project
3. Go to **"Deployments"** → Select your deployment → **"Functions"**
4. Click on the `/api/contact` function to view logs

---

## Security Best Practices

1. ✅ Never commit `.env.local` or service account keys to git
2. ✅ Keep your service account JSON file secure
3. ✅ Only share the Google Sheet with necessary people
4. ✅ Regularly review submissions for suspicious activity
5. ✅ Consider adding email notifications for new submissions (future enhancement)

---

## Need Help?

If you encounter any issues:
1. Check the Vercel Function logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the Google Sheets API is enabled
4. Confirm the service account has access to the sheet

---

## Future Enhancements

Consider adding:
- Email notifications when a new submission arrives
- Slack/Discord webhook notifications
- Export submissions to CSV
- Dashboard for viewing and managing submissions
- Auto-responder emails to customers

---

**Setup Complete!** 🎉

Your contact form is now connected to Google Sheets with spam protection enabled.

