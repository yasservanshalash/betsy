import React from 'react'

const BottomFooterDesktop = () => {
  const date = new Date().getFullYear();
  const footerMessage = `© ${date} Betsy, Inc.`;

  const footerLinks = [
    'Terms of Use',
    'Privacy', 
    'Cookies',
    'Interest-based ads',
    'Regions'
  ];

  return (
    <div className="bg-neutral-900 p-6 hidden md:flex justify-between items-center">
      
      {/* Language and Currency Section */}
      <div className="flex items-center gap-3 text-white">
        <span className="text-lg">🇪🇺</span>
        <div className="w-px h-4 bg-white/30"></div>
        <span className="text-sm">English (US)</span>
        <div className="w-px h-4 bg-white/30"></div>
        <span className="text-sm">€ (EUR)</span>
      </div>
      
      {/* Copyright and Links */}
      <div className="flex items-center gap-6 text-white">
        <span className="text-sm">{footerMessage}</span>
        
        {/* Footer Links */}
        <div className="flex items-center gap-4">
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
    </div>
  )
}

export default BottomFooterDesktop