import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Globe, Sparkles, Shield } from "lucide-react";
import "./Chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { 
            text: "👋 Hi! I'm SheCurity AI Assistant. I'm here to help you with safety advice, legal guidance, and emergency support. How can I assist you today?", 
            sender: "bot" 
        }
    ]);
    const [userInput, setUserInput] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [isRequestPending, setIsRequestPending] = useState(false);
    const chatBoxRef = useRef(null);

    // Using intelligent pattern matching for responses
    const TRANSLATE_API_URL = "https://libretranslate.com/translate";

    // Check if using intelligent responses
    useEffect(() => {
        console.log("🤖 Using intelligent pattern-based responses");
    }, []);

    // Function to translate text
    const translateText = async (text, sourceLang, targetLang) => {
        if (sourceLang === targetLang) return text; // No translation needed

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
            return data.translatedText || text; // Return translated text or fallback
        } catch (error) {
            console.error("Translation Error:", error);
            return text; // Return original text if translation fails
        }
    };

    // Enhanced system prompt for safety-focused responses
    const getSafetyPrompt = (userQuery) => {
        return `You are SheCurity AI, a women's safety assistant. Context: You help with safety advice, legal rights, emergency guidance, and emotional support. 

User Query: ${userQuery}

Provide a helpful, empathetic, and actionable response. If it's an emergency, prioritize immediate safety steps. Keep responses concise (2-3 sentences) but informative.`;
    };

    // Enhanced fallback with more intelligent responses
    const getIntelligentResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        
        // Emergency keywords
        if (lowerQuery.match(/emergency|danger|help me|attack|threat|scared|unsafe|afraid/)) {
            return "🚨 EMERGENCY RESPONSE\n\n1. Call immediately:\n   • 112 (Emergency)\n   • 1091 (Women Helpline)\n\n2. Share location: Use our SOS feature to alert trusted contacts\n\n3. Stay visible: Move to a crowded, well-lit area\n\n4. Document: Record evidence if safe to do so\n\nYour safety is the priority. Don't hesitate to call for help!";
        }
        
        // Legal rights
        if (lowerQuery.match(/legal|law|rights|police|fir|complaint|report/)) {
            return "⚖️ YOUR LEGAL RIGHTS\n\n• Right to FIR: Police cannot refuse to file your complaint\n• IPC 354: Protection against assault and molestation\n• IPC 509: Protection against insult to modesty\n• Domestic Violence Act: Protection at home\n• Free legal aid: Available for all women\n\nUse our Digital Complaint Form to file reports easily!";
        }
        
        // Safety tips
        if (lowerQuery.match(/safety|safe|tips|travel|night|alone|precaution/)) {
            return "🛡️ SAFETY TIPS\n\n• Share live location with trusted contacts\n• Stay in well-lit, populated areas\n• Keep phone charged and emergency numbers saved\n• Trust your instincts - if something feels wrong, leave\n• Use our Fake Call feature if needed\n• Avoid sharing personal details with strangers\n\nCheck our Self Defense section for more protection techniques!";
        }
        
        // Harassment/assault
        if (lowerQuery.match(/harassment|harass|assault|abuse|stalking|molest/)) {
            return "📞 REPORTING HARASSMENT\n\nImmediate steps:\n1. Document everything (messages, photos, dates)\n2. Tell someone you trust\n3. File complaint: Use our Digital Form or call 1091\n4. Block the person on all platforms\n5. Consider legal action\n\nYou're not alone. We support you through this process.";
        }
        
        // Self defense
        if (lowerQuery.match(/defense|defend|protect|fight|attack back/)) {
            return "🥋 SELF DEFENSE BASICS\n\n• Vulnerable points: Eyes, nose, throat, groin\n• Make noise: Scream, use whistle, attract attention\n• Use what you have: Keys, bag, phone as weapons\n• Run when possible: Escape is always best option\n\nVisit our Self Defense section for video tutorials and techniques!";
        }
        
        // Mental health/support
        if (lowerQuery.match(/scared|afraid|anxious|stress|trauma|cope|support|depressed|sad/)) {
            return "💜 EMOTIONAL SUPPORT\n\n• You're not alone: What you're feeling is valid\n• Talk to someone: Friend, family, or counselor\n• Helplines:\n   - 1091 (Women Helpline)\n   - 9152987821 (Mental Health)\n• Self-care: Take time to heal and recover\n• Community: Join our Safety Community for support\n\nYour mental health matters. Reach out for help.";
        }
        
        // App features
        if (lowerQuery.match(/app|feature|shecurity|how to use|what can|help me with/)) {
            return "📱 SheCurity Features\n\n• SOS Alert: One-tap emergency notification\n• Live Tracking: Share real-time location\n• Digital Complaint: File police reports online\n• Fake Call: Escape uncomfortable situations\n• Safety Community: Connect with other women\n• Self Defense: Learn protection techniques\n• Law Guide: Know your legal rights\n• Red Alert Recorder: Auto record in emergencies\n\nExplore all features from the home screen!";
        }

        // Greetings
