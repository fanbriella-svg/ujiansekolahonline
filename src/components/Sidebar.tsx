import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCheck, 
  ClipboardList, 
  Users, 
  GraduationCap, 
  FileBox,
  LogOut,
  BookOpen
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
}

export default function Sidebar({ role }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app', roles: ['admin', 'guru', 'staff', 'siswa'] },
    { icon: UserCheck, label: 'Absensi Karyawan', path: '/app/attendance-staff', roles: ['admin', 'guru', 'staff'] },
    { icon: ClipboardList, label: 'Absensi Siswa', path: '/app/attendance-student', roles: ['admin', 'guru'] },
    { icon: BookOpen, label: 'Ujian Online', path: '/app/exam', roles: ['siswa'] },
    { icon: FileBox, label: 'Hasil Ujian', path: '/app/exam-results', roles: ['admin', 'guru', 'siswa'] },
    { icon: GraduationCap, label: 'Data Siswa', path: '/app/admin/students', roles: ['admin'] },
    { icon: Users, label: 'User Management', path: '/app/admin/users', roles: ['admin'] },
    { icon: ClipboardList, label: 'Rekap Absensi', path: '/app/recap', roles: ['admin', 'guru'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <GraduationCap className="text-white" size={20} />
        </div>
        <span className="font-bold text-lg tracking-tight text-slate-800">SMK Prima</span>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1 overflow-y-auto">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
              }`
            }
          >
            <item.icon size={20} className="shrink-0" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-slate-50 rounded-2xl p-4">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs font-semibold text-slate-600 capitalize">{role} Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
