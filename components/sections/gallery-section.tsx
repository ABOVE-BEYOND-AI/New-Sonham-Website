"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { X, Camera } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Modern Family Home",
    description: "Contemporary new build with sustainable features",
    images: [
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+1+Image+1",
        alt: "Modern family home exterior view",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+1+Image+2",
        alt: "Modern family home interior living space",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+1+Image+3",
        alt: "Modern family home kitchen design",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+1+Image+4",
        alt: "Modern family home garden view",
      },
    ],
  },
  {
    id: 2,
    title: "Heritage Restoration",
    description: "Complete restoration of Victorian townhouse",
    images: [
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+1",
        alt: "Heritage restoration exterior",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+2",
        alt: "Heritage restoration period features",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+3",
        alt: "Heritage restoration modern kitchen",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+4",
        alt: "Heritage restoration bathroom",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+5",
        alt: "Heritage restoration living room",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+2+Image+6",
        alt: "Heritage restoration master bedroom",
      },
    ],
  },
  {
    id: 3,
    title: "Contemporary Extension",
    description: "Glass and steel extension to period property",
    images: [
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+3+Image+1",
        alt: "Contemporary extension exterior",
      },
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+3+Image+2",
        alt: "Contemporary extension interior",
      },
    ],
  },
  {
    id: 4,
    title: "Luxury Garden Room",
    description: "Bespoke garden office and entertainment space",
    images: [
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+4+Image+1",
        alt: "Luxury garden room",
      },
    ],
  },
  {
    id: 5,
    title: "Commercial Refurbishment",
    description: "Office space transformation for modern business",
    images: [
      {
        src: "/placeholder.svg?height=600&width=800&text=Project+5+Image+1",
        alt: "Commercial refurbishment",
      },
    ],
  },
]

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const projectVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: { duration: 0.6, ease: "easeOut" },
}

const imageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: { duration: 0.6, ease: "easeOut" },
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{ projectIndex: number; imageIndex: number } | null>(null)

  return (
    <>
      <section id="gallery" className="py-20 sm:py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            className="text-center mb-16"
          >
            <div className="hover:bg-white/20 bg-white/10 group mx-auto flex w-fit items-center gap-3 rounded-full border border-gray-200 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 mb-6">
              <Camera className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 text-sm font-medium pr-3">Gallery</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-6">Our Work</h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">
              Take a look at just a few of the many successful projects we've completed for our valued clients
            </p>
          </motion.div>

          {/* Projects */}
          <div className="space-y-16">
            {projects.map((project, projectIndex) => (
              <motion.div
                key={project.id}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={projectVariants}
                className="space-y-6"
              >
                {/* Project Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">{project.title}</h3>
                  <p className="text-lg text-black/70">{project.description}</p>
                </div>

                {/* Project Images Grid */}
                <motion.div
                  variants={containerVariants}
                  className={`grid gap-4 ${
                    project.images.length === 1
                      ? "grid-cols-1 max-w-md mx-auto"
                      : project.images.length === 2
                      ? "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
                      : project.images.length === 4
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {project.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      variants={imageVariants}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                      onClick={() => setSelectedImage({ projectIndex, imageIndex })}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={800}
                        height={600}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={projectIndex === 0 && imageIndex === 0}
                        loading={projectIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={projects[selectedImage.projectIndex].images[selectedImage.imageIndex].src || "/placeholder.svg"}
              alt={projects[selectedImage.projectIndex].images[selectedImage.imageIndex].alt}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white text-xl font-semibold">{projects[selectedImage.projectIndex].title}</h3>
              <p className="text-white/70 text-sm mt-2">{projects[selectedImage.projectIndex].images[selectedImage.imageIndex].alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
