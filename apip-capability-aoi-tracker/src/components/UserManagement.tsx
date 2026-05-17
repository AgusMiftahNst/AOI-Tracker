import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, Trash2, Shield, User as UserIcon, X, Plus } from 'lucide-react';
import { User, Role } from '../types';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    username: '',
    password: '',
    name: '',
    role: 'user' as Role
  });

  // Load users from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('apip_users');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem('apip_users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      ...newUserInfo
    };
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setNewUserInfo({ username: '', password: '', name: '', role: 'user' });
  };

  const removeUser = (id: string) => {
    if (confirm('Hapus pengguna ini?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Manajemen Pengguna</h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-bold">Kelola akses akun inspektorat</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
        >
          <UserPlus size={14} />
          Tambah Akun
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <motion.div
            layout
            key={user.id}
            className="bg-white border border-slate-100 rounded-xl p-5 hover:border-blue-200 transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => removeUser(user.id)}
                className="text-rose-400 hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                <UserIcon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 leading-none">{user.name}</h4>
                <p className="text-xs text-slate-500 mt-1">@{user.username}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                user.role === 'admin' ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-500'
              }`}>
                {user.role}
              </span>
              <p className="text-[10px] font-mono text-slate-300">ID: {user.id.slice(-6)}</p>
            </div>
          </motion.div>
        ))}
        
        {users.length === 0 && (
          <div className="col-span-full py-12 text-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl">
            <UserIcon size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium text-slate-500">Belum ada akun tambahan yang dibuat.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-slate-800 uppercase tracking-tight italic">Registrasi Akun Baru</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X />
                </button>
              </div>
              <form onSubmit={handleAddUser} className="p-8 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newUserInfo.name}
                    onChange={(e) => setNewUserInfo({...newUserInfo, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Username</label>
                  <input
                    type="text"
                    required
                    value={newUserInfo.username}
                    onChange={(e) => setNewUserInfo({...newUserInfo, username: e.target.value})}
                    placeholder="Username"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Password</label>
                  <input
                    type="password"
                    required
                    value={newUserInfo.password}
                    onChange={(e) => setNewUserInfo({...newUserInfo, password: e.target.value})}
                    placeholder="********"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                  />
                </div>
                <div className="space-y-1.5 pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Akses Role</label>
                  <select
                    value={newUserInfo.role}
                    onChange={(e) => setNewUserInfo({...newUserInfo, role: e.target.value as Role})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-600 transition-all"
                  >
                    <option value="user">User - Hanya Evidence</option>
                    <option value="admin">Admin - Full Access</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white font-bold uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl shadow-xl shadow-black/20 transition-all active:scale-95 mt-6"
                >
                  Confirm & Create Account
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
