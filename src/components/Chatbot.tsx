import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
// Import Langchain components
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Define chatbot API interface
interface ChatbotAPI {
  sendMessage: (message: string) => Promise<string>;
  setLanguage: (language: string) => void;
}

// LangChain-based API implementation
class LangchainChatbotAPI implements ChatbotAPI {
  private model: ChatOpenAI;
  private chain: ConversationChain;
  private resumeContext: string;
  private language: string;

  constructor(apiKey: string, language = 'en', modelName = 'gpt-4o') {
    this.language = language;
    this.resumeContext = this.getResumeContext();
    
    // Initialize the OpenAI model
    this.model = new ChatOpenAI({ 
      openAIApiKey: apiKey,
      modelName: modelName,
      temperature: 0.7,
    });
    
    // Create a conversation chain with memory
    this.chain = new ConversationChain({
      llm: this.model,
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: ChatPromptTemplate.fromTemplate(
        `${this.resumeContext}
        
        Current conversation history:
        {history}
        
        Human: {input}
        AI: `
      ),
      outputParser: new StringOutputParser(),
      verbose: false,
    });
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resumeContext = this.getResumeContext();
    // Reset chain with new context
    this.chain = new ConversationChain({
      llm: this.model,
      memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
      prompt: ChatPromptTemplate.fromTemplate(
        `${this.resumeContext}
        
        Current conversation history:
        {history}
        
        Human: {input}
        AI: `
      ),
      outputParser: new StringOutputParser(),
      verbose: false,
    });
  }

