import { WeatherData } from '../types/weather';

export function AirQualityPanel({ data }: { data?: WeatherData }) {
  if (!data?.airQuality && data?.uvIndex === undefined) return null;
  return (
    <div className="grid grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
      {data.airQuality && (
        <div className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-300">Air quality</p>
          <p className="text-2xl font-semibold">AQI {data.airQuality.index}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{data.airQuality.label}</p>
        </div>
      )}
      {data.uvIndex !== undefined && (
        <div className="card-surface p-4">
          <p className="text-sm text-slate-500 dark:text-slate-300">UV index</p>
          <p className="text-2xl font-semibold">{data.uvIndex}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {data.uvIndex >= 6 ? 'High – wear SPF and seek shade.' : data.uvIndex >= 3 ? 'Moderate – sunscreen recommended.' : 'Low – minimal risk today.'}
          </p>
        </div>
      )}
    </div>
  );
}
