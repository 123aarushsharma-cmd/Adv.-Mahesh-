import React from "react";
import { BookOpen, Award, CheckCircle, GraduationCap, Briefcase, Landmark, ShieldCheck } from "lucide-react";
import { TIMELINE } from "../data";

export default function About() {
  const credentials = {
    education: [
      { degree: "Bachelor of Laws (LL.B.)", school: "University of Rajasthan, Jaipur (Graduated 1999 - 27 Years Ago)" }
    ],
    memberships: [
      "Bar Council of Rajasthan (Active Counsel)",
      "Rajasthan High Court Bar Association, Jaipur - Member",
      "Dausa District Court Bar Association - Member",
      "All India Bar Association - Member"
    ],
    principles: [
      { title: "Absolute Confidentiality", desc: "Rigorous protection of all sensitive personal and corporate legal documentation." },
      { title: "Direct Advocacy", desc: "Each draft, consultation, and representation is handled personally by the counsel." },
      { title: "Procedural Precision", desc: "Adhering to correct statutory procedures to secure sound courtroom outcomes." }
    ]
  };

  return (
    <section id="about-section" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-10 w-[250px] h-[250px] bg-[#D4AF37]/5 filter blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Legacy, Mission & Integrity
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Advocate Mahesh Kumar Sharma
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
        </div>

        {/* Story Section & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
          
          {/* Photo Placeholder & Luxury Overlay */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 border border-[#D4AF37] rounded-[2px] translate-x-3 translate-y-3 pointer-events-none group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300"></div>
            <div className="relative bg-[#111111] border border-white/10 p-4 rounded-[2px] overflow-hidden aspect-[4/5] flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
              {/* Top border decor */}
              <div className="flex justify-between items-center text-[#D4AF37]/40 font-mono text-[10px]">
                <span>CHAMBERS ESTD 2000</span>
                <span>RAJASTHAN, INDIA</span>
              </div>
              
              {/* Stylized vector representation of Advocate Mahesh Kumar Sharma */}
              <div className="my-auto flex flex-col items-center">
                <div className="relative p-8 bg-[#050505] border-2 border-[#D4AF37]/30 rounded-full mb-6">
                  <Landmark className="h-20 w-20 text-[#D4AF37]" />
                  <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full filter blur-md"></div>
                </div>
                <p className="text-xl font-serif font-medium text-white tracking-wide">
                  Chambers of M. K. Sharma
                </p>
                <p className="text-xs font-mono text-[#D4AF37] tracking-widest mt-1 uppercase">
                  Civil & Consumer Court Counsel
                </p>
              </div>

              {/* Bottom footer tag */}
              <div className="text-center border-t border-white/5 pt-4">
                <p className="text-[10px] text-[#A5A5A5] leading-relaxed italic">
                  “Justice is truth in action.”
                </p>
              </div>
            </div>
          </div>

          {/* Professional Story Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-serif text-white tracking-wide">
              Over 26 Years of Dedicated Trial & Civil Advocacy
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              Advocate Mahesh Kumar Sharma is a highly respected legal counsel with over 26 years of active legal practice. Having successfully passed his law degree 27 years ago (1999) from the University of Rajasthan, he has dedicated his career to delivering genuine, professional advocacy across Dausa, Jaipur, and regional courts in Rajasthan.
            </p>
            <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              Our chambers specialize primarily in Civil Cases and Consumer Disputes, earning trust through detailed statutory command and uncompromising ethics. We represent individuals, agricultural landowners, local families, and regional businesses across all District and Sessions Courts, State Consumer Disputes Forums, and High Court panels in Jaipur and Dausa.
            </p>

            {/* Mission, Vision, Values Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/[0.02] p-4 rounded-[2px] border border-white/10">
                <span className="block text-xs font-mono tracking-widest uppercase text-[#D4AF37] mb-2">Our Mission</span>
                <p className="text-[11px] text-[#A5A5A5] leading-relaxed">To deliver elite, bulletproof trial and appellate strategy, protecting lives, livelihoods, and corporate futures.</p>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-[2px] border border-white/10">
                <span className="block text-xs font-mono tracking-widest uppercase text-[#D4AF37] mb-2">Our Vision</span>
                <p className="text-[11px] text-[#A5A5A5] leading-relaxed">Deploying cutting-edge legal databases and custom AI agents to bring transparency and 10x speed to Indian law chambers.</p>
              </div>
              <div className="bg-white/[0.02] p-4 rounded-[2px] border border-white/10">
                <span className="block text-xs font-mono tracking-widest uppercase text-[#D4AF37] mb-2">Our Values</span>
                <p className="text-[11px] text-[#A5A5A5] leading-relaxed">Strict adherence to professional confidentiality, absolute integrity of client advisory, and relentless courtroom work ethic.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Credentials / Tabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          
          {/* Education */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2px] p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#050505] border border-[#D4AF37]/30 rounded-[2px] text-[#D4AF37]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h4 className="text-base font-serif font-medium text-white uppercase tracking-wider">Education & Credentials</h4>
            </div>
            <ul className="space-y-4">
              {credentials.education.map((edu, idx) => (
                <li key={idx} className="border-l-2 border-[#D4AF37] pl-3">
                  <p className="text-xs text-white font-medium">{edu.degree}</p>
                  <p className="text-[10px] text-[#A5A5A5] mt-0.5">{edu.school}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Memberships */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2px] p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#050505] border border-[#D4AF37]/30 rounded-[2px] text-[#D4AF37]">
                <Briefcase className="h-5 w-5" />
              </div>
              <h4 className="text-base font-serif font-medium text-white uppercase tracking-wider">Bar Memberships</h4>
            </div>
            <ul className="space-y-3">
              {credentials.memberships.map((mem, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-xs text-[#A5A5A5]">
                  <CheckCircle className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <span>{mem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Philosophy */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2px] p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#050505] border border-[#D4AF37]/30 rounded-[2px] text-[#D4AF37]">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="text-base font-serif font-medium text-white uppercase tracking-wider">Chamber Principles</h4>
            </div>
            <ul className="space-y-4">
              {credentials.principles.map((p, idx) => (
                <li key={idx} className="bg-[#050505] border border-white/10 p-3 rounded-[2px] flex items-start space-x-3">
                  <ShieldCheck className="h-4 w-4 text-[#D4AF37] mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-xs text-white font-semibold">{p.title}</h5>
                    <p className="text-[11px] text-[#A5A5A5] mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Journey Timeline */}
        <div id="timeline" className="border-t border-white/10 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
              Chronology of Distinction
            </h3>
            <p className="text-xs text-[#A5A5A5] mt-2">Tracing the development of Advocate Sharma's law practices</p>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/20 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative">
                {/* Timeline node circle */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 bg-[#050505] border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping"></div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-[2px] p-6 relative hover:border-[#D4AF37]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className="text-lg font-serif font-bold text-[#D4AF37]">
                      {item.year}
                    </span>
                    <h4 className="text-sm font-sans font-semibold text-white tracking-wide">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#A5A5A5] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
