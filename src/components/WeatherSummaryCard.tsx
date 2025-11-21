import { WeatherData } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';

interface Props {
  data: WeatherData;
}

export function WeatherSummaryCard({ data }: Props) {
  const { location, current } = data;
  return (
    <div className="card-surface overflow-hidden p-6 text-slate-900 dark:text-slate-100">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-3xl bg-gradient-to-br from-white/60 to-white/30 p-4 shadow-lg">
            <WeatherIcon icon={current.condition.icon} alt={current.condition.description} size={72} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-300">Today in</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {location.name} {location.country && `• ${location.country}`}
            </p>
            <p className="mt-1 text-lg capitalize text-slate-600 dark:text-slate-200">{current.condition.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              <span className="chip bg-slate-900/5 text-slate-700 dark:text-slate-200">Humidity {current.humidity}%</span>
              <span className="chip bg-slate-900/5 text-slate-700 dark:text-slate-200">Wind {Math.round(current.windSpeed)} km/h</span>
              <span className="chip bg-slate-900/5 text-slate-700 dark:text-slate-200">Pressure {current.pressure} hPa</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-6">
          <div>
            <p className="text-6xl font-black leading-none text-slate-900 dark:text-white">{Math.round(current.temperature.current)}°</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Feels like {Math.round(current.temperature.feelsLike)}°</p>
          </div>
          <div className="hidden flex-col gap-1 text-right text-sm text-slate-600 dark:text-slate-200 sm:flex">
            <p>High {Math.round(current.temperature.high)}°</p>
            <p>Low {Math.round(current.temperature.low)}°</p>
            <p>Sunrise {new Date(current.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Sunset {new Date(current.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
