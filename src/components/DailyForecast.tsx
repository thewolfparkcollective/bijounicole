import { DailyForecastItem } from '../types/weather';

interface Props {
  items: DailyForecastItem[];
}

const formatDay = (timestamp: number) => new Date(timestamp).toLocaleDateString(undefined, { weekday: 'short' });

export function DailyForecast({ items }: Props) {
  return (
    <div className="card-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">7-day outlook</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300">Plan ahead</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <div key={item.timestamp} className="flex items-center justify-between rounded-xl bg-white/60 px-4 py-3 text-slate-900 shadow-card dark:bg-slate-800/70 dark:text-slate-100">
            <div className="flex items-center gap-3">
              <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt={item.description} className="h-10 w-10" />
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{formatDay(item.timestamp)}</p>
                <p className="text-base capitalize">{item.description}</p>
              </div>
            </div>
            <div className="text-right text-sm font-semibold">
              <p>{Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
