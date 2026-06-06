"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, ChevronDown, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import {
  CONTACT_FORM_INDUSTRIES,
  CONTACT_FORM_SERVICES,
  CONTACT_FORM_BUDGETS,
} from "@/constants/site";


export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    budget: "",
    message: ""
  });
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const MAX_CHARS = 1000;

  // Validation
  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
  const errors = {
    name: touched.name && !formData.name ? "Name is required" : "",
    email: touched.email && !formData.email ? "Email is required" 
           : touched.email && !isValidEmail(formData.email) ? "Invalid email address" : "",
    message: touched.message && !formData.message ? "Please tell us about your business" : "",
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Touch all required fields
    setTouched({ name: true, email: true, message: true });

    if (!formData.name || !formData.email || !isValidEmail(formData.email) || !formData.message) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: selectedServices
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to connect to the server. Please try again.");
    }
  };

  return (
    <section id="contact-form" className="section-padding bg-background relative border-t border-surface-border">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <GlassCard className="p-6 md:p-10 border-primary/20 bg-surface-elevated/50 relative overflow-hidden h-full">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-surface-elevated z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/50"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-white mb-4">Message Received!</h3>
                    <p className="text-text-secondary text-lg max-w-md mx-auto">
                      Thank you for reaching out. Our technical team is reviewing your details and we&apos;ll be in touch within 4 hours.
                    </p>
                    <button 
                      onClick={() => {
                        setStatus("idle");
                        setFormData({ name: "", company: "", email: "", phone: "", industry: "", budget: "", message: "" });
                        setSelectedServices([]);
                        setTouched({});
                      }}
                      className="mt-8 btn-ghost"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    noValidate
                  >
                    <h3 className="text-2xl font-display font-bold text-white mb-6">Tell us about your project</h3>
                    
                    {/* Row 1 */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur("name")}
                          className={cn("form-input", errors.name && "border-red-500/50 focus:border-red-500")}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Business Name</label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Email Address *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          className={cn("form-input", errors.email && "border-red-500/50 focus:border-red-500")}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-secondary">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+880 1..."
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Industry</label>
                      <div className="relative">
                        <select 
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                          className="form-input appearance-none"
                        >
                          <option value="" disabled className="bg-[#0A0F1E] text-white">Select your industry</option>
                          {CONTACT_FORM_INDUSTRIES.map(ind => <option key={ind} value={ind} className="bg-[#0A0F1E] text-white">{ind}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                      </div>
                    </div>

                    {/* Row 4 */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-text-secondary">What do you need?</label>
                      <div className="flex flex-wrap gap-2">
                        {CONTACT_FORM_SERVICES.map(service => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              onClick={() => toggleService(service)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                isSelected 
                                  ? "bg-primary/20 border-primary text-primary-light" 
                                  : "bg-surface border-surface-border text-text-muted hover:border-primary/50 hover:text-text-primary"
                              )}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 5 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-text-secondary">Tell us about your business *</label>
                        <span className={cn("text-xs", formData.message.length > MAX_CHARS ? "text-red-400" : "text-text-muted")}>
                          {formData.message.length} / {MAX_CHARS}
                        </span>
                      </div>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        rows={4}
                        className={cn("form-input resize-y min-h-[100px]", errors.message && "border-red-500/50 focus:border-red-500")}
                        placeholder="What are the main bottlenecks slowing your business down today?"
                      />
                      {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                    </div>

                    {/* Row 6 */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-secondary">Budget Range</label>
                      <div className="relative">
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-input appearance-none"
                        >
                          <option value="" disabled className="bg-[#0A0F1E] text-white">Select a budget range</option>
                          {CONTACT_FORM_BUDGETS.map(b => <option key={b} value={b} className="bg-[#0A0F1E] text-white">{b}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === "loading" || formData.message.length > MAX_CHARS}
                      className="btn-gradient w-full py-4 text-lg font-bold flex items-center justify-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>

          {/* Right Column: Trust & Process */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Timeline */}
            <div className="bg-surface-elevated/30 border border-surface-border p-6 rounded-2xl">
              <h4 className="text-white font-display font-bold mb-6">What happens next?</h4>
              <div className="relative pl-6 space-y-8">
                {/* Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-surface-border"></div>
                
                {[
                  { title: "We review your message", desc: "Our tech team analyzes your needs within 4 hours.", icon: "1" },
                  { title: "Discovery Call", desc: "We schedule a 30-min call to map your exact workflows.", icon: "2" },
                  { title: "Custom Proposal", desc: "You receive a detailed technical architecture and pricing.", icon: "3" }
                ].map((step, i) => (
                  <div key={i} className="relative z-10">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-surface-border flex items-center justify-center text-xs font-bold text-white shadow-lg border-2 border-background">
                      {step.icon}
                    </div>
                    <h5 className="text-sm font-bold text-white mb-1">{step.title}</h5>
                    <p className="text-xs text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <GlassCard className="p-6 bg-primary/5 border-primary/20 relative" hover={false}>
              <div className="text-4xl text-primary/40 font-serif absolute top-4 left-4">&quot;</div>
              <p className="text-text-primary text-sm relative z-10 italic mb-4 mt-4">
                We spoke to 4 different agencies. Minar was the only one that actually asked about our operational bottlenecks instead of just pitching us an app.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-border" />
                <div>
                  <div className="text-xs font-bold text-white">Salman Rahman</div>
                  <div className="text-[10px] text-text-muted">Operations Director</div>
                </div>
              </div>
            </GlassCard>

            {/* Trust Badges */}
            <div className="space-y-3">
              {[
                "No commitment required",
                "Free initial consultation",
                "NDA available on request"
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
