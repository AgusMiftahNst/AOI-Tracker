import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Circle, 
  Clock, 
  User as UserIcon, 
  Calendar, 
  FileText, 
  LayoutDashboard,
  Search,
  Filter,
  Save,
  Trash2,
  Menu,
  X,
  Users,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { aoiData } from './data/aoiData';
import { Element, Topic, AOIItem, Role, User, StatusType } from './types';
import LoginPage from './components/LoginPage';
import UserManagement from './components/UserManagement';
import DashboardView from './components/DashboardView';

export default function App() {
  const [data, setData] = useState<Element[]>(aoiData);
  const [activeElementId, setActiveElementId] = useState<string>(aoiData[0].id);
  const [activeTopicId, setActiveTopicId] = useState<string>(aoiData[0].topics[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'element' | 'users'>('dashboard');
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('apip_aoi_tracker_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setData(parsed);
        }
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }

    const savedUser = localStorage.getItem('apip_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsAuthReady(true);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('apip_aoi_tracker_data', JSON.stringify(data));
  }, [data]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('apip_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('apip_current_user');
    setActiveView('dashboard');
  };

  const activeElement = data.find(e => e.id === activeElementId) || data[0];
  const activeTopic = activeElement.topics.find(t => t.id === activeTopicId) || activeElement.topics[0];

  const updateAOI = (aoiId: string, updates: Partial<AOIItem>) => {
    setData(prevData => {
      return prevData.map(element => ({
        ...element,
        topics: element.topics.map(topic => ({
          ...topic,
          aois: topic.aois.map(aoi => 
            aoi.id === aoiId ? { ...aoi, ...updates } : aoi
          )
        }))
      }));
    });
  };

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case 'Selesai': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'Proses': return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <Circle className="w-5 h-5 text-slate-300" />;
    }
  };

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'Selesai': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Proses': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-rose-100 text-rose-700 border-rose-200';
    }
  };

  const calculateElementProgress = (element: Element) => {
    const total = element.topics.reduce((acc, t) => acc + t.aois.length, 0);
    const completed = element.topics.reduce((acc, t) => acc + t.aois.filter(a => a.status === 'Selesai').length, 0);
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const totalAOIs = data.reduce((acc, e) => acc + e.topics.reduce((ta, t) => ta + t.aois.length, 0), 0);
  const completedAOIs = data.reduce((acc, e) => acc + e.topics.reduce((ta, t) => ta + t.aois.filter(a => a.status === 'Selesai').length, 0), 0);
  const overallPercentage = totalAOIs === 0 ? 0 : (completedAOIs / totalAOIs) * 5;

  const downloadProgress = () => {
    const headers = ['Elemen', 'Kode', 'Judul AOI', 'Rencana Aksi', 'Status', 'PIC', 'Deadline', 'Evidence'];
    const rows = data.flatMap(element => 
      element.topics.flatMap(topic => 
        topic.aois.map(aoi => [
          element.name,
          aoi.code,
          `"${aoi.title.replace(/"/g, '""')}"`,
          `"${aoi.actionPlan.replace(/"/g, '""')}"`,
          aoi.status,
          aoi.pic,
          aoi.completionDate,
          aoi.documentRef
        ])
      )
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Progress_AOI_KAPABILITAS_APIP_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthReady) return null;
  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  return (
    <div id="app-root" className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 bg-slate-900 text-white flex flex-col z-20 shrink-0"
          >
            <div className="p-6 border-b border-slate-700 bg-slate-800">
              <h1 className="text-xl font-bold tracking-tight text-blue-400">KAPABILITAS APIP</h1>
              <p className="text-[10px] opacity-60 mt-1 uppercase tracking-widest leading-none">AOI Tracker v2.5</p>
            </div>
            
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto no-scrollbar">
              <div className="mb-4 px-3">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 px-1">Main Menu</p>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard size={18} />
                  <span className="text-sm font-bold uppercase tracking-tight">Dashboard</span>
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setActiveView('users')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mt-2 ${
                      activeView === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Users size={18} />
                    <span className="text-sm font-bold uppercase tracking-tight">Karyawan</span>
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 px-3">Elements</p>
                {data.map((element) => {
                  const progress = calculateElementProgress(element);
                  const isActive = activeView === 'element' && activeElementId === element.id;
                  return (
                    <button
                      key={element.id}
                      onClick={() => {
                        setActiveView('element');
                        setActiveElementId(element.id);
                        setActiveTopicId(element.topics[0]?.id || '');
                      }}
                      className={`w-full text-left p-3 rounded transition-all duration-200 flex flex-col group mb-1 ${
                        isActive 
                          ? 'bg-slate-800 border-l-4 border-blue-500' 
                          : 'hover:bg-slate-800 border-l-4 border-transparent text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase opacity-50 mb-1 leading-none">{element.name.split(' - ')[0]}</div>
                      <div className="text-sm font-medium leading-tight">{element.name.split(' - ')[1]}</div>
                      <div className="flex items-center gap-2 mt-2 w-full text-[10px] font-mono opacity-60">
                        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className={`h-full ${isActive ? 'bg-blue-500' : 'bg-slate-500'}`} 
                          />
                        </div>
                        <span>{progress}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </nav>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 border border-slate-700">
                  <UserIcon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate leading-none">{currentUser.name}</p>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black mt-1 inline-block">{currentUser.role}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="ml-auto p-2 text-slate-500 hover:text-rose-400 transition-colors" 
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded text-slate-500 shrink-0"
            >
              <Menu size={18} />
            </button>
            <div className="min-w-0">
              {activeView === 'dashboard' ? (
                <>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Kapabilitas APIP — Executive Summary</div>
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight">Dashboard Utama</h2>
                </>
              ) : activeView === 'element' ? (
                <>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Elemen {activeElement.id.split('-')[1]} — Area of Improvement</div>
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight truncate">{activeElement.name.split(' - ')[1]}</h2>
                </>
              ) : (
                <>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Administration</div>
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight">Manajemen Akun Karyawan</h2>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <ShieldAlert size={14} className={currentUser.role === 'admin' ? 'text-indigo-500' : 'text-slate-400'} />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Access: {currentUser.role}</span>
            </div>
            {currentUser.role === 'admin' && activeView === 'element' && (
              <button 
                onClick={() => {
                  if (confirm('Simpan perubahan data ke database lokal?')) {
                    localStorage.setItem('apip_aoi_tracker_data', JSON.stringify(data));
                    alert('Progress berhasil disimpan.');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-tighter rounded shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save size={14} />
                Save Progression
              </button>
            )}
          </div>
        </header>

        {activeView === 'dashboard' ? (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <DashboardView 
                data={data} 
                onSelectElement={(id) => {
                  setActiveElementId(id);
                  setActiveView('element');
                }}
                onDownload={downloadProgress}
              />
            </div>
          </div>
        ) : activeView === 'element' ? (
          <>
            {/* Tab Navigation */}
            <div className="h-10 bg-white border-b border-slate-200 flex px-8 shrink-0 overflow-x-auto no-scrollbar">
              {activeElement.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopicId(topic.id)}
                  className={`text-[11px] font-bold px-4 h-full transition-all border-b-2 shrink-0 ${
                    activeTopicId === topic.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>

            {/* Action Items Container */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-50">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded uppercase tracking-tighter">
                        {activeTopic.name.split(' - ')[0]}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 uppercase tracking-tight italic">
                        {activeTopic.name.split(' - ')[1]}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Items: {activeTopic.aois.length}
                    </span>
                  </div>

                  {/* High Density Table View */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead className="bg-slate-50/50 text-slate-500 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="px-4 py-2 border-b border-slate-100">Requirement (AOI)</th>
                          <th className="px-4 py-2 border-b border-slate-100 w-32">Status</th>
                          <th className="px-4 py-2 border-b border-slate-100 w-24">PIC</th>
                          <th className="px-4 py-2 border-b border-slate-100 w-28 text-center truncate">Deadline</th>
                          <th className="px-4 py-2 border-b border-slate-100 w-32">Evidence</th>
                          <th className="px-4 py-2 border-b border-slate-100 w-16 text-center">Act</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {activeTopic.aois.map((aoi) => {
                          const isEditing = editingItem === aoi.id;
                          
                          return (
                            <AnimatePresence key={aoi.id} mode="wait">
                              {isEditing ? (
                                <motion.tr 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-blue-50/30"
                                >
                                  <td colSpan={6} className="px-4 py-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <div className="md:col-span-2">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">AOI Title</label>
                                        <textarea
                                          disabled={currentUser.role !== 'admin'}
                                          value={aoi.title}
                                          onChange={(e) => updateAOI(aoi.id, { title: e.target.value })}
                                          className={`w-full p-2 rounded border focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium ${currentUser.role === 'admin' ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100 cursor-not-allowed'}`}
                                          rows={2}
                                        />
                                      </div>
                                      <div className="md:col-span-1">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Status</label>
                                        <select 
                                          value={aoi.status}
                                          onChange={(e) => updateAOI(aoi.id, { status: e.target.value as StatusType })}
                                          className="w-full bg-white p-2 rounded border border-slate-200 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
                                        >
                                          <option value="Belum Selesai">Belum Selesai</option>
                                          <option value="Proses">Proses</option>
                                          <option value="Selesai">Selesai</option>
                                        </select>
                                      </div>
                                      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Action Plan (Rencana Aksi)</label>
                                          <textarea
                                            disabled={currentUser.role !== 'admin'}
                                            value={aoi.actionPlan}
                                            onChange={(e) => updateAOI(aoi.id, { actionPlan: e.target.value })}
                                            className={`w-full p-2 rounded border focus:ring-1 focus:ring-blue-500 outline-none text-sm font-medium italic ${currentUser.role === 'admin' ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100 cursor-not-allowed'}`}
                                            rows={2}
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Link Dokumen Contoh (Template)</label>
                                          <input
                                            type="text"
                                            disabled={currentUser.role !== 'admin'}
                                            value={aoi.exampleDoc || ''}
                                            onChange={(e) => updateAOI(aoi.id, { exampleDoc: e.target.value })}
                                            placeholder={currentUser.role === 'admin' ? "https://..." : "Hanya Admin"}
                                            className={`w-full p-2 rounded border outline-none text-sm ${currentUser.role === 'admin' ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100 cursor-not-allowed text-slate-400'}`}
                                          />
                                          <p className="text-[9px] text-slate-400 mt-1 italic">
                                            {currentUser.role === 'admin' ? '*Gunakan link Google Drive/Internal untuk template' : '*Hanya Admin yang dapat mengupdate template'}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">PIC</label>
                                        <input
                                          type="text"
                                          disabled={currentUser.role !== 'admin'}
                                          value={aoi.pic}
                                          onChange={(e) => updateAOI(aoi.id, { pic: e.target.value })}
                                          className={`w-full p-2 rounded border outline-none text-sm ${currentUser.role === 'admin' ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100 cursor-not-allowed'}`}
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Deadline</label>
                                        <input
                                          type="date"
                                          disabled={currentUser.role !== 'admin'}
                                          value={aoi.completionDate}
                                          onChange={(e) => updateAOI(aoi.id, { completionDate: e.target.value })}
                                          className={`w-full p-2 rounded border outline-none text-sm ${currentUser.role === 'admin' ? 'bg-white border-slate-200' : 'bg-slate-100 border-slate-100 cursor-not-allowed'}`}
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Evidence Doc</label>
                                        <input
                                          type="text"
                                          value={aoi.documentRef}
                                          onChange={(e) => updateAOI(aoi.id, { documentRef: e.target.value })}
                                          placeholder="Link dokumen bukti..."
                                          className="w-full bg-white p-2 rounded border border-slate-200 outline-none text-sm"
                                        />
                                      </div>
                                      <div className="md:col-span-3 flex justify-end gap-2 mt-4 text-center">
                                        <button 
                                          onClick={() => setEditingItem(null)}
                                          className="px-4 py-2 bg-slate-800 text-white text-[10px] font-bold uppercase rounded flex items-center gap-2"
                                        >
                                          <Save size={12} /> Save Changes
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </motion.tr>
                              ) : (
                                <motion.tr 
                                  layout
                                  onClick={() => setEditingItem(aoi.id)}
                                  className="group hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                  <td className="px-4 py-3">
                                    <div className="flex items-start gap-3">
                                      <span className="text-[10px] font-bold text-slate-400 shrink-0 mt-0.5">{aoi.code}</span>
                                      <div className="flex flex-col gap-1.5">
                                        <span className="text-slate-800 font-bold group-hover:text-blue-600 transition-colors leading-tight">{aoi.title}</span>
                                        <div className="bg-amber-50/50 p-2 rounded border border-amber-100/50 flex flex-col gap-2">
                                          <div>
                                            <p className="text-[10px] text-amber-800 font-bold uppercase tracking-tighter mb-0.5">Rencana Aksi:</p>
                                            <p className="text-slate-600 font-medium leading-relaxed italic">{aoi.actionPlan}</p>
                                          </div>
                                          {aoi.exampleDoc && (
                                            <a 
                                              href={aoi.exampleDoc} 
                                              target="_blank" 
                                              rel="noreferrer"
                                              onClick={(e) => e.stopPropagation()}
                                              className="self-start flex items-center gap-1.5 px-2 py-1 bg-white border border-amber-200 rounded text-[9px] font-bold text-amber-700 uppercase hover:bg-amber-100 transition-colors"
                                            >
                                              <FileText size={10} />
                                              Lihat Dokumen Contoh
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${getStatusColor(aoi.status)}`}>
                                      {aoi.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 font-semibold text-slate-600 truncate max-w-[80px]">{aoi.pic || <span className="text-slate-300">—</span>}</td>
                                  <td className="px-4 py-3 text-slate-500 font-mono text-[10px] truncate">{aoi.completionDate || <span className="text-slate-300">—</span>}</td>
                                  <td className="px-4 py-3">
                                    {aoi.documentRef ? (
                                      <div className="text-blue-500 hover:underline flex items-center gap-1 overflow-hidden">
                                        <FileText size={12} className="shrink-0" />
                                        <span className="truncate max-w-[100px]">{aoi.documentRef}</span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-300 italic">pending</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                                      <div className="p-1 hover:bg-slate-200 rounded text-slate-400">
                                        <ChevronDown size={14} />
                                      </div>
                                    </div>
                                  </td>
                                </motion.tr>
                              )}
                            </AnimatePresence>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Summary Footer Block */}
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center">
                  <div className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1 text-center">Summary Statistics</div>
                  <div className="flex justify-center gap-12">
                    <div className="text-center">
                      <div className="text-2xl font-light text-slate-500">
                        {activeTopic.aois.filter(a => a.status === 'Selesai').length}/{activeTopic.aois.length}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Completed</div>
                    </div>
                    <div className="w-px bg-slate-100"></div>
                    <div className="text-center">
                      <div className="text-2xl font-light text-slate-500 truncate max-w-[100px]">
                        {activeTopic.aois.length > 0 
                          ? Math.round((activeTopic.aois.filter(a => a.status === 'Belum Selesai').length / activeTopic.aois.length) * 100) 
                          : 0}%
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Not Started</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 p-8 overflow-y-auto bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <UserManagement />
            </div>
          </div>
        )}

        {/* Footer Info Bar */}
        <footer className="h-10 bg-slate-800 text-slate-400 text-[10px] px-8 flex items-center justify-between shrink-0 font-medium">
          <div className="flex gap-6 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              Sync Status: <b className="text-emerald-400 flex items-center gap-1"><Circle size={8} fill="currentColor"/> Connected</b>
            </span>
            <span>Last Update: {new Date().toLocaleTimeString('id-ID')} WIB</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Audit Trail</span>
            <span onClick={downloadProgress} className="hover:text-white cursor-pointer transition-colors">Export Excel</span>
            <span className="hover:text-white cursor-pointer transition-colors">User Manual</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

