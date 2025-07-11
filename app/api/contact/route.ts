import { type NextRequest, NextResponse } from "next/server"
import { track } from '@vercel/analytics/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, projectType, budget, timeline } = body

    // Validate required fields
    if (!name || !email || !message) {
      await track('Contact Form Validation Error', {
        error: 'Missing required fields',
        missingFields: [
          !name ? 'name' : '',
          !email ? 'email' : '',
          !message ? 'message' : ''
        ].filter(Boolean).join(', ')
      })

      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    // Generate a simple submission ID for tracking
    const submissionId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

    // Track the server-side submission with all form data
    await track('Contact Form Processed', {
      submissionId,
      projectType: projectType || 'not-specified',
      budget: budget || 'not-specified',
      timeline: timeline || 'not-specified',
      hasPhone: phone ? 'yes' : 'no',
      messageLength: message.length.toString(),
      emailDomain: email.split('@')[1] || 'unknown',
      nameLength: name.length.toString()
    })

    // Log full submission for debugging (you can remove this in production)
    console.log("Contact form submission:", {
      submissionId,
      timestamp: new Date().toISOString(),
      data: { name, email, phone, message, projectType, budget, timeline }
    })

    // In production, you would integrate with your email service here
    // For example:
    // await sendEmail({
    //   to: 'hello@sonhamgroup.co.uk',
    //   subject: `New Contact Form Submission - ${projectType || 'General Inquiry'}`,
    //   html: generateEmailTemplate({ name, email, phone, message, projectType, budget, timeline })
    // })

    // Track successful processing
    await track('Contact Form Email Sent', {
      submissionId,
      projectType: projectType || 'not-specified',
      budget: budget || 'not-specified'
    })

    // Simulate processing delay (remove this in production with real email service)
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry! We'll be in touch within 2 hours.",
      submissionId
    })

  } catch (error) {
    // Track server errors
    await track('Contact Form Server Error', {
      error: error instanceof Error ? error.message : 'Unknown server error',
      timestamp: new Date().toISOString()
    })

    console.error("Contact form error:", error)
    
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
