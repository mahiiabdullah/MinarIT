"use client";

import { motion } from "framer-motion";

import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const teamMembers = [
  {
    name: "Arif Rahman",
    role: "Founder & Systems Architect",
    bio: "Ex-enterprise architect who got tired of watching small businesses struggle with bad software.",
    skills: ["System Architecture", "Node.js", "PostgreSQL", "React"],
    gradient: "from-primary to-accent",
  },
  {
    name: "Nadia Islam",
    role: "AI Integration Lead",
    bio: "Machine learning specialist focused on practical, ROI-driven AI automation for daily operations.",
    skills: ["Python", "TensorFlow", "LLMs", "Data Engineering"],
    gradient: "from-accent to-emerald-500",
  },
  {
    name: "Tariq Hassan",
    role: "Full-Stack Engineer",
    bio: "Obsessed with building lightning-fast, intuitive interfaces that require zero training to use.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "UX Design"],
    gradient: "from-orange-500 to-primary",
  },
  {
    name: "Sara Ahmed",
    role: "Business Analyst",
    bio: "Translates chaotic business workflows into clean, logical software requirements.",
    skills: ["Process Mapping", "Agile", "User Testing", "Strategy"],
    gradient: "from-pink-500 to-accent",
  },
];

export default function Team() {
  return (
    <section className="section-padding bg-background-secondary relative overflow-hidden">
      <div className="section-container">
        <SectionHeading
          badge="The Builders"
          title="Meet the"
          highlight="Team"
          description="A tight-knit group of engineers, designers, and strategists obsessed with operational efficiency."
        />

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20"
        >
          {teamMembers.map((member, i) => (
            <motion.div key={i} variants={fadeInUp} className="group perspective-1000 h-[380px]">
              <div className="relative w-full h-full transition-all duration-500 transform-style-3d group-hover:rotate-y-180">
                
                {/* Front of Card */}
                <div className="absolute inset-0 backface-hidden glass-card p-6 flex flex-col items-center text-center justify-center border border-surface-border">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} mb-6 p-1`}>
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden relative">
                      {/* Avatar Placeholder: Initials with slight transparency */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20`} />
                      <span className="text-2xl font-display font-bold text-text-primary z-10">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{member.name}</h3>
                  <p className="text-sm text-primary-light font-medium mb-4">{member.role}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Back of Card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-6 flex flex-col justify-center border border-primary/40 bg-[#111827]/90 backdrop-blur-xl">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 border-b border-surface-border pb-2">Core Skills</h4>
                  <ul className="space-y-3 mb-auto">
                    {member.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t border-surface-border flex justify-center">
                    <a href="#" className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-text-muted hover:text-[#0A66C2] hover:bg-surface-border transition-colors">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hiring Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-primary via-accent to-primary background-animate"
        >
          <div className="bg-background rounded-[23px] px-8 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold font-display text-text-primary mb-2">Want to build the future of work?</h3>
              <p className="text-text-secondary">We&apos;re always looking for talented engineers and AI specialists.</p>
            </div>
            <button className="btn-gradient shrink-0 px-8 py-3 whitespace-nowrap">
              View Open Positions
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
