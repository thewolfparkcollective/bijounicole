import { HourlyForecastItem } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  items: HourlyForecastItem[];
}

export function HourlyForecast({ items }: Props) {
  return (
    <section className="card-surface p-5 text-slate-900 dark:text-slate-100">
      <div className="flex items-center justify-between">
        <p className="section-title">Next hours</p>
        <p className="text-sm text-slate-500 dark:text-slate-300">Stay ahead of quick shifts</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {items.map(item => (
          <div
            key={item.timestamp}
            className="rounded-2xl border border-slate-200/40 bg-white/70 p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/70"
          >
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
              {new Date(item.timestamp).toLocaleTimeString([], { hour: 'numeric' })}
            </p>
            <div className="my-2 flex justify-center">
              <WeatherIcon icon={item.icon} alt={item.description} size={48} />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{Math.round(item.temp)}°</p>
            <p className="text-xs capitalize text-slate-500 dark:text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
