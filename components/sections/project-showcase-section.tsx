'use client';

import ScrollExpandMedia from '@/components/ui/scroll-expand-media';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ProjectShowcaseSection() {
  // Using a construction-related video or image for the showcase
  // You can replace these with actual project videos/images
  const mediaContent = {
    // Main showcase image - using the front view
    mediaSrc: '/images/hero-background.webp',
    bgImageSrc: '/images/hero-background.webp',
    title: 'Our Current Project',
    date: '',
    scrollToExpand: '',
  }; 

  const projectImages = [
    { src: '/images/ostra-brama-project-photos/Garden+View+1 (1)_compressed.webp', alt: 'Ostra Brama front elevation showing contemporary design' },
    { src: '/images/ostra-brama-project-photos/Front+View+1_compressed.webp', alt: 'Ostra Brama garden and landscaping' },
    { src: '/images/ostra-brama-project-photos/Living+Room+View_compressed.webp', alt: 'Ostra Brama living room interior' },
    { src: '/images/ostra-brama-project-photos/Principle+Suite_compressed.webp', alt: 'Ostra Brama principle suite bedroom' },
    { src: '/images/ostra-brama-project-photos/Guest+Room+View_compressed.webp', alt: 'Ostra Brama guest room view' },
  ];

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc={mediaContent.mediaSrc}
      bgImageSrc={mediaContent.bgImageSrc}
      title={mediaContent.title}
      date={mediaContent.date}
      scrollToExpand={mediaContent.scrollToExpand}
      textBlend={false}
    >
      <div className="max-w-7xl mx-auto">
        {/* Project Title and Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            Ostra Brama
          </h2>
          <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            A contemporary masterpiece that redefines modern luxury living through innovative design and exceptional craftsmanship
          </p>
        </motion.div>

        {/* Image Gallery Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {/* Large featured image */}
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden group">
              <Image
                src={projectImages[0].src}
                alt={projectImages[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          {/* Smaller images */}
          {projectImages.slice(1, 3).map((image, index) => (
            <div key={index} className="relative h-[300px] rounded-2xl overflow-hidden group">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
          
          {/* Bottom row images */}
          {projectImages.slice(3).map((image, index) => (
            <div key={index + 3} className="relative h-[300px] rounded-2xl overflow-hidden group lg:col-span-1.5">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </motion.div>

        {/* Project Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">The Vision</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                Ostra Brama represents the pinnacle of contemporary architecture, where bold geometric forms meet 
                organic curves. This exceptional residence seamlessly blends sophisticated design with functional 
                luxury, creating spaces that inspire and elevate everyday living.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Design Philosophy</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                The striking curved central feature serves as the heart of the home, while the contrasting materials 
                of pristine white render and dark cladding create visual drama. Floor-to-ceiling glazing floods 
                the interior with natural light, establishing a seamless connection with the landscaped gardens.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-black/80">Multi-level contemporary design with curved architectural elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-black/80">Expansive glazing for maximum natural light and garden views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-black/80">Premium materials including natural stone and bespoke joinery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-black/80">Sophisticated landscaping with structured garden terraces</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-black/80">Integrated outdoor living spaces with premium finishes</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-black mb-4">Project Status</h3>
              <p className="text-lg text-black/80 leading-relaxed">
                Currently in advanced stages of construction, Ostra Brama showcases our commitment to delivering 
                exceptional homes that push the boundaries of design while maintaining the highest standards of 
                build quality and attention to detail.
              </p>
            </div>
          </div>
                 </motion.div>
      </div>
    </ScrollExpandMedia>
  );
} 