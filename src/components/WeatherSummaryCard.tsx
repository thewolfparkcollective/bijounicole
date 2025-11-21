import { WeatherData } from '../types/weather';

interface Props {
  data: WeatherData;
}

export function WeatherSummaryCard({ data }: Props) {
  const { location, current } = data;
  return (
    <div className="card-surface grid grid-cols-2 gap-4 p-6 text-slate-900 dark:text-slate-100 md:grid-cols-4">
      <div className="col-span-2">
        <p className="text-sm text-slate-500 dark:text-slate-200">Today in</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {location.name} {location.country && `• ${location.country}`}
        </p>
        <p className="mt-2 text-lg capitalize text-slate-600 dark:text-slate-200">
          {current.condition.description}
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-5xl font-black leading-tight text-slate-900 dark:text-white">
          {Math.round(current.temperature.current)}°
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Feels like {Math.round(current.temperature.feelsLike)}°
        </p>
      </div>
      <div className="flex flex-col justify-center gap-1 text-right text-sm text-slate-600 dark:text-slate-200">
        <p>High {Math.round(current.temperature.high)}°</p>
        <p>Low {Math.round(current.temperature.low)}°</p>
        <p>Wind {Math.round(current.windSpeed)} km/h</p>
        <p>Humidity {current.humidity}%</p>
        <p>Pressure {current.pressure} hPa</p>
      </div>
    </div>
  );
}
