import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ExperienceItemProps {
  titleKey: string;
  companyKey: string;
  locationKey: string;
  periodKey: string;
  descriptionKeys: string[];
  index: number;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
                                                         titleKey,
                                                         companyKey,
                                                         locationKey,
                                                         periodKey,
                                                         descriptionKeys,
                                                         index,
                                                       }) => {
  const { t } = useTranslation();

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-10 ml-6"
      >
        <div className="absolute w-3 h-3 bg-primary rounded-full mt-1.5 -left-1.5 border border-white"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <h3 className="text-xl font-bold text-primary">{t(titleKey)}</h3>
          <span className="bg-background-500 px-3 py-1 rounded-full text-sm font-medium text-text-light">
          {t(periodKey)}
        </span>
        </div>
        <div className="text-text-light mb-4">
          <span className="font-medium text-text">{t(companyKey)}</span> · {t(locationKey)}
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {descriptionKeys.map((itemKey, itemIndex) => (
              <li key={itemIndex} className="text-text">
                {t(itemKey)}
              </li>
          ))}
        </ul>
      </motion.div>
  );
};

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
    {
      titleKey: 'experience.position1',
      companyKey: 'experience.company1',
      locationKey: 'experience.location1',
      periodKey: 'experience.period1',
      descriptionKeys: [
        'experience.job1.desc1',
        'experience.job1.desc2',
        'experience.job1.desc3',
        'experience.job1.desc4',
        'experience.job1.desc5'
      ]
    },
    {
      titleKey: 'experience.position2',
      companyKey: 'experience.company2',
      locationKey: 'experience.location2',
      periodKey: 'experience.period2',
      descriptionKeys: [
        'experience.job2.desc1',
        'experience.job2.desc2',
        'experience.job2.desc3',
        'experience.job2.desc4',
        'experience.job2.desc5'
      ]
    }
  ];

  return (
      <section id="experience" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('experience.title')}</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </motion.div>

          {/* Timeline */}
          <div className="relative border-l border-primary">
            {experiences.map((exp, index) => (
                <ExperienceItem key={index} {...exp} index={index} />
            ))}
          </div>
        </div>
      </section>
  );
};

export default Experience;