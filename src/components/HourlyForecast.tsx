import { HourlyForecastItem } from '../types/weather';

interface Props {
  items: HourlyForecastItem[];
}

const formatHour = (timestamp: number) => new Date(timestamp).toLocaleTimeString([], { hour: 'numeric' });

export function HourlyForecast({ items }: Props) {
  return (
    <div className="card-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Next hours</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">Swipe to explore</p>
      </div>
      <div className="gradient-mask flex gap-3 overflow-x-auto pb-2">
        {items.map(item => (
          <div key={item.timestamp} className="min-w-[90px] rounded-xl bg-white/60 p-3 text-center text-slate-900 shadow-card dark:bg-slate-800/70 dark:text-slate-100">
            <p className="text-sm text-slate-600 dark:text-slate-300">{formatHour(item.timestamp)}</p>
            <img src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} alt={item.description} className="mx-auto h-12 w-12" />
            <p className="text-lg font-semibold">{Math.round(item.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}
