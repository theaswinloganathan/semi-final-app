import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sprout,
  Search,
  Bell
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface Props {
  menuItems: MenuItem[];
  activePage: string;
  setActivePage: (id: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  userType: 'Admin' | 'User';
}

const DashboardLayout = ({ 
  menuItems, 
  activePage, 
  setActivePage, 
  onLogout, 
  children
}: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  const handleItemClick = (id: string) => {
    if (id === 'collapse') {
      setCollapsed(!collapsed);
    } else if (id === 'logout') {
      onLogout();
    } else {
      setActivePage(id);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside 
        className="sidebar"
        style={{ width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        <div className="sidebar-header">
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
            <Sprout color="white" size={24} />
          </div>
          {!collapsed && <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden' }}>{t.title}</span>}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = (item.id === 'collapse') 
              ? (collapsed ? ChevronRight : ChevronLeft) 
              : item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                style={{ width: '100%', background: 'none', color: item.id === 'logout' ? '#f87171' : undefined }}
              >
                <Icon size={22} style={{ minWidth: '22px' }} />
                {!collapsed && <span style={{ marginLeft: '1rem' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header" style={{ height: '80px', display: 'flex', alignItems: 'center', padding: '0 2rem', background: 'white', borderBottom: '1px solid #e2e8f0', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>
               {menuItems.find(i => i.id === activePage)?.label}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {/* Top Search */}
              <div className="search-bar-inline" style={{ maxWidth: '300px' }}>
                <Search className="icon" size={18} />
                <input type="text" placeholder="Search farm data..." style={{ background: '#f8fafc' }} />
              </div>

              {/* Notification */}
              <div style={{ position: 'relative', cursor: 'pointer', color: '#64748b' }}>
                <Bell size={22} />
                <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
              </div>

              {/* Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid #e2e8f0' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 800, fontSize: '0.875rem', color: '#1e293b' }}>Admin User</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Farm Manager</p>
                </div>
                <div className="avatar" style={{ background: '#dcfce7', color: '#15a34a', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>JD</div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-scroll">
          <div className="fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
