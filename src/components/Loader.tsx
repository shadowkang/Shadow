import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

const Loader = ({ size = 'md', color = 'primary', text, fullScreen = false }: LoaderProps) => {
  // 大小映射
  const sizeMap = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  // 颜色映射
  const colorMap = {
    primary: 'border-primary border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  // 动画变体
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
  };

  // 加载文本变体
  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  // 圆点变体
  const dotVariants = {
    animate: {
      y: ["0%", "-30%", "0%"],
      transition: {
        repeat: Infinity,
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };

  // 交错圆点
  const staggerDots = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const containerClass = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-background dark:bg-gray-900 z-50"
    : "flex flex-col items-center justify-center";

  return (
    <div className={containerClass}>
      <motion.div
        className={`${sizeMap[size]} ${colorMap[color]} rounded-full animate-spin`}
        variants={spinnerVariants}
        animate="animate"
      />

      {text && (
        <motion.p
          className="mt-4 text-text-light dark:text-gray-300 font-medium"
          variants={textVariants}
          animate="animate"
        >
          {text}
        </motion.p>
      )}

      <motion.div
        className="flex space-x-2 mt-4"
        variants={staggerDots}
        animate="animate"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`
              ${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3'}
              rounded-full
              ${color === 'primary' ? 'bg-primary' : 'bg-white'}
            `}
            variants={dotVariants}
            animate="animate"
            transition={{
              delay: i * 0.2,
              repeat: Infinity,
              duration: 0.6,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
