# Vercel Analytics - Contact Form Events

This document outlines all the custom events that are tracked through Vercel Analytics for the Sonham Group website contact form.

## 📊 Events Overview

All events track comprehensive form data to help you understand user behavior, conversion rates, and form performance.

---

## 🎯 User Engagement Events

### `Contact Form Started`
**Triggered:** When a user first focuses on any form field
**Purpose:** Track form engagement and identify which field users interact with first

**Data Captured:**
- `firstField` - The first field the user focused on (name, email, phone, etc.)
- `timestamp` - When the user started engaging with the form

### `Contact Form Progress`
**Triggered:** When a user leaves a field after partially completing the form
**Purpose:** Understand form abandonment patterns and identify where users drop off

**Data Captured:**
- `completeness` - Percentage of form completed (0-100)
- `fieldsCompleted` - Number of fields that have been filled
- `lastActiveField` - The last field the user was working on

---

## 🎛️ Field Selection Events

### `Project Type Selected`
**Triggered:** When a user selects a project type option
**Purpose:** Understand what types of projects users are interested in

**Data Captured:**
- `projectType` - Selected project type (new-build, renovation, extension, commercial)
- `formProgress` - Percentage of form completed when this selection was made

### `Budget Range Selected`
**Triggered:** When a user selects a budget range
**Purpose:** Track budget preferences and understand client segments

**Data Captured:**
- `budget` - Selected budget range (under-500k, 500k-1m, 1m-2m, over-2m)
- `projectType` - Previously selected project type (if any)
- `formProgress` - Percentage of form completed when this selection was made

### `Timeline Selected`
**Triggered:** When a user selects a project timeline
**Purpose:** Understand urgency and planning horizons of potential clients

**Data Captured:**
- `timeline` - Selected timeline (asap, 1-3months, 3-6months, 6months+)
- `projectType` - Previously selected project type (if any)
- `budget` - Previously selected budget range (if any)
- `formProgress` - Percentage of form completed when this selection was made

---

## 📤 Form Submission Events

### `Contact Form Submitted`
**Triggered:** When a user clicks the submit button (client-side)
**Purpose:** Track submission attempts and form completion patterns

**Data Captured:**
- `projectType` - Selected project type
- `budget` - Selected budget range
- `timeline` - Selected timeline
- `hasPhone` - Whether user provided phone number (yes/no)
- `messageLength` - Length of the message text
- `formCompleteness` - Percentage of form fields completed

### `Contact Form Success`
**Triggered:** When form submission is successful (client-side)
**Purpose:** Track successful conversions and lead generation

**Data Captured:**
- `projectType` - Selected project type
- `budget` - Selected budget range
- `timeline` - Selected timeline
- `submissionId` - Unique identifier for this submission

### `Contact Form Error`
**Triggered:** When form submission fails due to validation or server error (client-side)
**Purpose:** Identify and track form submission issues

**Data Captured:**
- `error` - Error message or type
- `projectType` - Selected project type
- `formCompleteness` - Percentage of form completed

### `Contact Form Network Error`
**Triggered:** When form submission fails due to network issues (client-side)
**Purpose:** Track technical issues affecting form submissions

**Data Captured:**
- `error` - Network error message
- `projectType` - Selected project type
- `formCompleteness` - Percentage of form completed

---

## 🖥️ Server-Side Events

### `Contact Form Validation Error`
**Triggered:** When server receives invalid form data
**Purpose:** Track validation issues and incomplete submissions

**Data Captured:**
- `error` - "Missing required fields"
- `missingFields` - Comma-separated list of missing required fields

### `Contact Form Processed`
**Triggered:** When server successfully processes a form submission
**Purpose:** Track all successful form processing with complete lead data

**Data Captured:**
- `submissionId` - Unique identifier for tracking
- `projectType` - Selected project type (or "not-specified")
- `budget` - Selected budget range (or "not-specified")
- `timeline` - Selected timeline (or "not-specified")
- `hasPhone` - Whether phone number was provided (yes/no)
- `messageLength` - Length of message text
- `emailDomain` - Domain of the email address (for lead source analysis)
- `nameLength` - Length of name field

### `Contact Form Email Sent`
**Triggered:** When server successfully sends notification email
**Purpose:** Track successful email delivery (currently simulated)

**Data Captured:**
- `submissionId` - Links back to the form submission
- `projectType` - Selected project type
- `budget` - Selected budget range

### `Contact Form Server Error`
**Triggered:** When server encounters an error processing the form
**Purpose:** Track and debug server-side issues

**Data Captured:**
- `error` - Server error message
- `timestamp` - When the error occurred

---

## 📈 Analytics Dashboard Usage

### In Vercel Analytics Dashboard:

1. **Go to your project** → Analytics tab → Events panel
2. **View event names** to see all tracked events
3. **Click on event names** to drill down into the data
4. **Filter by custom properties** to analyze specific segments

### Key Insights You Can Track:

- **Conversion Rate:** Compare `Contact Form Started` vs `Contact Form Success`
- **Drop-off Points:** Use `Contact Form Progress` to see where users abandon
- **Popular Project Types:** Analyze `Project Type Selected` events
- **Budget Segments:** Track `Budget Range Selected` distribution
- **Timeline Urgency:** Monitor `Timeline Selected` patterns
- **Technical Issues:** Monitor error events for form problems

### Example Queries:

- Which project types have the highest conversion rates?
- What's the average form completion percentage?
- Which fields do users interact with first?
- What budget ranges are most common?
- Are there any validation or technical issues?

---

## 🔧 Technical Implementation

- **Client-side tracking:** Uses `@vercel/analytics` for immediate user interaction tracking
- **Server-side tracking:** Uses `@vercel/analytics/server` for processing and business logic tracking
- **Data Privacy:** Only tracks business-relevant data, no personal information in analytics
- **Performance:** Tracking is non-blocking and doesn't affect form performance

---

## 📞 Contact Form Integration Status

✅ **Analytics Installed:** `@vercel/analytics` package added  
✅ **Client-side Tracking:** All form interactions tracked  
✅ **Server-side Tracking:** API route events tracked  
✅ **Analytics Provider:** Added to layout.tsx  
✅ **Form API Integration:** Contact form now calls actual API route  
✅ **Comprehensive Data:** All form fields tracked with business context  

The contact form now captures complete user behavior and lead data for your Vercel Analytics dashboard! 