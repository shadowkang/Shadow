import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import {FaLinkedin, FaGithub, FaEnvelope, FaWeixin} from 'react-icons/fa';
import { Trans,useTranslation } from 'react-i18next';
import { useState } from 'react';
const Hero = () => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showWechat, setShowWechat] = useState(false);
  const toggleWechat = () => {
    setShowWechat(!showWechat);
  };
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-background dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="md:w-3/5 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-text dark:text-white">
            {/*{t('hero.greeting')}{' '}*/}
            <Trans i18nKey="hero.greetingWithName">
              你好，我是<span className="text-primary">康津源</span>
            </Trans>
          </h1>

          <h2 className="text-2xl text-text-light dark:text-gray-300 font-medium mb-4">
            {t('hero.title')}
          </h2>

          <p className="text-text-light dark:text-gray-400 text-lg mb-8 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex space-x-4 mb-8">
            <a
                href="www.linkedin.com/in/shengyuan-guo-51a180305"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="LinkedIn"
            >
              <FaLinkedin size={24}/>
            </a>
            <a
                href="https://github.com/GFORGALEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="GitHub"
            >
              <FaGithub size={24}/>
            </a>
            <a
                href="mailto:guoshengyuan123@icloud.com"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="Email"
            >
              <FaEnvelope size={24}/>
            </a>
            <div className="relative">
              <button
                  onClick={toggleWechat}
                  className="text-primary hover:text-primary-light transition-colors duration-300"
                  aria-label="WeChat"
              >
                <FaWeixin size={24}/>
              </button>

              {showWechat && (
                  <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-4 rounded-lg shadow-lg z-10">
                    <p className="text-text mb-2 text-center font-medium">{t('contact.wechat')}</p>
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                      <img
                          src="https://i.ibb.co/qMtvCHmK/Wechat.jpg"
                          alt="Wechat" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/128x128?text=WeChat";
                          }}
                      />
                    </div>
                    <div className="w-4 h-4 bg-white transform rotate-45 absolute -bottom-2 left-1/2 -ml-2"></div>
                  </div>
              )}
            </div>
          </div>

          <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 shadow-md"
          >
            {t('hero.cta')}
          </Link>
        </motion.div>

        <motion.div
            className="md:w-2/5 flex justify-center"
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5, delay: 0.2, ease: "easeOut"}}
        >
          <div className="relative rounded-full overflow-hidden border-4 border-blue-500 w-64 h-64 mx-auto">
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <img
                      src="https://i.ibb.co/qNdyZSC/Pngtree-letter-g-logo-6928665.png"
                      alt="加载中"
                      className="w-24 h-24 object-contain"
                  />
                </div>
            )}

            <img
                src="https://i.ibb.co/prrR0qDW/Image.jpg" 
                alt="Image"
                
                className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{transition: 'opacity 0.3s ease-in-out'}}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://i.ibb.co/qNdyZSC/Pngtree-letter-g-logo-6928665.png";
                  setImageLoaded(true);
                }}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            className="text-primary cursor-pointer"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
