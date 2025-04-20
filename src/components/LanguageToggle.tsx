import { useTranslation } from 'react-i18next';
import { IoLanguage } from 'react-icons/io5';

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'zh';
    const newLang = currentLang.startsWith('zh') ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  const isChineseLang = () => {
    const lang = i18n.language || 'zh';
    return lang.startsWith('zh');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed right-4 bottom-20 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-3 shadow-md transition-colors duration-300 flex items-center"
      aria-label={`Switch to ${isChineseLang() ? 'English' : 'Chinese'}`}
    >
      <IoLanguage size={20} className="mr-2" />
      <span>{t('language.toggle', { lng: isChineseLang() ? 'English' : '中文' })}</span>
    </button>
  );
};

export default LanguageToggle;
