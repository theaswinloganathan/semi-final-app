import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Eye, 
  BarChart3, 
  Package, 
  PieChart, 
  Settings as SettingsIcon,
  TrendingUp,
  Briefcase,
  Sprout,
  AlertCircle,
  ChevronLeft,
  LogOut,
  Plus,
  Search,
  MoreVertical,
  Filter,
  Calendar,
  Clock
} from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { useTranslation } from '../hooks/useTranslation';
import DashboardLayout from '../components/DashboardLayout';
import { 
  traineesData as mockTrainees, 
  tasksData as mockTasks, 
  cropStatusData as mockCrops, 
  attendanceProductionData as mockAttendanceProduction, 
  inventoryData as mockInventory
} from '../services/mockData';
import { getDashboardStats, getTrainees, getTasks, getCrops, getAttendanceProduction, getInventory } from '../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface Props {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: Props) => {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [trainees, setTrainees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [crops, setCrops] = useState<any[]>([]);
  const [attProd, setAttProd] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, t, tk, c, ap, inv] = await Promise.all([
          getDashboardStats(),
          getTrainees(),
          getTasks(),
          getCrops(),
          getAttendanceProduction(),
          getInventory()
        ]);
        setStats(s.data);
        setTrainees(t.data);
        setTasks(tk.data);
        setCrops(c.data);
        setAttProd(ap.data);
        setInventory(inv.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'trainees', label: t.trainees, icon: Users },
    { id: 'farmTask', label: t.farmTask, icon: ClipboardList },
    { id: 'cropMonitoring', label: t.cropMonitoring, icon: Eye },
    { id: 'attendanceProduction', label: t.attendanceProduction, icon: BarChart3 },
    { id: 'inventory', label: t.inventory, icon: Package },
    { id: 'reports', label: t.reports, icon: PieChart },
    { id: 'settings', label: t.settings, icon: SettingsIcon },
    { id: 'collapse', label: t.collapse, icon: ChevronLeft },
    { id: 'logout', label: t.logout, icon: LogOut },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activePage={activePage} 
      setActivePage={setActivePage} 
      onLogout={onLogout}
      userType="Admin"
    >
      {activePage === 'dashboard' && <AdminDashboardHome stats={stats} />}
      {activePage === 'trainees' && <TraineesSection data={trainees.length > 0 ? trainees : mockTrainees} />}
      {activePage === 'farmTask' && <FarmTaskSection data={tasks.length > 0 ? tasks : mockTasks} />}
      {activePage === 'cropMonitoring' && <CropMonitoringSection data={crops.length > 0 ? crops : mockCrops} />}
      {activePage === 'attendanceProduction' && <AttendanceProductionSection data={attProd.length > 0 ? attProd : mockAttendanceProduction} />}
      {activePage === 'inventory' && <InventorySection data={inventory.length > 0 ? inventory : mockInventory} />}
      {activePage === 'reports' && <ReportsSection />}
      {activePage === 'settings' && <AdminSettingsSection />}
    </DashboardLayout>
  );
};

// --- Sections ---

const AdminDashboardHome = ({ stats }: any) => {
  const { t } = useTranslation();
  
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Production (kg)',
      data: [350, 480, 410, 590, 850, 720],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  return (
    <div>
      <div className="grid-stats">
        <StatCard label={t.totalTrainees} val={stats?.totalTrainees || "142"} icon={Users} color="#3b82f6" />
        <StatCard label={t.activeTasks} val={stats?.activeTasks || "28"} icon={Briefcase} color="#10b981" />
        <StatCard label="Crops Monitored" val={stats?.cropsMonitored || "12"} icon={Sprout} color="#f59e0b" />
        <StatCard label={t.productionYield} val={`${stats?.productionYield || 850} kg`} icon={TrendingUp} color="#6366f1" />
      </div>

      <div className="grid-charts">
        <div className="card">
          <h3 className="text-lg font-bold mb-6">{t.productionTrends}</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="card">
          <h3 className="text-lg font-bold mb-6">{t.attendanceAnalytics}</h3>
          <Bar 
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              datasets: [{ data: [95, 88, 92, 90, 85], backgroundColor: '#3b82f6', borderRadius: 8 }]
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
      </div>
    </div>
  );
};

