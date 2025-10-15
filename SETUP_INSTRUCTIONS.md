# 🚀 Quick Setup Instructions

## What Has Been Implemented

✅ **Google Sheets Integration** - Form submissions automatically saved to Google Sheets  
✅ **Spam Protection** - Rate limiting (3 submissions/hour per IP) + honeypot field  
✅ **Real API Connection** - Form now actually calls the API endpoint  
✅ **Error Handling** - Proper validation and user feedback  
✅ **Data Capture** - All form fields including timestamp and IP address  

---

## What You Need to Do

Follow these steps **in order**:

### 1. Install New Dependencies
```bash
npm install
```
This installs the `googleapis` package that was added to `package.json`.

---

### 2. Set Up Google Sheets (15 minutes)

Follow the **detailed guide** in `GOOGLE_SHEETS_SETUP.md` to:

**Quick checklist:**
- [ ] Create a Google Cloud Project
- [ ] Enable Google Sheets API
- [ ] Create a Service Account
- [ ] Download the JSON credentials file
- [ ] Create a new Google Sheet
- [ ] Copy the Sheet ID from the URL
- [ ] Share the Sheet with your service account email
- [ ] Add column headers to Row 1 (optional but recommended)

---

### 3. Configure Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

#### Variable 1: `GOOGLE_SHEET_ID`
```
Name: GOOGLE_SHEET_ID
Value: [paste your spreadsheet ID from the Google Sheets URL]
Environments: Production, Preview, Development
```

#### Variable 2: `GOOGLE_SERVICE_ACCOUNT_KEY`
```
Name: GOOGLE_SERVICE_ACCOUNT_KEY
Value: [paste entire JSON from downloaded credentials file as ONE LINE]
Environments: Production, Preview, Development
```

**Important:** The JSON should be pasted as a single line, like:
```json
{"type":"service_account","project_id":"your-project"...}
```

---

### 4. Create `.env.local` for Local Testing (Optional)

If you want to test locally before deploying:

1. Create a file named `.env.local` in your project root
2. Add these lines:
```bash
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account"...paste entire JSON here...}
```

**Note:** `.env.local` is already in `.gitignore` and won't be committed to git.

---

### 5. Deploy to Vercel

```bash
git add .
git commit -m "Add Google Sheets integration with spam protection"
git push
```

Vercel will automatically deploy your changes.

---

### 6. Test Your Form

1. Visit your deployed website
2. Go to the contact form
3. Fill it out and submit
4. Check your Google Sheet - the submission should appear within seconds!

---

## File Changes Summary

### New Files Created:
- `lib/google-sheets.ts` - Google Sheets integration service
- `lib/rate-limit.ts` - Spam protection via rate limiting
- `GOOGLE_SHEETS_SETUP.md` - Detailed setup guide
- `SETUP_INSTRUCTIONS.md` - This file

### Files Modified:
- `package.json` - Added `googleapis` dependency
- `app/api/contact/route.ts` - Complete rewrite with Google Sheets integration
- `components/sections/contact-section.tsx` - Updated to call real API endpoint

---

## Spam Protection Features

Your form is now protected against spam with:

1. **Rate Limiting**: Max 3 submissions per hour per IP address
2. **Honeypot Field**: Hidden field that catches automated bots
3. **Email Validation**: Server-side validation of email format
4. **Required Fields**: Server-side validation ensures all required data is present

---

## Monitoring Submissions

### In Google Sheets:
- All submissions appear in real-time
- Use filters, sorting, and spreadsheet formulas as needed
- Export to CSV anytime

### In Vercel:
- Go to your project → Deployments → [select deployment] → Functions
- Click on `/api/contact` to view logs
- See submission confirmations and any errors

---

## Need Help?

Refer to `GOOGLE_SHEETS_SETUP.md` for:
- Detailed step-by-step instructions with screenshots
- Troubleshooting common issues
- Security best practices

---

## Testing Rate Limiting

If you need to test submissions rapidly during development:

1. Edit `app/api/contact/route.ts`
2. Find line ~41-44:
```typescript
const rateLimit = checkRateLimit(clientIp, {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
})
```
3. Temporarily change to: `maxRequests: 100` or increase the time window
4. **Remember to change it back before production!**

---

**You're all set!** 🎉

Once you complete the steps above, your form will be fully functional with spam protection and Google Sheets integration.

