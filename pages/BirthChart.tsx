import React, { useState } from 'react';
import { generateKundli } from '../services/geminiService.ts';
import { KundliResult, LoadingState } from '../types.ts';
import { Loader2, MapPin, Clock, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BirthChart: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        time: '',
        place: ''
    });
    const [result, setResult] = useState<KundliResult | null>(null);
    const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(LoadingState.LOADING);
        try {
            const data = await generateKundli(formData.name, formData.dob, formData.time, formData.place);
            setResult(data);
            setStatus(LoadingState.SUCCESS);
        } catch (e) {
            console.error(e);
            setStatus(LoadingState.ERROR);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center">
            <h2 className="text-4xl font-serif text-indigo-300 mb-2">Janam Kundli</h2>
            <p className="text-purple-200 mb-8">The blueprint of your soul at the exact moment of birth.</p>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Input Form */}
                <div className="glass-panel p-8 rounded-2xl border border-indigo-500/30">
                    <h3 className="text-xl text-white font-semibold mb-6">Birth Details</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Full Name"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-indigo-400 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="date" 
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-indigo-400 outline-none"
                                    value={formData.dob}
                                    onChange={e => setFormData({...formData, dob: e.target.value})}
                                />
                            </div>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input 
                                    type="time" 
                                    required
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-indigo-400 outline-none"
                                    value={formData.time}
                                    onChange={e => setFormData({...formData, time: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="City, Country"
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-indigo-400 outline-none"
                                value={formData.place}
                                onChange={e => setFormData({...formData, place: e.target.value})}
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={status === LoadingState.LOADING}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold transition-colors flex justify-center items-center"
                        >
                            {status === LoadingState.LOADING ? <Loader2 className="animate-spin" /> : "Generate Chart"}
                        </button>
                    </form>
                </div>

                {/* Visualization / Results */}
                <div className="glass-panel p-8 rounded-2xl border border-indigo-500/30 flex flex-col justify-center min-h-[400px]">
                    {status === LoadingState.IDLE && (
                        <div className="text-center opacity-50">
                            <div className="w-40 h-40 mx-auto border border-dashed border-indigo-400 rounded-full flex items-center justify-center mb-4">
                                <span className="text-4xl">🪐</span>
                            </div>
                            <p>Awaiting birth data...</p>
                        </div>
                    )}
                     {status === LoadingState.LOADING && (
                        <div className="text-center">
                             <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                             <p className="text-indigo-200">Calculating planetary positions...</p>
                        </div>
                    )}
                    {status === LoadingState.SUCCESS && result && (
                         <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            <div className="border-b border-white/10 pb-4">
                                <h3 className="text-2xl font-serif text-gold-400">Planetary Overview</h3>
                                <p className="text-gray-300 mt-2 text-sm leading-relaxed">{result.summary}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg text-center">
                                    <div className="text-xs text-gray-400 uppercase">Dominant Planet</div>
                                    <div className="text-lg font-bold text-indigo-300">{result.dominantPlanet}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg text-center">
                                    <div className="text-xs text-gray-400 uppercase">Karmic Strength</div>
                                    <div className="text-lg font-bold text-green-300">{result.strength}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg text-center">
                                    <div className="text-xs text-gray-400 uppercase">Hidden Challenge</div>
                                    <div className="text-lg font-bold text-red-300">{result.weakness}</div>
                                </div>
                            </div>

                            {/* Simulated North Indian Chart Visual */}
                            <div className="relative w-full aspect-square max-w-xs mx-auto border-2 border-gold-400/40 rotate-45 mt-8 scale-75 md:scale-100">
                                <div className="absolute inset-0 border-2 border-gold-400/40 grid grid-cols-2 grid-rows-2"></div>
                                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                                    <span className="text-gold-400 font-bold text-xs">Lagna</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BirthChart;