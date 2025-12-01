import React from 'react';
import { ZODIAC_SIGNS } from '../constants.tsx';
import { motion } from 'framer-motion';

const ZodiacList: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-gold-400 mb-2">The 12 Signs</h2>
        <p className="text-purple-200">Ancient archetypes of the zodiac.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ZODIAC_SIGNS.map((sign, index) => (
          <motion.div
            key={sign.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer border border-transparent hover:border-purple-500/50"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {sign.symbol}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{sign.name}</h3>
            <p className="text-sm text-gold-400 font-medium mb-2">{sign.dates}</p>
            <div className="flex items-center justify-between mt-4">
                <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 
                    ${sign.element === 'Fire' ? 'bg-red-500 text-red-300' : ''}
                    ${sign.element === 'Water' ? 'bg-blue-500 text-blue-300' : ''}
                    ${sign.element === 'Air' ? 'bg-yellow-500 text-yellow-300' : ''}
                    ${sign.element === 'Earth' ? 'bg-green-500 text-green-300' : ''}
                `}>
                    {sign.element}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-white">Read more →</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ZodiacList;