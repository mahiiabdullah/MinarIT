"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FormState = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      // Simulate network request
      // TODO: Replace with actual Mailchimp/Resend API call
      // await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      console.log("Newsletter subscribed:", email);
      setStatus("success");
      setEmail("");
      
      // Reset form after 5 seconds to allow subscribing another email (optional)
      setTimeout(() => {
        setStatus("idle");
      }, 5000);

    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className={cn("w-full relative", className)}>
      <AnimatePresence mode="wait">
        
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
            <span className="text-emerald-400 font-medium">You&apos;re subscribed! Check your email.</span>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center p-4 bg-red-500/10 border border-red-500/30 rounded-xl mb-4"
          >
            <AlertCircle className="w-5 h-5 text-red-400 mr-2 shrink-0" />
            <span className="text-red-400 font-medium">Something went wrong.</span>
            <button 
              onClick={() => setStatus("idle")}
              className="ml-4 text-sm underline text-red-400 hover:text-red-300"
            >
              Try again
            </button>
          </motion.div>
        )}

        {status !== "success" && status !== "error" && (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-3 w-full"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email"
                required
                disabled={status === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-surface-border rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="btn-gradient w-full md:w-auto py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] disabled:opacity-70 flex items-center justify-center min-w-[140px]"
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
