import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const BottomFooter = () => {
  const date = new Date().getFullYear();
  const footerMessage = `© ${date} Betsy, Inc.`;
  
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇾' }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const footerLinks = [
    'Terms of Use',
    'Privacy', 
    'Cookies',
    'Interest-based ads',
    'Regions'
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <div className="bg-neutral-900 p-6 block md:hidden">
      
      {/* Language and Currency Section */}
      <div className="flex items-center justify-center gap-4 text-white pb-4">
        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <span className="text-lg">{currentLanguage?.flag}</span>
            <span className="text-sm">{currentLanguage?.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-neutral-200 min-w-[140px] z-10">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-neutral-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    selectedLanguage === language.code ? 'bg-primary-50 text-primary-600' : 'text-neutral-700'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm">{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="w-px h-5 bg-white/30"></div>
        <span className="text-sm">€ (EUR)</span>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-white pt-4 pb-4">
        <p className="text-sm">{footerMessage}</p>
      </div>
      
      {/* Footer Links */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white">
        {footerLinks.map((link, index) => (
          <button
            key={index}
            className="text-xs underline hover:text-neutral-300 transition-colors"
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BottomFooter