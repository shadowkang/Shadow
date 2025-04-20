import { Link } from 'react-scroll';
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { label: t('nav.home'), to: 'hero' },
    { label: t('nav.about'), to: 'about' },
    { label: t('nav.experience'), to: 'experience' },
    { label: t('nav.projects'), to: 'projects' },
    { label: t('nav.skills'), to: 'skills' },
    { label: t('nav.education'), to: 'education' },
    { label: t('nav.contact'), to: 'contact' },
  ];

  return (
    <footer className="bg-background-dark dark:bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className="text-xl font-bold text-text dark:text-white cursor-pointer flex items-center mb-8"
          >
            <span className="text-primary mr-2">{'<'}</span>
            郭圣元
            <span className="text-primary ml-2">{'/>'}</span>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="text-text dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex space-x-6 mb-8">
            <a
              href="https://github.com/UOA-CS732-SE750-Students-2024/project-group-mystic-manatees"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-light transition-colors duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>

          <div className="text-text-light dark:text-gray-400 text-center">
            <p>
              © {currentYear} 郭圣元. {t('footer.rights')}
            </p>
            <p className="mt-2 flex items-center justify-center">
              {t('footer.made')} <FaHeart className="text-primary mx-2" /> {t('footer.and')} {t('footer.react')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
