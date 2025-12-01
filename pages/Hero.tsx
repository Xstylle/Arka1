import React from 'react';
import { motion } from 'framer-motion';
import { PageView } from '../types.ts';
import { Sparkles, Moon, Sun, ArrowRight } from 'lucide-react';

interface HeroProps {
  setPage: (page: PageView) => void;
}

const Hero: React.FC<HeroProps> = ({ setPage }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl z-10"
      >
        <div className="flex justify-center space-x-4 mb-6">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sun className="text-gold-400 w-12 h-12 opacity-80" />
            </motion.div>
            <Moon className="text-purple-300 w-12 h-12 opacity-80 animate-float" />
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-purple-200">
            Discover Your
          </span>
          <br />
          <span className="text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
             Cosmic Destiny
          </span>
        </h1>

        <p className="text-lg md:text-xl text-purple-100/80 mb-10 max-w-2xl mx-auto font-light">
          Your AI-powered guide to the stars. Unveil the mysteries of your birth chart, 
          explore daily predictions, and find clarity with advanced astrological insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setPage(PageView.HOROSCOPE)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold text-lg shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] hover:scale-105 transition-all duration-300 flex items-center"
          >
            <Sparkles className="mr-2" />
            Reveal My Horoscope
          </button>
          
          <button
            onClick={() => setPage(PageView.CHAT)}
            className="px-8 py-4 glass-panel rounded-full text-white font-semibold text-lg hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center"
          >
            Ask the Oracle
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Features Grid Snippet */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-10 w-full max-w-6xl px-4 hidden md:grid grid-cols-3 gap-6 text-left"
      >
         {[
            { title: "AI Predictions", desc: "Powered by Gemini 2.5 Flash" },
            { title: "Vedic Accuracy", desc: "Traditional wisdom meets tech" },
            { title: "Live Guidance", desc: "Real-time cosmic chat" }
         ].map((item, idx) => (
             <div key={idx} className="glass-panel p-4 rounded-xl border-l-4 border-gold-400/50">
                 <h3 className="text-gold-400 font-bold">{item.title}</h3>
                 <p className="text-xs text-gray-400">{item.desc}</p>
             </div>
         ))}
      </motion.div>
    </div>
  );
};

export default Hero;