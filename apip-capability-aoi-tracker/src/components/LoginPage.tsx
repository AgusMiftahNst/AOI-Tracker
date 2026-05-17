import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, User as UserIcon, ShieldCheck, AlertCircle } from 'lucide-react';
import { User, Role } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Get users from localStorage to check for created users
    const storedUsers: User[] = JSON.parse(localStorage.getItem('apip_users') || '[]');
    
    // Default admin
    const adminUser: User = { id: 'admin-1', username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator' };
    
    const allUsers = [adminUser, ...storedUsers];
    const foundUser = allUsers.find(u => u.username === username && u.password === password);

    setTimeout(() => {
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Username atau password salah.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.2),transparent_100%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 pb-0 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 mb-6 group transition-all duration-500 hover:scale-110">
            <ShieldCheck className="w-8 h-8 text-blue-500 group-hover:text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase italic flex flex-col">
            APIP AOI Tracker
            <span className="text-[10px] text-blue-500 font-bold tracking-[0.3em] not-italic mt-1 uppercase">Authentication System</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl flex items-center gap-3 text-rose-400 text-sm font-medium"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Username</label>
            <div className="relative group">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl shadow-lg shadow-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Access Dashboard'
            )}
          </button>
          
          <div className="text-center pt-4">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
              Secured by Paniai Inspectorate <span className="text-blue-500">APIP-TECH</span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
