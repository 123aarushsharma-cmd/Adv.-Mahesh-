import React, { useState, useEffect } from "react";
import { Scale, LogIn, LogOut, Menu, X, User, ShieldAlert } from "lucide-react";
import { loginWithGoogle, logoutUser, auth } from "../firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import LawLogo from "./LawLogo";

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Navigation({ onNavigate, currentSection }: NavigationProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const menuItems = [
    { label: "Home", value: "home" },
    { label: "Practice Areas", value: "practice-areas" },
    { label: "About", value: "about" },
    { label: "Case Results", value: "case-results" },
    { label: "Legal Resources", value: "resources" },
    { label: "AI Chambers", value: "ai-features" },
    { label: "Consultation", value: "booking" },
    { label: "Client Portal", value: "portal", highlight: true },
    { label: "Contact", value: "contact" }
  ];

  const handleItemClick = (val: string) => {
    onNavigate(val);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="nav-container"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Section */}
          <div 
            id="brand-logo" 
            onClick={() => handleItemClick("home")}
            className="flex items-center cursor-pointer group"
          >
            <LawLogo size="sm" />
          </div>

          {/* Desktop Navigation Links */}
          <div id="desktop-links" className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = currentSection === item.value;
              return (
                <button
                  key={item.value}
                  id={`nav-link-${item.value}`}
                  onClick={() => handleItemClick(item.value)}
                  className={`px-4 py-2 text-xs font-sans tracking-widest uppercase rounded-[2px] transition-all duration-200 ${
                    item.highlight
                      ? isActive
                        ? "bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        : "border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                      : isActive
                        ? "text-[#D4AF37] border-b-2 border-[#D4AF37] rounded-none px-2 mx-2"
                        : "text-[#A5A5A5] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Profile / Auth Section */}
          <div id="auth-section" className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3 bg-[#111111] border border-[#D4AF37]/20 px-3 py-1.5 rounded-[2px]">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || "User"} 
                    className="w-7 h-7 rounded-full border border-[#D4AF37]/50"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 bg-[#222222] rounded-full flex items-center justify-center border border-[#D4AF37]/30">
                    <User className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-[10px] font-sans font-medium text-white max-w-[100px] truncate">
                    {user.displayName?.split(" ")[0] || "Client"}
                  </p>
                  <p className="text-[8px] font-mono text-[#A5A5A5] tracking-wider uppercase">Active Session</p>
                </div>
                <button
                  id="btn-nav-logout"
                  onClick={handleLogout}
                  title="Logout Session"
                  className="p-1 hover:text-red-400 text-gray-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-nav-login"
                onClick={handleLogin}
                className="flex items-center space-x-2 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-[2px] transition-all transform hover:-translate-y-0.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Client Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center space-x-4">
            {user && (
              <img 
                src={user.photoURL || ""} 
                alt="Profile" 
                className="w-7 h-7 rounded-full border border-[#D4AF37]/50"
                referrerPolicy="no-referrer"
                onClick={() => handleItemClick("portal")}
              />
            )}
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden bg-[#050505] border-b border-[#D4AF37]/20 absolute top-full left-0 w-full shadow-2xl">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <button
                key={item.value}
                id={`nav-mobile-${item.value}`}
                onClick={() => handleItemClick(item.value)}
                className={`block w-full text-left px-4 py-3 text-xs font-sans tracking-widest uppercase rounded-lg transition-colors ${
                  currentSection === item.value
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]"
                    : "text-[#A5A5A5] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 pb-2 border-t border-[#D4AF37]/20 px-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user.photoURL || ""} 
                      alt="User" 
                      className="w-8 h-8 rounded-full border border-[#D4AF37]/50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs text-white font-medium">{user.displayName}</p>
                      <p className="text-[10px] font-mono text-[#A5A5A5]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    id="btn-mobile-logout"
                    onClick={handleLogout}
                    className="p-2 bg-red-950/40 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-900/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="btn-mobile-login"
                  onClick={handleLogin}
                  className="w-full flex items-center justify-center space-x-2 bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-widest py-3 rounded-lg shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Client Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
