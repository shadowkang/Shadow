import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入翻译文件
import translationEN from './locales/en/translation.json';
import translationZH from './locales/zh/translation.json';

// 配置i18next
i18n
  .use(initReactI18next) // 将i18n实例传递给react-i18next
  .use(LanguageDetector) // 增加语言检测器
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      zh: {
        translation: translationZH
      }
    },
    fallbackLng: 'en', // 回退语言
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false // 不转义插值内容
    }
  });

export default i18n;
