import { useRef, useEffect, useState, ReactNode } from 'react';

type Variant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${variant} ${isVisible ? 'revealed' : ''} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
