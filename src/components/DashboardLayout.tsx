import React, { useState } from 'react';
import { 
   ChevronLeft, 
   ChevronRight, 
   Sprout,
   Search,
   Bell,
   CheckCircle2,
   AlertCircle,
   Info,
   Clock
 } from 'lucide-react';
 import { useTranslation } from '../hooks/useTranslation';
 import { notificationsData } from '../services/mockData';
 
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
   children,
   userType
 }: Props) => {
   const [collapsed, setCollapsed] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
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
 
   const getNotificationIcon = (type: string) => {
     switch (type) {
       case 'task': return <CheckCircle2 size={16} color="#10b981" />;
       case 'alert': return <AlertCircle size={16} color="#ef4444" />;
       default: return <Info size={16} color="#3b82f6" />;
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
 
         <nav className="sidebar-nav" onClick={() => setShowNotifications(false)}>
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
                 {!collapsed && item.id !== 'collapse' && <span style={{ marginLeft: '1rem' }}>{item.label}</span>}
               </button>
             );
           })}
         </nav>
       </aside>
 
       {/* Main Content */}
       <main className="main-content">
         <header className="header" style={{ height: '80px', display: 'flex', alignItems: 'center', padding: '0 2rem', background: 'white', borderBottom: '1px solid #e2e8f0', zIndex: 100 }}>
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
               <div style={{ position: 'relative' }}>
                 <div 
                   onClick={() => setShowNotifications(!showNotifications)}
                   style={{ cursor: 'pointer', color: '#64748b', position: 'relative' }}
                 >
                   <Bell size={22} className={showNotifications ? 'text-primary' : ''} />
                   <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' }}></div>
                 </div>
 
                 {showNotifications && (
                   <div className="card shadow-2xl fade-in" style={{ 
                     position: 'absolute', 
                     top: '100%', 
                     right: '-20px', 
                     width: '320px', 
                     marginTop: '1rem', 
                     padding: '0', 
                     maxHeight: '450px', 
                     overflow: 'hidden',
                     zIndex: 1000,
                     border: '1px solid #e2e8f0'
                   }}>
                     <div style={{ padding: '1.25rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                       <span style={{ fontWeight: 800, color: '#1e293b' }}>Notifications</span>
                       <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>5 NEW</span>
                     </div>
                     <div style={{ overflowY: 'auto', maxHeight: '380px' }}>
                       {notificationsData.map((notif) => (
                         <div key={notif.id} style={{ padding: '1rem', borderBottom: '1px solid #f8fafc', transition: 'background 0.2s', cursor: 'default' }} onMouseOver={(e) => (e.currentTarget.style.background = '#fcfdfd')} onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}>
                           <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                             <div style={{ marginTop: '3px' }}>{getNotificationIcon(notif.type)}</div>
                             <div style={{ flex: 1 }}>
                               <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e293b', marginBottom: '2px' }}>{notif.title}</h4>
                               <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4', marginBottom: '4px' }}>{notif.message}</p>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '0.65rem', fontWeight: 600 }}>
                                 <Clock size={10} />
                                 {notif.time}
                               </div>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                     <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid #f1f5f9', background: '#fff' }}>
                       <button style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 800, background: 'none' }}>View All Notifications</button>
                     </div>
                   </div>
                 )}
               </div>
 
               {/* Profile */}
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: userType === 'Admin' ? '#15a34a' : '#0284c7', 
                      fontWeight: 800, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.5px' 
                    }}>
                      {userType === 'Admin' ? 'Admin' : 'User'}
                    </p>
                  </div>
                 <div className="avatar" style={{ 
                   background: userType === 'Admin' ? '#dcfce7' : '#e0f2fe', 
                   color: userType === 'Admin' ? '#15a34a' : '#0284c7', 
                   width: '40px', 
                   height: '40px', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center', 
                   fontSize: '14px', 
                   fontWeight: 'bold',
                   border: '2px solid white',
                   boxShadow: '0 0 0 2px #f1f5f9'
                 }}>
                   {userType === 'Admin' ? 'AU' : 'TU'}
                 </div>
               </div>
             </div>
           </div>
         </header>
 
         <div className="content-scroll" onClick={() => setShowNotifications(false)}>
           <div className="fade-in">
             {children}
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default DashboardLayout;
