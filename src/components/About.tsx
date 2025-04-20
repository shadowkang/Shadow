import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaCode } from 'react-icons/fa';
import { Trans,useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('about.title')}</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.5, delay: 0.2}}
              viewport={{once: true}}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">
              {t('about.subtitle')}
            </h3>
            <p className="text-text mb-6 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-text mb-6 leading-relaxed">
              {t('about.p2')}
            </p>
            <p className="text-text leading-relaxed">
              {t('about.p3')}
            </p>
          </motion.div>

          <motion.div
              initial={{opacity: 0, x: 30}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.5, delay: 0.4}}
              viewport={{once: true}}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="text-primary text-3xl mb-4">
                <FaLaptopCode />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-text">{t('about.techstack')}</h4>
              <p className="text-text-light">
                {t('about.techstack.desc')}
              </p>
            </div>

            <div className="dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="text-primary text-3xl mb-4">
                <FaGraduationCap />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-text">{t('about.education')}</h4>
              <p className="text-text-light">
                {t('about.education.desc')}
              </p>
            </div>

            <div className="dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="text-primary text-3xl mb-4">
                <FaCode />
              </div>
              <h4 className="text-xl font-semibold mb-3 text-text">{t('about.projects')}</h4>
              <p className="text-text-light">
                {t('about.projects.desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
