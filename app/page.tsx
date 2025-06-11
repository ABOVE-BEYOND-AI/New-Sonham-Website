import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ProjectShowcaseSection } from "@/components/sections/project-showcase-section"
import { GallerySection } from "@/components/sections/gallery-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/sections/footer"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectShowcaseSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      
      {/* Text Hover Effect Section */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="h-80 md:h-96 w-full">
            <TextHoverEffect text="SONHAM" duration={0.3} />
          </div>
        </div>
      </section>
    </div>
  )
}
