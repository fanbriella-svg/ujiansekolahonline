/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate login attempt
    setTimeout(() => {
      setIsLoading(false);
      setError("Login gagal. Periksa kembali username/email dan password Anda.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500/30 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Side: Branding/Identity (Editorial Palette) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] relative p-16 flex-col justify-between overflow-hidden border-r border-white/10">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-600 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900 rounded-full blur-[120px]" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-black" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">SecurePortal</span>
          </motion.div>

          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[120px] font-bold leading-[0.8] tracking-tighter mb-8"
            >
              ACCESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">LOCKED.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-lg max-w-md font-light leading-relaxed"
            >
              Enter your credentials to access the encrypted workspace. Enterprise-grade security for your digital assets.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/30"
          >
            <span>v2.4.0 (Stable)</span>
            <span>AES-256 Encrypted</span>
            <span>Multi-Factor Ready</span>
          </motion.div>
        </div>

        {/* Right Side: Login Form (Minimal Utility Palette) */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
          {/* Mobile Logo */}
          <div className="absolute top-8 left-8 lg:hidden flex items-center gap-2">
             <ShieldCheck size={20} />
             <span className="font-bold tracking-tight">SecurePortal</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[420px]"
          >
            <div className="mb-10">
              <h2 className="text-4xl font-bold tracking-tight mb-2">Welcome back</h2>
              <p className="text-white/40">Please enter your details to sign in.</p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-400 text-sm"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-white/10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Password</label>
                  <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-colors">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:bg-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-white/10"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={isLoading}
                  className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
              <p className="text-white/30 text-sm">Don't have an account?</p>
              <button className="flex items-center gap-2 text-white font-medium hover:gap-3 transition-all group">
                Create an account
                <ChevronRight size={16} className="text-white/40 group-hover:text-white" />
              </button>
            </div>
          </motion.div>

          <footer className="absolute bottom-8 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © 2026 SecurePortal Inc. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
