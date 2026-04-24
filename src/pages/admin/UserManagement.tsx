import { useState } from 'react';
import { User, Role } from '../../types';
import { 
  Users, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Mail, 
  ShieldCheck, 
  MoreVertical,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', nama: 'Administrator', username: 'admin', role: 'admin' },
    { id: '2', nama: 'Ibu Fatimah, S.Pd', username: 'fatimah', role: 'guru' },
    { id: '3', nama: 'Pak Budi Santoso', username: 'budi', role: 'staff' },
    { id: '4', nama: 'Ahmad Fauzi', username: 'ahmad', role: 'siswa', jurusan: 'TKJ' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({ role: 'guru' });

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    setUsers([...users, { ...newUser, id } as User]);
    setIsAdding(false);
    setNewUser({ role: 'guru' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
           <p className="text-slate-500 font-medium">Kelola akses dan otoritas seluruh pengguna sistem.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
        >
           <Plus size={20} />
           Tambah User
        </button>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
         <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 type="text" 
                 placeholder="Cari nama, username atau ID..." 
                 className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-primary/10"
               />
            </div>
            
            <div className="flex items-center gap-3">
               {(['all', 'admin', 'guru', 'staff', 'siswa'] as const).map((f) => (
                 <button 
                  key={f}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all active:scale-95"
                 >
                    {f}
                 </button>
               ))}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">User Profile</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Username / ID</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Access Role</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Dept / Jurusan</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/30 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-slate-100 rounded-[1rem] flex items-center justify-center text-slate-400 font-black relative">
                                {u.nama.charAt(0)}
                                {u.role === 'admin' && <ShieldCheck size={14} className="absolute -top-1 -right-1 text-primary" />}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-800 leading-none mb-1">{u.nama}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee UID: #{u.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-600">{u.username}</span>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            u.role === 'admin' ? 'bg-primary text-white' : 
                            u.role === 'guru' ? 'bg-blue-50 text-blue-600' : 
                            u.role === 'siswa' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
                          }`}>
                             {u.role}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <span className="text-sm font-bold text-slate-400 uppercase">{u.jurusan || 'Sekretariat'}</span>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                <Edit2 size={16} />
                             </button>
                             <button 
                               onClick={() => deleteUser(u.id)}
                               className="p-2.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-slate-50/50 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400">Menampilkan {users.length} pengguna aktif dalam sistem.</p>
            <div className="flex items-center gap-2">
               <button className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all">1</button>
               <button className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-all">2</button>
            </div>
         </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsAdding(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
            />
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 shadow-3xl"
            >
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Tambah Akun Baru</h3>
                  <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><X size={20} /></button>
               </div>

               <form onSubmit={addUser} className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nama Lengkap</label>
                     <input 
                       type="text" 
                       required 
                       onChange={(e) => setNewUser({...newUser, nama: e.target.value})}
                       className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary transition-all focus:outline-none font-bold"
                       placeholder="Contoh: Budi Santoso, S.Kom"
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
                     <input 
                       type="text" 
                       required 
                       onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                       className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary transition-all focus:outline-none font-bold"
                       placeholder="budisantoso99"
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role Akses</label>
                        <select 
                           onChange={(e) => setNewUser({...newUser, role: e.target.value as Role})}
                           className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary transition-all focus:outline-none font-bold appearance-none"
                        >
                           <option value="guru">Guru</option>
                           <option value="staff">Staff / Tendik</option>
                           <option value="siswa">Siswa</option>
                           <option value="admin">Admin</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sistem Password</label>
                        <div className="px-6 py-4 bg-slate-200 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 text-center uppercase tracking-widest text-xs">
                           Auto-Generated
                        </div>
                     </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-base shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all mt-4"
                  >
                     Create Account Access
                  </button>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
