'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMediaAward = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Check if mobile and set mounted
  useEffect(() => {
    setIsMounted(true);
    
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Awwwards-level GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current || !titleRef.current) return;

    // Force GPU acceleration
    gsap.config({ 
      force3D: true,
      nullTargetWarn: false,
    });

    const ctx = gsap.context(() => {
      // Split title text for word animation
      let splitTitle: SplitType | null = null;
      if (titleRef.current && title) {
        splitTitle = new SplitType(titleRef.current, { 
          types: 'words',
          tagName: 'span'
        });
      }

      // Main scroll trigger for pinning and progress
      const mainTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          
          if (progress >= 0.75 && !showContent) {
            setShowContent(true);
          } else if (progress < 0.75 && showContent) {
            setShowContent(false);
          }
        },
        onLeave: () => {
          setShowContent(true);
          setScrollProgress(1);
        },
        onEnterBack: () => {
          setShowContent(false);
        },
      });

      // Animate background with parallax and fade out
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 30,
          scale: 1.2,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 0.8,
          },
        });
      }

      // Media expansion with elegant easing - responsive
      const finalWidth = isMobileState ? window.innerWidth * 0.95 : window.innerWidth * 0.95;
      const finalHeight = isMobileState ? window.innerHeight * 0.65 : window.innerHeight * 0.85;
      const finalBorderRadius = isMobileState ? '16px' : '24px';

      gsap.to(mediaRef.current, {
        width: finalWidth,
        height: finalHeight,
        borderRadius: finalBorderRadius,
        ease: 'power2.inOut',
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Professional title animation - words slide in from left/right
      if (splitTitle && splitTitle.words) {
        // Animate words with alternating directions
        splitTitle.words.forEach((word, index) => {
          // First word(s) from left, rest from right
          const fromLeft = index === 0; // "OUR" from left
          
          gsap.fromTo(word,
            {
              opacity: 0,
              x: fromLeft ? -100 : 100,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              x: 0,
              filter: 'blur(0px)',
              duration: 1.4,
              ease: 'power3.out',
              delay: index * 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });

        // Title fade out with scroll
        gsap.to(titleRef.current, {
          opacity: 0,
          y: -30,
          filter: 'blur(10px)',
          ease: 'power2.in',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=50%',
            scrub: 0.5,
          },
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobileState, showContent, title]);

  return (
    <div
      ref={sectionRef}
      className='relative overflow-hidden gsap-scroll-smooth'
      style={{ maxWidth: '100vw' }}
    >
      <section className='relative flex flex-col items-center justify-start min-h-[200vh]'>
        {/* Animated Background with Parallax */}
        <div className='absolute inset-0 z-0 h-screen overflow-hidden'>
          <div ref={bgRef} className='relative w-full h-full'>
            <Image
              src={bgImageSrc}
              alt='Background'
              fill
              className='object-cover'
              style={{
                filter: 'brightness(0.7) contrast(1.1)',
              }}
              priority
            />
            {/* Gradient overlays for depth */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50' />
            <div className='absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20' />
          </div>
        </div>

        {/* Main Content Container */}
        <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
          <div className='flex flex-col items-center justify-center w-full h-screen sticky top-0'>
            
            {/* Animated Title - Professional & Timeless */}
            <div className='absolute top-[20%] md:top-[15%] left-0 right-0 z-20 pointer-events-none px-4'>
              <h2 
                ref={titleRef}
                className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center text-white leading-tight'
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.03em',
                  willChange: 'transform, opacity, filter',
                }}
              >
                {title || 'Our Current Project'}
              </h2>
            </div>

            {/* Expanding Media Container */}
            <div
              ref={mediaRef}
              className='relative overflow-hidden'
              style={{
                width: isMobileState ? '280px' : '320px',
                height: isMobileState ? '380px' : '420px',
                maxWidth: '95vw',
                maxHeight: '85vh',
                borderRadius: isMobileState ? '32px' : '48px',
                willChange: 'width, height, border-radius',
                contain: 'layout style paint',
              }}
            >
              {mediaType === 'video' ? (
                mediaSrc.includes('youtube.com') ? (
                  <div className='relative w-full h-full'>
                    <iframe
                      width='100%'
                      height='100%'
                      src={
                        mediaSrc.includes('embed')
                          ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            mediaSrc.split('v=')[1]
                      }
                      className='w-full h-full'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      className='w-full h-full object-cover'
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                  </div>
                )
              ) : (
                <div className='relative w-full h-full'>
                  <Image
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    sizes="(max-width: 768px) 95vw, 95vw"
                    priority
                  />
                  {/* Dynamic overlay that fades */}
                  <div 
                    className='absolute inset-0 transition-opacity duration-1000'
                    style={{
                      background: `linear-gradient(135deg, rgba(0,0,0,${0.4 - scrollProgress * 0.4}), rgba(0,0,0,${0.2 - scrollProgress * 0.2}))`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Subtle floating particles - desktop only for professional feel */}
            {isMounted && !isMobileState && (
              <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className='absolute w-1 h-1 bg-white/20 rounded-full'
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float-${i % 3} ${15 + Math.random() * 15}s infinite ease-in-out`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section with Smooth Reveal */}
          <motion.section
            ref={contentRef}
            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-stone-50 relative'
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Decorative top border */}
            <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent' />
            
            {children}
          </motion.section>
        </div>
      </section>

      {/* Custom animations keyframes */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -30px) scale(1.2); opacity: 0.6; }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(-30px, -40px) scale(1.3); opacity: 0.5; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(15px, -25px) scale(1.1); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ScrollExpandMediaAward;

