import { useState } from 'react';
import { Search, GraduationCap, LayoutGrid, List, Filter } from 'lucide-react';

export default function StudentManagement() {
  const students = [
    { nis: '10291', name: 'Ahmad Fauzi', class: 'XII TKJ 1', jurusan: 'TKJ' },
    { nis: '10292', name: 'Budi Santoso', class: 'XII TKJ 2', jurusan: 'TKJ' },
    { nis: '10293', name: 'Citra Kirana', class: 'XI DKV 1', jurusan: 'DKV' },
    { nis: '10294', name: 'Dewi Sartika', class: 'X AK 1', jurusan: 'AK' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Database Siswa</h1>
           <p className="text-slate-500 font-medium">Manajemen data profil dan akademik seluruh siswa SMK.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all shadow-sm"><LayoutGrid size={20} /></button>
           <button className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20"><List size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Siswa', val: '1,240', color: 'text-primary' },
          { label: 'Siswa Laki-laki', val: '680', color: 'text-blue-500' },
          { label: 'Siswa Perempuan', val: '560', color: 'text-pink-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
             <h3 className={`text-3xl font-black ${s.color}`}>{s.val}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl">
         <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 type="text" 
                 placeholder="Cari berdasarkan NIS atau Nama..." 
                 className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium"
               />
            </div>
            <button className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 hover:bg-slate-100 transition-all">
               <Filter size={16} />
               Filter Kelas
            </button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((s) => (
              <div key={s.nis} className="p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-primary/20 transition-all group cursor-pointer">
                 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 text-slate-300 shadow-sm mx-auto group-hover:scale-110 transition-transform">
                    <GraduationCap size={32} />
                 </div>
                 <div className="text-center">
                    <h4 className="text-lg font-black text-slate-800 mb-1 leading-tight">{s.name}</h4>
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">{s.jurusan} • {s.class}</p>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                       <span className="text-[10px] font-bold text-slate-400">NIS: {s.nis}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
