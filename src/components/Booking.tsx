import React, { useState } from "react";
import { 
  Calendar, Clock, Landmark, Phone, Video, 
  MessageSquare, CheckCircle, RefreshCw, Copy, ExternalLink 
} from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Booking() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    timeSlot: "11:30 AM - 12:00 PM",
    consultationType: "Google Meet" as any,
    caseSummary: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState("");
  const [errorText, setErrorText] = useState("");
  const [copied, setCopied] = useState(false);

  const timeSlots = [
    "10:00 AM - 10:30 AM",
    "11:30 AM - 12:00 PM",
    "02:30 PM - 03:00 PM",
    "04:00 PM - 04:30 PM",
    "05:30 PM - 06:00 PM"
  ];

  const consultationTypes = [
    { value: "Google Meet", label: "Google Meet Video", icon: Video },
    { value: "Zoom", label: "Zoom Video Conferencing", icon: Video },
    { value: "Phone Consultation", label: "Direct Phone Call", icon: Phone },
    { value: "Offline Office Meeting", label: "In-Person Chambers Meeting", icon: Landmark }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectType = (type: string) => {
    setFormData((prev) => ({ ...prev, consultationType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorText("");
    setLoading(true);

    const path = "appointments";
    try {
      // Setup document payload complying exactly with firebase-blueprint.json Appointment schema
      const payload = {
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        clientPhone: formData.clientPhone.trim(),
        date: formData.date,
        timeSlot: formData.timeSlot,
        consultationType: formData.consultationType,
        caseSummary: formData.caseSummary.trim() || "General Legal Counsel Consultation Requested",
        status: "pending" as const,
        createdAt: new Date().toISOString()
      };

      // Firestore save operation
      const docRef = await addDoc(collection(db, path), payload);
      setCreatedId(docRef.id);
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

  // Generate copyable templates
  const whatsappText = `Hello Advocate Mahesh Kumar Sharma, I have scheduled a legal consultation on ${formData.date} at ${formData.timeSlot} via ${formData.consultationType}. Client Name: ${formData.clientName}. Case Summary: ${formData.caseSummary}. Please confirm.`;
  const whatsappLink = `https://wa.me/919784364298?text=${encodeURIComponent(whatsappText)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get current date string for min date limit in picker
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="booking-section" className="py-24 bg-[#050505] relative overflow-hidden">
      
      {/* Background visual graphics */}
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-[#D4AF37]/5 filter blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
            Secure Legal Council
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium text-white mb-4">
            Book Appointment
          </h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-sm sm:text-base text-[#A5A5A5] max-w-2xl mx-auto leading-relaxed">
            Reserve a guaranteed 30-minute private trial review, appellate mapping session, or digital cyber compliance audit directly with Advocate Sharma.
          </p>
        </div>

        {/* Content Panel */}
        <div className="max-w-4xl mx-auto bg-white/[0.02] border border-white/10 rounded-[2px] p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative">
          
          {success ? (
            /* SUCCESS FEEDBACK LAYOUT */
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 rounded-full mb-4">
                <CheckCircle className="h-16 w-16" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">Consultation Booked Successfully!</h3>
              <p className="text-sm text-[#A5A5A5] max-w-md mx-auto">
                Your legal consultation request has been stored securely in our portal directory (ID: <span className="font-mono text-[#D4AF37]">{createdId}</span>). Our chambers registrar will verify the schedule shortly.
              </p>

              <div className="bg-[#050505] border border-white/10 p-6 rounded-[2px] max-w-xl mx-auto text-left space-y-4">
                <span className="block text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                  Confirm Via Immediate Integrations
                </span>
                
                {/* Whatsapp Confirmation shortcut */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center space-x-2 bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/30 px-4 py-3 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send WhatsApp Alert</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  
                  <button
                    onClick={() => copyToClipboard(whatsappText)}
                    className={`flex items-center justify-center space-x-2 bg-[#111111] border px-4 py-3 rounded-[2px] text-xs font-mono uppercase tracking-wider transition-all ${
                      copied ? "border-emerald-500 text-emerald-400" : "border-white/10 text-white hover:border-[#D4AF37]"
                    }`}
                  >
                    <Copy className={`h-4 w-4 ${copied ? "text-emerald-400" : "text-[#D4AF37]"}`} />
                    <span>{copied ? "Copied to Clipboard!" : "Copy Text Template"}</span>
                  </button>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      clientName: "",
                      clientEmail: "",
                      clientPhone: "",
                      date: "",
                      timeSlot: "11:30 AM - 12:00 PM",
                      consultationType: "Google Meet",
                      caseSummary: ""
                    });
                  }}
                  className="px-6 py-3 border border-white/10 hover:border-[#D4AF37] text-white hover:bg-white/5 rounded-[2px] text-xs font-mono uppercase tracking-widest transition-all"
                >
                  Schedule Another Consultation
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING SCHEDULER FORM */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Form errors */}
              {errorText && (
                <div className="bg-red-950/40 border border-red-900/40 p-4 rounded-[2px] text-xs text-red-400 font-mono">
                  Error storing appointment: {errorText}
                </div>
              )}

              {/* Consultation method selector cards */}
              <div className="space-y-3">
                <span className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                  1. Choose Consultation Channel
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {consultationTypes.map((type) => {
                    const isSelected = formData.consultationType === type.value;
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleSelectType(type.value)}
                        className={`p-4 rounded-[2px] border text-left flex flex-col justify-between h-28 transition-all ${
                          isSelected
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                            : "bg-[#050505] border-white/5 hover:border-white/20"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${isSelected ? "text-[#D4AF37]" : "text-gray-500"}`} />
                        <span className={`text-xs font-sans font-semibold leading-tight ${isSelected ? "text-white" : "text-[#A5A5A5]"}`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Date Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    2. Select Consultation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      min={todayStr}
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                    3. Select Available Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Client information inputs */}
              <div className="space-y-4">
                <span className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-white/10 pb-2">
                  4. Your Personal Contact Integrity
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase">Your Full Name</label>
                    <input
                      type="text"
                      name="clientName"
                      required
                      value={formData.clientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Aarush Sharma"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase">Secure Email Address</label>
                    <input
                      type="email"
                      name="clientEmail"
                      required
                      value={formData.clientEmail}
                      onChange={handleInputChange}
                      placeholder="e.g. client@domain.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase">Contact Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="clientPhone"
                      required
                      value={formData.clientPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-[#050505] border border-white/10 rounded-[2px] px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Case Summary */}
                <div className="space-y-2 pt-2">
                  <label className="block text-[11px] font-mono text-[#A5A5A5] uppercase">Brief Matter Summary (Strict Confidentiality Guaranteed)</label>
                  <textarea
                    name="caseSummary"
                    value={formData.caseSummary}
                    onChange={handleInputChange}
                    placeholder="Briefly state the civil dispute details, trial dates, or corporate compliance needs..."
                    className="w-full h-28 bg-[#050505] border border-white/10 rounded-[2px] p-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-3 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-[2px] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting secure request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4" />
                      <span>Confirm Consultation Schedule</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
