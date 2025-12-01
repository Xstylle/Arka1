export enum PageView {
  HERO = 'HERO',
  HOROSCOPE = 'HOROSCOPE',
  KUNDLI = 'KUNDLI',
  ZODIAC = 'ZODIAC',
  COMPATIBILITY = 'COMPATIBILITY',
  CHAT = 'CHAT',
  PRICING = 'PRICING'
}

export interface ZodiacSignData {
  name: string;
  dates: string;
  element: string;
  symbol: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface HoroscopeResult {
  daily: string;
  personality: string;
  luckyNumber: string;
  luckyColor: string;
  mood: string;
}

export interface CompatibilityResult {
  percentage: number;
  analysis: string;
  strengths: string[];
  challenges: string[];
}

export interface KundliResult {
  summary: string;
  dominantPlanet: string;
  strength: string;
  weakness: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}