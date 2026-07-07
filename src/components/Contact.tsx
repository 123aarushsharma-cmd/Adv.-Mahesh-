import React, { useState } from "react";
import { Mail, Phone, Landmark, Clock, CheckSquare, Send, RefreshCw, MessageSquare, ShieldCheck, MapPin } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorText("");
    setLoading(true);

    const path = "contacts";
    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "N/A",
        subject: formData.subject.trim() || "General Legal Query",
        message: formData.message.trim(),
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, path), payload);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (formattedErr: any) {
        setErrorText(formattedErr.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-24 bg-[#050505] relative overflow-hidden border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Establish Direct Communication
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Contact Chambers
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct office details and Map */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif text-white tracking-wide">
              Jaipur & Dausa Chambers
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed">
              Our litigation chambers are located near the Courts of Jaipur and Dausa, ensuring seamless filings, physical consultations, and prompt trial representations.
            </p>

            {/* Quick Contacts Box */}
            <div className="space-y-4 bg-white/[0.02] border border-white/10 p-6 rounded-[2px]">
              
              {/* Address */}
              <div className="flex items-start space-x-3 text-xs text-[#A5A5A5]">
                <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-white">Law Chambers</strong>
                  <p className="mt-1">Chambers near District & Sessions Court, Dausa & High Court Bench, Jaipur, Rajasthan</p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start space-x-3 text-xs text-[#A5A5A5]">
                <Phone className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-white">Direct Line / Urgent matters</strong>
                  <p className="mt-1 font-mono">+91 97843 64298</p>
                </div>
              </div>

              {/* Mail */}
              <div className="flex items-start space-x-3 text-xs text-[#A5A5A5]">
                <Mail className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-white">Registrar Mailbox</strong>
                  <p className="mt-1 font-mono">mahesh.advt15@gmail.com</p>
                </div>
              </div>

              {/* Office hours */}
              <div className="flex items-start space-x-3 text-xs text-[#A5A5A5]">
                <Clock className="h-5 w-5 text-[#D4AF37] shrink-0" />
                <div>
                  <strong className="text-white">Office Consult Hours</strong>
                  <p className="mt-1">Mon - Sat: 10:00 AM - 07:00 PM</p>
                </div>
              </div>

            </div>

            {/* Customized Aesthetic Vector Map layout */}
            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-[2px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <span className="block text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase mb-2">Location Vector Overview</span>
              <div className="bg-[#050505] h-48 rounded-[2px] flex flex-col items-center justify-center relative p-4 text-center border border-white/5">
                <Landmark className="h-10 w-10 text-[#D4AF37]/30 mb-2" />
                <span className="text-xs text-white font-medium">Jaipur Bench & Dausa Court Chambers</span>
                <p className="text-[10px] text-[#A5A5A5] mt-1 max-w-xs">District Court Compound, Dausa & High Court, Jaipur, Rajasthan</p>
                
                {/* Visual marker */}
                <div className="absolute right-12 bottom-12 p-1 bg-[#D4AF37] rounded-full animate-ping"></div>
                <div className="absolute right-12 bottom-12 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Submission form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
            {success ? (
              <div className="my-auto text-center py-12 space-y-4 animate-in fade-in zoom-in-95">
                <div className="inline-flex p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 rounded-full mb-3">
                  <ShieldCheck className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-serif text-white">Transmission Secured!</h4>
                <p className="text-xs text-[#A5A5A5] max-w-sm mx-auto">
                  Your message has been stored securely in our chambers directory. Our registrar counsel will respond back within 2 business hours.
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-6 px-5 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded-[2px] text-xs font-mono uppercase tracking-widest transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif text-white tracking-wide">Submit Inquiry Memorandum</h3>
                  <p className="text-xs text-[#A5A5A5] mt-1">Please provide accurate contact metrics below. All drafts are protected under strict lawyer-client confidentiality privileges.</p>
                </div>

                {errorText && (
                  <div className="bg-red-950/40 border border-red-900/40 p-4 rounded-[2px] text-xs text-red-400 font-mono">
                    Error storing contacts: {errorText}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-[#A5A5A5] uppercase">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Aarush Sharma"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-[#A5A5A5] uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-[#A5A5A5] uppercase">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-[#A5A5A5] uppercase">Matter Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Property dispute litigation, Corporate terms review..."
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-[#A5A5A5] uppercase">Message Memorandum</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide details of the litigation challenge, trial dates, or corporate compliance needs..."
                    className="w-full h-32 bg-[#050505] border border-white/10 rounded-[2px] p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-3 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-[2px] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting Memo...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Memorandum</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
