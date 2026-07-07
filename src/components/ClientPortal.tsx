import React, { useState, useEffect } from "react";
import { 
  Lock, Landmark, FileText, Calendar, Clock, 
  ArrowRight, ShieldCheck, User, LogOut, Upload, 
  PlusCircle, RefreshCw, MessageSquare, CheckSquare 
} from "lucide-react";
import { loginWithGoogle, logoutUser, auth, db, handleFirestoreError, OperationType } from "../firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { UserCase } from "../types";

export default function ClientPortal() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cases, setCases] = useState<UserCase[]>([]);
  const [casesLoading, setCasesLoading] = useState(false);
  const [activeCase, setActiveCase] = useState<UserCase | null>(null);
  const [creatingSample, setCreatingSample] = useState(false);

  // File drag & drop simulator state
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch cases when user is authenticated
  const fetchClientCases = async (uid: string) => {
    setCasesLoading(true);
    const path = "cases";
    try {
      const q = query(collection(db, path), where("clientUid", "==", uid));
      const querySnapshot = await getDocs(q);
      const caseList: UserCase[] = [];
      querySnapshot.forEach((doc) => {
        caseList.push({ id: doc.id, ...doc.data() } as UserCase);
      });
      setCases(caseList);
      if (caseList.length > 0) {
        setActiveCase(caseList[0]);
      } else {
        setActiveCase(null);
      }
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.LIST, path);
    } finally {
      setCasesLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClientCases(user.uid);
    } else {
      setCases([]);
      setActiveCase(null);
    }
  }, [user]);

  // Auth logins
  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error(err);
    }
  };

  // Auth logouts
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
  };

  // Create real Sample Case in Firestore for this user!
  const createSampleCaseRecord = async () => {
    if (!user || creatingSample) return;
    setCreatingSample(true);
    const path = "cases";

    try {
      const samplePayload = {
        caseNo: `MKS/2026/${Math.floor(1000 + Math.random() * 9000)}`,
        clientUid: user.uid,
        clientName: user.displayName || "Valued Client",
        court: "High Court of Delhi (Appellate Writ Division)",
        matter: "Civil Appeal - Restitution of Corporate Assets & Contractual Enforcements",
        status: "Active - Under Pleadings",
        nextHearing: "2026-08-20",
        createdAt: new Date().toISOString(),
        timeline: [
          { title: "Special Writ Filed", date: "2026-05-12", desc: "Registered in Registry, assigned to Courtroom 3." },
          { title: "Interim Ad-Injunction Granted", date: "2026-06-15", desc: "Successfully argued prima-facie case balance of convenience." }
        ],
        documents: [
          { name: "Verified Writ Petition.pdf", date: "2026-05-12" },
          { name: "Ad-Injunction Order.pdf", date: "2026-06-15" }
        ],
        previousHearings: [
          { date: "2026-06-15", summary: "Interim stay orders extended; directions issued to respondents to file counter within 4 weeks." }
        ]
      };

      await addDoc(collection(db, path), samplePayload);
      await fetchClientCases(user.uid);
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.CREATE, path);
    } finally {
      setCreatingSample(false);
    }
  };

  // Upload document simulator
  const handleFileUpload = async (fileName: string) => {
    if (!activeCase || !activeCase.id || uploadLoading) return;
    setUploadLoading(true);
    const path = `cases/${activeCase.id}`;

    try {
      const newDoc = {
        name: fileName,
        date: new Date().toISOString().split("T")[0]
      };

      const docRef = doc(db, "cases", activeCase.id);
      await updateDoc(docRef, {
        documents: arrayUnion(newDoc)
      });

      // Update local state smoothly
      setActiveCase((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          documents: [...(prev.documents || []), newDoc]
        };
      });

      setUploadedFile(fileName);
      // Refresh case list
      fetchClientCases(user!.uid);
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.UPDATE, path);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file.name);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#050505]">
        <RefreshCw className="h-8 w-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <section id="portal-section" className="py-24 bg-[#050505] min-h-screen relative overflow-hidden">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#D4AF37]/5 filter blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!user ? (
          /* LOCKED LOCK SCREEN FOR PORTAL ACCESS */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-white/[0.02] border border-white/10 rounded-[2px] shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden z-20">
            <div className="inline-flex p-4 bg-[#050505] border border-[#D4AF37]/40 rounded-full text-[#D4AF37] mb-6">
              <Lock className="h-10 w-10 animate-pulse" />
            </div>
            
            <span className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-semibold">
              Secure Chambers Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-4">
              Client Portal
            </h2>
            <p className="text-xs text-[#A5A5A5] leading-relaxed mb-8">
              Sign in with your authorized Google Account to retrieve active case schedules, track real-time court orders, upload evidence, or message case managers.
            </p>

            <button
              id="btn-portal-login"
              onClick={handleLogin}
              className="w-full flex items-center justify-center space-x-3 bg-[#D4AF37] hover:bg-[#FFF3B0] text-black font-semibold text-xs tracking-widest uppercase py-4 rounded-[2px] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
            >
              <User className="h-4 w-4" />
              <span>Connect Google Identity</span>
            </button>
          </div>
        ) : (
          /* AUTHENTICATED REAL CLIENT DASHBOARD */
          <div className="space-y-8 relative z-20">
            
            {/* Top Identity banner */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/[0.02] border border-white/10 p-6 rounded-[2px] gap-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={user.photoURL || ""} 
                  alt={user.displayName || "User"} 
                  className="w-12 h-12 rounded-full border border-[#D4AF37]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg font-serif font-semibold text-white">Welcome, {user.displayName}</h3>
                  <p className="text-xs font-mono text-[#A5A5A5]">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={createSampleCaseRecord}
                  disabled={creatingSample}
                  className="flex items-center space-x-2 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20 px-4 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-widest transition-all"
                >
                  {creatingSample ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="h-4 w-4" />
                  )}
                  <span>Create Sample Case Record</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-950/20 border border-red-900/30 text-red-400 hover:bg-red-900/30 px-4 py-2.5 rounded-[2px] text-xs font-mono uppercase tracking-widest transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Case Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Rail: User Case List */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-white/10 pb-2">
                  My Active Matters ({cases.length})
                </span>

                {casesLoading ? (
                  <div className="py-12 text-center">
                    <RefreshCw className="h-6 w-6 text-[#D4AF37] animate-spin mx-auto" />
                  </div>
                ) : cases.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {cases.map((c) => {
                      const isSelected = activeCase?.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveCase(c)}
                          className={`w-full text-left p-5 rounded-[2px] border transition-all ${
                            isSelected
                              ? "bg-white/[0.02] border-[#D4AF37] shadow-xl"
                              : "bg-[#111111]/40 border-white/5 hover:border-white/10"
                          }`}
                        >
                          <span className="block text-[9px] font-mono text-[#D4AF37] uppercase mb-1.5 font-semibold">{c.caseNo}</span>
                          <h4 className="text-sm font-serif font-medium text-white leading-snug mb-2">{c.court}</h4>
                          <span className="inline-block text-[10px] font-sans font-semibold text-white bg-white/5 px-2.5 py-1 rounded-[2px]">
                            {c.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[#111111]/40 border border-dashed border-white/10 rounded-[2px] p-8 text-center">
                    <p className="text-xs text-[#A5A5A5] mb-4">No active trial case files associated with this Google ID.</p>
                    <p className="text-[10px] text-gray-500 mb-4">
                      Click the "Create Sample Case Record" button above to dynamically provision a live, fully-functional database record.
                    </p>
                  </div>
                )}
              </div>

              {/* Right Workspace: Case details, documents, and upload log */}
              <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-[2px] p-6 md:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
                
                {activeCase ? (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5 gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest font-semibold">{activeCase.caseNo}</span>
                        <h4 className="text-xl font-serif text-white tracking-wide mt-1">{activeCase.court}</h4>
                      </div>
                      <div className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-[2px] text-[10px] font-mono uppercase self-start sm:self-auto font-semibold">
                        {activeCase.status}
                      </div>
                    </div>

                    {/* Quick Stats Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-[#050505] p-4 rounded-[2px] border border-white/10 flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-[10px] font-mono text-[#A5A5A5] uppercase tracking-wider">Next Court Hearing</p>
                          <p className="text-sm font-semibold text-white">{activeCase.nextHearing}</p>
                        </div>
                      </div>
                      <div className="bg-[#050505] p-4 rounded-[2px] border border-white/10 flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-[#D4AF37]" />
                        <div>
                          <p className="text-[10px] font-mono text-[#A5A5A5] uppercase tracking-wider">Matter Classification</p>
                          <p className="text-xs font-medium text-white max-w-[200px] truncate">{activeCase.matter}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Documents side-by-side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Interactive Case Timeline */}
                      <div className="space-y-3">
                        <span className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-white/5 pb-1 font-semibold">
                          Case Journey Timeline
                        </span>
                        <div className="space-y-3 pl-2 border-l border-white/10 max-h-[220px] overflow-y-auto">
                          {activeCase.timeline?.map((evt, idx) => (
                            <div key={idx} className="relative pl-3">
                              <div className="absolute left-[-17px] top-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                              <span className="block text-[9px] font-mono text-[#D4AF37]">{evt.date}</span>
                              <p className="text-xs text-white font-medium">{evt.title}</p>
                              <p className="text-[10px] text-[#A5A5A5] mt-0.5">{evt.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* File Log & Upload simulator */}
                      <div className="space-y-4">
                        <span className="block text-xs font-mono text-[#D4AF37] uppercase tracking-widest border-b border-white/5 pb-1 font-semibold">
                          Secured Evidence Files
                        </span>
                        
                        {/* File list */}
                        <div className="space-y-2 max-h-[120px] overflow-y-auto">
                          {activeCase.documents && activeCase.documents.length > 0 ? (
                            activeCase.documents.map((doc, idx) => (
                              <div key={idx} className="bg-[#050505] p-2 rounded-[2px] border border-white/10 flex justify-between items-center">
                                <span className="text-[11px] text-white truncate max-w-[160px]">{doc.name}</span>
                                <span className="text-[9px] font-mono text-[#A5A5A5]">{doc.date}</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-[10px] text-gray-500 italic">No files associated with case directory.</p>
                          )}
                        </div>

                        {/* Drag and drop zone */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => {
                            const name = prompt("Enter file name to upload simulation:");
                            if (name) handleFileUpload(name);
                          }}
                          className={`border border-dashed p-4 rounded-[2px] text-center cursor-pointer transition-all ${
                            isDragOver ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-white/10 hover:border-[#D4AF37]"
                          }`}
                        >
                          {uploadLoading ? (
                            <RefreshCw className="h-5 w-5 animate-spin text-[#D4AF37] mx-auto mb-1" />
                          ) : (
                            <Upload className="h-5 w-5 text-[#D4AF37] mx-auto mb-1" />
                          )}
                          <p className="text-[10px] text-white font-medium">Drag & Drop or Click to Upload</p>
                          <p className="text-[8px] text-[#A5A5A5] mt-0.5 font-mono">Saves directly to case ledger</p>
                        </div>
                      </div>

                    </div>

                  </div>
                ) : (
                  <div className="my-auto text-center py-12 flex flex-col items-center justify-center">
                    <Landmark className="h-12 w-12 text-gray-700 mb-4" />
                    <h4 className="text-sm font-serif text-white">Select a Case from Left</h4>
                    <p className="text-xs text-[#A5A5A5] mt-1 max-w-xs mx-auto">
                      Select an active judicial listing from the panel or click "Create Sample Case Record" to provision instant sandbox metrics.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
