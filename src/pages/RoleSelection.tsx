import { ShieldCheck, User } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  onSelect: (role: 'admin' | 'user') => void;
}

const RoleSelection = ({ onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="role-container fade-in">
      <h2 className="text-3xl font-black mb-12 text-slate-800">{t.selectRole}</h2>
      <div className="role-grid">
        <div 
          onClick={() => onSelect('admin')}
          className="role-card group"
        >
          <div className="role-icon group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-800">{t.adminPanel}</h3>
          <p className="text-slate-500 text-sm">Manage trainees, tasks, and view analytics across all farm operations.</p>
        </div>

        <div 
          onClick={() => onSelect('user')}
          className="role-card group"
        >
          <div className="role-icon group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <User size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-slate-800">{t.userPanel}</h3>
          <p className="text-slate-500 text-sm">Access modules, AI tools, and track your individual progress.</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
