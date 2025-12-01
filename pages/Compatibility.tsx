import React, { useState } from 'react';
import { ZODIAC_SIGNS } from '../constants.tsx';
import { generateCompatibility } from '../services/geminiService.ts';
import { CompatibilityResult, LoadingState } from '../types.ts';
import { Heart, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Compatibility: React.FC = () => {
  const [sign1, setSign1] = useState(ZODIAC_SIGNS[0].name);
  const [sign2, setSign2] = useState(ZODIAC_SIGNS[6].name);
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleCheck = async () => {
    setStatus(LoadingState.LOADING);
    try {
      const data = await generateCompatibility(sign1, sign2);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center">
      <h2 className="text-4xl font-serif text-pink-300 mb-2">Cosmic Chemistry</h2>
      <p className="text-purple-200 mb-8">Calculate the synergy between two souls.</p>

      <div className="w-full max-w-2xl">
        <div className="glass-panel p-8 rounded-3xl border border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.1)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            
            {/* Sign 1 Selector */}
            <div className="w-full text-center">
              <select 
                value={sign1}
                onChange={(e) => setSign1(e.target.value)}
                className="w-full bg-black/50 text-white border border-pink-500/30 rounded-xl p-4 appearance-none text-center text-lg focus:border-pink-500 focus:outline-none cursor-pointer hover:bg-black/70 transition"
              >
                {ZODIAC_SIGNS.map(z => <option key={z.name} value={z.name}>{z.symbol} {z.name}</option>)}
              </select>
            </div>

            <div className="bg-pink-600/20 p-4 rounded-full">
              <Heart className="text-pink-500 fill-current animate-pulse" size={32} />
            </div>

             {/* Sign 2 Selector */}
             <div className="w-full text-center">
              <select 
                value={sign2}
                onChange={(e) => setSign2(e.target.value)}
                className="w-full bg-black/50 text-white border border-pink-500/30 rounded-xl p-4 appearance-none text-center text-lg focus:border-pink-500 focus:outline-none cursor-pointer hover:bg-black/70 transition"
              >
                {ZODIAC_SIGNS.map(z => <option key={z.name} value={z.name}>{z.symbol} {z.name}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleCheck}
            disabled={status === LoadingState.LOADING}
            className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform flex justify-center items-center"
          >
            {status === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : 'Analyze Compatibility'}
          </button>

          {/* Results */}
          {result && status === LoadingState.SUCCESS && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-8 space-y-6"
            >
              {/* Percentage Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-pink-500/30">
                    <div className="absolute inset-0 rounded-full border-8 border-pink-500" style={{ clipPath: `inset(${100 - result.percentage}% 0 0 0)`}}></div>
                    <span className="text-3xl font-bold text-white">{result.percentage}%</span>
                </div>
                <p className="text-pink-200 mt-2 text-sm uppercase tracking-widest">Match Score</p>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border-l-4 border-pink-500">
                <p className="text-gray-200 italic leading-relaxed">{result.analysis}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-900/20 p-4 rounded-xl border border-green-500/20">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center"><CheckCircle size={16} className="mr-2"/> Strengths</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                </div>
                <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/20">
                    <h4 className="text-red-400 font-bold mb-2 flex items-center"><AlertTriangle size={16} className="mr-2"/> Challenges</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        {result.challenges.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                </div>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compatibility;