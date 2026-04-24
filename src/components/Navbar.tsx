import { LogOut, User, Bell, Search, MapPin, Calendar } from 'lucide-react';
import { User as UserType } from '../types';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface NavbarProps {
  user: UserType;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const today = new Date();
  
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-xl">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48"
          />
        </div>
        
        <div className="flex items-center gap-4 text-slate-500">
           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 text-primary rounded-full">
              <MapPin size={14} />
              <span className="text-xs font-bold">Tangsel</span>
           </div>
           <div className="flex items-center gap-1.5 text-xs font-medium">
              <Calendar size={14} />
              <span>{format(today, 'EEEE, d MMMM yyyy', { locale: id })}</span>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-100 mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">{user.nama}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-tighter mt-1">
              {user.role} {user.jurusan ? `• ${user.jurusan}` : ''}
            </p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200">
            <User size={20} />
          </div>
          
          <button 
            onClick={onLogout}
            className="ml-2 p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all group"
            title="Sesi Logout"
          >
            <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}
