import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  children: ReactNode;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  delay?: number;
}

const AnimatedIcon = ({
  children,
  label,
  size = 'md',
  color = 'primary',
  className = '',
  delay = 0
}: AnimatedIconProps) => {
  // 根据尺寸设置样式
  const sizeStyles = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  // 根据颜色设置样式
  const colorStyles = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    white: 'text-white',
    dark: 'text-text-dark'
  };

  // 组合样式
  const combinedStyles = `${sizeStyles[size]} ${colorStyles[color as keyof typeof colorStyles]} ${className}`;

  // 图标动画变体
  const iconVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
        delay
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 0.5,
          ease: "linear",
          repeatDelay: 0.2
        }
      }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        className={`flex items-center justify-center rounded-md dark:bg-opacity-20 ${combinedStyles}`}
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </motion.div>

      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-2 text-sm text-center text-text-light dark:text-gray-300"
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedIcon;
