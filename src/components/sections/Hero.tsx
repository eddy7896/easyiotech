import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/animations';
import Typewriter from 'typewriter-effect';
import useEmblaCarousel from 'embla-carousel-react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Box as BoxIcon,
  Layers as LayersIcon,
  Smartphone as SmartphoneIcon,
  Truck as TruckIcon,
  Leaf as LeafIcon,
  Database as DatabaseIcon,
  Cloud as CloudIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon
} from 'lucide-react/dist/esm/icons';

// Feature icon component
const FeatureIcon = ({ icon }: { icon: string }) => {
  const iconProps = { 
    className: 'w-6 h-6',
    strokeWidth: 1.75 
  };

  // Simplified set of icons with renamed imports
  const iconMap: Record<string, React.ReactNode> = {
    '3d': <BoxIcon {...iconProps} />,
    'system': <LayersIcon {...iconProps} />,
    'app': <SmartphoneIcon {...iconProps} />,
    'logistics': <TruckIcon {...iconProps} />,
    'farming': <LeafIcon {...iconProps} />,
    'data': <DatabaseIcon {...iconProps} />,
    'cloud': <CloudIcon {...iconProps} />,
    'security': <ShieldIcon {...iconProps} />,
    'iot': <ZapIcon {...iconProps} />,
    'default': <BoxIcon {...iconProps} />
  };

  return iconMap[icon] || iconMap['default'];
};

// Define the type for tech slides
interface TechSlide {
  image: string;
  title: string;
  description: string;
}

// Technology images for carousel with titles and descriptions
const techSlides: TechSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000',
    title: '3D Design & Modeling',
    description: 'Immersive 3D visualizations and product modeling'
  },
  {
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000',
    title: 'System Architecture',
    description: 'Scalable and robust system designs'
  },
  {
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications'
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    title: 'Agri-Tech',
    description: 'Innovative farming technology solutions'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    title: 'Data Analytics',
    description: 'Actionable business insights'
  },
  {
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000',
    title: 'Cloud Solutions',
    description: 'Secure and scalable cloud infrastructure'
  },
  {
    image: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000',
    title: 'IoT Integration',
    description: 'Smart connected devices'
  }
];

