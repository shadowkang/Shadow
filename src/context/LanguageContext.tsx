// import React, { createContext, useState, useContext, ReactNode } from 'react';
//
// // 定义语言类型
// export type Language = 'zh' | 'en';
//
// // 定义上下文类型
// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }
//
// // 创建上下文
// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
//
// // 翻译文本
// const translations: Record<string, Record<Language, string>> = {
//   // 导航菜单
//   'nav.home': {
//     zh: '首页',
//     en: 'Home',
//   },
//   'nav.about': {
//     zh: '关于',
//     en: 'About',
//   },
//   'nav.experience': {
//     zh: '经验',
//     en: 'Experience',
//   },
//   'nav.projects': {
//     zh: '项目',
//     en: 'Projects',
//   },
//   'nav.skills': {
//     zh: '技能',
//     en: 'Skills',
//   },
//   'nav.education': {
//     zh: '教育',
//     en: 'Education',
//   },
//   'nav.contact': {
//     zh: '联系',
//     en: 'Contact',
//   },
//
//   // Hero部分
//   'hero.greeting': {
//     zh: '您好，我是',
//     en: 'Hi, I\'m',
//   },
//   'hero.title': {
//     zh: '前端开发工程师 | React 专家',
//     en: 'Frontend Developer | React Expert',
//   },
//   'hero.description': {
//     zh: '我是一名全栈开发者，拥有扎实的React前端开发技能和丰富的项目经验。毕业于奥克兰大学，曾担任软件开发实习生，有能力构建现代化、高效的Web应用。',
//     en: 'I am a full-stack developer with solid React frontend development skills and rich project experience. Graduated from the University of Auckland, I worked as a software development intern and have the ability to build modern and efficient web applications.',
//   },
//   'hero.cta': {
//     zh: '联系我',
//     en: 'Contact Me',
//   },
//
//   // 关于部分
//   'about.title': {
//     zh: '关于我',
//     en: 'About Me',
//   },
//   'about.subtitle': {
//     zh: '前端开发工程师',
//     en: 'Frontend Developer',
//   },
//   'about.p1': {
//     zh: '我是郭圣元，一名前端开发工程师，目前在奥克兰大学攻读信息技术硕士学位。我拥有扎实的计算机科学教育背景和实际的软件开发经验。',
//     en: 'I am Guo Shengyuan, a frontend developer currently pursuing a Master\'s degree in Information Technology at the University of Auckland. I have a solid educational background in computer science and practical software development experience.',
//   },
//   'about.p2': {
//     zh: '在我的职业生涯中，我专注于React生态系统，开发了各种响应式Web应用程序。我熟悉现代前端开发工具和技术，包括React、Redux、Tailwind CSS等。我还具备全栈开发能力，了解Node.js和Express等后端技术。',
//     en: 'In my career, I have focused on the React ecosystem, developing various responsive web applications. I am familiar with modern frontend development tools and technologies, including React, Redux, Tailwind CSS, etc. I also have full-stack development capabilities, understanding backend technologies such as Node.js and Express.',
//   },
//   'about.p3': {
//     zh: '我对技术充满热情，特别是前端开发和人工智能领域。目前我正在寻找能够发挥我技术专长的前端开发职位，同时希望不断学习和成长。',
//     en: 'I am passionate about technology, especially in the fields of frontend development and artificial intelligence. Currently, I am looking for a frontend development position that can utilize my technical expertise, while constantly learning and growing.',
//   },
//   'about.techstack': {
//     zh: '技术栈',
//     en: 'Tech Stack',
//   },
//   'about.techstack.desc': {
//     zh: '精通React、JavaScript/TypeScript和多种前端框架',
//     en: 'Proficient in React, JavaScript/TypeScript and various frontend frameworks',
//   },
//   'about.education': {
//     zh: '教育',
//     en: 'Education',
//   },
//   'about.education.desc': {
//     zh: '奥克兰大学信息技术硕士学位，计算机科学本科学位',
//     en: 'Master of Information Technology & Bachelor of Computer Science from University of Auckland',
//   },
//   'about.projects': {
//     zh: '项目',
//     en: 'Projects',
//   },
//   'about.projects.desc': {
//     zh: '参与开发多个基于React的Web应用，包括Musichat流媒体播放网站',
//     en: 'Developed multiple React-based web applications, including Musichat streaming website',
//   },
//
//   // 经验部分
//   'experience.title': {
//     zh: '工作经历',
//     en: 'Work Experience',
//   },
//   'experience.position1': {
//     zh: '软件开发实习生',
//     en: 'Software Development Intern',
//   },
//   'experience.company1': {
//     zh: 'FRW Healthcare Limited',
//     en: 'FRW Healthcare Limited',
//   },
//   'experience.location1': {
//     zh: '奥克兰',
//     en: 'Auckland',
//   },
//   'experience.period1': {
//     zh: '2024年7月 - 2024年11月',
//     en: 'Jul 2024 - Nov 2024',
//   },
//   'experience.position2': {
//     zh: 'Musichat流媒体播放网页',
//     en: 'Musichat Streaming Website',
//   },
//   'experience.company2': {
//     zh: '奥克兰大学',
//     en: 'University of Auckland',
//   },
//   'experience.location2': {
//     zh: '全栈开发',
//     en: 'Full Stack Development',
//   },
//   'experience.period2': {
//     zh: '2024年2月 - 2024年6月',
//     en: 'Feb 2024 - Jun 2024',
//   },
//
//   // 项目部分
//   'projects.title': {
//     zh: '我的项目',
//     en: 'My Projects',
//   },
//   'projects.all': {
//     zh: '全部',
//     en: 'All',
//   },
//   'projects.react': {
//     zh: 'React',
//     en: 'React',
//   },
//   'projects.frontend': {
//     zh: '前端',
//     en: 'Frontend',
//   },
//   'projects.fullstack': {
//     zh: '全栈',
//     en: 'Full Stack',
//   },
//   'projects.code': {
//     zh: '代码',
//     en: 'Code',
//   },
//   'projects.demo': {
//     zh: '演示',
//     en: 'Demo',
//   },
//
//   // 技能部分
//   'skills.title': {
//     zh: '我的技能',
//     en: 'My Skills',
//   },
//   'skills.frontend': {
//     zh: '前端技能',
//     en: 'Frontend Skills',
//   },
//   'skills.frameworks': {
//     zh: '框架与库',
//     en: 'Frameworks & Libraries',
//   },
//   'skills.tools': {
//     zh: '工具与其他',
//     en: 'Tools & Others',
//   },
//
//   // 教育部分
//   'education.title': {
//     zh: '教育与认证',
//     en: 'Education & Certifications',
//   },
//   'education.education': {
//     zh: '教育',
//     en: 'Education',
//   },
//   'education.master': {
//     zh: '信息技术硕士',
//     en: 'Master of Information Technology',
//   },
//   'education.bachelor': {
//     zh: '计算机科学本科',
//     en: 'Bachelor of Computer Science',
//   },
//   'education.university': {
//     zh: '奥克兰大学 (QS 68)',
//     en: 'University of Auckland (QS 68)',
//   },
//   'education.period1': {
//     zh: '2023年2月 - 至今',
//     en: 'Feb 2023 - Present',
//   },
//   'education.desc1': {
//     zh: '目前在奥克兰大学攻读信息技术硕士学位，专注于高级软件开发和web应用程序开发技术。',
//     en: 'Currently pursuing a Master\'s degree in Information Technology at the University of Auckland, focusing on advanced software development and web application development technologies.',
//   },
//   'education.period2': {
//     zh: '2020年7月 - 2022年11月',
//     en: 'Jul 2020 - Nov 2022',
//   },
//   'education.desc2': {
//     zh: '在奥克兰大学完成了计算机科学本科学位，学习了计算机科学的基础理论和实践技能。',
//     en: 'Completed a Bachelor\'s degree in Computer Science at the University of Auckland, studying the basic theories and practical skills of computer science.',
//   },
//   'education.courses': {
//     zh: '相关课程：',
//     en: 'Related Courses:',
//   },
//   'education.certifications': {
//     zh: '认证',
//     en: 'Certifications',
//   },
//   'education.achievements': {
//     zh: '成就',
//     en: 'Achievements',
//   },
//
//   // 联系部分
//   'contact.title': {
//     zh: '联系我',
//     en: 'Contact Me',
//   },
//   'contact.subtitle': {
//     zh: '有问题或想一起合作？随时联系我！',
//     en: 'Have a question or want to work together? Feel free to get in touch!',
//   },
//   'contact.info': {
//     zh: '联系信息',
//     en: 'Contact Information',
//   },
//   'contact.email': {
//     zh: '邮箱',
//     en: 'Email',
//   },
//   'contact.phone': {
//     zh: '电话',
//     en: 'Phone',
//   },
//   'contact.location': {
//     zh: '地点',
//     en: 'Location',
//   },
//   'contact.location.value': {
//     zh: '奥克兰，新西兰',
//     en: 'Auckland, New Zealand',
//   },
//   'contact.social': {
//     zh: '社交媒体',
//     en: 'Social Media',
//   },
//   'contact.wechat': {
//     zh: '微信',
//     en: 'WeChat',
//   },
//   'contact.message': {
//     zh: '给我发消息',
//     en: 'Send Me a Message',
//   },
//   'contact.form.name': {
//     zh: '姓名',
//     en: 'Name',
//   },
//   'contact.form.name.placeholder': {
//     zh: '您的姓名',
//     en: 'Your name',
//   },
//   'contact.form.email': {
//     zh: '邮箱',
//     en: 'Email',
//   },
//   'contact.form.email.placeholder': {
//     zh: '您的邮箱',
//     en: 'Your email',
//   },
//   'contact.form.message': {
//     zh: '消息',
//     en: 'Message',
//   },
//   'contact.form.message.placeholder': {
//     zh: '您的消息',
//     en: 'Your message',
//   },
//   'contact.form.send': {
//     zh: '发送消息',
//     en: 'Send Message',
//   },
//   'contact.form.sending': {
//     zh: '发送中...',
//     en: 'Sending...',
//   },
//   'contact.form.success': {
//     zh: '感谢您的消息！我会尽快回复您。',
//     en: 'Thank you for your message! I will get back to you as soon as possible.',
//   },
//   'contact.form.error': {
//     zh: '请填写所有字段',
//     en: 'Please fill in all fields',
//   },
//   'contact.chatbot': {
//     zh: 'AI助手',
//     en: 'AI Assistant',
//   },
//   'contact.chatbot.placeholder': {
//     zh: '有什么可以帮您的？',
//     en: 'How can I help you?',
//   },
//   'contact.chatbot.send': {
//     zh: '发送',
//     en: 'Send',
//   },
//
//   // 页脚部分
//   'footer.rights': {
//     zh: '保留所有权利',
//     en: 'All rights reserved',
//   },
//   'footer.made': {
//     zh: '用',
//     en: 'Made with',
//   },
//   'footer.and': {
//     zh: '和',
//     en: 'and',
//   },
//   'footer.react': {
//     zh: 'React',
//     en: 'React',
//   },
//
//   // 语言切换
//   'language.toggle': {
//     zh: 'English',
//     en: '中文',
//   },
// };
//
// // 提供者组件
// interface LanguageProviderProps {
//   children: ReactNode;
// }
//
// export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
//   const [language, setLanguage] = useState<Language>('zh');
//
//   // 翻译函数
//   const t = (key: string): string => {
//     return translations[key]?.[language] || key;
//   };
//
//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };
//
// // 使用上下文的自定义钩子
// export const useLanguage = (): LanguageContextType => {
//   const context = useContext(LanguageContext);
//   if (context === undefined) {
//     throw new Error('useLanguage must be used within a LanguageProvider');
//   }
//   return context;
// };
