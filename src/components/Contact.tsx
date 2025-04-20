import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaWeixin
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showWechat, setShowWechat] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // 验证表单
    if (!formData.name || !formData.email || !formData.message) {
      setError(t('contact.form.error'));
      setIsSubmitting(false);
      return;
    }

    if (formRef.current) {
      // 从环境变量获取EmailJS配置
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // 验证是否获取到了所有必要的环境变量
      if (!serviceId || !templateId || !publicKey) {
        console.error('Missing EmailJS configuration in environment variables');
        setError(t('contact.form.config_error') || 'Email configuration error');
        setIsSubmitting(false);
        return;
      }

      emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
          .then(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({
              name: '',
              email: '',
              message: ''
            });

            // 5秒后重置成功消息
            setTimeout(() => {
              setIsSubmitted(false);
            }, 5000);
          }, (error) => {
            console.error('EmailJS error:', error);
            setError('Email error: ' + error.text);
            setIsSubmitting(false);
          });
    }
  };

  const toggleWechat = () => {
    setShowWechat(!showWechat);
  };

  return (
      <section id="contact" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('contact.title')}</h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
            <p className="text-text-light mt-6 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-text">{t('contact.info')}</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <FaEnvelope/>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-text">{t('contact.email')}</h4>
                    <a
                        href="mailto:shadowkang0722@gmail.com"
                        className="text-text-light hover:text-primary transition-colors duration-300"
                    >
                      shadowkang0722@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <FaPhone/>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-text">NZ  {t('contact.phone')}</h4>
                    <p className="text-text-light">+64 02904302214</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <FaPhone/>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-text">CN  {t('contact.phone')}</h4>
                    <p className="text-text-light">+86 17625523470</p>
                  </div>
                </div>


                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <FaMapMarkerAlt/>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1 text-text">{t('contact.location')}</h4>
                    <p className="text-text-light">{t('contact.location.value')}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-text">{t('contact.social')}</h4>
                  <div className="flex space-x-4">
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
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{opacity: 0, x: 30}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.5, delay: 0.3}}
                viewport={{once: true}}
            >
              <h3 className="text-2xl font-bold mb-8 text-text">{t('contact.message')}</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-text font-medium mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background-dark border border-background-dark px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                      placeholder={t('contact.form.name.placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-text font-medium mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background-dark border border-background-dark px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text"
                      placeholder={t('contact.form.email.placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-text font-medium mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-background-dark border border-background-dark px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-text resize-none"
                      placeholder={t('contact.form.message.placeholder')}
                  ></textarea>
                </div>

                {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                )}

                {isSubmitted && (
                    <div className="text-primary text-sm">
                      {t('contact.form.success')}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center shadow-md ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.form.sending')}
                      </>
                  ) : (
                      t('contact.form.send')
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

export default Contact;