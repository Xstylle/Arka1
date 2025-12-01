import React, { useState } from 'react';
import Navigation from './components/Navigation.tsx';
import StarField from './components/StarField.tsx';
import Hero from './pages/Hero.tsx';
import Horoscope from './pages/Horoscope.tsx';
import ZodiacList from './pages/ZodiacList.tsx';
import Compatibility from './pages/Compatibility.tsx';
import Chat from './pages/Chat.tsx';
import BirthChart from './pages/BirthChart.tsx';
import Pricing from './pages/Pricing.tsx';
import { PageView } from './types.ts';
import { Github, Twitter, Instagram } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setPage] = useState<PageView>(PageView.HERO);

  const renderPage = () => {
    switch (currentPage) {
      case PageView.HERO:
        return <Hero setPage={setPage} />;
      case PageView.HOROSCOPE:
        return <Horoscope />;
      case PageView.ZODIAC:
        return <ZodiacList />;
      case PageView.COMPATIBILITY:
        return <Compatibility />;
      case PageView.CHAT:
        return <Chat />;
      case PageView.KUNDLI:
        return <BirthChart />;
      case PageView.PRICING:
        return <Pricing />;
      default:
        return <Hero setPage={setPage} />;
    }
  };

  return (
    <div className="font-body text-gray-100 bg-cosmos-900 min-h-screen flex flex-col">
      <StarField />
      <Navigation currentPage={currentPage} setPage={setPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h4 className="text-xl font-serif text-gold-400 mb-1">AstroSoul AI</h4>
            <p className="text-xs text-gray-500">© 2024 Cosmic Intelligence. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-gray-400">
             <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
             <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
             <a href="#" className="hover:text-white transition"><Github size={20} /></a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0 text-xs text-gray-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;