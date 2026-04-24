import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  AlertCircle, 
  Loader2,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { User, Role, Jurusan } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [role, setRole] = useState<Role>('siswa');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate Auth
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation for demo
      if (username === 'admin' && password === 'admin') {
        const u: User = { id: '1', username: 'admin', nama: 'Administrator', role: 'admin' };
        onLogin(u);
        navigate('/app');
      } else if (role === 'siswa' && username.length > 5 && password === 'siswa') {
        const u: User = { 
          id: 's1', 
          username, 
          nama: 'Bintang Albudiaji', 
          role: 'siswa', 
          nisn: username,
          jurusan: 'TKJ' 
        };
        onLogin(u);
        navigate('/app');
      } else if (role === 'guru' && username === 'guru' && password === 'guru') {
        const u: User = { id: 'g1', username, nama: 'Ibu Fatimah, S.Pd', role: 'guru' };
        onLogin(u);
        navigate('/app');
      } else {
        setError("Login gagal. Periksa kembali username/email dan password Anda.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-[0.03]">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px]"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/20 mb-6">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Portal Akademik</h1>
          <p className="text-slate-500 font-medium">Selamat datang di Sistem Terpadu SMK Prima Unggul</p>
        </div>

        {/* Role Switcher */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center mb-8">
          {(['siswa', 'guru', 'staff', 'admin'] as Role[]).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                role === r ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-4 text-red-600 mb-8 overflow-hidden"
            >
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm font-bold leading-relaxed">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">
              {role === 'siswa' ? 'NISN / Username' : 'Username'}
            </label>
            <div className="relative group">
              <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'siswa' ? "Masukkan NISN Anda" : "Masukkan Username"}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] py-4 pl-14 pr-6 focus:bg-white focus:border-primary focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300 placeholder:font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Password</label>
                <button type="button" className="text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:underline transition-all">Lupa?</button>
             </div>
             <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.25rem] py-4 pl-14 pr-6 focus:bg-white focus:border-primary focus:outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-5 rounded-[1.4rem] font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-white" size={24} />
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 text-center">
           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">
             Belum memiliki akun? Hubungi Admin Sekolah <br />
             <span className="text-primary cursor-pointer hover:underline">SMK PRIMA UNGGUL</span>
           </p>
        </div>
      </motion.div>

      {/* Mini Footer Info */}
      <footer className="absolute bottom-8 left-0 w-full text-center">
         <div className="flex items-center justify-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black text-slate-300">
            <span className="flex items-center gap-1"><BookOpen size={10} /> Online Exam Ready</span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> AES-256 Encrypted</span>
         </div>
      </footer>
    </div>
  );
}
