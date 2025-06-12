"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Squares } from "@/components/ui/squares-background"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const serviceAreas = ["Essex", "Cambridgeshire", "Suffolk", "Hertfordshire"]

export function AboutSection() {
  return (
    <section id="about" className="pt-24 pb-12 px-6 bg-white relative overflow-hidden">
      {/* Animated squares background */}
      <div className="absolute inset-0 opacity-20">
        <Squares 
          direction="down"
          speed={0.1}
          squareSize={50}
          borderColor="#d1d5db"
          hoverFillColor="#f3f4f6"
          backgroundColor="#ffffff"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Minimal Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-8 md:mb-12 text-center"
        >
          <div className="hover:bg-white/20 bg-white/10 group mx-auto flex w-fit items-center gap-3 rounded-full border border-gray-200 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 mb-6">
            <Image src="/images/sonham-logo.svg" alt="Sonham logo" width={16} height={16} className="w-4 h-4" />
            <span className="text-gray-600 text-sm font-medium pr-3">Who we are</span>
          </div>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">About Us</h2>
        </motion.div>

        {/* Main Content - Centered with Scroll Effect */}
        <div className="mb-16 md:mb-20">
          <div className="max-w-5xl mx-auto text-center">
            <TextGradientScroll
              text="At Sonham Group, we specialise in turning the impossible into reality. From the unusual and bespoke to traditional and timeless builds, we bring your vision to life through expert craftsmanship and meticulous project management."
              className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light text-black justify-center"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-12 md:mb-24">
          {/* Left Column - Featured Image */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-2 lg:order-1"
          >
            <div className="h-96 md:h-full relative overflow-hidden rounded-2xl" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)' }}>
              <Image
                src="/images/sonham-about-house.webp"
                alt="Modern contemporary home designed and built by Sonham Group"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-1 lg:order-2 flex flex-col justify-start"
          >
            {/* Main Content */}
            <div className="space-y-8">
              <motion.div variants={fadeInUp}>
                <p className="text-lg leading-relaxed text-black/70">
                  Founded by a family-driven team, our business is rooted in strong values, personal service, and a
                  commitment to creating the perfect space that suits your lifestyle. We take pride in delivering
                  excellence, whether it's a large-scale new build, a full refurbishment, or a smaller development.
                </p>
              </motion.div>

              {/* Core Values - Simplified */}
              <motion.div variants={fadeInUp} className="pt-4">
                <h3 className="text-xl font-medium text-black mb-6">Our Core Values</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span className="text-black/80 text-lg">Family-driven personal service</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span className="text-black/80 text-lg">Exceptional craftsmanship on every project</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-black rounded-full"></span>
                    <span className="text-black/80 text-lg">Trusted team of multi-skilled tradespeople</span>
                  </li>
                </ul>
              </motion.div>

              {/* Service Areas - Compact */}
              <motion.div variants={fadeInUp} className="pt-4">
                <h3 className="text-xl font-medium text-black mb-4">Service Areas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {serviceAreas.map((area, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 hover:bg-gray-100 transition-all duration-300 rounded-lg p-3 text-center border border-gray-100"
                    >
                      <span className="text-sm font-medium text-black/80 hover:text-black transition-colors duration-300">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
