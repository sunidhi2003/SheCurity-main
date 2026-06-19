import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, Sparkles, Shield } from "lucide-react";
import "./Chatbot.css";

const ChatbotDynamic = () => {
    const [messages, setMessages] = useState([
        { 
            text: "👋 Hi! I'm SheCurity AI Assistant powered by Shecurity AI. I'm here to help you with safety advice, legal guidance, and emergency support. How can I assist you today?", 
            sender: "bot" 
        }
    ]);
    const [userInput, setUserInput] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isRequestPending, setIsRequestPending] = useState(false);
    const chatBoxRef = useRef(null);

    // Gemini API Key
    // const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || "AIzaSyBKh-qm41jOvm2Y4wpdawif7ELg40MAC4w";
    const TRANSLATE_API_URL = "https://libretranslate.com/translate";

   
    // Check AI availability
    useEffect(() => {
        console.log("🤖 SheCurity AI Chatbot initialized");
console.log("✅ Using OpenRouter AI responses");
    }, []);

    // Function to translate text
    const translateText = async (text, sourceLang, targetLang) => {
        if (sourceLang === targetLang) return text;

        try {
            const response = await fetch(TRANSLATE_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: text,
                    source: sourceLang,
                    target: targetLang,
                    format: "text",
                }),
            });

            const data = await response.json();
            return data.translatedText || text;
        } catch (error) {
            console.error("Translation Error:", error);
            return text;
        }
    };

    // Enhanced system prompt for safety-focused responses
    const getSafetyPrompt = (userQuery) => {
        return `You are SheCurity AI, a compassionate women's safety assistant. 

Context: You help with safety advice, legal rights, emergency guidance, and emotional support for women.

User Query: ${userQuery}

Instructions:
- Provide helpful, empathetic, and actionable responses
- If it's an emergency, prioritize immediate safety steps
- Keep responses concise (3-4 sentences) but informative
- Use a supportive and caring tone
- Include specific helpline numbers when relevant (India: 112 for emergency, 1091 for women helpline)

Response:`;
    };

    // Intelligent fallback for when AI fails
    const getIntelligentFallback = (query) => {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.match(/emergency|danger|help|attack|threat/)) {
            return "🚨 EMERGENCY\n\nCall immediately:\n• 112 (Emergency)\n• 1091 (Women Helpline)\n\nShare your location with trusted contacts using our SOS feature. Move to a safe, public area if possible.";
        }
        
        if (lowerQuery.match(/legal|law|rights|police|fir/)) {
            return "⚖️ YOUR LEGAL RIGHTS\n\n• Right to FIR: Police cannot refuse\n• IPC 354: Protection against assault\n• IPC 509: Protection against insult to modesty\n• Domestic Violence Act: Protection at home\n• Free legal aid available\n\nUse our Digital Complaint Form!";
        }
        
        if (lowerQuery.match(/safety|safe|tips|travel/)) {
            return "🛡️ SAFETY TIPS\n\n• Share live location with trusted contacts\n• Stay in well-lit, populated areas\n• Keep phone charged\n• Trust your instincts\n• Use our Fake Call feature if needed";
        }
        
        return "I'm here to help with safety advice, legal guidance, and emergency support. Ask me about emergencies, legal rights, safety tips, or reporting incidents.";
    };

    // Function to send a message with Gemini AI
    const sendMessage = async () => {
        if (isRequestPending || !userInput.trim()) return;
        setIsRequestPending(true);

        const userMessage = userInput.trim();
        setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }]);
        setUserInput("");

        // Add typing indicator
        setMessages((prevMessages) => [...prevMessages, { text: "typing", sender: "bot" }]);

        try {
            // Translate user input to English
            const translatedInput = await translateText(userMessage, selectedLanguage, "en");
            const enhancedPrompt = getSafetyPrompt(translatedInput);

            // Call Gemini AI
          const response = await fetch(
    "http://localhost:4000/api/chat",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: enhancedPrompt,
        }),
    }
);

const data = await response.json();

let botResponse = data.reply;

if (selectedLanguage !== "en") {
    botResponse = await translateText(
        botResponse,
        "en",
        selectedLanguage
    );
}

setMessages((prevMessages) => {

    const filtered =
        prevMessages.filter(
            msg => msg.text !== "typing"
        );

    return [
        ...filtered,
        {
            text: botResponse,
            sender: "bot"
        }
    ];
});

        } catch (error) {
            console.error("AI Error:", error);
            
            // Use intelligent fallback
            const fallbackResponse = getIntelligentFallback(userMessage);
            const translatedFallback = selectedLanguage !== "en" 
                ? await translateText(fallbackResponse, "en", selectedLanguage)
                : fallbackResponse;
            
            setMessages((prevMessages) => {
                const filtered = prevMessages.filter(msg => msg.text !== "typing");
                return [...filtered, { 
                    text: translatedFallback + "\n\n💡 Note: 💡 AI service temporarily unavailable. Please try again in a moment.", 
                    sender: "bot" 
                }];
            });
        }

        setIsRequestPending(false);
    };

    // Handle Enter key press
    const handleKeyPress = (event) => {
        if (event.key === "Enter") sendMessage();
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Quick action buttons
    const quickActions = [
        { icon: "🚨", text: "Emergency Help", query: "What should I do in an emergency situation?" },
        { icon: "⚖️", text: "Legal Rights", query: "Tell me about women's legal rights and protections" },
        { icon: "🛡️", text: "Safety Tips", query: "Give me safety tips for traveling alone" },
        { icon: "📞", text: "Report Incident", query: "How do I report harassment or assault?" }
    ];

    const handleQuickAction = (query) => {
        setUserInput(query);
    };

    return (
        <div className="chat-container-modern">
            {/* Language Selector */}
            <div className="language-selector-modern">
                <Globe size={16} />
                <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="language-dropdown"
                >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="ar">العربية</option>
                    <option value="zh">中文</option>
                </select>
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
                <div className="quick-actions">
                    {quickActions.map((action, idx) => (
                        <motion.button
                            key={idx}
                            className="quick-action-btn"
                            onClick={() => handleQuickAction(action.query)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="quick-action-icon">{action.icon}</span>
                            <span className="quick-action-text">{action.text}</span>
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Chat Box */}
            <div className="chat-box-modern" ref={chatBoxRef}>
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`message-modern ${msg.sender}`}
                        >
                            {msg.sender === "bot" && (
                                <div className="message-avatar">
                                    {msg.text === "typing" ? <Sparkles size={16} /> : <Shield size={16} />}
                                </div>
                            )}
                            <div className="message-content">
                                {msg.text === "typing" ? (
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : (
                                    <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Field */}
            <div className="chat-input-modern">
                <input
                    type="text"
                    value={userInput}
                    placeholder="Ask me anything about safety..."
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isRequestPending}
                    className="chat-input-field"
                />
                <motion.button 
                    onClick={sendMessage} 
                    disabled={isRequestPending || !userInput.trim()}
                    className="chat-send-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Send size={18} />
                </motion.button>
            </div>
        </div>
    );
};

export default ChatbotDynamic;
