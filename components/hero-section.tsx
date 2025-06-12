"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/ui/animated-group"
import { cn } from "@/lib/utils"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 2.5,
      },
    },
  },
}

export function HeroSection() {
  const [startTransition, setStartTransition] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  // Start the gradual transition after component mounts
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStartTransition(true)
    }, 500) // Small delay to ensure image is rendered

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-16 md:pt-24 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Single image with controlled blur transition */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/hero-background.webp"
                alt="Sonham Group hero background"
                fill
                className="object-cover"
                style={{
                  filter: startTransition ? 'blur(0px)' : 'blur(8px)',
                  transform: startTransition ? 'scale(1)' : 'scale(1.05)',
                  transition: 'filter 2000ms ease-out, transform 2000ms ease-out',
                }}
                sizes="100vw"
                priority
                quality={90}
              />
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

            <div className="mx-auto max-w-5xl px-6 relative z-10 w-full -mt-20">
              <div className="text-center">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="#project"
                    className="hover:bg-white/20 bg-white/10 group mx-auto flex w-fit items-center gap-3 sm:gap-4 rounded-full border border-white/20 p-1 pl-3 sm:pl-4 shadow-md shadow-black/5 transition-all duration-300 mb-8 sm:mb-10 relative overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] animate-shimmer"></div>
                    
                    <span className="text-white text-xs sm:text-sm font-medium relative z-10">Explore our current project</span>
                    <span className="block h-3 sm:h-4 w-0.5 border-l bg-white/10 relative z-10"></span>

                    <div className="bg-white group-hover:bg-white/90 size-5 sm:size-6 overflow-hidden rounded-full duration-500 relative z-10">
                      <div className="flex w-10 sm:w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-5 sm:size-6">
                          <ArrowRight className="m-auto size-2.5 sm:size-3 text-black" />
                        </span>
                        <span className="flex size-5 sm:size-6">
                          <ArrowRight className="m-auto size-2.5 sm:size-3 text-black" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mx-auto text-balance text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] text-white font-light tracking-tight leading-[1.1] mb-6 sm:mb-8">
                    The Sonham Standard
                  </h1>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          delayChildren: 0.6,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                >
                  <p className="mx-auto max-w-3xl text-balance text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0">
                    While other builders force you to choose between your dream design and reality, our integrated approach unites award-winning architects, master craftsmen, and total project mastery under one roof. The result? Homes that don't just meet expectations—they redefine what's possible.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 1.2,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="relative group">
                    {/* Animated glow background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-[16px] opacity-0 group-hover:opacity-100 blur-sm transition-all duration-700 animate-pulse" />
                    
                    {/* Sweeping light effect */}
                    <div className="absolute inset-0 rounded-[14px] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                    </div>
                    
                    <div className="relative bg-white/10 backdrop-blur-sm rounded-[14px] border border-white/20 p-0.5">
                      <Button asChild size="lg" className="relative rounded-xl px-10 sm:px-12 py-3 sm:py-4 text-base sm:text-lg min-h-[48px] sm:min-h-[56px] min-w-[240px] sm:min-w-[280px] bg-white text-black hover:bg-white overflow-hidden">
                        <Link 
                          href="#contact" 
                          className="flex items-center justify-center"
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <div className="relative w-full h-full flex items-center justify-center">
                            {(() => {
                              const text = "Bring Your Vision to Life";
                              const characters = text.split("");
                              
                              // Calculate deterministic delays for each character
                              const getHoverEnterExitDelay = (index: number) => {
                                // Organic acceleration curve for hover enter exit (up)
                                const baseDelay = index * index * 0.8 + index * 10;
                                return Math.min(Math.round(baseDelay), 400);
                              };
                              
                              const getHoverEnterEnterDelay = (index: number) => {
                                // Start after max exit delay + pause, then organic deceleration for hover enter (from below)
                                const maxExitDelay = 400;
                                const pauseDelay = 100;
                                const reverseIndex = characters.length - 1 - index;
                                const baseDelay = reverseIndex * reverseIndex * 0.6 + reverseIndex * 8;
                                return maxExitDelay + pauseDelay + Math.min(Math.round(baseDelay), 350);
                              };

                              const getHoverLeaveExitDelay = (index: number) => {
                                // Reverse order for hover leave exit (down) - later chars exit first
                                const reverseIndex = characters.length - 1 - index;
                                const baseDelay = reverseIndex * reverseIndex * 0.8 + reverseIndex * 10;
                                return Math.min(Math.round(baseDelay), 400);
                              };
                              
                              const getHoverLeaveEnterDelay = (index: number) => {
                                // Start after max exit delay + pause, END letters first for hover leave enter (from above)
                                const maxExitDelay = 400;
                                const pauseDelay = 100;
                                const reverseIndex = characters.length - 1 - index;
                                const baseDelay = reverseIndex * reverseIndex * 0.6 + reverseIndex * 8;
                                return maxExitDelay + pauseDelay + Math.min(Math.round(baseDelay), 350);
                              };
                              
                              return (
                                <>
                                  {/* Original text - behavior changes based on hover state */}
                                  <div className="absolute inset-0 flex items-center justify-center text-nowrap font-medium">
                                    {characters.map((char, index) => (
                                      <span
                                        key={`original-${index}`}
                                        className="inline-block transition-all duration-400 ease-in"
                                        style={{
                                          transform: isHovered 
                                            ? 'translateY(-100%) scale(0.8)' // Exit up on hover
                                            : 'translateY(0%) scale(1)',      // Return to center
                                          opacity: isHovered ? 0 : 1,
                                          transitionDelay: isHovered 
                                            ? `${getHoverEnterExitDelay(index)}ms`     // Hover enter timing
                                            : `${getHoverLeaveEnterDelay(index)}ms`,   // Hover leave timing (reversed)
                                        }}
                                      >
                                        {char === " " ? "\u00A0" : char}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Hover text - enters from below on hover, exits down on leave */}
                                  <div className="absolute inset-0 flex items-center justify-center text-nowrap font-medium">
                                    {characters.map((char, index) => (
                                      <span
                                        key={`hover-${index}`}
                                        className="inline-block transition-all duration-500 ease-out"
                                        style={{
                                          transform: isHovered 
                                            ? 'translateY(0%) scale(1)'       // Enter to center on hover
                                            : 'translateY(100%) scale(0.9)',  // Exit down on leave
                                          opacity: isHovered ? 1 : 0,
                                          transitionDelay: isHovered 
                                            ? `${getHoverEnterEnterDelay(index)}ms`    // Hover enter timing
                                            : `${getHoverLeaveExitDelay(index)}ms`,    // Hover leave timing (reversed)
                                        }}
                                      >
                                        {char === " " ? "\u00A0" : char}
                                      </span>
                                    ))}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const menuItems = [
  { name: "About", href: "#about" },
  { name: "What we offer", href: "#services" },
  { name: "Gallery", href: "#gallery" },
]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [showBorder, setShowBorder] = React.useState(false)

  React.useEffect(() => {
    let borderTimer: NodeJS.Timeout

    const handleScroll = () => {
      const scrollY = window.scrollY
      const wasScrolled = isScrolled
      const nowScrolled = scrollY > 50

      setIsScrolled(nowScrolled)

      if (nowScrolled && !wasScrolled) {
        // Scrolling down: delay border appearance
        clearTimeout(borderTimer)
        borderTimer = setTimeout(() => {
          setShowBorder(true)
        }, 300) // 300ms delay for border
      } else if (!nowScrolled && wasScrolled) {
        // Scrolling to top: remove border instantly
        clearTimeout(borderTimer)
        setShowBorder(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(borderTimer)
    }
  }, [isScrolled])

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (menuState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuState])
  return (
    <header>
      <nav data-state={menuState && "active"} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled && "bg-background/50 max-w-4xl rounded-2xl backdrop-blur-lg lg:px-5",
            showBorder && "border",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo isScrolled={isScrolled} />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-50 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className={cn(
                  "in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200",
                  isScrolled ? "text-charcoal" : "text-white"
                )} />
                <X className={cn(
                  "group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200",
                  menuState ? "text-white" : isScrolled ? "text-charcoal" : "text-white"
                )} />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block duration-150",
                        isScrolled ? "text-charcoal/80 hover:text-charcoal" : "text-white/80 hover:text-white",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modern Full-Screen Mobile Menu */}
            <div className={cn(
              "fixed inset-0 z-40 transform transition-all duration-500 ease-out lg:hidden",
              menuState ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
            )}>
              {/* Background with blur */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />
              
              {/* Menu Content */}
              <div className="relative h-full flex flex-col justify-between p-8 pt-24">
                {/* Navigation Links */}
                <div className="space-y-8">
                  {menuItems.map((item, index) => (
                    <div key={index} className="overflow-hidden">
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className={cn(
                          "block text-white text-4xl font-light tracking-tight hover:text-white/80 transition-all duration-300",
                          "transform transition-transform duration-700 ease-out",
                          menuState ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                        )}
                        style={{
                          transitionDelay: menuState ? `${(index + 1) * 100}ms` : `${(menuItems.length - index) * 50}ms`
                        }}
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Contact Section */}
                <div className={cn(
                  "space-y-6 transform transition-all duration-700 ease-out",
                  menuState ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                )}
                style={{
                  transitionDelay: menuState ? "400ms" : "0ms"
                }}>
                  {/* Primary CTA */}
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90 text-lg py-6 rounded-xl font-medium"
                  >
                    <Link href="#contact" onClick={() => setMenuState(false)}>
                      Bring Your Vision to Life
                    </Link>
                  </Button>

                  {/* Contact Info */}
                  <div className="space-y-3 text-white/70">
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href="tel:+443308084344" className="text-sm hover:text-white transition-colors">
                        0330 808 4344
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href="mailto:hello@sonhamgroup.co.uk" className="text-sm hover:text-white transition-colors">
                        hello@sonhamgroup.co.uk
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">Essex • Cambridgeshire • Suffolk • Hertfordshire</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Menu (unchanged) */}
            <div className="hidden lg:flex lg:w-fit lg:gap-6">
              <Button
                asChild
                size="sm"
                variant={isScrolled ? "default" : "secondary"}
                className={cn(
                  !isScrolled && "bg-white text-charcoal hover:bg-white/90",
                  "h-auto py-2",
                )}
              >
                <Link href="#contact">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const Logo = ({ className, isScrolled }: { className?: string; isScrolled?: boolean }) => {
  return (
    <div className="flex items-center space-x-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 375 375"
        className={cn("h-8 w-8", className)}
      >
        <defs>
          <clipPath id="ad3e2eabf8">
            <path d="M 12 13.75 L 371.644531 13.75 L 371.644531 260 L 12 260 Z M 12 13.75 " clipRule="nonzero" />
          </clipPath>
          <clipPath id="70d1a18b51">
            <path d="M 3.394531 115 L 363 115 L 363 361 L 3.394531 361 Z M 3.394531 115 " clipRule="nonzero" />
          </clipPath>
        </defs>
        <g clipPath="url(#ad3e2eabf8)">
          <path
            fill={isScrolled ? "#1A1A1A" : "white"}
            d="M 12.574219 140.777344 L 194.046875 13.839844 L 371.644531 139.808594 L 324.035156 171.292969 L 195.464844 77.765625 L 100.25 143.027344 L 221.6875 229.207031 L 178.449219 259.765625 Z M 12.574219 140.777344 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
        <g clipPath="url(#70d1a18b51)">
          <path
            fill={isScrolled ? "#1A1A1A" : "white"}
            d="M 362.429688 236.9375 L 178.914062 360.90625 L 3.394531 232.066406 L 51.507812 201.363281 L 178.535156 296.96875 L 274.804688 233.261719 L 154.785156 145.125 L 198.515625 115.265625 Z M 362.429688 236.9375 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
      </svg>
      <span
        className={cn(
          "font-extrabold text-xl tracking-wide transition-colors duration-300",
          isScrolled ? "text-charcoal" : "text-white",
        )}
      >
        SONHAM
      </span>
    </div>
  )
}
