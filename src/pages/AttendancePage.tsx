import { useState } from 'react';
import { User, Attendance } from '../types';
import { motion } from 'motion/react';
import { 
  Camera, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Search,
  ChevronDown,
  User as UserIcon
} from 'lucide-react';
import { format } from 'date-fns';

interface AttendancePageProps {
  user: User;
  type?: 'staff' | 'student';
}

export default function AttendancePage({ user, type = 'staff' }: AttendancePageProps) {
  const [marked, setMarked] = useState(false);
  const [selectedClass, setSelectedClass] = useState('XII TKJ 1');
  const [students, setStudents] = useState([
    { id: '1', name: 'Ahmad Fauzi', status: 'hadir', nis: '10291' },
    { id: '2', name: 'Budi Santoso', status: 'alpha', nis: '10292' },
    { id: '3', name: 'Citra Kirana', status: 'sakit', nis: '10293' },
    { id: '4', name: 'Dewi Sartika', status: 'hadir', nis: '10294' },
  ]);

  const handleMarkAttendance = () => {
    setMarked(true);
  };

  const isGuru = user.role === 'guru' || user.role === 'admin';
  const showStaffOnly = type === 'staff';
  const showStudentOnly = type === 'student';

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">
             {showStudentOnly ? 'Presensi Siswa' : 'Presensi Karyawan'}
           </h1>
           <p className="text-slate-500 font-medium">
             {showStudentOnly 
               ? 'Input data kehadiran siswa untuk kelas yang diajar.' 
               : 'Lakukan pencatatan kehadiran mandiri untuk staf dan guru.'}
           </p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <Calendar size={18} className="text-primary" />
              <span className="text-sm font-bold text-slate-700">{format(new Date(), 'dd MMMM yyyy')}</span>
           </div>
           <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <Clock size={18} className="text-primary" />
              <span className="text-sm font-bold text-slate-700">{format(new Date(), 'HH:mm')} WIB</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Self Attendance Card (Always visible for Staff/Guru/Admin if not student-only view) */}
        {!showStudentOnly && (
          <div className="lg:col-span-5">
             <div className={`p-10 rounded-[3.5rem] border shadow-2xl transition-all ${marked ? 'bg-green-50 border-green-100' : 'bg-white border-slate-100'}`}>
                <div className="text-center mb-10">
                   <div className={`w-24 h-24 mx-auto rounded-[2.5rem] flex items-center justify-center mb-6 transition-all ${marked ? 'bg-green-500 text-white shadow-xl shadow-green-500/30' : 'bg-primary/5 text-primary'}`}>
                      {marked ? <CheckCircle2 size={40} /> : <Camera size={40} />}
                   </div>
                   <h2 className="text-2xl font-black text-slate-900 mb-2">Presensi Mandiri</h2>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">
                     {marked ? 'Anda telah berhasil melakukan presensi hari ini.' : 'Pastikan Anda berada di radius area sekolah sebelum memindai.'}
                   </p>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                         <MapPin size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lokasi Sekarang</p>
                         <p className="text-sm font-bold text-slate-800">Tangerang Selatan, Banten</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400">
                         <ShieldCheck size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verifikasi Biometrik</p>
                         <p className="text-sm font-bold text-slate-800">Status: Hijau (Area Sekolah)</p>
                      </div>
                   </div>
                </div>

                {!marked && (
                  <button 
                    onClick={handleMarkAttendance}
                    className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
                  >
                    Confirm Presence
                    <CheckCircle2 size={24} />
                  </button>
                )}

                {marked && (
                  <div className="text-center py-4">
                     <p className="text-xs font-black text-green-600 uppercase tracking-widest">Success • Logged 07:45 AM</p>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* Right: Class Attendance (Only for Guru/Admin in student-only view or both) */}
        {isGuru && !showStaffOnly && (
          <div className={`${showStudentOnly ? 'lg:col-span-12' : 'lg:col-span-7'} space-y-6`}>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">Presensi Siswa</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Input Kehadiran Kelas</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl cursor-not-allowed">
                     <span className="text-sm font-bold text-slate-600">{selectedClass}</span>
                     <ChevronDown size={16} className="text-slate-400" />
                  </div>
               </div>

               <div className="mb-6 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Cari nama atau NIS siswa..." 
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                  />
               </div>

               <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 bg-white border border-slate-50 rounded-[1.5rem] flex items-center justify-between hover:border-primary/20 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                             <UserIcon size={20} />
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-800">{student.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NIS: {student.nis}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-tighter">
                          {(['hadir', 'izin', 'sakit', 'alpha'] as const).map((s) => (
                            <button
                              key={s}
                              className={`px-3 py-1.5 rounded-xl transition-all ${
                                student.status === s 
                                  ? (s === 'hadir' ? 'bg-green-500 text-white shadow-md' : 'bg-primary text-white shadow-md') 
                                  : 'text-slate-300 hover:text-slate-500'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-8 pt-8 border-t border-slate-50 flex justify-end">
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                    Simpan Laporan Kelas
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
