import { WeatherData } from '../types/weather';
import { buildVibe } from '../utils/vibe';

export function VibePanel({ data }: { data?: WeatherData }) {
  const vibe = buildVibe(data);
  return (
    <div className="card-surface flex flex-col gap-4 p-5 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <p className="section-title">Vibe forecast</p>
        <span className="chip">Mood-based tips</span>
      </div>
      <p className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">{vibe.headline}</p>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="chip bg-sky-100/60 text-sky-800 dark:bg-sky-900/50 dark:text-sky-100">Outfit: {vibe.outfit}</span>
        <span className="chip bg-amber-100/70 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100">Item: {vibe.item}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">We look at temperature swings, rain chance, wind, and time of day to keep the vibe honest.</p>
    </div>
  );
}
