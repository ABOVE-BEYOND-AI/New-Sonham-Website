import { google } from 'googleapis';

export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  timestamp?: string;
  ipAddress?: string;
}

/**
 * Appends form submission data to Google Sheets
 * 
 * Prerequisites:
 * 1. Create a Google Cloud Project
 * 2. Enable Google Sheets API
 * 3. Create a Service Account
 * 4. Download credentials JSON
 * 5. Share your Google Sheet with the service account email
 */
export async function appendToGoogleSheet(data: FormSubmission) {
  try {
    // Parse the service account credentials from environment variable
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'
    );

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is not configured');
    }

    // Prepare row data
    const timestamp = data.timestamp || new Date().toISOString();
    const values = [[
      timestamp,
      data.name,
      data.email,
      data.phone,
      data.projectType,
      data.budget,
      data.timeline,
      data.message,
      data.ipAddress || 'N/A',
    ]];

    // Append to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I', // Adjust sheet name if needed
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return {
      success: true,
      updatedRange: response.data.updates?.updatedRange,
    };
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    throw error;
  }
}

/**
 * Initialize the Google Sheet with headers (run this once)
 */
export async function initializeSheet() {
  try {
    const credentials = JSON.parse(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'
    );

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID is not configured');
    }

    // Add headers
    const values = [[
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Project Type',
      'Budget',
      'Timeline',
      'Message',
      'IP Address',
    ]];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Sheet1!A1:I1',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error initializing sheet:', error);
    throw error;
  }
}

