import { motion } from 'motion/react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Circle, 
  ArrowUpRight, 
  Download,
  ListTodo,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Element, StatusType } from '../types';

interface DashboardViewProps {
  data: Element[];
  onSelectElement: (elementId: string) => void;
  onDownload: () => void;
}

export default function DashboardView({ data, onSelectElement, onDownload }: DashboardViewProps) {
  const getStats = (items: any[]) => {
    const total = items.length;
    const completed = items.filter(a => a.status === 'Selesai').length;
    const processing = items.filter(a => a.status === 'Proses').length;
    const pending = items.filter(a => a.status === 'Belum Selesai').length;
    return { total, completed, processing, pending };
  };

  const allAOIs = data.flatMap(e => e.topics.flatMap(t => t.aois));
  const globalStats = getStats(allAOIs);

  const calculateProgress = (element: Element) => {
    const total = element.topics.reduce((acc, t) => acc + t.aois.length, 0);
    const completed = element.topics.reduce((acc, t) => acc + t.aois.filter(a => a.status === 'Selesai').length, 0);
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500 p-6 rounded-2xl shadow-lg shadow-emerald-500/20 text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Total Completed</p>
                <h4 className="text-4xl font-black">{globalStats.completed}</h4>
              </div>
              <CheckCircle2 className="text-emerald-300" size={24} />
            </div>
            <p className="text-[10px] font-bold text-emerald-100 uppercase mt-4">Items verified as "Selesai"</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Items</p>
                <h4 className="text-4xl font-black text-amber-400">{globalStats.pending + globalStats.processing}</h4>
              </div>
              <Clock className="text-amber-400 opacity-50" size={24} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-4">In progress & not started</p>
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-600/20 text-white flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500 opacity-20 group-hover:scale-110 transition-transform" />
          <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-4">Export Analysis</p>
          <button 
            onClick={onDownload}
            className="flex items-center gap-3 px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg hover:scale-105 active:scale-95 transition-all relative z-10"
          >
            <Download size={14} />
            Download Progress
          </button>
        </div>
      </div>

      {/* Recap By Elements */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-blue-600" size={20} />
          <h3 className="text-lg font-black text-slate-800 italic uppercase tracking-tight">Rekapitulasi Per Elemen</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((element, idx) => {
            const progress = calculateProgress(element);
            const allItems = element.topics.flatMap(t => t.aois);
            const stats = getStats(allItems);
            
            return (
              <motion.div
                key={element.id}
                whileHover={{ y: -4 }}
                onClick={() => onSelectElement(element.id)}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-1 block">Elemen 0{idx + 1}</span>
                    <h5 className="font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{element.name.split(' - ')[1]}</h5>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-600">{progress}%</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Total</p>
                      <p className="text-sm font-black text-slate-700">{stats.total}</p>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg text-center">
                      <p className="text-[8px] font-bold text-emerald-400 uppercase leading-none mb-1">Done</p>
                      <p className="text-sm font-black text-emerald-600">{stats.completed}</p>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg text-center">
                      <p className="text-[8px] font-bold text-amber-400 uppercase leading-none mb-1">WIP</p>
                      <p className="text-sm font-black text-amber-600">{stats.processing}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Access Info */}
      <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} className="text-white" />
        </div>
        <div className="relative z-10 max-w-xl">
          <h4 className="text-white text-xl font-black italic uppercase mb-2">Pusat Informasi Kapabilitas APIP</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Gunakan dashboard ini untuk memantau progres pemenuhan Area of Improvement (AOI) secara real-time. 
            Setiap elemen mewakili domain penilaian maturitas APIP yang harus dipenuhi untuk mencapai level target.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Live Database</span>
            </div>
            <div className="flex items-center gap-2 text-white border-l border-slate-700 pl-4">
              <ListTodo size={14} className="text-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Updated Regularly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
