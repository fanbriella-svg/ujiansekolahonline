import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  MapPin, 
  Globe, 
  Cpu, 
  Palette, 
  Calculator, 
  Radio, 
  Briefcase, 
  Building2 
} from 'lucide-react';

const JURUSAN_DETAILS = [
  { name: 'TKJ', desc: 'Teknik Komputer & Jaringan', icon: Cpu, color: 'bg-blue-500' },
  { name: 'DKV', desc: 'Desain Komunikasi Visual', icon: Palette, color: 'bg-purple-500' },
  { name: 'AK', desc: 'Akuntansi & Keuangan', icon: Calculator, color: 'bg-green-500' },
  { name: 'BC', desc: 'Broadcasting', icon: Radio, color: 'bg-orange-500' },
  { name: 'MPLB', desc: 'Manajemen Perkantoran', icon: Building2, color: 'bg-indigo-500' },
  { name: 'BD', desc: 'Bisnis Digital', icon: Briefcase, color: 'bg-red-500' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">SMK PRIMA UNGGUL</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#profile" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Profile</a>
            <a href="#jurusan" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">Jurusan</a>
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
            >
              Masuk Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full mb-6">
              <Globe size={16} />
              <span className="text-xs font-bold tracking-wider uppercase">Terakreditasi A • Unggul & Kompeten</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.05] text-slate-900 mb-8">
              Membangun <span className="text-primary">Masa Depan</span> Digital Bangsa.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              SMK Prima Unggul hadir sebagai pionir pendidikan vokasi berkualitas di Tangerang Selatan, mencetak tenaga kerja profesional yang siap bersaing di era digital.
            </p>
            <div className="flex items-center gap-6">
              <Link 
                to="/login" 
                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Mulai Belajar Sekarang
                <ArrowRight size={20} />
              </Link>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-full h-full rounded-full" alt="Student" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                  +2k
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden rotate-3 shadow-2xl">
               <img 
                 src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                 alt="School Life" 
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs -rotate-3 border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-extrabold">Tangerang Selatan</p>
                 </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Berlokasi strategis di jantung kota Tangsel dengan fasilitas lab lengkap.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Siswa Aktif', value: '2,500+' },
            { label: 'Guru Profesional', value: '85+' },
            { label: 'Mitra Industri', value: '120+' },
            { label: 'Penyerapan Kerja', value: '94%' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-4xl font-black mb-2 text-primary">{stat.value}</h3>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Jurusan Section */}
      <section id="jurusan" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">6 Pilihan Program</h2>
          <h3 className="text-5xl font-black text-slate-900 leading-tight">Jurusan Unggulan Kami</h3>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JURUSAN_DETAILS.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group"
            >
              <div className={`w-16 h-16 ${j.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl`}>
                <j.icon size={32} />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-4">{j.name}</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">{j.desc}</p>
              <button className="flex items-center gap-2 text-primary font-bold text-sm tracking-tight group-hover:gap-3 transition-all">
                Pelajari Lebih Lanjut
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                 <ShieldCheck className="text-white" size={16} />
              </div>
              <span className="font-black text-slate-900">SMK PRIMA UNGGUL</span>
           </div>
           <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
             © 2026 Crafted for Professional Education.
           </p>
        </div>
      </footer>
    </div>
  );
}
