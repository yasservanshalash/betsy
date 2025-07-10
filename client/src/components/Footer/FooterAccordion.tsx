import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const FooterAccordion = () => {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const AccordionItem = ({ 
    title, 
    children, 
    sectionKey 
  }: { 
    title: string
    children: React.ReactNode
    sectionKey: string 
  }) => (
    <div className="border-b border-white/20">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
      >
        <span className="text-white font-semibold text-lg">{title}</span>
        <motion.div
          animate={{ rotate: openSections[sectionKey] ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {openSections[sectionKey] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="bg-slate-700 px-4 md:hidden">
      <AccordionItem title="Shop" sectionKey="shop">
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Gift Cards
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Sitemap
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Betsy blog
        </Link>
      </AccordionItem>

      <AccordionItem title="Sell" sectionKey="sell">
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Sell on Betsy
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Teams
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Forums
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Affiliates
        </Link>
      </AccordionItem>

      <AccordionItem title="About" sectionKey="about">
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Betsy, Inc.
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Policies
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Investors
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Careers
        </Link>
      </AccordionItem>

      <AccordionItem title="Help" sectionKey="help">
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Help center
        </Link>
        <Link to="/404" className="block text-white/80 hover:text-white transition-colors">
          Privacy settings
        </Link>
      </AccordionItem>

      {/* Download App Button */}
      <div className="flex justify-center py-6">
        <button 
          disabled
          className="px-6 py-2 border-2 border-white rounded-full text-white text-sm opacity-60 cursor-not-allowed"
        >
          Download Betsy App
        </button>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 pb-6">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Instagram className="w-6 h-6 text-pink-400" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Facebook className="w-6 h-6 text-blue-400" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <div className="w-6 h-6 bg-pink-400 rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Twitter className="w-6 h-6 text-sky-400" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <Youtube className="w-6 h-6 text-red-500" />
        </motion.a>
      </div>
    </div>
  )
}

export default FooterAccordion