  private getResumeContext(): string {
    // Return the appropriate resume context based on current language
    if (this.language === 'zh') {
      return `
你是Jinyuan Kang的个人助手，你的任务是帮助访客了解Jinyuan Kang的背景和技能。请根据以下信息回答问题：

个人信息：
- 姓名：Jinyuan Kang
- 住址：新西兰奥克兰，Mt Roskill 1041
- 邮箱：jkan784@aucklanduni.ac.nz

教育背景：
- 2024-02至2025-11：奥克兰大学，人工智能硕士
- 2020-07至2022-11：奥克兰大学，数学与计算机科学学士

工作经历：
2023-09至今：新西兰学术学习中心，数学学校数学与计算机科学导师
- 为学生提供课程辅导，调整教学方法和材料以满足学生的不同需求。
- 与学生保持定期沟通，解答疑问，提升学生表现。
- 记录每节课的目标、活动和结果，跟踪学生进步。

2022-08至2023-07：国信证券研究所，数据分析师
- 深入研究股票/期货上下游产品，识别关键驱动因素并分析趋势。
- 使用线性回归量化市场变量关系并预测未来趋势。
- 使用Python和SQL优化数据处理，显著降低运营成本。
- 使用BI工具揭示市场趋势，支持战略决策。
- 生成总结关键发现的报告，提供清晰、可操作的见解。

项目经验：
1. 课程规划和推荐系统
- 领导设计并交付课程推荐系统，整合课程先修要求和约束规则，提高40%的选课效率，降低25%的错误率。
- 使用Pandas清洗数据，MySQL实现高效存储和查询，基于Django开发可扩展应用，优化系统响应时间至<1秒。
- 协调5人团队完成需求分析、任务分解和敏捷开发，确保按时上线，客户满意度4/5。

2. 餐厅评论情感分析
- 开发多标签分类模型，分析中文餐厅评论（环境/服务/口味），提取客户偏好并生成优化建议。
- 基于Word2Vec和LSTM/Bi-LSTM提升文本分类准确率至81%。
- 通过Dropout和批量归一化降低20%过拟合风险，提升35%训练效率。

3. 任务复杂度和相似性驱动的渐进式提示持续学习
- 开发新型持续学习框架，集成任务复杂度和相似性指标到渐进提示中，将灾难性遗忘降低40%。
- 使用T5-small和BERT-base设计动态任务优先级策略，提升15%准确率，推理速度提高30%。
- 在情感分析和主题分类中验证效果，遗忘率比基线模型低25%。

技能特长：
- 机器学习、Vue、Python（Pandas, NumPy, Matplotlib, Seaborn）、Power BI、JavaScript、SQL、JAVA、PyTorch、Transformers、TensorFlow

回答要简洁、专业，不要过于冗长。如果你不知道答案，请基于以上信息进行合理推测，或表示你需要更多信息来回答这个问题。
`;
    } else {
      return `
You are Jinyuan Kang's personal assistant. Your task is to help visitors learn about Jinyuan Kang's background and skills. Please answer questions based on the following information:

Personal Information:
- Name: Jinyuan Kang
- Address: Auckland, Mt Roskill 1041, New Zealand
- Email: jkan784@aucklanduni.ac.nz

Education:
- 2024-02 to 2025-11: University of Auckland, Master of Artificial Intelligence
- 2020-07 to 2022-11: University of Auckland, Bachelor of Science (Mathematics and Computer Science)

Work Experience:
2023-09 to Present: Math and Computer Science Tutor, NZ Academy Learning Centre
- Delivered courses to students, adapting teaching methods and materials to meet diverse needs.
- Maintained regular communication with students, addressing concerns and improving performance.
- Kept detailed records of lesson goals, activities, and outcomes to track progress.

2022-08 to 2023-07: Data Analyst, Guosen Securities Research Institute
- Conducted in-depth research on stock/futures products, identifying key drivers and analyzing trends.
- Utilized linear regression to quantify market variable relationships and predict trends.
- Automated data processing with Python and SQL, reducing operational costs.
- Used BI tools to uncover market trends and support strategic decisions.
- Generated reports summarizing findings and providing actionable insights.

Project Experience:
1. Course Planning and Recommendation System
- Led design and delivery of a course recommendation system, integrating prerequisites and constraints, improving efficiency by 40% and reducing errors by 25%.
- Used Pandas for data cleaning, MySQL for storage and querying, Django for scalable apps, and optimized response time to <1 second.
- Coordinated a 5-person team for requirements analysis, task division, and agile development, achieving a 4/5 customer satisfaction score.

2. Sentiment Analysis of Restaurant Reviews
- Developed a multi-label classification model to analyze Chinese restaurant reviews (environment/service/taste), extracting preferences and providing recommendations.
- Improved accuracy to 81% using Word2Vec and LSTM/Bi-LSTM architectures.
- Reduced overfitting by 20% and boosted training efficiency by 35% with Dropout and Batch Normalization.

3. Task Complexity and Similarity-driven Continual Learning for Progressive Prompt
- Developed a novel continual learning framework with task complexity/similarity metrics, reducing catastrophic forgetting by 40%.
- Designed a dynamic task prioritization strategy with T5-small and BERT-base, improving accuracy by 15% and inference speed by 30%.
- Validated effectiveness in sentiment analysis and topic classification, achieving 25% lower forgetting rates than baselines.

Skills:
- Machine Learning, Vue, Python (Pandas, NumPy, Matplotlib, Seaborn), Power BI, JavaScript, SQL, JAVA, PyTorch, Transformers, TensorFlow, React

Keep answers concise and professional, not too lengthy. If you don't know the answer, make reasonable inferences based on the information above, or indicate that you need more information to answer the question.
`;
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message using LangChain...');
      
      // Process the message through the chain
      const response = await this.chain.run(message);
      
      console.log('Received response from LangChain');
      return response;
    } catch (error) {
      console.error('Error using LangChain:', error);
      // Return a friendly error message
      return this.language === 'zh'
        ? '抱歉，我暂时无法连接到ChatGPT。正在使用本地数据回答您的问题，可能无法提供完整信息。请稍后再试。'
        : 'Sorry, I cannot connect to ChatGPT at the moment. I am using local data to answer your question, which may be limited. Please try again later.';
    }
  }
}

// Keep the MockChatbotAPI for fallback (unchanged from your original code)
class MockChatbotAPI implements ChatbotAPI {
  private botResponses: Record<string, Record<string, string>>;
  private language: string;

