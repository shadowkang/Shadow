import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// 使用懒加载导入大型组件
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

import LanguageToggle from './components/LanguageToggle';
import Chatbot from './components/Chatbot';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import PageTransition from './components/PageTransition';
import Loader from './components/Loader';
import BackgroundAnimation from './components/BackgroundAnimation';
function App() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // 初始化主题
  useEffect(() => {
    // 检查localStorage
    const savedTheme = localStorage.getItem('theme');
    // 检查系统偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 设置初始主题
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }

    // 模拟加载延迟
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // 切换主题
  const toggleTheme = () => {
    setIsDark(!isDark);

    if (isDark) {
      // 切换到浅色模式
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // 切换到深色模式
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (isLoading) {
    return <Loader size="lg" text={t('loading', '加载中...')} fullScreen />;
  }

  // 为懒加载组件添加加载回退
  const LoadingFallback = () => (
    <div className="flex justify-center items-center p-8">
      <Loader size="md" />
    </div>
  );

  return (

    <PageTransition>
      <div className="bg-background dark:bg-gray900 dark:text-white min-h-screen transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Education />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>

        {/* 添加语言切换按钮 */}
        <LanguageToggle />

        {/* 添加主题切换按钮 */}
        <button
          onClick={toggleTheme}
          className="fixed left-4 bottom-4 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-3 shadow-md transition-colors duration-300"
          aria-label={isDark ? t('theme.light', 'Switch to light mode') : t('theme.dark', 'Switch to dark mode')}
        >
          {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>

        {/* 添加AI聊天机器人 */}
        <Chatbot />
      </div>
      <BackgroundAnimation isDark={isDark} />
    </PageTransition>
  );
}

export default App;

