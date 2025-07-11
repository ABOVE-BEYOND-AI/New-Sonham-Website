import { type NextRequest, NextResponse } from "next/server"
import { track } from '@vercel/analytics/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, projectType, budget, timeline } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    // Generate a simple submission ID for tracking
    const submissionId = Date.now().toString() + Math.random().toString(36).substr(2, 9)

    // Track the form submission with all the data
    await track('Contact Form Submission', {
      submissionId,
      name,
      email,
      phone: phone || 'Not provided',
      projectType: projectType || 'Not specified',
      budget: budget || 'Not specified',
      timeline: timeline || 'Not specified',
      message
    })

    // Log submission for debugging (you can remove this in production)
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

    // Simulate processing delay (remove this in production with real email service)
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Thank you for your enquiry! We'll be in touch within 2 hours.",
      submissionId
    })

  } catch (error) {
    console.error("Contact form error:", error)
    
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
