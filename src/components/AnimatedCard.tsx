import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

const AnimatedCard = ({ children, className = '', delay = 0, hoverEffect = true }: AnimatedCardProps) => {
  // 基础卡片样式
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 ';
  const finalClassName = `${baseStyles} ${className}`;

  return (
    <motion.div
      className={finalClassName}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={
        hoverEffect
          ? {
              y: -8,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              transition: { duration: 0.3, ease: "easeOut" }
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
