"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export function HeroIntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textWrapperRef = useRef<HTMLDivElement>(null)
  const sonhamRef = useRef<HTMLSpanElement>(null)
  const groupRef = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const logo = logoRef.current
    const textWrapper = textWrapperRef.current
    const sonham = sonhamRef.current
    const group = groupRef.current

    if (!wrapper || !logo || !textWrapper || !sonham || !group) {
      return
    }

    const ctx = gsap.context(() => {
      const wrapperRect = wrapper.getBoundingClientRect()
      const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2

      const logoRect = logo.getBoundingClientRect()
      const textRect = textWrapper.getBoundingClientRect()

      const logoCenterX = logoRect.left + logoRect.width / 2
      const textCenterX = textRect.left + textRect.width / 2

      const logoInitialX = wrapperCenterX - logoCenterX
      const textInitialX = wrapperCenterX - textCenterX

      // Set wrapper visible immediately after calculations
      gsap.set(wrapper, { opacity: 1 })

      gsap.set(logo, {
        x: logoInitialX,
        scale: 0,
        rotation: -180,
        opacity: 0,
        transformOrigin: "center",
      })

      gsap.set(textWrapper, {
        x: textInitialX,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
      })

      const tl = gsap.timeline()

      tl.to(logo, {
        scale: 1.25,
        rotation: 360,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(logo, {
          scale: 1,
          rotation: 720,
          duration: 0.6,
          ease: "power2.inOut",
        })
        .to(
          logo,
          {
            x: 0,
            duration: 0.7,
            ease: "power3.inOut",
          },
          "-=0.4",
        )
        .to(
          textWrapper,
          {
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          sonham,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .fromTo(
          group,
          {
            y: 12,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4",
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-4">
      <div
        ref={wrapperRef}
        className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
        style={{ opacity: 0 }}
      >
        <div ref={logoRef} className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 375"
            className="w-32 sm:w-32 md:w-40 lg:w-48 xl:w-56"
          >
            <defs>
              <clipPath id="hero-logo-1">
                <path d="M 12 13.75 L 371.644531 13.75 L 371.644531 260 L 12 260 Z M 12 13.75 " clipRule="nonzero" />
              </clipPath>
              <clipPath id="hero-logo-2">
                <path d="M 3.394531 115 L 363 115 L 363 361 L 3.394531 361 Z M 3.394531 115 " clipRule="nonzero" />
              </clipPath>
            </defs>
            <g clipPath="url(#hero-logo-1)">
              <path
                fill="white"
                d="M 12.574219 140.777344 L 194.046875 13.839844 L 371.644531 139.808594 L 324.035156 171.292969 L 195.464844 77.765625 L 100.25 143.027344 L 221.6875 229.207031 L 178.449219 259.765625 Z M 12.574219 140.777344 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
            <g clipPath="url(#hero-logo-2)">
              <path
                fill="white"
                d="M 362.429688 236.9375 L 178.914062 360.90625 L 3.394531 232.066406 L 51.507812 201.363281 L 178.535156 296.96875 L 274.804688 233.261719 L 154.785156 145.125 L 198.515625 115.265625 Z M 362.429688 236.9375 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </div>

        <div ref={textWrapperRef} className="flex flex-col items-start">
          <span
            ref={sonhamRef}
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight"
            style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)", letterSpacing: "-0.02em" }}
          >
            SONHAM
          </span>
          <span
            ref={groupRef}
            className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 tracking-[0.35em] uppercase"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)", paddingLeft: "0.05em" }}
          >
            GROUP
          </span>
        </div>
      </div>
    </div>
  )
}

