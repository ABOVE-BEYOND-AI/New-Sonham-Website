"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        projectType: "",
        budget: "",
        timeline: "",
        message: "" 
      })
      setShowSuccess(false)
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="relative py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              <span>Contact us</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight">
              Let's bring your vision to life.
            </h2>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're just starting to explore ideas or you're ready to begin, our expert team is here to guide you. We offer friendly, honest advice and a free initial consultation to help you understand what's possible for your project.
          </motion.p>
        </motion.div>

        {/* Compact Contact Info */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="grid md:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Phone className="w-5 h-5 text-black mx-auto mb-2" />
            <h4 className="font-medium text-black text-sm mb-1">Call Us</h4>
            <a href="tel:+443308084344" className="text-gray-600 hover:text-black transition-colors text-sm">
              0330 808 4344
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Mail className="w-5 h-5 text-black mx-auto mb-2" />
            <h4 className="font-medium text-black text-sm mb-1">Email</h4>
            <a href="mailto:hello@sonhamgroup.co.uk" className="text-gray-600 hover:text-black transition-colors text-sm">
              hello@sonhamgroup.co.uk
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <MapPin className="w-5 h-5 text-black mx-auto mb-2" />
            <h4 className="font-medium text-black text-sm mb-1">Service Areas</h4>
            <p className="text-gray-600 text-sm">Essex • Cambridgeshire<br />Suffolk • Hertfordshire</p>
          </div>
        </motion.div>

        {/* Centered Contact Form */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-2xl mx-auto"
        >
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
              <AnimatePresence mode="wait">
                {!showSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Project Type */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200"
                          placeholder="0330 808 4344"
                        />
                      </div>

                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium text-gray-900 mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('projectType')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200 cursor-pointer"
                        >
                          <option value="">Select project type</option>
                          <option value="new-build">New Build</option>
                          <option value="renovation">Renovation</option>
                          <option value="extension">Extension</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                    </div>

                    {/* Budget & Timeline */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-900 mb-2">
                          Estimated Budget
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200 cursor-pointer"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-500k">Under £500k</option>
                          <option value="500k-1m">£500k - £1M</option>
                          <option value="1m-2m">£1M - £2M</option>
                          <option value="over-2m">Over £2M</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-900 mb-2">
                          Project Timeline
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('timeline')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200 cursor-pointer"
                        >
                          <option value="">When to start?</option>
                          <option value="asap">As soon as possible</option>
                          <option value="1-3months">1-3 months</option>
                          <option value="3-6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                        Tell Us About Your Vision
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all duration-200 resize-none"
                        placeholder="Describe your project goals, style preferences, and any specific requirements..."
                      />
                    </div>

                    {/* Privacy Notice */}
                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy. We'll only use your information to respond to your enquiry.
                    </p>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white font-medium py-4 px-8 rounded-xl hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending your enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Start Your Journey</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your enquiry has been received. Our team will review your project details and contact you within 2 hours.
                    </p>
                    <p className="text-sm text-gray-500">
                      Check your email for a confirmation with your reference number.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
      </div>
    </section>
  )
}
