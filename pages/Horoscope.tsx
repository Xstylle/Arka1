import React, { useState } from 'react';
import { generateHoroscope } from '../services/geminiService.ts';
import { HoroscopeResult, LoadingState } from '../types.ts';
import { Loader2, RefreshCw, Star, Sun, Hash, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Horoscope: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    pob: '',
  });
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(LoadingState.LOADING);
    try {
      const data = await generateHoroscope(formData.name, formData.dob, formData.pob);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center">
      <h2 className="text-4xl font-serif text-gold-400 mb-2">Cosmic Insights</h2>
      <p className="text-purple-200 mb-8">Align your soul with the daily movement of the stars.</p>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-panel p-8 rounded-2xl border-t border-purple-500/30"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Your Name</label>
              <input
                type="text"
                required
                className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="e.g., Aria Stark"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Date of Birth</label>
              <input
                type="date"
                required
                className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Place of Birth</label>
              <input
                type="text"
                required
                className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                placeholder="e.g., Paris, France"
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={status === LoadingState.LOADING}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg hover:shadow-purple-500/40 transition-all flex justify-center items-center"
            >
              {status === LoadingState.LOADING ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Reveal Prophecy'
              )}
            </button>
          </form>
        </motion.div>

        {/* Result Section */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          {status === LoadingState.IDLE && (
            <div className="text-center text-gray-400 opacity-50">
              <Star className="w-16 h-16 mx-auto mb-4" />
              <p>Enter your details to gaze into the future.</p>
            </div>
          )}

          {status === LoadingState.LOADING && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-t-gold-400 border-r-transparent border-b-purple-500 border-l-transparent animate-spin mb-4"></div>
                <p className="text-purple-200 animate-pulse">Consulting the celestial sphere...</p>
            </div>
          )}

          {status === LoadingState.SUCCESS && result && (
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-4"
            >
              {/* Main Prophecy Card */}
              <div className="glass-panel p-6 rounded-2xl border border-gold-400/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                <div className="flex items-center mb-4 text-gold-400">
                   <Sun className="mr-2" />
                   <h3 className="font-serif text-xl">Daily Forecast</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-100 italic">"{result.daily}"</p>
              </div>

              {/* Personality Card */}
              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-purple-300 font-serif mb-2">Cosmic Identity</h3>
                <p className="text-gray-300 text-sm">{result.personality}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                 <div className="glass-panel p-4 rounded-xl text-center">
                    <Hash className="w-6 h-6 mx-auto text-blue-400 mb-2" />
                    <div className="text-xs text-gray-400">Lucky #</div>
                    <div className="text-xl font-bold text-white">{result.luckyNumber}</div>
                 </div>
                 <div className="glass-panel p-4 rounded-xl text-center">
                    <Palette className="w-6 h-6 mx-auto text-pink-400 mb-2" />
                    <div className="text-xs text-gray-400">Color</div>
                    <div className="text-xl font-bold text-white">{result.luckyColor}</div>
                 </div>
                 <div className="glass-panel p-4 rounded-xl text-center">
                    <RefreshCw className="w-6 h-6 mx-auto text-green-400 mb-2" />
                    <div className="text-xs text-gray-400">Mood</div>
                    <div className="text-xl font-bold text-white capitalize">{result.mood}</div>
                 </div>
              </div>
              
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Horoscope;