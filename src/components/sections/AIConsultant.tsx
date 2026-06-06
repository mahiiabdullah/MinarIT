"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

type Role = "user" | "ai";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "How can AI reduce my restaurant's food waste?",
  "What would an automated clinic look like?",
  "Can AI handle NGO donor management?",
  "How long does it take to build a business system?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "ai",
  content: "Hello! I'm Aria, your AI business consultant. I can help you understand how automation and custom software could transform your operations. What kind of business do you run?",
  timestamp: new Date(),
};

// ── Icons ─────────────────────────────────────────────────────────
const Icons = {
  send: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  trash: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  sparkles: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18"></path>
      <path d="M3 12h18"></path>
      <path d="m5 5 14 14"></path>
      <path d="m19 5-14 14"></path>
    </svg>
  ),
};

export default function AIConsultant() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userExchangeCount, setUserExchangeCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updatedHistory = [...messages, newUserMsg];
    setMessages(updatedHistory);
    setInputValue("");
    setIsTyping(true);
    setUserExchangeCount(prev => prev + 1);

    const tempAiMsgId = (Date.now() + 1).toString();
    
    // Add empty AI message to stream into
    setMessages(prev => [
      ...prev,
      { id: tempAiMsgId, role: "ai", content: "", timestamp: new Date() }
    ]);

    try {
      const response = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          // Exclude the welcome message to save tokens, or include it if desired.
          // Let's include everything except the currently streaming one
          conversation_history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let fullContent = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.substring(6);
            if (dataStr === "[DONE]") {
              setIsTyping(false);
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                fullContent += data.text;
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === tempAiMsgId 
                      ? { ...msg, content: fullContent } 
                      : msg
                  )
                );
              }
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAiMsgId 
            ? { ...msg, content: "I'm sorry, I encountered an error connecting to my neural network. Please try again." } 
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setUserExchangeCount(0);
  };

  // Format timestamp e.g. "10:24 AM"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section id="ai-consultant" className="section-padding bg-background-secondary border-t border-surface-border relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* ── Left Column: Intro ── */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary-400 border border-primary/20 mb-6">
                <span className="text-sm">🤖</span> AI Business Consultant
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight tracking-tight mb-4">
                Ask Anything About Automating Your Business
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                Not sure where to start? Chat with Aria, our AI consultant powered by Claude Sonnet. Describe your biggest bottleneck and get tailored advice instantly.
              </p>
              
              <div className="flex items-center gap-3">
                {/* AI Avatar glow */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center p-[2px]">
                  <div className="absolute inset-0 bg-primary rounded-full blur-md animate-pulse opacity-50" />
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center relative z-10">
                    <span className="text-xl">✨</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white">Powered by Claude AI</div>
                  <div className="text-xs text-text-muted">Anthropic's smartest model</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-surface-border">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                Suggested Questions
              </h4>
              <div className="flex flex-col gap-2">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setInputValue(q); inputRef.current?.focus(); }}
                    className="text-left px-4 py-3 bg-surface border border-surface-border rounded-xl text-sm text-text-secondary hover:text-white hover:border-primary/50 hover:bg-surface-hover transition-all"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right Column: Chat Interface ── */}
          <div className="lg:col-span-7 h-[650px] relative">
            <GlassCard className="w-full h-full flex flex-col overflow-hidden bg-background border-surface-border/50 shadow-2xl relative z-10" hover={false}>
              
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-surface-border flex justify-between items-center bg-surface-hover/30">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                        <span className="text-lg">✨</span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-background rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white leading-none">Aria</h3>
                    <div className="text-xs text-text-muted mt-1 flex items-center gap-1.5">
                      <span className="text-emerald-400">●</span> Online
                      <span className="mx-1">•</span>
                      AI Consultant
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-2 py-1 rounded bg-white/5 text-[10px] text-text-muted border border-white/5 font-mono">
                    claude-sonnet-4.6
                  </span>
                  <button 
                    onClick={clearChat} 
                    className="p-2 text-text-muted hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Clear Conversation"
                  >
                    {Icons.trash}
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar relative">
                {messages.map((msg) => {
                  const isAI = msg.role === "ai";
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("flex flex-col max-w-[95%] sm:max-w-[85%]", isAI ? "items-start" : "items-end ml-auto")}
                    >
                      <div className="flex items-end gap-2">
                        {isAI && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] flex-shrink-0 mb-1">
                            ✨
                          </div>
                        )}
                        <div 
                          className={cn(
                            "px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-[15px] leading-relaxed relative group",
                            isAI 
                              ? "bg-surface border border-surface-border text-text-primary rounded-bl-sm" 
                              : "bg-gradient-to-br from-primary to-primary-dark text-white rounded-br-sm shadow-lg shadow-primary/20"
                          )}
                        >
                          {/* Markdown simple rendering for bold and line breaks */}
                          {msg.content.split('\n').map((line, i) => (
                            <span key={i}>
                              {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                  return <strong key={j} className={isAI ? "text-white font-semibold" : "font-semibold"}>{part.slice(2, -2)}</strong>;
                                }
                                return part;
                              })}
                              {i !== msg.content.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                          
                          {/* Streaming cursor */}
                          {isAI && isTyping && msg.content.length > 0 && msg.id === messages[messages.length - 1].id && (
                            <span className="inline-block w-1.5 h-4 ml-1 bg-primary-400 animate-pulse align-middle" />
                          )}
                        </div>
                      </div>
                      <div className="text-[10px] text-text-muted mt-1.5 px-8">
                        {mounted ? formatTime(msg.timestamp) : ""}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && messages[messages.length - 1].role !== "ai" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-text-muted text-sm ml-8">
                    <span className="italic">Aria is typing</span>
                    <span className="flex gap-1">
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1 h-1 rounded-full bg-primary-400" />
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 rounded-full bg-primary-400" />
                      <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 rounded-full bg-primary-400" />
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-surface border-t border-surface-border">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                  className="relative flex items-center"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me about your business..."
                    className="w-full bg-background border border-surface-border rounded-xl pl-4 pr-14 py-4 text-white placeholder-text-muted focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-2 p-2.5 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                  >
                    {Icons.send}
                  </button>
                </form>
                <div className="flex justify-between items-center mt-2 px-2">
                  <span className="text-[10px] text-text-muted">Press Enter to send</span>
                  <span className="text-[10px] text-text-muted">{inputValue.length}/500</span>
                </div>
              </div>
              
              {/* Extra Detail: Floating CTA after 3 exchanges */}
              <AnimatePresence>
                {userExchangeCount >= 3 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-gradient-to-r from-[#1A1A2E] to-[#16213E] p-4 rounded-xl border border-primary/30 shadow-2xl shadow-primary/10 flex flex-col items-center text-center z-20"
                  >
                    <div className="absolute -top-3 bg-primary text-[10px] font-bold px-3 py-0.5 rounded-full text-white uppercase tracking-wider">
                      Recommendation
                    </div>
                    <p className="text-sm text-white font-medium mb-3 mt-1">
                      Want a personalized automation roadmap?
                    </p>
                    <Button variant="gradient" className="w-full py-2 text-sm" href="/contact">
                      Book a Free 30-Min Call
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </GlassCard>

            {/* Background glowing blob for the card */}
            <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
