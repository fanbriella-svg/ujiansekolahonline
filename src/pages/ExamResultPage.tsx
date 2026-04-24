import { motion } from 'motion/react';
import { Trophy, FileText, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { User } from '../types';

export default function ExamResultPage({ user }: { user: User }) {
  const results = [
    { title: 'Ujian Tengah Semester', score: 85, date: '12 April 2026', passed: true, subjects: 'Produ produktif TKJ' },
    { title: 'Kuis Jaringan Dasar', score: 45, date: '20 April 2026', passed: false, subjects: 'Komputer & Jaringan' },
    { title: 'Praktik Perakitan PC', score: 92, date: '22 April 2026', passed: true, subjects: 'Sistem Komputer' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
         <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hasil Penilaian</h1>
         <p className="text-slate-500 font-medium">Rekaman nilai ujian dan tugas akademik Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-primary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Trophy size={32} />
                 </div>
                 <p className="text-sm font-bold text-white/60 mb-1">Rata-rata Nilai</p>
                 <h2 className="text-5xl font-black text-white">74.0</h2>
                 <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-4">Peringkat 12 dari 35 Siswa</p>
              </div>
              <div className="absolute top-[-20%] right-[-20%] w-60 h-60 bg-white/5 blur-3xl rounded-full" />
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
              <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
                 <GraduationCap size={18} className="text-primary" />
                 Distribusi Nilai
              </h3>
              <div className="space-y-4">
                 {[
                   { label: 'Sangat Baik', val: 12, color: 'bg-green-500' },
                   { label: 'Cukup', val: 45, color: 'bg-orange-500' },
                   { label: 'Kurang', val: 3, color: 'bg-primary' },
                 ].map((d, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span>{d.label}</span>
                         <span>{d.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                         <div className={`h-full ${d.color}`} style={{ width: `${d.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="lg:col-span-2">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30">
              <h3 className="text-xl font-black text-slate-900 mb-8">Riwayat Ujian</h3>
              <div className="space-y-4">
                 {results.map((res, i) => (
                   <div key={i} className="p-6 bg-slate-50 rounded-[1.8rem] flex items-center justify-between group hover:bg-slate-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-5">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${res.passed ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'}`}>
                            <FileText size={24} />
                         </div>
                         <div>
                            <p className="text-lg font-black text-slate-900 leading-tight mb-1">{res.title}</p>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{res.subjects} • {res.date}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <p className={`text-2xl font-black ${res.passed ? 'text-green-600' : 'text-primary'}`}>{res.score}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">{res.passed ? 'Lulus' : 'Remidi'}</p>
                         </div>
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-all shadow-sm">
                            <ChevronRight size={20} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-8 py-4 bg-slate-900/5 text-slate-400 rounded-2xl font-bold text-sm tracking-tight hover:bg-slate-900/10 transition-all">
                 Lihat Semua Riwayat
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
