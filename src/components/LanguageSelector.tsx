
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    { code: 'ko' as const, name: '한국어', flag: '🇰🇷' },
  ];

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[120px] bg-white/80 border-stone-black/20 hover:bg-stone-powder/20 transition-colors">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white border-stone-black/20 shadow-lg">
        {languages.map((lang) => (
          <SelectItem 
            key={lang.code} 
            value={lang.code}
            className="hover:bg-stone-powder/20 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span className="font-korean">{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
