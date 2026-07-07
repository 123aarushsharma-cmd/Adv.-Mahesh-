export interface Appointment {
  id?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  consultationType: "Google Meet" | "Zoom" | "Phone Consultation" | "Offline Office Meeting";
  caseSummary: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface UserCase {
  id?: string;
  caseNo: string;
  clientUid: string;
  clientName: string;
  court: string;
  matter: string;
  status: string;
  nextHearing: string;
  createdAt: string;
  timeline?: { title: string; date: string; desc: string }[];
  documents?: { name: string; date: string }[];
  previousHearings?: { date: string; summary: string }[];
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  likes: number;
  tags: string[];
  trending?: boolean;
}

export interface LegalResource {
  id: string;
  title: string;
  category: "guide" | "bare-act" | "template" | "judgment";
  description: string;
  fileSize?: string;
  downloadUrl?: string;
  content?: string;
}
