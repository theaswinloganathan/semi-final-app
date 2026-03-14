import { useState } from 'react';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { signInWithGoogle } from '../services/firebase';

interface Props {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Hardcoded demo credentials
    if (email === 'aswinloganathan07@gmail.com' && password === 'aswin123') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      onLogin();
    } catch (err: any) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-container fade-in">
      <div className="selection-card" style={{ background: 'white', color: 'var(--text-main)', maxWidth: '420px', padding: '2.5rem' }}>
        <div className="role-icon" style={{ background: '#ecfdf5', color: '#10b981', marginBottom: '1.5rem' }}>
          <LogIn size={40} />
        </div>
        <h2 className="text-3xl font-black mb-2 text-slate-800">Admin Login</h2>
        <p className="text-slate-500 mb-8 text-sm">Welcome back! Please enter your details.</p>

        {error && (
          <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.75rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
            <label className="text-sm font-bold block mb-2 text-slate-700">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="email" 
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <label className="text-sm font-bold block mb-2 text-slate-700">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', borderRadius: '0.75rem', marginBottom: '1.25rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
          >
            Sign In
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#cbd5e1' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ margin: '0 1rem', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '0.875rem', fontSize: '0.875rem', borderRadius: '0.75rem', background: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 700, color: '#475569', transition: 'var(--transition)' }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#f8fafc')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
        >
          <Chrome size={20} color="#4285F4" />
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
