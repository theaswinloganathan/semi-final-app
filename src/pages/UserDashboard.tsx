import { useState, useEffect } from 'react';
import { 
  ScanFace, 
  CalendarCheck, 
  BookOpen, 
  Settings as SettingsIcon,
  UploadCloud,
  Trophy,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import DashboardLayout from '../components/DashboardLayout';
import { userAttendanceData as mockAttendanceData, quizQuestions as mockQuizQuestions } from '../services/mockData';
import { getAttendance, getModules, getSettings, detectCrop, updateSettings } from '../services/api';

interface Props {
  onLogout: () => void;
}

const UserDashboard = ({ onLogout }: Props) => {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState('aiDetection');

  const [attendance, setAttendance] = useState<any[]>([]);
  const [attRate, setAttRate] = useState<number>(0);
  const [quiz, setQuiz] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [a, q] = await Promise.all([
          getAttendance(2), // Demo user ID
          getModules()
        ]);
        setAttendance(a.data.records || []);
        setAttRate(a.data.percentage || 0);
        setQuiz(q.data || []);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    { id: 'aiDetection', label: t.aiDetection, icon: ScanFace },
    { id: 'attendance', label: t.attendance, icon: CalendarCheck },
    { id: 'modules', label: t.modules, icon: BookOpen },
    { id: 'settings', label: t.settings, icon: SettingsIcon },
    { id: 'collapse', label: t.collapse, icon: ChevronLeft }, // Dynamic icon later
    { id: 'logout', label: t.logout, icon: LogOut },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activePage={activePage} 
      setActivePage={setActivePage} 
      onLogout={onLogout}
      userType="User"
    >
      {activePage === 'aiDetection' && <AIDetectionSection />}
      {activePage === 'attendance' && <AttendanceSection data={attendance.length > 0 ? attendance : mockAttendanceData} rate={attRate || 90} />}
      {activePage === 'modules' && <ModulesSection data={quiz.length > 0 ? quiz : mockQuizQuestions} />}
      {activePage === 'settings' && <SettingsSection />}
    </DashboardLayout>
  );
};

// --- Sub-sections ---

const AIDetectionSection = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Upload to backend
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await detectCrop(formData);
        setAiResult(res.data);
      } catch (err) {
        console.error("AI analysis failed", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
      <div className="card">
        <h3 className="text-xl font-bold mb-6">{t.aiDetection}</h3>
        <div 
          className="upload-zone"
          onClick={() => document.getElementById('user-file-input')?.click()}
        >
          <input 
            type="file" 
            id="user-file-input" 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <UploadCloud className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500 font-medium">{t.uploadBox}</p>
        </div>
        {preview && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p className="font-bold mb-4">{t.preview}</p>
            <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: '1rem', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} />
          </div>
        )}
      </div>

      {preview ? (
        <div className="card">
          <h3 className="text-xl font-bold mb-6">{t.results}</h3>
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
               <div className="fade-in">Analyzing with Gemini AI...</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.cropType}</span>
                <span style={{ fontWeight: 800 }}>{aiResult?.cropType || 'Cabbage'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.cropHealth}</span>
                <span className="text-primary font-bold">{aiResult?.healthStatus || t.healthGood}</span>
              </div>
              <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '1.5rem', border: '1px solid #d1fae5' }}>
                <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '0.5rem', color: '#065f46' }}>{t.suggestedAction}</p>
                <p style={{ fontWeight: 600, color: '#065f46' }}>{aiResult?.suggestedAction || t.actionNone}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', background: '#f8fafc', color: 'var(--text-muted)', textAlign: 'center' }}>
          <p className="italic">{t.placeholderResults}</p>
        </div>
      )}
    </div>
  );
};

const AttendanceSection = ({ data, rate }: any) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>{t.date}</th>
              <th>{t.status}</th>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, idx: number) => (
              <tr key={idx}>
                <td>{row.date}</td>
                <td>
                  <span className={`badge ${row.status === 'Present' ? 'badge-success' : 'badge-danger'}`}>
                    {row.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{row.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h4 className="font-bold mb-6">{t.attendanceRate}</h4>
        <div style={{ position: 'relative', width: '150px', height: '150px' }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="75" cy="75" r="65" stroke="#f1f5f9" strokeWidth="12" fill="none" />
            <circle cx="75" cy="75" r="65" stroke="var(--primary)" strokeWidth="12" fill="none" strokeDasharray="408" strokeDashoffset="40.8" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: 900 }}>{rate}%</span>
            <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{rate > 80 ? 'Excellent' : 'Good'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ModulesSection = ({ data }: any) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(s => s + 1);
    if (step < data.length - 1) {
      setStep(s => s + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem' }}>
        <Trophy size={64} className="text-accent mx-auto mb-6" />
        <h3 className="text-2xl font-black mb-2">{t.finish}</h3>
        <p className="text-lg text-slate-500 mb-8">{t.score}: <span className="text-primary font-bold">{score} / {data.length}</span></p>
        <button onClick={reset} className="btn btn-primary" style={{ width: '100%' }}>Restart Quiz</button>
      </div>
    );
  }

  const q = data[step] || data[0];

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h3 className="text-xl font-bold">{t.quizTitle}</h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '0.25rem 0.75rem', background: '#f1f5f9', borderRadius: '1rem' }}>
          {step + 1} / {data.length}
        </span>
      </div>
      <p style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {q.options.map((opt: string, idx: number) => (
          <button 
            key={idx}
            onClick={() => handleAnswer(idx === q.correct)}
            className="btn"
            style={{ textAlign: 'left', border: '2px solid #f1f5f9', background: 'white' }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const SettingsSection = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<any>({
    nightMode: false,
    voiceGuidance: true
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getSettings(2);
        if (Object.keys(res.data).length > 0) {
          setSettings({
            nightMode: res.data.nightMode === 'true',
            voiceGuidance: res.data.voiceGuidance === 'true'
          });
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const toggleSetting = async (key: string) => {
    const newVal = !settings[key];
    const updated = { ...settings, [key]: newVal };
    setSettings(updated);
    try {
      await updateSettings({
        userId: 2,
        settings: { [key]: String(newVal) }
      });
    } catch (err) {
      console.error("Failed to update setting", err);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <SettingsIcon size={48} className="text-slate-200 mx-auto mb-6" />
      <h3 className="text-xl font-bold mb-4">{t.settings}</h3>
      <p className="text-slate-500 mb-8">{t.dummySettings}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
        <div 
          onClick={() => toggleSetting('nightMode')}
          style={{ padding: '1rem', background: '#f8fafc', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <span style={{ fontWeight: 600 }}>Night Mode</span>
          <div style={{ width: '40px', height: '22px', background: settings.nightMode ? 'var(--primary)' : '#e2e8f0', borderRadius: '11px', position: 'relative', transition: '0.3s' }}>
             <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.nightMode ? '20px' : '2px', transition: '0.3s' }}></div>
          </div>
        </div>
        <div 
          onClick={() => toggleSetting('voiceGuidance')}
          style={{ padding: '1rem', background: '#f8fafc', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        >
          <span style={{ fontWeight: 600 }}>Enable Voice Guidance</span>
          <div style={{ width: '40px', height: '22px', background: settings.voiceGuidance ? 'var(--primary)' : '#e2e8f0', borderRadius: '11px', position: 'relative', transition: '0.3s' }}>
             <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.voiceGuidance ? '20px' : '2px', transition: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
