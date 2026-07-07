import { 
  Scale, Shield, Users, Award, Landmark, FileText, 
  Briefcase, Globe, AlertTriangle, Hammer, HelpCircle, 
  DollarSign, CheckSquare, ShieldAlert, Cpu, Heart, BookOpen
} from "lucide-react";
import { BlogArticle, LegalResource } from "./types";

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  detailedDesc: string;
  iconName: string;
  category: "litigation" | "corporate" | "consulting";
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "civil-litigation",
    title: "Civil Litigation & Property Disputes",
    description: "Specialized in title suits, family partitions, ancestral property, injunctions, and contract enforcement.",
    detailedDesc: "The core foundation of our chambers. Providing stellar legal representation across District Courts and High Court benches for land disputes, execution petitions, permanent injunctions, declaration suits, and ancestral family partitions with meticulous attention to civil procedure.",
    iconName: "Scale",
    category: "litigation"
  },
  {
    id: "consumer-disputes",
    title: "Consumer Court & Protection Cases",
    description: "Protecting consumer rights, insurance claims, medical negligence, and retail/builder disputes.",
    detailedDesc: "Our highly sought-after consumer defense desk represents individuals and local entities before District Consumer Commissions and State Disputes Redressal Commissions. We fight against unfair trade practices, defective products, builder failures, and arbitrary insurance claim rejections.",
    iconName: "Shield",
    category: "litigation"
  },
  {
    id: "high-court-appellate",
    title: "High Court Appellate Practice",
    description: "Appeals, first-appeals, writ petitions, civil revisions, and constitutional matters.",
    detailedDesc: "Drafting and presenting complex appellate reviews before the Rajasthan High Court Bench at Jaipur. Handling writ petitions under Articles 226/227, challenging sub-court decrees, administrative orders, and filing regular second appeals.",
    iconName: "Landmark",
    category: "litigation"
  },
  {
    id: "revenue-tenancy",
    title: "Revenue & Land Tenancy Laws",
    description: "Agricultural land mutation, tenancy rights, boundary disputes, and land revenue appeals.",
    detailedDesc: "Advising landowners and families on land revenue codes, tenancy rights, khatedari declarations, mutation of land records, and handling appeals before the Revenue Board, sub-divisional officers, and regional collectors.",
    iconName: "FileText",
    category: "consulting"
  },
  {
    id: "criminal-trial-defense",
    title: "Criminal Law & Trial Representation",
    description: "Bail petitions, private criminal complaints, trial defense, and cross-examinations.",
    detailedDesc: "Comprehensive assistance in securing anticipatory and regular bails in trial courts. Formulating rigorous defense strategies for criminal charges, private complaints, and cross-examination procedures before judicial magistrates.",
    iconName: "Shield",
    category: "litigation"
  },
  {
    id: "family-succession",
    title: "Matrimonial & Succession Advising",
    description: "Mutual separations, partition suits, drafting of wills, and family disputes counseling.",
    detailedDesc: "Handling matrimonial matters, mutual consent separations, drafting and registration of clear testamentary wills, and facilitating sensitive, confidential family settlement agreements outside of court.",
    iconName: "Users",
    category: "consulting"
  },
  {
    id: "arbitration-mediation",
    title: "Out-of-Court Dispute Resolution",
    description: "Mediation, commercial arbitration, and localized community settlements.",
    detailedDesc: "Advocate Mahesh Kumar Sharma is a strong proponent of swift out-of-court settlements. Representing clients in mediation proceedings, localized arbitration, and conciliation to resolve business and boundary disputes promptly.",
    iconName: "Globe",
    category: "consulting"
  },
  {
    id: "cheque-bounce-138",
    title: "Cheque Bounce & Debt Recoveries",
    description: "Prosecuting and defending Section 138 Negotiable Instrument suits and recoveries.",
    detailedDesc: "Swift filing and pursuit of cheque bounce complaints under Section 138 of the Negotiable Instruments Act. We assist clients in recovering outstanding dues through structured summary suits and statutory legal notices.",
    iconName: "Briefcase",
    category: "corporate"
  }
];

export const STATISTICS = [
  { value: "26+ Years", label: "Active Legal Practice" },
  { value: "Univ. of Rajasthan", label: "Law Graduate (1999)" },
  { value: "Jaipur & Dausa", label: "All Regional Courts" },
  { value: "Civil & Consumer", label: "Primary Chamber Focus" }
];

export const TIMELINE = [
  {
    year: "2000",
    title: "Establishment of Chambers",
    desc: "Following graduation from the University of Rajasthan (1999), Advocate Mahesh Kumar Sharma founded his independent law practice, serving clients across Jaipur and Dausa."
  },
  {
    year: "2008",
    title: "Focus on Civil Advocacy",
    desc: "Consolidated chamber practice, specializing in complex property title suits, partition disputes, and land revenue appeals."
  },
  {
    year: "2016",
    title: "Consumer Disputes Desk",
    desc: "Began actively representing consumer rights before State and District Forums, securing major victories for individual claimants and retail buyers."
  },
  {
    year: "2026",
    title: "Modernized Local Chambers",
    desc: "Unveiling secure client-focused portal, direct consultation templates, and custom tools to bring simple digital transparency to local litigation."
  }
];