// Greetings
if (
    lowerQuery.match(
        /^(hi|hello|hey|namaste|नमस्ते|good morning|good evening)/
    )
) {

    // Hindi response
    if (selectedLanguage === "hi") {

        return `
👋 नमस्ते! मैं आपकी SheCurity AI Assistant हूँ।

मैं आपकी मदद कर सकती हूँ:

• इमरजेंसी सहायता
• कानूनी अधिकार
• सुरक्षा सुझाव
• घटना रिपोर्ट करना
• सेल्फ डिफेंस
• भावनात्मक सहायता

आप क्या जानना चाहती हैं?
`;
    }

    // English response
    return `
👋 Hello! I'm your SheCurity AI Assistant.

I can help you with:

• Emergency procedures
• Legal rights and advice
• Safety tips
• Reporting incidents
• Self defense techniques
• Emotional support

What would you like to know?
`;
}



        // Thanks
        if (lowerQuery.match(/thank|thanks|appreciate/)) {
            return "💜 You're welcome! Stay safe and remember - we're here for you 24/7.\n\nIf you need anything else, just ask!";
        }
        
        // Default helpful response
        return "👋 I'm here to help with:\n\n• Emergency procedures - What to do in danger\n• Legal rights - Know your protections\n• Safety tips - Stay safe anywhere\n• Reporting incidents - File complaints\n• Self defense - Protect yourself\n• Emotional support - You're not alone\n\nWhat would you like to know more about?";
    };

    // Function to send a message with intelligent fallback
    const sendMessage = async () => {
        if (isRequestPending || !userInput.trim()) return;
        setIsRequestPending(true);

        const userMessage = userInput.trim();
        setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }]);
        setUserInput("");

        // Add typing indicator
        setMessages((prevMessages) => [...prevMessages, { text: "typing", sender: "bot" }]);

        // Use intelligent pattern-based responses
        try {
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking

// Translate user message to English first
const translatedInput =
    selectedLanguage !== "en"
    ? await translateText(
        userMessage,
        selectedLanguage,
        "en"
      )
    : userMessage;

// Generate intelligent response
const intelligentResponse =
    getIntelligentResponse(translatedInput);


            const translatedResponse = selectedLanguage !== "en" 
                ? await translateText(intelligentResponse, "en", selectedLanguage)
                : intelligentResponse;
            
            setMessages((prevMessages) => {
                const filtered = prevMessages.filter(msg => msg.text !== "typing");
                return [...filtered, { text: translatedResponse, sender: "bot" }];
            });
        } catch (error) {
            console.error("Chatbot Error:", error);
            const fallback = "I'm here to help! Ask me about emergencies, legal rights, safety tips, or reporting incidents.";
            setMessages((prevMessages) => {
                const filtered = prevMessages.filter(msg => msg.text !== "typing");
                return [...filtered, { text: fallback, sender: "bot" }];
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

export default Chatbot;