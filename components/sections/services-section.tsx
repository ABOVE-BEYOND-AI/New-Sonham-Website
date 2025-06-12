"use client"

import type React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, Home, FileText, Building, Calculator, Hammer, Warehouse, House } from "lucide-react"
import { cn } from "@/lib/utils"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const createSlideInLeft = (delay: number) => ({
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } },
})

const createSlideInRight = (delay: number) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay } },
})

// Service data with icons, descriptions, and background images
const services = [
  {
    id: 0,
    icon: Calendar,
    title: "Full Project Management",
    description: "From initial consultation to handover day, we handle every stage with precision and care",
    backgroundImage: "/images/project-management.webp",
  },
  {
    id: 1,
    icon: Home,
    title: "Architectural Design",
    description:
      "Our partnered architects bring your ideas to life, focusing on functionality, beauty, and your unique lifestyle needs",
    backgroundImage: "/images/architectural-design.webp",
  },
  {
    id: 2,
    icon: FileText,
    title: "Planning Permission & Consultancy",
    description:
      "We take the stress out of red tape, managing applications and liaising with local authorities on your behalf",
    backgroundImage: "/images/planning-permission.webp",
  },
  {
    id: 3,
    icon: Building,
    title: "Structural Engineering Support",
    description: "Our expert consultants ensure your project is safe, efficient, and built to last",
    backgroundImage: "/images/structural-engineering.webp",
  },
  {
    id: 4,
    icon: Calculator,
    title: "Cost Estimating & Budgeting",
    description:
      "With access to the best materials at competitive prices, we keep your costs down without compromising on quality",
    backgroundImage: "/images/Sonham Group New Website (2)_compressed.webp",
  },
  {
    id: 5,
    icon: Home,
    title: "New Builds",
    description:
      "From contemporary homes to characterful countryside builds, we craft every detail to suit your taste and needs",
    backgroundImage: "/images/new-builds.webp",
  },
  {
    id: 6,
    icon: Hammer,
    title: "Refurbishments & Renovations",
    description:
      "Reimagining existing spaces to suit modern living, we handle everything from structural changes to high-spec finishes",
    backgroundImage: "/images/refurbishments.webp",
  },
  {
    id: 7,
    icon: Warehouse,
    title: "Small Developments & Bespoke Projects",
    description:
      "Whether it's a garden room, annex, or multi-unit development, we thrive on the unique and the unusual",
    backgroundImage: "/images/small-developments.webp",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6 lg:px-12 bg-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-12 text-center"
        >
          <div className="hover:bg-white/20 bg-white/10 group mx-auto flex w-fit items-center gap-3 rounded-full border border-gray-200 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 mb-6">
            <House className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600 text-sm font-medium pr-3">Services</span>
          </div>
          <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-4">What We Offer</h2>
          <p className="text-lg text-black/70 max-w-3xl mx-auto">
            No matter the size or complexity of your project, Sonham Group is equipped to guide you from concept to
            completion. Our services include:
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-4 md:grid-cols-9 grid-rows-[repeat(12,minmax(140px,auto))] md:grid-rows-[repeat(8,minmax(120px,auto))] gap-4 md:gap-6 w-full max-w-full">
          {/* Full Project Management */}
          <ServiceCard
            service={services[0]}
            className="col-span-4 row-span-2 md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-1"
            animationVariant={createSlideInLeft(0)}
          />

          {/* Architectural Design */}
          <ServiceCard
            service={services[1]}
            className="col-span-4 row-span-2 md:col-span-5 md:row-span-2 md:col-start-5 md:row-start-1"
            useExtendedPadding={true}
            animationVariant={createSlideInRight(0.1)}
          />

          {/* Planning Permission */}
          <ServiceCard
            service={services[2]}
            className="col-span-4 row-span-2 md:col-span-3 md:row-span-3 md:col-start-1 md:row-start-3"
            animationVariant={createSlideInLeft(0.2)}
          />

          {/* Structural Engineering */}
          <ServiceCard
            service={services[3]}
            className="col-span-4 row-span-2 md:col-span-6 md:row-span-2 md:col-start-4 md:row-start-3"
            useMaxPadding={true}
            animationVariant={createSlideInRight(0.3)}
          />

          {/* Cost Estimating */}
          <ServiceCard
            service={services[4]}
            className="col-span-4 row-span-2 md:col-span-6 md:row-span-2 md:col-start-4 md:row-start-5"
            useMaxPadding={true}
            animationVariant={createSlideInRight(0.4)}
          />

          {/* New Builds */}
          <ServiceCard
            service={services[5]}
            className="col-span-4 row-span-2 md:col-span-3 md:row-span-1 md:col-start-1 md:row-start-6"
            useDefaultPadding={true}
            animationVariant={createSlideInLeft(0.5)}
          />

          {/* Refurbishments */}
          <ServiceCard
            service={services[6]}
            className="col-span-4 row-span-2 md:col-span-5 md:row-span-2 md:col-start-1 md:row-start-7"
            useExtendedPadding={true}
            animationVariant={createSlideInLeft(0.6)}
          />

          {/* Small Developments */}
          <ServiceCard
            service={services[7]}
            className="col-span-4 row-span-2 md:col-span-4 md:row-span-2 md:col-start-6 md:row-start-7"
            animationVariant={createSlideInRight(0.7)}
          />
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: {
    id: number
    icon: React.ElementType
    title: string
    description: string
    backgroundImage: string
  }
  className?: string
  useDefaultPadding?: boolean
  useExtendedPadding?: boolean
  useMaxPadding?: boolean
  animationVariant?: any
}

function ServiceCard({ service, className, useDefaultPadding = false, useExtendedPadding = false, useMaxPadding = false, animationVariant = fadeInUp }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={animationVariant}
      className={`relative overflow-hidden rounded-2xl bg-gray-50 group border border-gray-100 ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Background Image - Right-aligned with left fade */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={service.backgroundImage || "/placeholder.svg"}
            alt=""
            fill
            className="object-cover object-right opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-300"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          {/* Left-to-right fade gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-50/70 via-gray-50/40 to-transparent" />
        </div>
      </div>

      {/* Content - Bottom Left Aligned */}
      <div
        className={cn(
          "relative z-10 h-full p-4 md:p-5 flex flex-col justify-end",
          "pr-16 md:" + (useDefaultPadding ? "pr-20" : useMaxPadding ? "pr-60" : useExtendedPadding ? "pr-44" : "pr-36"),
        )}
      >
        <div className="mb-2">
          <Icon className="w-6 h-6 text-black" strokeWidth={1.5} />
        </div>
        <h3 className="font-jakarta text-2xl md:text-2xl font-bold text-black mb-1 leading-tight tracking-tight">
          {service.title}
        </h3>
        <p className="font-jakarta text-sm md:text-sm text-black/70 leading-relaxed font-normal">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}
