import { WeatherData } from '../types/weather';

interface Props {
  data?: WeatherData;
}

export function AirQualityPanel({ data }: Props) {
  if (!data?.airQuality && !data?.uvIndex) return null;
  return (
    <div className="card-surface grid grid-cols-1 gap-4 p-5 text-slate-900 dark:text-slate-100 sm:grid-cols-2">
      {data?.airQuality && (
        <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/70 p-4 text-emerald-900 shadow-sm dark:border-emerald-600/40 dark:bg-emerald-900/40 dark:text-emerald-50">
          <p className="text-sm font-semibold uppercase tracking-wide">Air quality</p>
          <p className="mt-2 text-3xl font-black">{data.airQuality.index}</p>
          <p className="text-sm opacity-80">{data.airQuality.label}</p>
        </div>
      )}
      {data?.uvIndex !== undefined && (
        <div className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4 text-amber-900 shadow-sm dark:border-amber-600/40 dark:bg-amber-900/40 dark:text-amber-50">
          <p className="text-sm font-semibold uppercase tracking-wide">UV index</p>
          <p className="mt-2 text-3xl font-black">{data.uvIndex}</p>
          <p className="text-sm opacity-80">{data.uvIndex >= 7 ? 'High – wear SPF' : data.uvIndex >= 3 ? 'Moderate – SPF suggested' : 'Low risk'}</p>
        </div>
      )}
    </div>
  );
}