const Hero = () => {
  const [scrollY, setScrollY] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const autoplayRef = React.useRef<NodeJS.Timeout>();

  // Set mounted state after initial render for animations
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle carousel navigation
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Auto-rotate carousel
  React.useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
      autoplayRef.current = setTimeout(autoplay, 5000);
    };

    // Start autoplay
    autoplayRef.current = setTimeout(autoplay, 5000);

    // Pause on hover
    const container = emblaApi.containerNode();
    const pauseAutoplay = () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };

    container.addEventListener('mouseenter', pauseAutoplay);
    container.addEventListener('mouseleave', () => {
      autoplayRef.current = setTimeout(autoplay, 3000);
    });

    // Cleanup
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
      container.removeEventListener('mouseenter', pauseAutoplay);
      container.removeEventListener('mouseleave', () => {});
    };
  }, [emblaApi]);

  // Update selected index
  React.useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = React.useCallback((sectionId: string) => {
    if (typeof window === 'undefined') return;
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Feature icons data   
  const features = [
    { 
      icon: '3d', 
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30', 
      name: '3D Design',
      description: 'Immersive 3D modeling'
    },
    { 
      icon: 'system', 
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30', 
      name: 'System Design',
      description: 'Scalable architectures'
    },
    { 
      icon: 'app', 
      color: 'text-green-500 bg-green-100 dark:bg-green-900/30', 
      name: 'App Dev',
      description: 'Mobile & web apps'
    },
    { 
      icon: 'logistics', 
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30', 
      name: 'Logistics',
      description: 'Supply chain solutions'
    },
    { 
      icon: 'farming', 
      color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30', 
      name: 'Farming Tech',
      description: 'Smart agriculture'
    },
    { 
      icon: 'data', 
      color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30', 
      name: 'Data Solutions',
      description: 'Analytics & insights'
    },
    { 
      icon: 'cloud', 
      color: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30', 
      name: 'Cloud Services',
      description: 'Scalable infrastructure'
    },
    { 
      icon: 'security', 
      color: 'text-rose-500 bg-rose-100 dark:bg-rose-900/30', 
      name: 'Security',
      description: 'End-to-end protection'
    },
    { 
      icon: 'iot', 
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30', 
      name: 'IoT Solutions',
      description: 'Connected devices'
    },
  ];

  return (
    <section className="relative min-h-screen text-gray-900 dark:text-white overflow-hidden">
      {/* Particle background for visual effect - only visible in dark mode */}
      <div className="hidden dark:block">
        <ParticleBackground 
          particleCount={60} 
          connectParticles={true} 
          connectDistance={150}
          particleSpeed={0.2}
          maxFPS={30}
        />
      </div>
      
      {/* Light mode background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
      
      {/* Dynamic background gradient elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl" 
        style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.01}px)` }}></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl" 
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.01}px)` }}></div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .blinking-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
            display: inline-block;
            width: 0.5em;
            vertical-align: baseline;
            line-height: 1;
          }
        `
      }} />
      
      {/* Main hero content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
              delay: 0.2
            }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black mb-10 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex flex-col overflow-hidden">
                <motion.div 
                  className="text-transparent bg-clip-text bg-black dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isMounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ marginTop: '80px' }}
                >
                  Simplifying
                </motion.div>
                <div className="h-16 md:h-20 flex items-start leading-tight">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(80)
                        .pauseFor(800) // Initial pause with blinking cursor
                        .typeString('Technology.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .typeString('Businesses.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .typeString('Systems.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .typeString('Innovation.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .typeString('Logistics.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .typeString('Logistics.')
                        .pauseFor(1000)
                        .deleteAll(50)
                        .start();
                    }}
                    options={{
                      cursor: '_',
                      wrapperClassName: 'text-transparent bg-clip-text bg-black dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300 font-["montserrat","monospace"]',
                      cursorClassName: 'blinking-cursor text-transparent bg-clip-text bg-black dark:bg-gradient-to-r dark:from-blue-400 dark:to-cyan-300',
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 50,                     
                      // @ts-ignore - typeSpeed is valid but not in the type definition
                      typeSpeed: 80,
                    }}
                  />
                </div>
              </div>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 font-normal leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We Help You Design, Develop, and Deliver Innovative Digital Solutions That Drive Your Business Growth and Transform Your Ideas Into Reality Through Technology.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/contact" className="no-underline">
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <Button 
                    size="lg" 
                    className="relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transform transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <motion.span 
                        initial={{ x: -5, opacity: 0 }}
                        animate={isMounted ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
                        className="inline-flex items-center ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/portfolio" className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="relative overflow-hidden group border-gray-300 dark:border-gray-700 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span className="relative z-10">
                      Our Work
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Marquee Feature Icons - Hidden on mobile */}
            <div 
              className="hidden lg:block absolute bottom-0 left-0 right-0 overflow-hidden py-4" 
              style={{ 
                transform: 'translateY(100px)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                borderRadius: '12px 12px 12px 12px'
              }}
            >
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .marquee {
                  animation: marquee 40s linear infinite;
                }
                .marquee:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="relative w-full">
                <div className="marquee w-max flex">
                  {[...features, ...features].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="group flex-shrink-0 w-60 px-2"
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <div className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 h-full group-hover:shadow-lg dark:group-hover:shadow-gray-800/30 bg-white/5 backdrop-blur-sm`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color} mb-2 group-hover:scale-110 transition-transform`}>
                          <FeatureIcon icon={feature.icon} />
                        </div>
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                          {feature.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-1">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Image Carousel */}
          <div className="relative h-[400px] mt-16 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="embla overflow-hidden h-full" ref={emblaRef}>
              <div className="embla__container flex h-full">
                {techSlides.map((slide, index) => (
                  <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative group">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="relative h-[400px] absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                      <div className="text-white transform transition-all duration-500 group-hover:translate-y-[-10px]">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600/80 rounded-full mb-3 backdrop-blur-sm">
                          Featured Project
                        </span>
                        <h3 className="text-2xl font-bold mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-gray-200 max-w-md">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation - Temporarily hidden
            <button 
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            
            Dots indicator
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {techImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            */}
          </div>
        </div>
      </div>
      
      {/* Animated Scroll Down Icon */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="w-8 h-8 text-gray-700 dark:text-gray-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
