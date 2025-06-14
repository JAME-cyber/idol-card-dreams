
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
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
