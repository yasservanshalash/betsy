import React from 'react'

const BottomFooter = () => {
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
    <div className="bg-neutral-900 p-6 block md:hidden">
      
      {/* Language and Currency Section */}
      <div className="flex items-center justify-center gap-4 text-white pb-4">
        <span className="text-xl">🇪🇺</span>
        <div className="w-px h-5 bg-white/30"></div>
        <span className="text-sm">English (US)</span>
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