  constructor(language = 'en') {
    this.language = language;
    this.botResponses = {
      en: {
        greeting: "Hello! I'm Jinyuan Kang's AI assistant. How can I help you today?",
        skills: "Jinyuan is skilled in Machine Learning, Python (Pandas, NumPy, Matplotlib, Seaborn), PyTorch, Transformers, TensorFlow, Vue, JavaScript, SQL, JAVA, and Power BI.",
        education: "Jinyuan is currently pursuing a Master of Artificial Intelligence at the University of Auckland (2024-2025) and holds a Bachelor of Science in Maths and Computer Science from the same university (2020-2022).",
        experience: "Jinyuan has worked as a Math and Computer Science Tutor at NZ Academy Learning Centre since September 2023, and previously as a Data Analyst at Guosen Securities Research Institute from August 2022 to July 2023.",
        contact: "You can contact Jinyuan via email at jkan784@aucklanduni.ac.nz",
        projects: "Jinyuan has worked on several projects including a Course Planning and Recommendation System, Sentiment Analysis of Restaurant Reviews, and a Task Complexity and Similarity-driven Continual Learning for Progressive Prompt system.",
        objective: "Jinyuan is passionate about advancing their career in the data industry and is eager to contribute at every stage of the development process in collaborative environments.",
        fallback: "I'm sorry, I don't understand your question. You can ask about Jinyuan Kang's skills, education, work experience, projects, contact information, or career objectives."
      },
      zh: {
        greeting: "您好！我是康津源的AI助手，很高兴为您服务。有什么我能帮助您的吗？",
        skills: "康津源精通机器学习、Python (Pandas, NumPy, Matplotlib, Seaborn)、PyTorch、Transformers、TensorFlow、Vue、JavaScript、SQL、JAVA以及Power BI等技术。",
        education: "康津源目前正在奥克兰大学攻读人工智能硕士学位（2024-2025），并已在同一所大学获得数学与计算机科学理学学士学位（2020-2022）。",
        experience: "康津源自2023年9月起担任NZ Academy Learning Centre的数学和计算机科学导师，之前曾在国信证券研究所担任数据分析师（2022年8月至2023年7月）。",
        contact: "您可以通过电子邮件jkan784@aucklanduni.ac.nz联系康津源。",
        projects: "康津源参与过多个项目，包括课程规划和推荐系统、餐厅评论情感分析以及基于任务复杂性和相似性的渐进式提示持续学习系统。",
        objective: "康津源热衷于在数据行业发展自己的职业生涯，渴望在协作环境中为开发过程的各个阶段做出贡献。",
        fallback: "抱歉，我无法理解您的问题。您可以询问关于康津源的技能、教育背景、工作经验、项目、联系方式或职业目标的信息。"
      }
    };
  }

  setLanguage(language: string): void {
    if (language === 'en' || language === 'zh') {
      this.language = language;
    } else {
      console.error('Unsupported language. Using default language (English).');
      this.language = 'en';
    }
  }

