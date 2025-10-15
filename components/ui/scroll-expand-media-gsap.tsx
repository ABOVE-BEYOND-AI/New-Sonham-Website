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

const ScrollExpandMediaGSAP = ({
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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // GSAP ScrollTrigger - Buttery smooth!
  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current || !textRef.current) return;

    // Smooth scroll for better performance
    gsap.config({ 
      force3D: true,
      nullTargetWarn: false,
    });

    const ctx = gsap.context(() => {
      // Create the main scroll trigger for the expansion effect
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%', // Longer scroll distance = smoother
        pin: true, // Pin the section while expanding
        pinSpacing: true,
        scrub: 0.5, // Lower = more responsive, higher = smoother (0.5 is sweet spot)
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          // Update progress (0 to 1)
          const progress = self.progress;
          setScrollProgress(progress);
          
          // Show content when 75% through
          if (progress >= 0.75 && !showContent) {
            setShowContent(true);
          } else if (progress < 0.75 && showContent) {
            setShowContent(false);
          }
        },
        onLeave: () => {
          // Ensure content is shown when leaving
          setShowContent(true);
          setScrollProgress(1);
        },
        onEnterBack: () => {
          // Reset when scrolling back up
          setShowContent(false);
        },
      });

      // Animate media expansion using width/height on GPU layer
      // Using a wrapper transform to keep it on GPU
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Calculate target dimensions
      const finalWidth = isMobileState ? window.innerWidth * 0.95 : window.innerWidth * 0.95;
      const finalHeight = isMobileState ? window.innerHeight * 0.6 : window.innerHeight * 0.85;

      // Animate width and height but keep on GPU with force3D
      timeline.to(mediaRef.current, {
        width: finalWidth,
        height: finalHeight,
        ease: 'power1.inOut',
        force3D: true, // Keep on GPU despite using width/height
      });

      // Animate text opacity with better easing
      gsap.to(textRef.current, {
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=75%', // Fade out over 50% of scroll
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // Animate background fade
      gsap.to(sectionRef.current?.querySelector('.bg-overlay'), {
        opacity: 0,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert(); // Clean up GSAP animations
    };
  }, [isMobileState, showContent]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='relative overflow-x-hidden gsap-scroll-smooth'
      style={{ maxWidth: '100vw' }}
    >
      <section className='relative flex flex-col items-center justify-start min-h-[200vh]'>
        {/* Background Image */}
        <div className='bg-overlay absolute inset-0 z-0 h-screen'>
          <Image
            src={bgImageSrc}
            alt='Background'
            width={1920}
            height={1080}
            className='w-full h-full'
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              maxWidth: '100vw',
            }}
            priority
          />
          <div className='absolute inset-0 bg-black/10' />
        </div>

        {/* Main Content Container */}
        <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
          <div className='flex flex-col items-center justify-center w-full h-screen sticky top-0'>
            {/* Expanding Media */}
            <div
              ref={mediaRef}
              className='relative rounded-2xl overflow-hidden'
              style={{
                width: '300px',
                height: '400px',
                maxWidth: '95vw',
                maxHeight: '85vh',
                boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                willChange: 'width, height', // GPU acceleration hint
                contain: 'layout style paint', // Optimize rendering
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
                      className='w-full h-full rounded-xl'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                    <div className='absolute inset-0 bg-black/30 rounded-xl pointer-events-none' />
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
                      className='w-full h-full object-cover rounded-xl'
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <div className='absolute inset-0 bg-black/30 rounded-xl pointer-events-none' />
                  </div>
                )
              ) : (
                <div className='relative w-full h-full'>
                  <Image
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    fill
                    className='rounded-xl'
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    sizes="(max-width: 768px) 95vw, 95vw"
                    priority
                  />
                  <div 
                    className='absolute inset-0 rounded-xl'
                    style={{
                      background: `rgba(0, 0, 0, ${0.5 - scrollProgress * 0.3})`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Text Overlay - Fades out */}
            <div
              ref={textRef}
              className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              <div className='flex flex-col items-center justify-center text-center gap-4 w-full'>
                {date && (
                  <p className='text-2xl text-blue-200'>
                    {date}
                  </p>
                )}
                
                {title && (
                  <div className='flex flex-col items-center gap-4'>
                    <h2 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-blue-200'>
                      {firstWord}
                    </h2>
                    <h2 className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-blue-200'>
                      {restOfTitle}
                    </h2>
                  </div>
                )}

                {scrollToExpand && (
                  <p className='text-blue-200 font-medium mt-4'>
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content Section - Fades in */}
          <motion.section
            ref={contentRef}
            className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 bg-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.section>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMediaGSAP;