const TraineesSection = ({ data }: any) => {

  // Helper to get initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Helper for skill level based on mock efficiency
  const getSkillInfo = (eff: string) => {
    const val = parseInt(eff);
    if (val >= 95) return { label: 'Expert', class: 'skill-expert' };
    if (val >= 85) return { label: 'Advanced', class: 'skill-advanced' };
    if (val >= 75) return { label: 'Intermediate', class: 'skill-intermediate' };
    return { label: 'Beginner', class: 'skill-beginner' };
  };

  return (
    <div className="fade-in">
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div className="search-bar-inline">
          <Search className="icon" size={20} />
          <input type="text" placeholder="Search trainees by name or program..." />
        </div>
        <button className="btn-add-trainee">
          <Plus size={20} />
          Add New Trainee
        </button>
      </div>

      {/* Table Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ background: 'white' }}>
          <thead>
            <tr>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>TRAINEE NAME</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>PROGRAM</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>TASKS</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>SKILL LEVEL</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>ATTENDANCE</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>STATUS</th>
              <th style={{ background: '#f8fafc', padding: '1.25rem' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any) => {
              const skill = getSkillInfo(row.efficiency);
              const attendance = parseInt(row.efficiency) + 5; // Derived mockup
              return (
                <tr key={row.id}>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div className="avatar">{getInitials(row.name)}</div>
                      <span style={{ fontWeight: 700, fontSize: '1rem', color: '#1e293b' }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', color: '#64748b' }}>{row.group_name || "Organic Farming"}</td>
                  <td style={{ padding: '1.25rem', color: '#64748b' }}>{Math.floor(Math.random() * 30) + 5}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <span className={`skill-badge ${skill.class}`}>{skill.label}</span>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <div className="attendance-bar">
                      <div className="bar-bg">
                        <div className="bar-fill" style={{ width: `${attendance}%` }}></div>
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1e293b' }}>{attendance}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <div className="status-dot">
                      <div className="dot" style={{ background: row.status === 'Active' ? '#10b981' : '#94a3b8' }}></div>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{row.status}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <button style={{ background: 'none', color: '#94a3b8' }}>
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FarmTaskSection = ({ data }: any) => {
  const columns = [
    { title: 'To Do', status: 'Pending' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Completed', status: 'Completed' }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  };

  return (
    <div className="fade-in">
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-outline">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn-outline">
            <Calendar size={18} />
            Schedule
          </button>
        </div>
        <button className="btn-add-trainee">
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {columns.map((col) => {
          const tasks = data.filter((t: any) => t.status === col.status);
          return (
            <div key={col.status} className="kanban-column">
              <div className="kanban-header">
                <div className="kanban-title">
                  {col.title}
                  <span className="count-badge">{tasks.length}</span>
                </div>
                <button style={{ background: 'none', color: '#94a3b8' }}>
                  <Plus size={20} />
                </button>
              </div>

              <div className="column-content">
                {tasks.map((task: any, i: number) => (
                  <div key={i} className="task-card">
                    <span className={`priority-badge priority-${task.urgency.toLowerCase()}`}>
                      {task.urgency}
                    </span>
                    <h4 className="task-name">{task.title}</h4>
                    <div className="task-meta">
                      <Clock size={16} />
                      <span>{task.status === 'Completed' ? 'Yesterday' : 'Today, 02:00 PM'}</span>
                    </div>
                    <div className="task-footer">
                      <div className="avatar assignee-avatar" style={{ background: col.status === 'Completed' ? '#dcfce7' : '#f1f5f9', color: col.status === 'Completed' ? '#15a34a' : '#64748b' }}>
                        {getInitials(task.assignee || "Rohan Mehra")}
                      </div>
                      <span className="assignee-name">{task.assignee || "Rohan Mehra"}</span>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#cbd5e1', border: '2px dashed #f1f5f9', borderRadius: '1.25rem' }}>
                    No tasks here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CropMonitoringSection = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {data.map((crop: any, i: number) => (
        <div key={i} className="card">
          <div style={{ height: '120px', background: '#f8fafc', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
             <Sprout size={48} />
          </div>
          <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>{crop.name}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span style={{ color: 'var(--text-muted)' }}>{t.growthStage}</span>
               <span style={{ fontWeight: 700 }}>{crop.stage}</span>
             </div>
             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span style={{ color: 'var(--text-muted)' }}>Health</span>
               <span className={`badge ${crop.health === 'Healthy' ? 'badge-success' : 'badge-danger'}`}>{crop.health}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AttendanceProductionSection = ({ data }: any) => {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Attendance</th>
            <th>Production Yield</th>
            <th>Quality</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td style={{ fontWeight: 700 }}>{row.attendance}</td>
              <td style={{ color: 'var(--secondary)', fontWeight: 700 }}>{row.yield}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <div style={{ flex: 1, height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
                      <div style={{ width: `${parseFloat(row.quality) * 10}%`, height: '100%', background: '#6366f1', borderRadius: '3px' }}></div>
                   </div>
                   <span style={{ fontWeight: 800 }}>{row.quality}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InventorySection = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table>
        <thead>
          <tr>
            <th>{t.name}</th>
            <th>Category</th>
            <th>{t.quantity}</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, i: number) => (
            <tr key={i}>
              <td style={{ fontWeight: 700 }}>{row.item}</td>
              <td>{row.category}</td>
              <td style={{ fontWeight: 800 }}>{row.stock}</td>
              <td style={{ color: 'var(--text-muted)' }}>{row.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReportsSection = () => {
  const { t } = useTranslation();
  return (
    <div className="grid-charts">
      <div className="card">
        <h3 className="text-lg font-bold mb-6">{t.productionTrends}</h3>
        <Radar 
          data={{
            labels: ['Tomatoes', 'Potatoes', 'Chillies', 'Eggplant', 'Cabbage'],
            datasets: [{ label: 'Score', data: [80, 95, 70, 60, 85], backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6' }]
          }}
        />
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-6">{t.taskCompletion}</h3>
        <Doughnut 
          data={{
            labels: ['Completed', 'Pending', 'Overdue'],
            datasets: [{ data: [65, 25, 10], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'] }]
          }}
          options={{ cutout: '70%' }}
        />
      </div>
      <div className="card" style={{ gridColumn: '1 / -1' }}>
        <h3 className="text-lg font-bold mb-6">{t.attendanceAnalytics}</h3>
        <Line 
          data={{
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
            datasets: [{ label: 'Avg Attendance', data: [88, 92, 90, 85, 95], borderColor: '#10b981', tension: 0.3 }]
          }}
          options={{ responsive: true }}
        />
      </div>
    </div>
  );
};

const AdminSettingsSection = () => {
  const { t } = useTranslation();
  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <AlertCircle size={48} className="text-slate-200 mx-auto mb-6" />
      <h3 className="text-xl font-bold mb-4">Admin {t.settings}</h3>
      <p className="text-slate-500 mb-8">System configuration and access control.</p>
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn" style={{ background: '#f8fafc', width: '100%', textAlign: 'left' }}>Database Management</button>
        <button className="btn" style={{ background: '#f8fafc', width: '100%', textAlign: 'left' }}>API Configuration</button>
        <button className="btn" style={{ background: '#f8fafc', width: '100%', textAlign: 'left' }}>User Permissions</button>
      </div>
    </div>
  );
};

// --- Helpers ---

const StatCard = ({ label, val, icon: Icon, color }: any) => (
  <div className="card stat-card">
    <div className="stat-icon" style={{ backgroundColor: color }}>
      <Icon size={24} />
    </div>
    <div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 600 }}>{label}</p>
      <h4 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{val}</h4>
    </div>
  </div>
);

export default AdminDashboard;