  async sendMessage(query: string): Promise<string> {
    query = query.toLowerCase();
    
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || 
        query.includes('你好') || query.includes('您好')) {
      return this.botResponses[this.language].greeting;
    } else if (query.includes('skill') || query.includes('技能') || 
               query.includes('能力') || query.includes('会什么')) {
      return this.botResponses[this.language].skills;
    } else if (query.includes('education') || query.includes('degree') || 
               query.includes('study') || query.includes('university') || 
               query.includes('教育') || query.includes('学历') || 
               query.includes('大学') || query.includes('学位')) {
      return this.botResponses[this.language].education;
    } else if (query.includes('experience') || query.includes('work') || 
               query.includes('job') || query.includes('career') || 
               query.includes('经验') || query.includes('工作') || 
               query.includes('职业')) {
      return this.botResponses[this.language].experience;
    } else if (query.includes('contact') || query.includes('email') || 
               query.includes('phone') || query.includes('联系') || 
               query.includes('邮箱') || query.includes('电话')) {
      return this.botResponses[this.language].contact;
    } else if (query.includes('project') || query.includes('portfolio') || 
               query.includes('项目') || query.includes('作品')) {
      return this.botResponses[this.language].projects;
    } else if (query.includes('objective') || query.includes('goal') || 
               query.includes('aim') || query.includes('目标') || 
               query.includes('目的') || query.includes('职业目标')) {
      return this.botResponses[this.language].objective;
    } else {
      return this.botResponses[this.language].fallback;
    }
  }
}

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get OpenAI API Key from Vite environment variables
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
  console.log("🧪 OPENAI_API_KEY:", OPENAI_API_KEY);
  // Track if connected to GPT
  const [isConnectedToGPT, setIsConnectedToGPT] = useState<boolean>(false);

  // Create chatbot API instance
  const [chatAPI, setChatAPI] = useState<ChatbotAPI>(() => {
    // Use LangChain API if API Key is available, otherwise use Mock API
    if (OPENAI_API_KEY && OPENAI_API_KEY.length > 0) {
      try {
        const api = new LangchainChatbotAPI(OPENAI_API_KEY, i18n.language);
        setIsConnectedToGPT(true);
        return api;
      } catch (error) {
        console.error('Failed to initialize LangChain API:', error);
        setIsConnectedToGPT(false);
        return new MockChatbotAPI(i18n.language);
      }
    } else {
      console.warn('Using MockChatbotAPI as OpenAI API key is not provided');
      setIsConnectedToGPT(false);
      return new MockChatbotAPI(i18n.language);
    }
  });

  // Update language
  useEffect(() => {
    chatAPI.setLanguage(i18n.language);
  }, [i18n.language, chatAPI]);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Display welcome message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);

      // Simulate AI thinking time
      const timer = setTimeout(async () => {
        try {
          // Add connection status note
          let connectionMessage = '';
          if (!isConnectedToGPT) {
            connectionMessage = i18n.language === 'zh'
                ? '（注意：当前未连接到ChatGPT，使用的是本地数据）'
                : '(Note: Currently not connected to ChatGPT, using local data)';
          }

          const greeting = await chatAPI.sendMessage(
              i18n.language === 'zh' ? '你好，介绍一下自己' : 'Hello, introduce yourself'
          );

          // Add connection status info if needed
          const finalGreeting = connectionMessage ? `${greeting}\n\n${connectionMessage}` : greeting;

          setMessages([{
            text: finalGreeting,
            isBot: true,
            timestamp: new Date()
          }]);
        } catch (error) {
          console.error('Error in welcome message:', error);
          // If error, show basic welcome message
          const fallbackGreeting = i18n.language === 'zh'
              ? '您好！我是康津源的AI助手。（注意：当前未连接到ChatGPT，使用的是本地数据）'
              : 'Hello! I am Kang Jinyuan\'s AI assistant. (Note: Currently not connected to ChatGPT, using local data)';

          setMessages([{
            text: fallbackGreeting,
            isBot: true,
            timestamp: new Date()
          }]);
        } finally {
          setIsTyping(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, chatAPI, i18n.language, isConnectedToGPT]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Add delay to simulate AI thinking
      const typingDelay = Math.max(500, Math.min(input.length * 20, 2000));

      // Send message to API and get response
      const responsePromise = chatAPI.sendMessage(input);

      // Show typing state for at least a certain time
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      const response = await responsePromise;

      // If response contains API error message, mark as not connected to GPT
      if (response.includes('无法连接到ChatGPT') || response.includes('cannot connect to ChatGPT')) {
        setIsConnectedToGPT(false);
      }

      // Add bot reply
      setMessages(prev => [...prev, {
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setIsConnectedToGPT(false);

      // Build clearer error message
      const errorMessage = i18n.language === 'zh'
          ? '抱歉，处理您的请求时出现错误。我当前未连接到ChatGPT，正在使用有限的本地数据回答问题。'
          : 'Sorry, I encountered an error while processing your request. I am currently not connected to ChatGPT and using limited local data to answer questions.';

      // Add error message
      setMessages(prev => [...prev, {
        text: errorMessage,
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Typing animation styles
  const typingAnimationStyles = `
    .typing-animation {
      display: flex;
      align-items: center;
    }

    .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      margin: 0 2px;
      opacity: 0.6;
      animation: bounce 1.5s infinite;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-6px);
      }
    }
  `;

  // Add global styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = typingAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed right-4 bottom-4 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-4 shadow-lg transition-colors duration-300"
        aria-label={isOpen ? t('chatbot.close', 'Close chatbot') : t('chatbot.open', 'Open chatbot')}
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 bottom-20 z-40 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-primary text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FaRobot className="mr-2" />
                <h3 className="font-medium">{t('contact.chatbot')}</h3>
                {!isConnectedToGPT && (
                  <div className="ml-2 flex items-center text-yellow-300 text-xs">
                    <FaExclamationTriangle className="mr-1" />
                    <span>{i18n.language === 'zh' ? '本地模式' : 'Local Mode'}</span>
                  </div>
                )}
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label={t('chatbot.close', 'Close chatbot')}
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-lg p-3
                      ${message.isBot
                        ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                        : 'bg-primary text-white'
                      }
                    `}
                  >
                    <div className="flex items-center mb-1">
                      {message.isBot ? (
                        <FaRobot className="mr-2 text-xs" />
                      ) : (
                        <FaUser className="mr-2 text-xs" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white max-w-[80%] rounded-lg p-3">
                    <div className="flex items-center">
                      <FaRobot className="mr-2 text-xs" />
                      <div className="typing-animation">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('contact.chatbot.placeholder')}
                />
                <button
                  onClick={handleSend}
                  className="bg-primary hover:bg-primary-light text-white rounded-r-md px-4 transition-colors duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;