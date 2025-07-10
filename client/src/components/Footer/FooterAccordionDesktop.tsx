import React from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const FooterAccordionDesktop = () => {
  return (
    <div className="hidden md:flex justify-evenly bg-slate-700 text-white py-12">
      
      {/* Shop Section */}
      <div className="flex flex-col space-y-4">
        <Link 
          to="/404" 
          className="text-lg font-semibold hover:text-primary-300 transition-colors"
        >
          Shop
        </Link>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Gift cards
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Sitemap
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Betsy blog
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Betsy Europe
          </Link>
        </div>
      </div>

      {/* Sell Section */}
      <div className="flex flex-col space-y-4">
        <Link 
          to="/404" 
          className="text-lg font-semibold hover:text-primary-300 transition-colors"
        >
          Sell
        </Link>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Sell on Betsy
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Teams
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Forums
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Affiliates
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col space-y-4">
        <Link 
          to="/404" 
          className="text-lg font-semibold hover:text-primary-300 transition-colors"
        >
          About
        </Link>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Betsy, Inc.
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Policies
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Careers
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Impact
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Press
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Legal imprint
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="flex flex-col space-y-4">
        <Link 
          to="/404" 
          className="text-lg font-semibold hover:text-primary-300 transition-colors"
        >
          Help
        </Link>
        <div className="flex flex-col space-y-3">
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Help Center
          </Link>
          <Link 
            to="/404" 
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Privacy settings
          </Link>
        </div>

        {/* Download App Button */}
        <div className="mt-4">
          <button
            disabled
            className="px-4 py-2 border-2 border-white rounded-full text-white text-sm opacity-60 cursor-not-allowed transition-all hover:opacity-70"
          >
            Download Betsy App
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-3 mt-4">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Instagram className="w-5 h-5 text-pink-400" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Facebook className="w-5 h-5 text-blue-400" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="w-5 h-5 bg-pink-400 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Twitter className="w-5 h-5 text-sky-400" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href="#"
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Youtube className="w-5 h-5 text-red-500" />
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default FooterAccordionDesktop;
