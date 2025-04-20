import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: t('nav.home'), to: 'hero' },
    { label: t('nav.about'), to: 'about' },
    { label: t('nav.experience'), to: 'experience' },
    { label: t('nav.projects'), to: 'projects' },
    { label: t('nav.skills'), to: 'skills' },
    { label: t('nav.education'), to: 'education' },
    { label: t('nav.contact'), to: 'contact' },
  ];

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    normal: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background dark:bg-gray-700 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial="normal"
          whileHover="hover"
          variants={logoVariants}
        >
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className="text-xl font-bold text-text dark:text-white cursor-pointer flex items-center"
          >
            <span className="text-primary mr-2">{'<'}</span>
            {t('nav.WEB')}
            <span className="text-primary ml-2">{'/>'}</span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 ">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              initial="normal"
              whileHover="hover"
              variants={linkVariants}
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                activeClass="text-primary"
                className="text-text dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-text dark:text-white focus:outline-none"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label={isMenuOpen ? t('navbar.close', 'Close menu') : t('navbar.open', 'Open menu')}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden absolute w-full bg-background dark:bg-gray-800 shadow-md overflow-hidden"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4 py-5">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    activeClass="text-primary"
                    className="text-text dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
