import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation, Variant } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  width = "100%",
  direction = 'up',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className = "",
  once = true
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();

  // 设置适当的动画变体
  const getVariants = () => {
    const variants = {
      hidden: {} as Variant,
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          // 只使用预定义的easing值
          ease: "easeInOut"
        }
      } as Variant
    };

    // 根据方向设置初始状态
    switch (direction) {
      case 'up':
        variants.hidden = { opacity: 0, y: 50 };
        break;
      case 'down':
        variants.hidden = { opacity: 0, y: -50 };
        break;
      case 'left':
        variants.hidden = { opacity: 0, x: 50 };
        break;
      case 'right':
        variants.hidden = { opacity: 0, x: -50 };
        break;
      case 'none':
        variants.hidden = { opacity: 0, scale: 0.95 };
        break;
    }

    return variants;
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} style={{ width, overflow: 'hidden' }} className={className}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={getVariants()}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollReveal;
