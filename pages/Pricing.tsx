import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Seeker',
      price: 0,
      features: ['Daily Horoscope', 'Basic Zodiac Info', '1 Chat Query/Day'],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Mystic',
      price: isAnnual ? 79 : 9,
      features: ['Full Birth Chart', 'Compatibility Reports', 'Unlimited Chat', 'Remedies & Gemstones'],
      cta: 'Go Premium',
      popular: true
    },
    {
      name: 'Oracle',
      price: isAnnual ? 199 : 29,
      features: ['Live Astrologer Call (1/mo)', 'Detailed 5-Year Prediction', 'Priority Support', 'Everything in Mystic'],
      cta: 'Go Pro',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-white mb-4">Unlock the Cosmos</h2>
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 bg-purple-600 rounded-full p-1 relative transition-colors"
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${isAnnual ? 'left-7' : 'left-1'}`}></div>
          </button>
          <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>Yearly (Save 20%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative p-8 rounded-2xl border flex flex-col ${
                plan.popular 
                ? 'bg-white/10 border-gold-400 shadow-[0_0_30px_rgba(255,215,0,0.15)]' 
                : 'bg-black/40 border-white/10'
            }`}
          >
            {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-3xl font-serif text-gold-400 mb-6">
                ${plan.price}<span className="text-sm text-gray-400 font-sans">/{isAnnual ? 'yr' : 'mo'}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                        <Check className="w-5 h-5 text-green-400 mr-2 shrink-0" />
                        {feat}
                    </li>
                ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-bold transition-colors ${
                plan.popular 
                ? 'bg-gold-500 text-black hover:bg-gold-400' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}>
                {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
