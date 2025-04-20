import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const AnimatedButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
  variant = 'primary'
}: AnimatedButtonProps) => {
  // 基础和变体样式
  const baseStyles = 'font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50';

  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-primary hover:bg-primary-light text-white shadow-md';
      break;
    case 'secondary':
      variantStyles = 'bg-secondary hover:bg-accent text-white shadow-md';
      break;
    case 'outline':
      variantStyles = 'border-2 border-primary text-primary hover:bg-primary hover:text-white';
      break;
    case 'ghost':
      variantStyles = 'text-primary hover:bg-primary hover:bg-opacity-10';
      break;
  }

  const buttonStyles = `${baseStyles} ${variantStyles} ${className} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
