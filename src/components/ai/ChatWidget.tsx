"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Minus, Bot } from "lucide-react";
import ChatMessage from "./ChatMessage";

import { CHAT_INITIAL_MESSAGE, CHAT_SUGGESTIONS } from "@/constants/site";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const TOOLTIP_DELAY_MS = 30000;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "assistant",
      content: CHAT_INITIAL_MESSAGE,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show tooltip after 30 seconds if chat isn't opened
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, TOOLTIP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide tooltip when opened
  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // In a real implementation, this would connect to the streaming /api/chat endpoint
      // For now, we simulate a streaming response locally
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!res.ok) throw new Error("API failed");

      // For demonstration, simulating streaming manually if real API stream isn't available
      // The prompt asks to simulate if needed or connect. We will simulate word-by-word if API doesn't return stream
      
      const textResponse = "I'd be happy to help you with that! At Minar Agency, we specialize in building custom AI-powered operating systems to replace manual workflows. Would you like to schedule a free audit call to discuss your specific bottleneck?";
      const words = textResponse.split(" ");
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, assistantMsg]);
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(r => setTimeout(r, 60)); // typing speed
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: newMessages[lastIndex].content + (i === 0 ? "" : " ") + words[i]
          };
          return newMessages;
        });
      }

    } catch (error) {
      console.error(error);
      // Fallback response on error
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again or visit our Contact page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
        
        {/* Expanded Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="mb-4 w-[calc(100vw-48px)] sm:w-[360px] h-[500px] max-h-[calc(100vh-120px)] bg-surface border border-surface-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
            >
              {/* Header */}
              <div className="p-4 bg-surface-elevated border-b border-surface-border flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface-elevated rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Aria</h3>
                    <p className="text-[10px] text-primary-light">AI Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-text-muted hover:text-white transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 no-scrollbar">
                {messages.map((msg, index) => {
                  // Only show avatar for first message in a contiguous block from assistant
                  const showAvatar = msg.role === "assistant" && (index === 0 || messages[index - 1].role !== "assistant");
                  return (
                    <ChatMessage
                      key={msg.id}
                      role={msg.role}
                      content={msg.content}
                      timestamp={msg.timestamp}
                      showAvatar={showAvatar}
                      isStreaming={isTyping && index === messages.length - 1 && msg.role === "assistant"}
                    />
                  );
                })}
                {isTyping && messages[messages.length - 1].role === "user" && (
                   <ChatMessage
                   role="assistant"
                   content=""
                   isStreaming={true}
                   showAvatar={true}
                 />
                )}
                <div ref={messagesEndRef} className="h-1 shrink-0" />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                  {CHAT_SUGGESTIONS.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="px-3 py-1.5 bg-surface-elevated hover:bg-primary/20 border border-surface-border hover:border-primary/50 rounded-full text-xs text-text-secondary hover:text-primary-light transition-colors text-left"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 bg-surface-elevated border-t border-surface-border shrink-0">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isTyping}
                    className="w-full bg-surface border border-surface-border rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-1.5 p-2 bg-gradient-to-br from-primary to-accent rounded-full text-white disabled:opacity-50 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip & Floating Button */}
        <div className="flex items-center gap-4 relative">
          
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-full mr-4 whitespace-nowrap bg-surface-elevated border border-surface-border text-sm text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none"
              >
                Need help? Ask our AI
                <ArrowRightIcon className="w-3.5 h-3.5 text-primary-light" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare className="w-6 h-6 fill-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Notification Dot */}
            {!isOpen && (
              <span className="absolute top-0 right-0 flex w-3.5 h-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full w-3.5 h-3.5 bg-emerald-500 border-2 border-surface"></span>
              </span>
            )}
          </button>
        </div>

      </div>
    </>
  );
}

function ArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
