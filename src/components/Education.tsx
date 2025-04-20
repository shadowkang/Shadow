import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

interface EducationItem {
  degreeKey: string;
  institutionKey: string;
  periodKey: string;
  descriptionKey: string;
}

interface AchievementItem {
  titleKey: string;
}

const Education = () => {
  const { t } = useTranslation();

  const education: EducationItem[] = [
    {
      degreeKey: 'education.master',
      institutionKey: 'education.university',
      periodKey: 'education.period1',
      descriptionKey: 'education.desc1'
    },
    {
      degreeKey: 'education.bachelor',
      institutionKey: 'education.university',
      periodKey: 'education.period2',
      descriptionKey: 'education.desc2'
    }
  ];

  const courseKeys = [
    'education.course1', 'education.course2', 'education.course3', 'education.course4',
    'education.course5', 'education.course6', 'education.course7', 'education.course8'
  ];

  const achievements: AchievementItem[] = [
    {
      titleKey: 'education.achievement1',
    },
    {
      titleKey: 'education.achievement2',
    },
  ];

  return (
      <section id="education" className="py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4 ">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('education.title')}</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            {/* Education */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="dark:bg-gray-900 rounded-lg p-8 shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="text-primary text-3xl mr-4 ">
                  <FaGraduationCap />
                </div>
                <h3 className="text-2xl font-bold text-text">{t('education.education')}</h3>
              </div>

              {education.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-primary">{t(item.degreeKey)}</h4>
                      <span className="text-text-light text-sm dark:bg-gray-800 px-3 py-1 rounded-full">
                    {t(item.periodKey)}
                  </span>
                    </div>
                    <p className="text-text mb-4">{t(item.institutionKey)}</p>
                    <p className="text-text-light mb-6">{t(item.descriptionKey)}</p>

                    {index === 0 && (
                        <div>
                          <h5 className="font-semibold mb-3 text-text">{t('education.courses')}</h5>
                          <div className="flex flex-wrap gap-2">
                            {courseKeys.map((courseKey, courseIndex) => (
                                <span
                                    key={courseIndex}
                                    className="dark:bg-gray-800 text-text-light text-sm px-3 py-1 rounded-full"
                                >
                          {t(courseKey)}
                        </span>
                            ))}
                          </div>
                        </div>
                    )}
                  </div>
              ))}
            </motion.div>

            <div className="space-y-8">
              {/* Achievements */}
              <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="dark:bg-gray-900 rounded-lg p-8 shadow-md"
              >
                <div className="flex items-center mb-6">
                  <div className="text-primary text-2xl mr-4">
                    <FaAward />
                  </div>
                  <h3 className="text-2xl font-bold text-text">{t('education.achievements')}</h3>
                </div>

                <ul className="list-disc pl-6 space-y-3">
                  {achievements.map((achievement, index) => (
                      <li key={index} className="text-text">
                        {t(achievement.titleKey)}
                      </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Education;