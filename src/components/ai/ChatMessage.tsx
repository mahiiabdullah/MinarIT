"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  isStreaming?: boolean;
  showAvatar?: boolean;
}

export default function ChatMessage({
  role,
  content,
  timestamp,
  isStreaming,
  showAvatar = true,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex max-w-[85%] gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
        
        {/* Assistant Avatar */}
        {!isUser && (
          <div className="shrink-0 w-8 h-8 flex flex-col items-center">
            {showAvatar ? (
              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-surface-border flex items-center justify-center text-primary-light shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                <Bot className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8" /> /* Spacer if avatar not shown to keep alignment */
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
          <div
            className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed",
              isUser
                ? "bg-gradient-to-br from-primary to-accent text-white rounded-br-sm shadow-lg"
                : "bg-surface border border-surface-border text-text-primary rounded-bl-sm"
            )}
          >
            <span className="whitespace-pre-wrap">{content}</span>
            
            {/* Blinking cursor for streaming state */}
            {isStreaming && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-4 ml-1 bg-primary-light align-middle"
              />
            )}
          </div>
          
          {/* Timestamp */}
          {timestamp && (
            <span className="text-[10px] text-text-muted mt-1.5 px-1 font-medium tracking-wide">
              {timestamp}
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
}
