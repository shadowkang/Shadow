import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import AnimatedButton from './AnimatedButton';

// 项目详情接口
export interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  features?: string[];
  technologies?: string[];
  image: string;
  demoLink?: string;
  githubLink?: string;
  date?: string;
  screenshots?: string[];
}

interface ProjectDetailProps {
  project: ProjectDetails;
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 使用useMemo缓存screenshots值，避免不必要的重新渲染
  const screenshots = useMemo(() =>
    project.screenshots || [project.image],
    [project.screenshots, project.image]
  );

  // 预加载图片
  useEffect(() => {
    if (screenshots && screenshots.length > 0) {
      screenshots.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [screenshots]);

  // 每5秒自动切换图片
  useEffect(() => {
    if (screenshots.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [screenshots.length]);

  // 手动切换图片
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="bg-primary text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 hover:text-gray-200 transition-colors"
              aria-label="Back"
            >
              <FaArrowLeft size={18} />
            </button>
            <h2 className="text-xl font-bold">{project.title}</h2>
          </div>
          <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {project.category}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          {/* 图片轮播 */}
          <div className="relative mb-6 rounded-lg overflow-hidden aspect-video bg-gray-100 dark:bg-gray-700">
            <motion.img
              key={currentImageIndex}
              src={screenshots[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* 图片指示器 */}
            {screenshots.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-primary'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    aria-label={`View screenshot ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 项目信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('projectDetail.description', 'Description')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {project.longDescription || project.description}
              </p>

              {/* 项目特点 */}
              {project.features && project.features.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {t('projectDetail.features', 'Features')}
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                    {project.features.map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div>
              {/* 技术栈 */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('projectDetail.technologies', 'Technologies')}
              </h3>
              {project.technologies && project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 mb-6">-</p>
              )}

              {/* 项目日期 */}
              {project.date && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t('projectDetail.date', 'Date')}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">{project.date}</p>
                </>
              )}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-wrap gap-4">
            {project.demoLink && (
              <AnimatedButton
                onClick={() => window.open(project.demoLink, '_blank')}
                variant="primary"
                className="flex items-center gap-2"
              >
                <FaExternalLinkAlt size={16} />
                {t('projects.demo', 'Live Demo')}
              </AnimatedButton>
            )}

            {project.githubLink && (
              <AnimatedButton
                onClick={() => window.open(project.githubLink, '_blank')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FaGithub size={16} />
                {t('projectDetail.viewCode', 'View Code')}
              </AnimatedButton>
            )}

            <AnimatedButton
              onClick={onClose}
              variant="ghost"
            >
              {t('projectDetail.close', 'Close')}
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
