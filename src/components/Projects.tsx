import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import AnimatedCard from './AnimatedCard';
import ProjectDetail, { ProjectDetails } from './ProjectDetail';

// 项目列表数据
const projectsData: ProjectDetails[] = [
  {
    id: String(1),
    title: 'Course Planning and Recommendation System',
    category: 'Full Stack',
    description: 'An end-to-end system for course planning and recommendations using Django and MySQL',
    longDescription: 'This project is a course planning and recommendation system designed to assist new students in selecting courses efficiently. It integrates course prerequisites and constraint rules, improving selection efficiency by 40% and reducing errors by 25%. The system was built with a scalable Django backend, MySQL for data storage, and a REST API for seamless frontend-backend communication.',
    image: 'https://via.placeholder.com/600x400?text=Course+Planning+System',
    demoLink: '',
    githubLink: 'https://github.com/shadowkang',
    date: '2024',
    features: [
      'Course prerequisites and constraint integration',
      '40% higher course selection efficiency',
      '25% lower error rate in course planning',
      'Scalable Django-based application',
      'Optimized response time under 1 second'
    ],
    technologies: ['Python', 'Pandas', 'MySQL', 'Django', 'REST API'],
    screenshots: [
      'https://via.placeholder.com/600x400?text=Course+Planning+Dashboard',
      'https://via.placeholder.com/600x400?text=Course+Recommendation',
      'https://via.placeholder.com/600x400?text=Course+Constraints'
    ]
  },
  {
    id: String(2),
    title: 'Sentiment Analysis of Restaurant Reviews',
    category: 'Machine Learning',
    description: 'A multi-label sentiment analysis model for restaurant reviews using LSTM and Word2Vec',
    longDescription: 'This project developed a multi-label classification model to analyze Chinese restaurant reviews across dimensions like environment, service, and taste. It extracts customer preferences and provides actionable recommendations to optimize operations. The model achieves 81% accuracy using Word2Vec embeddings and LSTM/Bi-LSTM architectures.',
    image: 'https://via.placeholder.com/600x400?text=Sentiment+Analysis',
    demoLink: '',
    githubLink: 'https://github.com/shadowkang',
    date: '2023-2024',
    features: [
      'Multi-label classification for environment, service, and taste',
      '81% text classification accuracy',
      '20% reduced overfitting with Dropout and Batch Normalization',
      '35% improved training efficiency',
      'Actionable insights for restaurant operations'
    ],
    technologies: ['Python', 'Word2Vec', 'LSTM', 'Bi-LSTM', 'TensorFlow'],
    screenshots: [
      'https://via.placeholder.com/600x400?text=Sentiment+Analysis+Results',
      'https://via.placeholder.com/600x400?text=Review+Breakdown',
      'https://via.placeholder.com/600x400?text=Model+Performance'
    ]
  },
  {
    id: String(3),
    title: 'Task Complexity-driven Continual Learning',
    category: 'Machine Learning',
    description: 'A continual learning framework with progressive prompts for NLP tasks',
    longDescription: 'This project developed a novel continual learning framework integrating task complexity and similarity metrics into progressive prompts, reducing catastrophic forgetting by 40% in long-term NLP tasks. It features dynamic task prioritization and was validated across sentiment analysis and topic classification.',
    image: 'https://via.placeholder.com/600x400?text=Continual+Learning',
    demoLink: '',
    githubLink: 'https://github.com/shadowkang',
    date: '2024',
    features: [
      '40% reduction in catastrophic forgetting',
      '15% accuracy improvement with dynamic task prioritization',
      '30% faster inference speed',
      '25% lower forgetting rates than baseline models',
      'Validated on sentiment analysis and topic classification'
    ],
    technologies: ['Python', 'PyTorch', 'T5-small', 'BERT-base', 'Transformers'],
    screenshots: [
      'https://via.placeholder.com/600x400?text=Learning+Framework',
      'https://via.placeholder.com/600x400?text=Task+Prioritization',
      'https://via.placeholder.com/600x400?text=Performance+Metrics'
    ]
  }
];

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetails[]>(projectsData);

  // 过滤器分类
  const categories = [
    { id: 'all', name: t('projects.all') },
    { id: 'Full Stack', name: t('fullstack') },
    { id: 'Machine Learning', name: t('machinelearning') }
  ];

  // 当选择的分类变化时，更新筛选后的项目
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

 

  // 打开项目详情
  const openProjectDetail = (project: ProjectDetails) => {
    setSelectedProject(project);
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
  };

  // 关闭项目详情
  const closeProjectDetail = () => {
    setSelectedProject(null);
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text dark:text-white text-center">
            {t('projects.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12"></div>
        </ScrollReveal>

        {/* 分类过滤器 */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-background dark:bg-gray-700 text-text-light dark:text-gray-300 hover:bg-background-dark dark:hover:bg-gray-600'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnimatedCard delay={index * 0.1}>
                  <div className="h-full flex flex-col">
                    {/* 项目图片 */}
                    <div className="relative group overflow-hidden rounded-t-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-primary hover:bg-primary-light p-3 rounded-full transition-colors duration-300"
                            aria-label={`View ${project.title} demo`}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300"
                            aria-label={`View ${project.title} code`}
                          >
                            <FaGithub />
                          </a>
                        )}
                        <button
                          onClick={() => openProjectDetail(project)}
                          className="text-white bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition-colors duration-300"
                          aria-label={`View ${project.title} details`}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                    </div>

                    {/* 项目内容 */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-text dark:text-white">{project.title}</h3>
                        <span className="text-xs bg-background-dark dark:bg-gray-700 text-text-light dark:text-gray-300 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-text-light dark:text-gray-400 mb-4 flex-1">{project.description}</p>
                      <button
                        onClick={() => openProjectDetail(project)}
                        className="text-primary hover:text-primary-light transition-colors duration-300 font-medium flex items-center"
                      >
                        {t('projectDetail.viewDetails', 'View Details')}
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 项目详情弹窗 */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onClose={closeProjectDetail}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
