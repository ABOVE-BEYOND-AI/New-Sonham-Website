import { type NextRequest, NextResponse } from "next/server"
import { appendToGoogleSheet } from "@/lib/google-sheets"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, projectType, budget, timeline, message, honeypot } = body

    // Honeypot spam protection - if filled, it's likely a bot
    if (honeypot) {
      console.log("Spam detected: honeypot field filled")
      // Return success to avoid revealing spam detection
      return NextResponse.json({
        success: true,
        message: "Thank you for your enquiry! We'll be in touch soon.",
      })
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // Get client IP for rate limiting
    const clientIp = getClientIp(request)
    
    // Rate limiting: 3 submissions per hour per IP
    const rateLimit = checkRateLimit(clientIp, {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000, // 1 hour
    })

    if (!rateLimit.isAllowed) {
      const minutesUntilReset = Math.ceil((rateLimit.resetTime - Date.now()) / 60000)
      return NextResponse.json(
        { 
          success: false, 
          message: `Too many submissions. Please try again in ${minutesUntilReset} minutes.` 
        },
        { status: 429 }
      )
    }

    // Prepare submission data
    const submissionData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || "N/A",
      projectType: projectType || "Not specified",
      budget: budget || "Not specified",
      timeline: timeline || "Not specified",
      message: message.trim(),
      timestamp: new Date().toISOString(),
      ipAddress: clientIp,
    }

    // Save to Google Sheets
    try {
      await appendToGoogleSheet(submissionData)
    } catch (sheetError) {
      console.error("Failed to save to Google Sheets:", sheetError)
      // Continue anyway - don't let Google Sheets issues block the user
      // In production, you might want to implement a fallback or queue system
    }

    // Log for debugging (Vercel logs)
    console.log("Form submission received:", {
      email: submissionData.email,
      timestamp: submissionData.timestamp,
      ip: clientIp,
    })

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry! We'll be in touch soon.",
    })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