export const CASE_RESULTS = [
  {
    id: "res-01",
    title: "Ancestral Property Partition Resolution",
    court: "Jaipur District Court (Civil)",
    challenge: "A local family faced structural loss of primary ancestral agricultural land due to contested partition deeds.",
    strategy: "Advocate Mahesh Kumar Sharma instituted a detailed partition suit, establishing the precise historical lineage and proving original occupancy rights.",
    outcome: "Court decreed division of land in equal legal shares, fully securing our client's valuable ancestral property holdings.",
    judgment: "Reaffirmed the strict evidentiary standards of ancient joint-family possession registers."
  },
  {
    id: "res-02",
    title: "Full Recovery of Unfair Builder Levy",
    court: "State Consumer Disputes Commission, Jaipur",
    challenge: "A homebuyer from Dausa was hit with a fraudulent post-possession surcharge of ₹1.8 Million by a regional housing society.",
    strategy: "Instituted a consumer dispute challenge for unfair trade practices, proving complete compliance with the original flat allotment terms.",
    outcome: "Builder ordered to withdraw all additional surcharges, execute final registration within 30 days, and pay ₹150,000 in consumer damages.",
    judgment: "Reaffirmed that developers cannot impose post-allotment unilateral fees on residential buyers."
  },
  {
    id: "res-03",
    title: "Resolution of Multi-Party Land Boundary Dispute",
    court: "District Court, Dausa",
    challenge: "An agricultural family was illegally restricted from accessing their well and farmland due to an arbitrary boundary fencing.",
    strategy: "Obtained a prompt temporary injunction under Order 39 Rules 1 & 2 CPC, compiling revenue maps to confirm ancient easementary right-of-way.",
    outcome: "Injunction made permanent. The obstructive fencing was ordered removed under court supervision, fully restoring our client's livelihood.",
    judgment: "Validated the absolute supremacy of recorded easementary passages over subsequent plot acquisitions."
  }
];

export const BLOGS: BlogArticle[] = [
  {
    id: "blog-01",
    title: "Understanding Section 482 CrPC: The Ultimate Shield Against Malicious Prosecution",
    category: "Criminal Law",
    excerpt: "An in-depth review on how the High Courts invoke inherent powers to quash frivolous FIRs and prevent abuse of the judicial process.",
    content: `Filing false FIRs as a tool for harassment has become an alarming trend. Section 482 of the Code of Criminal Procedure (CrPC) serves as an extraordinary shield, granting inherent powers to the High Courts to prevent the abuse of the process of any court and to secure the ends of justice.

### When Can the High Court Quash an FIR under Section 482?
The Supreme Court of India in the landmark *State of Haryana v. Bhajan Lal* case laid down specific guidelines where quashing can be invoked:
1. **No Prima Facie Case**: Even if the allegations made in the FIR are taken at face value, they do not disclose any cognizable offense against the accused.
2. **Absurdity of Allegations**: The allegations are so absurd and inherently improbable that no prudent person can ever reach a just conclusion to prosecute.
3. **Malice or Vengeance**: Where a criminal proceeding is manifestly attended with mala fide motives or is maliciously instituted with an ulterior motive for wreaking vengeance on the accused.

### Key Tactical Strategy
Filing for a quashing petition requires meticulous assembly of unimpeachable documentary evidence. At the Chambers of Advocate Mahesh Kumar Sharma, our defense team ensures that we prove the absence of active participation or show documented evidence that negates the physical presence or mens rea of the client at the time of the alleged incident.`,
    author: "Advocate Mahesh Kumar Sharma",
    readTime: "6 min read",
    date: "June 24, 2026",
    likes: 142,
    tags: ["FIR Quashing", "482 CrPC", "Criminal Defense", "High Court Matters"],
    trending: true
  },
  {
    id: "blog-02",
    title: "The Founders' Blueprint: Essential Agreements Every Startup Must Execute Pre-Funding",
    category: "Corporate & Startups",
    excerpt: "Avoid fatal legal co-founder fallout. Discover the exact agreements your startup needs before closing your seed round.",
    content: `Many brilliant startups crash not due to poor product-market fit, but due to co-founder conflicts and IP ownership issues. As a trusted advisor to dozens of high-growth founders, Advocate Mahesh Kumar Sharma recommends executing these three foundational contracts immediately.

### 1. Co-Founders' Agreement
This agreement acts as the pre-nuptial for startups. It must clearly outline:
- Equity split and role distributions.
- **Vesting Schedules**: A standard 4-year vesting with a 1-year cliff is essential. This ensures that if a co-founder leaves after 6 months, they do not walk away with 25% of your company.
- Decision-making, board control, and exit deadlock-resolution terms.

### 2. IP Assignment Agreement
Your startup is only as valuable as its intellectual property. If a developer or a founder drafts code or designs a logo, they own the copyright unless they execute an explicit *IP Assignment Agreement* assigning all rights to the registered company entity. Without this, early venture capitalists will reject your due diligence.

### 3. Non-Disclosure & Proprietary Information Agreement (NDIA)
Protect your secret formulas, market algorithms, and client pipelines before initiating conversations with vendors, early hires, or prospective seed investors.`,
    author: "Corporate Advisory Team",
    readTime: "8 min read",
    date: "July 02, 2026",
    likes: 89,
    tags: ["Startup Law", "Founder Equity", "IP Assignment", "Business Agreements"],
    trending: false
  },
  {
    id: "blog-03",
    title: "RERA vs. Consumer Protection: Resolving Delayed Real Estate Possession Conflicts",
    category: "Real Estate & RERA",
    excerpt: "A legal guide for homebuyers on choosing between RERA Tribunals and Consumer Courts to claim interest for delayed possessions.",
    content: `The conflict of delayed flats and construction pauses has devastated millions of homebuyers. Buyers often ask: Should I file a case under the *Real Estate (Regulation and Development) Act (RERA)* or approach the *National/State Consumer Disputes Redressal Commission (NCDRC)*?

### The Legal Intersection
The Supreme Court has clarified that the remedies available under RERA and the Consumer Protection Act (CPA) are **concurrent and complementary**. This means a buyer has the legal right to choose either forum depending on their primary objectives.

### Strategy Checklist: RERA vs NCDRC
1. **If you want immediate refund with interest**: RERA is faster, specialized, and has execution officers that can attach the builder's accounts.
2. **If you want possession along with massive mental harassment compensation**: Consumer Forums (NCDRC/SCDRC) are generally more open to awarding high moral and mental distress compensation, though the timeline to resolution can be longer.

Our real estate division has represented thousands of homebuyers, securing refund execution orders totaling over ₹4.5 Billion against delayed township developers.`,
    author: "Real Estate Division",
    readTime: "7 min read",
    date: "May 18, 2026",
    likes: 110,
    tags: ["RERA Act", "Homebuyer Rights", "Consumer Court", "Real Estate Law"],
    trending: true
  }
];

