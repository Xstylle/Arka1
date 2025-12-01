import React, { useState } from 'react';
import { PageView } from '../types.ts';
import { Menu, X, Sparkles, MessageCircle, User, Heart, Globe, Zap } from 'lucide-react';

interface NavigationProps {
  currentPage: PageView;
  setPage: (page: PageView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: PageView.HERO, label: 'Home', icon: <Globe size={18} /> },
    { id: PageView.HOROSCOPE, label: 'Horoscope', icon: <Sparkles size={18} /> },
    { id: PageView.KUNDLI, label: 'Kundli', icon: <User size={18} /> },
    { id: PageView.COMPATIBILITY, label: 'Love Match', icon: <Heart size={18} /> },
    { id: PageView.CHAT, label: 'AI Oracle', icon: <MessageCircle size={18} /> },
    { id: PageView.PRICING, label: 'Premium', icon: <Zap size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => setPage(PageView.HERO)}
          >
            <Sparkles className="text-purple-400 mr-2 animate-pulse" />
            <span className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-gold-400">
              AstroSoul
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-white/10 text-gold-400 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                   currentPage === item.id
                      ? 'bg-white/10 text-gold-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;