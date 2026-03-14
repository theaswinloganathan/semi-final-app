import { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface Props {
  onLogin: (userId: string, password: string) => void;
  error?: string;
}

const UserLogin = ({ onLogin, error: externalError }: Props) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onLogin(userId, password);
  };

  return (
    <div className="role-container fade-in">
      <div className="selection-card" style={{ background: 'white', color: 'var(--text-main)', maxWidth: '420px', padding: '2.5rem' }}>
        <div className="role-icon" style={{ background: '#ecfdf5', color: '#10b981', marginBottom: '1.5rem' }}>
          <User size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2 text-slate-800">User Login</h2>
        <p className="text-slate-500 mb-8 text-sm">Please enter your User ID and Password assigned by your administrator.</p>

        {(error || externalError) && (
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            {error || externalError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            <label className="text-sm font-bold block mb-2 text-slate-700">User ID</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                required
                placeholder="e.g. 10001"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
            <label className="text-sm font-bold block mb-2 text-slate-700">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="password" 
                required
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
          >
            Log In to Portal
          </button>
        </form>

        <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
          Contact your admin if you've forgotten your login details.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
