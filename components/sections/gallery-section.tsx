"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { X, Layers } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Contemporary Family Home",
    description: "Complete transformation from period property to modern family home including architectural planning and interior design",
    images: [
      {
        src: "/images/project-1/image4_compressed.webp",
        alt: "Modern family home garden view",
      },
      {
        src: "/images/project-1/image0_compressed.webp",
        alt: "Modern family home exterior view",
      },
      {
        src: "/images/project-1/image1_compressed.webp",
        alt: "Modern family home interior living space",
      },
      {
        src: "/images/project-1/image3_compressed.webp",
        alt: "Modern family home kitchen design",
      },
      {
        src: "/images/project-3/plot_3_(1)_upscaled_compressed.webp",
        alt: "Contemporary extension exterior",
      },
      {
        src: "/images/project-3/plot_3_rear_upscaled_compressed.webp",
        alt: "Contemporary extension rear view",
      },
      {
        src: "/images/Sonham Group New Website_compressed.webp",
        alt: "Architectural plan view 1",
      },
      {
        src: "/images/Sonham Group New Website (1)_compressed.webp",
        alt: "Architectural plan view 2",
      },
    ],
  },
  {
    id: 2,
    title: "New Build Development",
    description: "Construction of modern residential homes from foundation to completion",
    images: [
      {
        src: "/images/project-2/image0.webp",
        alt: "Heritage restoration exterior",
      },
      {
        src: "/images/project-2/image1.webp",
        alt: "Heritage restoration period features",
      },
      {
        src: "/images/project-2/image2.webp",
        alt: "Heritage restoration modern kitchen",
      },
      {
        src: "/images/project-2/image3.webp",
        alt: "Heritage restoration bathroom",
      },
      {
        src: "/images/project-2/image4.webp",
        alt: "Heritage restoration living room",
      },
      {
        src: "/images/project-2/image5.webp",
        alt: "Heritage restoration master bedroom",
      },
    ],
  },
  {
    id: 3,
    title: "Collect of New Build Developments",
    description: "Collection of contemporary new build homes with modern design",
    images: [
      {
        src: "/images/project4_compressed.webp",
        alt: "Luxury garden room",
      },
    ],
  },
  {
    id: 4,
    title: "Residential Development",
    description: "Modern block of flats with contemporary design",
    images: [
      {
        src: "/images/St.andrews_Street_IMG_2057_3_large-1_upscaled_compressed.webp",
        alt: "Modern residential block of flats",
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
}

const imageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
  },
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
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <div className="hover:bg-white/20 bg-white/10 group mx-auto flex w-fit items-center gap-3 rounded-full border border-gray-200 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 mb-6">
              <Layers className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600 text-sm font-medium pr-3">Gallery</span>
            </div>
            <h2 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight mb-6">Our Work</h2>
            <p className="text-lg text-black/70 max-w-2xl mx-auto">
              Take a look at just a few of the many successful projects led by the founders of Sonham Group — from initial planning stages to moving day. Our portfolio features:
            </p>
          </motion.div>

          {/* Projects */}
          <div className="space-y-24 md:space-y-28 lg:space-y-32">
            {projects.map((project, projectIndex) => (
              <motion.div
                key={project.id}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={projectVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
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
                  className="grid gap-4"
                >
                  {project.images.length === 1 ? (
                    // Single Image - Large Hero Layout
                    <motion.div
                      variants={imageVariants}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group max-w-4xl mx-auto"
                      onClick={() => setSelectedImage({ projectIndex, imageIndex: 0 })}
                    >
                      <Image
                        src={project.images[0].src || "/placeholder.svg"}
                        alt={project.images[0].alt}
                        width={1200}
                        height={600}
                        className="w-full h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={projectIndex === 0}
                        loading={projectIndex === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                  ) : project.images.length === 2 ? (
                    // Two Images - Side by Side Large
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
                      {project.images.map((image, imageIndex) => (
                        <motion.div
                          key={imageIndex}
                          variants={imageVariants}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ scale: 1.02 }}
                          className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                          onClick={() => setSelectedImage({ projectIndex, imageIndex })}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            width={800}
                            height={600}
                            className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={projectIndex === 0 && imageIndex === 0}
                            loading={projectIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                                        // 3+ Images - Featured Layout (First image large, others smaller)
                     <div className="space-y-4">
                       {/* Hero Image */}
                       <motion.div
                         variants={imageVariants}
                         transition={{ duration: 0.6, ease: "easeOut" }}
                         whileHover={{ scale: 1.02 }}
                         className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group max-w-4xl mx-auto"
                         onClick={() => setSelectedImage({ projectIndex, imageIndex: 0 })}
                       >
                         <Image
                           src={project.images[0].src || "/placeholder.svg"}
                           alt={project.images[0].alt}
                           width={1200}
                           height={600}
                           className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                           priority={projectIndex === 0}
                           loading={projectIndex === 0 ? "eager" : "lazy"}
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                       </motion.div>
                       
                       {/* Supporting Images Grid */}
                       {project.images.length > 1 && (
                         <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
                           {project.images.slice(1).map((image, imageIndex) => (
                             <motion.div
                               key={imageIndex + 1}
                               variants={imageVariants}
                               transition={{ duration: 0.6, ease: "easeOut", delay: (imageIndex + 1) * 0.1 }}
                               whileHover={{ scale: 1.05 }}
                               className="relative rounded-xl overflow-hidden shadow-md cursor-pointer group"
                               onClick={() => setSelectedImage({ projectIndex, imageIndex: imageIndex + 1 })}
                             >
                               <Image
                                 src={image.src || "/placeholder.svg"}
                                 alt={image.alt}
                                 width={400}
                                 height={300}
                                 className="w-full h-48 md:h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                                 loading="lazy"
                               />
                               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                             </motion.div>
                           ))}
                         </div>
                       )}
                    </div>
                  )}
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