export const LEGAL_RESOURCES: LegalResource[] = [
  {
    id: "res-check-01",
    title: "Startup Legal Compliance Audit Checklist",
    category: "guide",
    description: "A comprehensive legal audit checklist detailing active compliances, tax filings, and mandatory employment filings required for Series-A readiness.",
    fileSize: "2.4 MB",
    content: "Includes: Company Board Meeting frequency rules, trademark filing timelines, PF/ESI compliance codes, and GST threshold exemptions for digital services."
  },
  {
    id: "res-temp-02",
    title: "Standard Independent Consultant Agreement Template",
    category: "template",
    description: "A secure, robust contract template for hiring freelance engineers or contractors, including rock-solid IP assignment and non-solicitation clauses.",
    fileSize: "1.1 MB",
    content: "Fully compliant with Indian Contract Act 1872. Ready-to-use in standard docx layout with input fields for commercial timelines and deliverables."
  },
  {
    id: "res-act-03",
    title: "Information Technology Act, 2000 (Updated 2026)",
    category: "bare-act",
    description: "An annotation-rich electronic reference of the complete IT Act, including cybercrime penalties, electronic signature validations, and intermediary liability rules.",
    fileSize: "4.8 MB",
    content: "Complete legislative handbook featuring latest Supreme Court annotations on Section 66A, Section 69, and modern digital privacy rulings."
  }
];

export const FAQS = [
  {
    q: "How can I book an urgent consultation with Advocate Mahesh Kumar Sharma?",
    a: "You can book directly using our interactive booking system below. Choose between a secure Google Meet video consult, phone consultation, or a direct offline meeting at our New Delhi Chambers. You will receive an instant email and WhatsApp confirmation once the slot is secured."
  },
  {
    q: "Do you represent clients outside Delhi?",
    a: "Yes. Our appellate litigation division represents clients nationwide before regional High Courts and various appellate tribunals (including NCLT, DRT, and RERA) using secure virtual courts and local associate networks."
  },
  {
    q: "Can I track my active case status online?",
    a: "Absolutely. Once you are onboarded as a client, you can sign in to our secure Client Portal using your Google account to track real-time hearings, view next hearing dates, review drafted filings, download certified judgments, and chat with our case managers."
  },
  {
    q: "How does the AI Document Analyzer work?",
    a: "Our integrated AI Analyzer uses advanced AI (Gemini 2.5 Pro) to conduct immediate draft reviews. Simply paste the legal text of your lease, partnership deed, or NDAs to receive structural evaluations, hidden liability disclosures, and draft recommendations within seconds."
  }
];
