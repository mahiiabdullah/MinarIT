export type CaseStudyResult = {
  metric: string;
  value: string;
  description: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client_type: string;
  industry: string;
  location: string;
  duration: string;
  headline: string;
  subheadline: string;
  problem: string;
  solution: string;
  systems_built: string[];
  ai_features: string[];
  results: CaseStudyResult[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  tags: string[];
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "bengal-bites-restaurant-automation",
    title: "Bengal Bites Chain",
    client_type: "Restaurant Chain (8 Locations)",
    industry: "Restaurant",
    location: "Dhaka, Bangladesh",
    duration: "6 Weeks",
    headline: "Eliminating Food Waste and Lost Orders Across 8 Kitchens",
    subheadline: "How we replaced WhatsApp group chaos with a centralized, AI-powered kitchen display and inventory system.",
    problem: "Bengal Bites was losing roughly 12% of their monthly revenue to food waste and mismanaged inventory. Orders from Foodpanda, Pathao, and walk-ins were being manually relayed to the kitchens via WhatsApp groups. This led to dropped orders, angry customers, and managers spending 4 hours a day manually reconciling stock across 8 different branches.",
    solution: "We built a centralized Kitchen Display System (KDS) deeply integrated with a custom inventory tracker. Every time an order is placed on any delivery app, it instantly pings the correct kitchen's display tablet. The system automatically deducts raw ingredients from the central database in real-time. We also built a WhatsApp AI Bot for branch managers to instantly query stock levels using natural language instead of digging through spreadsheets.",
    systems_built: [
      "Custom Kitchen Display System",
      "Multi-channel Order Aggregator",
      "Real-time Inventory Sync",
      "Automated P&L Reporting"
    ],
    ai_features: [
      "WhatsApp Inventory Bot",
      "Demand Prediction Model"
    ],
    results: [
      { metric: "-30%", value: "30%", description: "Reduction in food waste" },
      { metric: "0", value: "0", description: "Dropped orders post-launch" },
      { metric: "14hrs", value: "14", description: "Manager hours saved weekly" }
    ],
    testimonial: {
      quote: "The inventory AI bot changed my life. I used to spend my entire Sunday matching receipts. Now I just text the bot 'What's the meat stock at Gulshan?' and get an instant answer.",
      name: "Tariq Hasan",
      role: "Operations Manager"
    },
    tags: ["Next.js", "Node.js", "PostgreSQL", "WhatsApp API", "Claude AI"],
    featured: true
  },
  {
    slug: "labaid-diagnostic-appointment-system",
    title: "PrimeCare Diagnostics",
    client_type: "Specialty Clinic",
    industry: "Hospital",
    location: "Sylhet, Bangladesh",
    duration: "8 Weeks",
    headline: "Automating 500+ Daily Appointments and Eliminating No-Shows",
    subheadline: "A fully custom scheduling CRM and automated WhatsApp reminder system for a high-traffic diagnostic center.",
    problem: "PrimeCare Diagnostics was handling over 500 patients daily using a mix of paper ledgers and a clunky 10-year-old desktop software. Patients would wait in line for hours just to book a test. The clinic suffered a 25% no-show rate because receptionists physically couldn't call everyone to remind them, costing the clinic thousands in idle machine time.",
    solution: "We developed a secure, HIPAA-compliant patient management web app. We replaced the manual phone calls with an automated WhatsApp workflow. When a doctor books a test, the patient instantly receives a WhatsApp message with a payment link and dynamic scheduling options. 24 hours before the test, the AI sends a reminder, allowing the patient to confirm or reschedule automatically without human intervention.",
    systems_built: [
      "Patient CRM Dashboard",
      "Automated Billing & Invoicing",
      "Dynamic Doctor Scheduling",
      "Online Payment Gateway"
    ],
    ai_features: [
      "WhatsApp Appointment Bot",
      "No-show Predictive Alerts"
    ],
    results: [
      { metric: "40%", value: "40%", description: "Drop in patient no-shows" },
      { metric: "60%", value: "60%", description: "Faster billing processing" },
      { metric: "+15%", value: "15%", description: "Increase in patient throughput" }
    ],
    testimonial: {
      quote: "We thought we needed to hire three more receptionists. Instead, Minar Agency built a system that does the work of ten. Our waiting room is finally peaceful.",
      name: "Dr. Farhana Ahmed",
      role: "Medical Director"
    },
    tags: ["React", "Express", "MongoDB", "Twilio", "SSL/TLS"],
    featured: true
  },
  {
    slug: "hope-foundation-donor-tracking",
    title: "Hope Foundation",
    client_type: "International NGO",
    industry: "NGO",
    location: "Global / Dhaka HQ",
    duration: "10 Weeks",
    headline: "Real-time Impact Reporting for International Donors",
    subheadline: "Replacing quarterly manual Excel reports with a live dashboard tracking fund allocation and field progress.",
    problem: "To secure international grants, the Hope Foundation needed to provide strict, transparent reporting on how funds were used in rural areas. Their field workers were collecting data on paper, which was then manually entered into Excel by the Dhaka team weeks later. This delay frustrated donors and severely bottlenecked their ability to apply for new, larger grants.",
    solution: "We deployed a lightweight, offline-first mobile web app for field workers to log expenses, snap photos, and record impact metrics on site. This data syncs to a central dashboard the moment they hit a network zone. We then built a secure portal for international donors to log in and see live visualizations of their specific funds at work, instantly generating compliance reports.",
    systems_built: [
      "Offline-first Field App",
      "Live Donor Portal",
      "Automated PDF Report Generator",
      "Fund Allocation Tracker"
    ],
    ai_features: [
      "Impact Narrative Generator",
      "Anomaly Detection in Expenses"
    ],
    results: [
      { metric: "50%", value: "50%", description: "Faster compliance reporting" },
      { metric: "3x", value: "3", description: "Increase in donor retention" },
      { metric: "100%", value: "100%", description: "Real-time field visibility" }
    ],
    testimonial: {
      quote: "Being able to give our international partners a secure login to see exactly where their money went, with photos and geolocations, secured our next $2M funding round.",
      name: "Raqib Hossain",
      role: "Head of Grants"
    },
    tags: ["Next.js", "PWA", "Supabase", "AWS S3", "OpenAI"],
    featured: false
  },
  {
    slug: "urban-wardrobe-ecommerce-automation",
    title: "Urban Wardrobe",
    client_type: "DTC Fashion Brand",
    industry: "E-Commerce",
    location: "Chittagong, Bangladesh",
    duration: "5 Weeks",
    headline: "Scaling Customer Support with AI for a Fashion Brand",
    subheadline: "Integrating Shopify, warehouse inventory, and an AI support agent into a single omnichannel dashboard.",
    problem: "As Urban Wardrobe scaled to 2,000 orders a month, their customer support collapsed. Two employees were drowning in Facebook messages, Instagram DMs, and WhatsApp texts asking 'Where is my order?' and 'Do you have this in size M?'. Furthermore, overselling was common because their physical warehouse stock wasn't synced with their Shopify store fast enough.",
    solution: "We built an omnichannel dashboard that aggregates messages from Meta and WhatsApp into one unified inbox. We trained an AI agent on their exact return policies and real-time inventory API. The AI now automatically answers sizing questions, checks stock, and provides live tracking updates to customers 24/7. Human agents only step in for complex escalations.",
    systems_built: [
      "Omnichannel Inbox",
      "Shopify-Warehouse Sync",
      "Automated Returns Workflow"
    ],
    ai_features: [
      "Customer Support AI Agent",
      "Automated Order Tracking"
    ],
    results: [
      { metric: "85%", value: "85%", description: "Support tickets handled by AI" },
      { metric: "0", value: "0", description: "Accidental stockouts" },
      { metric: "-40%", value: "40%", description: "Reduction in response time" }
    ],
    testimonial: {
      quote: "Our customers think we have a 24-hour support team in an office somewhere. They have no idea it's Minar's AI agent handling 85% of the workload instantly.",
      name: "Sadia Islam",
      role: "Founder & CEO"
    },
    tags: ["Shopify API", "Meta Graph API", "LangChain", "Redis"],
    featured: false
  },
  {
    slug: "heritage-academy-management",
    title: "Heritage Academy",
    client_type: "Private High School",
    industry: "School",
    location: "Dhaka, Bangladesh",
    duration: "12 Weeks",
    headline: "Digitizing a 20-Year-Old Campus",
    subheadline: "From paper report cards and cash fees to a fully transparent parent-teacher-admin ecosystem.",
    problem: "Heritage Academy had 1,500 students but zero digital infrastructure. Teachers spent hours calculating grades manually. Admins wasted weeks chasing parents for late tuition fees. Parents were completely disconnected from their child's daily academic performance, only finding out about issues during end-of-term meetings.",
    solution: "We built a comprehensive Student Information System (SIS) with three distinct portals: Admin, Teacher, and Parent. Teachers now input grades via mobile, which automatically calculates GPAs. We integrated a payment gateway for parents to pay tuition online, backed by an automated SMS reminder system. Parents can now log in anytime to see attendance and grades.",
    systems_built: [
      "Student Information System",
      "Teacher Grading Portal",
      "Online Fee Collection",
      "Automated SMS Reminders"
    ],
    ai_features: [
      "Student Risk Prediction",
      "Automated Parent Emails"
    ],
    results: [
      { metric: "95%", value: "95%", description: "On-time fee collection" },
      { metric: "10hrs", value: "10", description: "Saved per teacher, per month" },
      { metric: "100%", value: "100%", description: "Elimination of paper records" }
    ],
    testimonial: {
      quote: "The ability for parents to pay fees online and instantly check attendance has completely transformed our school's reputation in the community.",
      name: "Principal Kamal",
      role: "Head of Administration"
    },
    tags: ["Next.js", "NestJS", "PostgreSQL", "SSL/Commerz"],
    featured: false
  },
  {
    slug: "bengal-tex-manufacturing",
    title: "BengalTex Mills",
    client_type: "Textile Manufacturer",
    industry: "Manufacturing",
    location: "Gazipur, Bangladesh",
    duration: "14 Weeks",
    headline: "Predictive Maintenance for Heavy Machinery",
    subheadline: "Stopping factory floor downtime before it happens using real-time data logging and predictive AI alerts.",
    problem: "BengalTex operates 24/7, but unpredictable machine breakdowns were causing catastrophic delays in their supply chain. Managers were using clipboards to log maintenance routines, which were often falsified or forgotten. When a machine went down, it cost them roughly $5,000 per hour in lost production.",
    solution: "We digitized the factory floor. Maintenance crews were given rugged tablets connected to our custom Maintenance Hub. Every machine's service history was logged in the cloud. We implemented an AI model that analyzes historical breakdown data and operating hours to flag machines that require preventative maintenance *before* they fail, sending automated alerts to the floor manager's phone.",
    systems_built: [
      "Digital Maintenance Hub",
      "Supply Chain Dashboard",
      "Worker Shift Manager",
      "Incident Reporting App"
    ],
    ai_features: [
      "Predictive Failure Alerts",
      "Parts Inventory Forecaster"
    ],
    results: [
      { metric: "99%", value: "99%", description: "Machine uptime achieved" },
      { metric: "-60%", value: "60%", description: "Reduction in defect rates" },
      { metric: "$120k", value: "120", description: "Saved in prevented downtime" }
    ],
    testimonial: {
      quote: "We used to operate blindly, waiting for things to break. Now the system tells us a bearing is about to fail three days before it actually happens. Incredible.",
      name: "Zayed Khan",
      role: "Factory Floor Manager"
    },
    tags: ["React", "Python", "TensorFlow", "AWS IoT", "Docker"],
    featured: true
  }
];
