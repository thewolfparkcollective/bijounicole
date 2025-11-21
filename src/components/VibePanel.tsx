import { WeatherData } from '../types/weather';
import { buildVibe } from '../utils/vibe';

export function VibePanel({ data }: { data?: WeatherData }) {
  const vibe = buildVibe(data);
  return (
    <div className="card-surface flex flex-col gap-3 p-4 text-slate-900 dark:text-slate-100">
      <p className="text-sm text-slate-500 dark:text-slate-300">Vibe forecast</p>
      <p className="text-2xl font-semibold">{vibe.headline}</p>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700 dark:bg-sky-900/60 dark:text-sky-100">
          Outfit: {vibe.outfit}
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-900/50 dark:text-amber-100">
          Item: {vibe.item}
        </span>
      </div>
    </div>
  );
}
