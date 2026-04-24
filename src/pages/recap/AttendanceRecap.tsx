import { User } from '../../types';
import { Calendar, Download, FileText, ChevronRight, Filter } from 'lucide-react';

export default function AttendanceRecap({ user }: { user: User }) {
  const data = [
    { name: 'Ahmad Fauzi', hadir: 22, izin: 0, sakit: 1, alpha: 0, status: '96%' },
    { name: 'Budi Santoso', hadir: 18, izin: 2, sakit: 0, alpha: 3, status: '78%' },
    { name: 'Citra Kirana', hadir: 23, izin: 0, sakit: 0, alpha: 0, status: '100%' },
    { name: 'Dewi Sartika', hadir: 21, izin: 1, sakit: 1, alpha: 0, status: '91%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rekapitulasi Absensi</h1>
           <p className="text-slate-500 font-medium">Laporan kehadiran operasional periode April 2026.</p>
        </div>
        <button className="px-6 py-4 bg-primary text-white rounded-2xl font-black text-sm flex items-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all">
           <Download size={20} />
           Export PDF / Excel
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20">
              <h3 className="text-sm font-black text-slate-900 mb-6 flex items-center gap-2">
                 <Calendar size={18} className="text-primary" />
                 Periode Laporan
              </h3>
              <div className="space-y-3">
                 {['April 2026', 'Maret 2026', 'Februari 2026'].map((m) => (
                   <button key={m} className={`w-full p-4 rounded-2xl text-sm font-bold flex items-center justify-between transition-all ${m === 'April 2026' ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                      {m}
                      < ChevronRight size={16} />
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-lg font-black mb-4">Informasi Kinerja</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                Rata-rata kehadiran seluruh civitas mencapai angka 92.4% di periode ini.
              </p>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[92%]" />
              </div>
           </div>
        </div>

        <div className="lg:col-span-3">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900">List Kehadiran Siswa</h3>
                 <div className="flex gap-2">
                    <button className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">Siswa</button>
                    <button className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">Karyawan</button>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Hadir</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Izin</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Sakit</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Alpha</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Persentase</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {data.map((row, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-5 font-black text-sm text-slate-800">{row.name}</td>
                            <td className="px-6 py-5 text-center font-bold text-sm text-slate-600">{row.hadir}</td>
                            <td className="px-6 py-5 text-center font-bold text-sm text-slate-600">{row.izin}</td>
                            <td className="px-6 py-5 text-center font-bold text-sm text-slate-600">{row.sakit}</td>
                            <td className="px-6 py-5 text-center font-bold text-sm text-primary">{row.alpha}</td>
                            <td className="px-6 py-5 text-right">
                               <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full">{row.status}</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
