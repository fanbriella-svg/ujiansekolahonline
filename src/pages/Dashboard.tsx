import { User } from '../types';
import { motion } from 'motion/react';
import { 
  Users, 
  UserCheck, 
  ClipboardList, 
  TrendingUp, 
  Clock, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    { label: 'Kehadiran Hari Ini', value: '98%', icon: UserCheck, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Total Siswa', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Rata-rata Nilai', value: '78.5', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Ujian Berlangsung', value: '3', icon: ClipboardList, color: 'text-primary', bg: 'bg-primary/5' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">Selamat datang kembali, <span className="text-primary font-bold">{user.nama}</span>. Sistem siap digunakan.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
           <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Clock size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesi Aktif</p>
              <p className="text-sm font-bold text-slate-800">{format(new Date(), 'HH:mm')} • Tangsel</p>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:scale-[1.02] transition-all"
          >
           <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[1.4rem] flex items-center justify-center`}>
                <stat.icon size={28} />
              </div>
           </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Welcome Card */}
          <div className="bg-primary p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 max-w-lg">
               <h2 className="text-4xl font-black leading-tight mb-4 tracking-tight">Kembangkan Potensi, <br />Raih Kompetensi Unggul.</h2>
               <p className="text-white/80 font-medium mb-8 leading-relaxed">
                 Sekolah Menengah Kejuruan Prima Unggul berkomitmen mencetak lulusan dengan Standar Kerja Industri (SKI) tertinggi.
               </p>
               <button className="px-8 py-3 bg-white text-primary rounded-2xl font-black text-sm hover:scale-105 transition-all active:scale-95">
                 Pelajari SOP Sekolah
               </button>
            </div>
            <div className="absolute right-[-10%] bottom-[-20%] w-[50%] h-[120%] opacity-10 rotate-12 bg-white/20 blur-[100px] pointer-events-none" />
          </div>

          {/* Activity/Announcements */}
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
               <AlertTriangle size={20} className="text-primary" />
               Pengumuman Akademik
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Ujian Akhir Semester Ganjil', date: 'Mulai 2 Mei 2026', type: 'Penting' },
                { title: 'Pembaruan Sistem Absensi Mobile', date: 'Selesai 28 April 2026', type: 'Update' },
                { title: 'Libur Hari Raya Idul Fitri', date: '30 April - 10 Mei 2026', type: 'Info' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group">
                   <div className="flex items-center gap-4">
                      <div className="w-1.5 h-8 bg-primary rounded-full" />
                      <div>
                        <p className="text-sm font-black text-slate-800">{item.title}</p>
                        <p className="text-xs font-medium text-slate-500">{item.date}</p>
                      </div>
                   </div>
                   <span className="px-3 py-1 bg-white text-[10px] font-black uppercase text-slate-400 rounded-full border border-slate-200">{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area: Profile / Quick Actions */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-[2rem] mx-auto mb-6 flex items-center justify-center text-slate-400 border-4 border-slate-50">
                 <Users size={40} />
              </div>
              <h4 className="text-xl font-black text-slate-900">{user.nama}</h4>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mt-1">ID: {user.nisn || user.username}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-bold text-green-500">Aktif</p>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Role</p>
                    <p className="text-xs font-bold text-slate-700 capitalize">{user.role}</p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl">
              <h4 className="text-lg font-black mb-4">Quick Link</h4>
              <div className="space-y-3">
                 <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold flex items-center justify-between transition-all group">
                    Bantuan IT
                    <TrendingUp size={16} className="text-white/40 group-hover:text-white" />
                 </button>
                 <button className="w-full py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-bold flex items-center justify-between transition-all group">
                    Laporan Kendala
                    <TrendingUp size={16} className="text-white/40 group-hover:text-white" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
