import { Sprout } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface Props {
  onSelect: (lang: 'en' | 'ta' | 'hi') => void;
}

const LanguageSelection = ({ onSelect }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="selection-container">
      <div className="selection-card fade-in">
        <Sprout className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
        <h1 className="text-3xl font-bold mb-2">Welcome</h1>
        <p className="text-emerald-100 mb-10">{t.selectLanguage}</p>
        
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onSelect('en')} 
            className="btn glass hover:bg-white/30 text-white font-bold py-4 text-lg border-white/20"
          >
            English
          </button>
          <button 
            onClick={() => onSelect('ta')} 
            className="btn glass hover:bg-white/30 text-white font-bold py-4 text-lg border-white/20"
          >
            தமிழ் (Tamil)
          </button>
          <button 
            onClick={() => onSelect('hi')} 
            className="btn glass hover:bg-white/30 text-white font-bold py-4 text-lg border-white/20"
          >
            हिन्दी (Hindi)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
