import { DailyForecastItem } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  items: DailyForecastItem[];
}

export function DailyForecast({ items }: Props) {
  return (
    <section className="card-surface p-5 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <p className="section-title">Next 7-10 days</p>
        <p className="text-sm text-slate-500 dark:text-slate-300">Plan ahead with highs/lows</p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(item => (
          <div
            key={item.timestamp}
            className="flex items-center justify-between rounded-2xl border border-slate-200/40 bg-white/70 px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/70"
          >
            <div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
                {new Date(item.timestamp).toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
              <p className="text-xs capitalize text-slate-500 dark:text-slate-300">{item.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <WeatherIcon icon={item.icon} alt={item.description} size={42} />
              <div className="text-right text-sm font-semibold text-slate-700 dark:text-slate-100">
                <p>High {Math.round(item.temp.max)}°</p>
                <p className="text-slate-500 dark:text-slate-300">Low {Math.round(item.temp.min)}°</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
