"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Activity, MessageSquare, Database, Smartphone, FileText } from "lucide-react";


// ============================================
// Mockup Components
// ============================================

const DashboardMockup = () => (
  <div className="w-full h-[400px] bg-[#0A1428] rounded-2xl border border-primary/20 overflow-hidden shadow-2xl flex flex-col relative">
    {/* Header */}
    <div className="h-12 border-b border-surface-border flex items-center px-4 justify-between bg-[#0D1930]">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="w-32 h-4 rounded bg-surface-border" />
    </div>
    
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 md:w-48 border-r border-surface-border bg-[#0D1930]/50 p-4 flex flex-col gap-4">
        <div className="w-8 h-8 md:w-full md:h-8 rounded bg-primary/20 animate-pulse" />
        <div className="w-8 h-8 md:w-full md:h-8 rounded bg-surface-border" />
        <div className="w-8 h-8 md:w-full md:h-8 rounded bg-surface-border" />
        <div className="w-8 h-8 md:w-full md:h-8 rounded bg-surface-border mt-auto" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 relative">
        <div className="flex justify-between items-center">
          <div className="w-32 h-6 rounded bg-surface-border" />
          <div className="w-24 h-8 rounded bg-primary/20" />
        </div>
        
        {/* Table Mock */}
        <div className="flex-1 bg-surface-elevated border border-surface-border rounded-xl p-4 flex flex-col gap-3">
          <div className="flex gap-4 border-b border-surface-border pb-2">
            <div className="w-1/4 h-3 bg-surface-border rounded" />
            <div className="w-1/4 h-3 bg-surface-border rounded" />
            <div className="w-1/4 h-3 bg-surface-border rounded" />
            <div className="w-1/4 h-3 bg-surface-border rounded" />
          </div>
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 items-center"
            >
              <div className="w-1/4 h-3 bg-surface-border/50 rounded" />
              <div className="w-1/4 h-3 bg-surface-border/50 rounded" />
              <div className="w-1/4 flex gap-1">
                <div className="w-12 h-4 rounded-full bg-emerald-500/20" />
              </div>
              <div className="w-1/4 h-3 bg-surface-border/50 rounded" />
            </motion.div>
          ))}
        </div>

        {/* Floating AI Notification */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 right-8 bg-[#1A1A2E] border border-primary/40 p-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] backdrop-blur-md flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold text-primary-light mb-1">AI Agent</div>
            <div className="text-[10px] text-text-secondary">Low inventory detected.<br/>PO generated automatically.</div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const AutomationsMockup = () => (
  <div className="w-full h-[400px] rounded-2xl flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#06112A] to-[#0A0F1E] border border-surface-border">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative z-10 w-full max-w-sm">
      {/* Step 1 */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 20px rgba(6,182,212,0.3)", "0 0 0 rgba(0,0,0,0)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center shrink-0 backdrop-blur-sm z-20"
      >
        <MessageSquare className="w-8 h-8 text-[#25D366]" />
      </motion.div>
      
      {/* Line 1 */}
      <div className="hidden md:block h-1 w-16 bg-surface-border relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-accent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="md:hidden w-1 h-8 bg-surface-border relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-accent"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Step 2 (AI) */}
      <motion.div 
        className="w-24 h-24 rounded-full bg-background border-2 border-primary shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center shrink-0 z-20 relative"
      >
        <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" />
        <div className="text-2xl font-bold font-display gradient-text">AI</div>
      </motion.div>

      {/* Line 2 */}
      <div className="hidden md:block h-1 w-16 bg-surface-border relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </div>
      <div className="md:hidden w-1 h-8 bg-surface-border relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full bg-primary"
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </div>

      {/* Step 3 */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 20px rgba(139,92,246,0.3)", "0 0 0 rgba(0,0,0,0)"] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/50 flex items-center justify-center shrink-0 backdrop-blur-sm z-20"
      >
        <Database className="w-8 h-8 text-primary-light" />
      </motion.div>
    </div>
  </div>
);

const WhatsAppMockup = () => (
  <div className="w-full h-[400px] md:w-[300px] mx-auto bg-[#0b141a] rounded-[2rem] border-8 border-[#1f2c34] overflow-hidden shadow-2xl flex flex-col relative">
    {/* Header */}
    <div className="h-16 bg-[#202c33] flex items-center px-4 gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
        <span className="text-primary-light font-bold text-sm">AI</span>
      </div>
      <div>
        <div className="text-white font-medium text-sm">Minar Assistant</div>
        <div className="text-[#8696a0] text-xs">online</div>
      </div>
    </div>
    
    {/* Chat Area */}
    <div className="flex-1 bg-[#0b141a] p-4 flex flex-col gap-4 overflow-hidden relative" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "10px 10px" }}>
      
      {/* User Msg */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="self-end bg-[#005c4b] text-[#e9edef] px-3 py-2 rounded-lg max-w-[85%] text-sm rounded-tr-none shadow-sm"
      >
        Hi, do you have any tables available tonight at 8pm for 4 people?
        <div className="text-right text-[10px] text-[#8696a0] mt-1">10:42 AM</div>
      </motion.div>

      {/* AI Msg */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="self-start bg-[#202c33] text-[#e9edef] px-3 py-2 rounded-lg max-w-[85%] text-sm rounded-tl-none shadow-sm"
      >
        Hello! 👋 Yes, I just checked our reservation system. We have a table for 4 available at 8:00 PM. Would you like me to book it for you under this number?
        <div className="text-right text-[10px] text-[#8696a0] mt-1">10:42 AM</div>
      </motion.div>
      
      {/* User Msg 2 */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="self-end bg-[#005c4b] text-[#e9edef] px-3 py-2 rounded-lg max-w-[85%] text-sm rounded-tr-none shadow-sm"
      >
        Yes please! Name is Arif.
      </motion.div>

      {/* AI Typing Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        className="self-start bg-[#202c33] px-4 py-3 rounded-full flex gap-1"
      >
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-[#8696a0]" />
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-[#8696a0]" />
        <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-[#8696a0]" />
      </motion.div>
    </div>
  </div>
);

const AnalyticsMockup = () => (
  <div className="w-full h-[400px] bg-background-secondary rounded-2xl border border-surface-border p-6 shadow-2xl flex flex-col gap-6">
    {/* Top Stats */}
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-surface/50 rounded-xl p-3 border border-surface-border">
          <div className="w-8 h-8 rounded bg-primary/20 mb-2" />
          <div className="w-16 h-4 bg-surface-border rounded mb-1" />
          <div className="w-12 h-3 bg-surface-border/50 rounded" />
        </div>
      ))}
    </div>
    
    {/* Main Chart */}
    <div className="flex-1 bg-surface/30 rounded-xl border border-surface-border p-4 flex items-end justify-between gap-2 overflow-hidden relative">
      <div className="absolute top-4 left-4 font-semibold text-text-muted text-sm">Revenue Forecast vs Actual</div>
      
      {/* Bars */}
      {[40, 60, 45, 80, 55, 90, 75, 100].map((height, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
          className="w-full max-w-[30px] rounded-t-sm"
          style={{
            background: `linear-gradient(to top, rgba(139, 92, 246, 0.2), ${i === 7 ? 'rgba(6, 182, 212, 0.8)' : 'rgba(139, 92, 246, 0.8)'})`
          }}
        />
      ))}
      
      {/* Floating Line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.path 
          d="M 0 150 Q 50 100 100 120 T 200 80 T 300 100 T 400 40" 
          fill="none" 
          stroke="#06B6D4" 
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </svg>
    </div>
  </div>
);

const MobileAppMockup = () => (
  <div className="w-[220px] h-[450px] mx-auto bg-black rounded-[2.5rem] border-[6px] border-[#333] shadow-2xl relative overflow-hidden flex flex-col">
    {/* Notch */}
    <div className="absolute top-0 inset-x-0 h-6 bg-black flex justify-center z-20">
      <div className="w-20 h-4 bg-black rounded-b-xl" />
    </div>
    
    {/* App Screen */}
    <div className="flex-1 bg-[#F8FAFC] flex flex-col pt-8 overflow-hidden relative">
      {/* Header */}
      <div className="px-5 pb-4 bg-white shadow-sm z-10 relative">
        <div className="w-8 h-8 bg-primary rounded-full mb-4 shadow-md shadow-primary/30" />
        <div className="text-xl font-bold text-gray-900 leading-tight">Welcome back,<br/>Alex</div>
      </div>
      
      <div className="p-4 flex-1 bg-gray-50 flex flex-col gap-4 overflow-y-auto no-scrollbar">
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="w-16 h-3 rounded bg-gray-200" />
            <div className="w-8 h-3 rounded bg-emerald-100" />
          </div>
          <div className="w-24 h-6 rounded bg-gray-800 mb-1" />
          <div className="w-32 h-2 rounded bg-gray-200" />
        </motion.div>
        
        {/* List items */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-400 uppercase">Recent Activity</div>
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="w-4 h-4 rounded bg-primary/40" />
              </div>
              <div className="flex-1">
                <div className="w-20 h-3 rounded bg-gray-700 mb-2" />
                <div className="w-16 h-2 rounded bg-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-10">
        <div className="w-6 h-6 rounded text-primary bg-primary/20" />
        <div className="w-6 h-6 rounded bg-gray-200" />
        <div className="w-6 h-6 rounded bg-gray-200" />
        <div className="w-6 h-6 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

const DocumentMockup = () => (
  <div className="w-full h-[400px] bg-background-secondary rounded-2xl border border-surface-border p-8 shadow-2xl flex items-center justify-center relative overflow-hidden">
    {/* Page Shadow */}
    <div className="absolute inset-x-8 inset-y-10 bg-white/5 rounded-lg blur-lg" />
    
    {/* Page */}
    <div className="w-full max-w-sm h-full bg-[#f1f5f9] rounded-sm shadow-xl p-6 flex flex-col relative z-10 overflow-hidden">
      <div className="w-12 h-12 bg-primary/80 rounded-sm mb-8 flex items-center justify-center">
        <FileText className="text-white w-6 h-6" />
      </div>
      
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-6" />
      
      <div className="space-y-3 mb-8">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-2 bg-gray-300 rounded" 
        />
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-2 bg-gray-300 rounded" 
        />
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "90%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="h-2 bg-gray-300 rounded" 
        />
      </div>

      <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="text-gray-400 font-medium text-sm flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          AI Generated Report
        </motion.div>
        
        {/* Scanning beam */}
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-1 bg-primary/40 blur-sm"
        />
      </div>
    </div>
  </div>
);


// ============================================
// Service Data
// ============================================

const servicesData = [
  {
    id: "custom-systems",
    title: "Your Business, Fully Digitized",
    badge: "Core Service",
    icon: Database,
    description: [
      "We don't believe in duct-taping off-the-shelf SaaS products together. When your business grows, your software shouldn't hold you back.",
      "We build bespoke, end-to-end management systems tailored precisely to your operational workflows. If you can map it on a whiteboard, we can build it.",
      "Own your data, scale infinitely, and pay zero per-seat licensing fees."
    ],
    features: ["Order & inventory management", "Staff scheduling & payroll", "Customer CRM database", "Custom reporting engines", "Role-based access control"],
    industries: "Restaurant, Hospital, NGO, School",
    mockup: <DashboardMockup />
  },
  {
    id: "ai-automation",
    title: "Make Your Business Run While You Sleep",
    badge: "Most Popular",
    icon: Activity,
    description: [
      "Stop paying humans to do robotic work. We identify repetitive bottlenecks and deploy intelligent agents to handle them.",
      "Our AI integrations don't just 'assist' — they execute. They read emails, update databases, schedule dispatch, and alert you only when a human decision is strictly required."
    ],
    features: ["Customer inquiry routing", "Automated appointment booking", "Dynamic invoice generation", "Predictive inventory alerts", "Automated report scheduling"],
    industries: "All Industries",
    mockup: <AutomationsMockup />
  },
  {
    id: "whatsapp-agents",
    title: "Your 24/7 Customer Service Rep",
    badge: "AI Conversational",
    icon: MessageSquare,
    description: [
      "Meet your customers where they already are. We build sophisticated AI agents that live directly inside WhatsApp.",
      "These aren't dumb decision-tree bots. They understand natural language, context, and intent. They can look up order statuses in your database and securely process bookings."
    ],
    features: ["Handles 80% of routine FAQs", "Direct integration with your DB", "Speaks fluent Bengali & English", "Seamless human handoff protocol", "24/7 instant response time"],
    industries: "E-Commerce, Restaurant, Clinics",
    mockup: <WhatsAppMockup />
  },
  {
    id: "analytics",
    title: "See Everything. Decide Faster.",
    badge: "Data Intelligence",
    icon: Activity,
    description: [
      "Data is useless if you can't read it. We aggregate data from every corner of your business into beautiful, real-time dashboards.",
      "Stop waiting for end-of-month reports. Know your exact profit margins, inventory burn rate, and staff performance at a glance, from anywhere in the world."
    ],
    features: ["Real-time sales & revenue tracking", "Inventory burn-rate forecasting", "Staff productivity metrics", "Custom KPI tracking", "Automated anomaly detection"],
    industries: "Retail, Healthcare, NGOs",
    mockup: <AnalyticsMockup />
  },
  {
    id: "mobile-apps",
    title: "Your Business in Their Pocket",
    badge: "Native Apps",
    icon: Smartphone,
    description: [
      "Whether you need a sleek customer-facing booking app, or a rugged internal tool for your field staff, we design and deploy native mobile experiences.",
      "Fully integrated with your Minar backend system, ensuring data is perfectly synced across all devices instantly."
    ],
    features: ["Customer portals & loyalty apps", "Staff field-operation tools", "Managerial oversight apps", "Offline-first capabilities", "iOS & Android deployment"],
    industries: "Delivery, Field Services, Retail",
    mockup: <MobileAppMockup />
  },
  {
    id: "ai-documents",
    title: "Proposals & Reports — In Seconds",
    badge: "Generative AI",
    icon: FileText,
    description: [
      "Reclaim the hours spent formatting documents. Our Generative AI systems instantly compile structured data into professional PDFs, emails, and presentations.",
      "Simply select a client, hit generate, and watch as a highly personalized, accurate document is created instantly."
    ],
    features: ["Automated sales proposals", "Dynamic legal contracts", "Custom invoice generation", "Monthly performance reports", "Personalized client updates"],
    industries: "Agencies, Law Firms, B2B",
    mockup: <DocumentMockup />
  }
];


// ============================================
// Main Component
// ============================================

export default function ServiceDetails() {
  return (
    <div className="bg-background relative">
      {servicesData.map((service, index) => {
        const isEven = index % 2 === 0;
        const Icon = service.icon;

        return (
          <section 
            key={service.id} 
            id={service.id} 
            className={`section-padding border-b border-surface-border/50 ${!isEven ? 'bg-background-secondary/50' : ''}`}
          >
            <div className="section-container">
              <div className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* Text Content */}
                <div className="flex-1 w-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-primary-light">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="badge">{service.badge}</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-6"
                  >
                    {service.title}
                  </motion.h2>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4 text-text-secondary text-lg mb-8"
                  >
                    {service.description.map((p, i) => <p key={i}>{p}</p>)}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 border-primary/20 bg-primary/5 mb-8"
                  >
                    <h4 className="text-text-primary font-bold mb-4 font-display">What&apos;s Included:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-text-secondary">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  >
                    <button className="btn-ghost group">
                      See Case Studies
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="text-sm text-text-muted">
                      <span className="font-semibold text-text-secondary">Best for:</span> {service.industries}
                    </div>
                  </motion.div>
                </div>

                {/* Visual Content */}
                <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.mockup}
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
