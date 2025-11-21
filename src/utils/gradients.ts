import { WeatherData } from '../types/weather';

export function gradientFor(data?: WeatherData) {
  if (!data) {
    return 'from-indigo-500/60 via-slate-900 to-slate-950';
  }
  const hour = getLocalHour(data.current.timezoneOffset);
  const main = data.current.condition.main.toLowerCase();
  const isNight = hour < 6 || hour >= 20;

  if (main.includes('rain') || main.includes('storm')) {
    return isNight
      ? 'from-slate-800 via-slate-900 to-slate-950'
      : 'from-slate-600 via-slate-800 to-slate-950';
  }
  if (main.includes('cloud')) {
    return isNight
      ? 'from-slate-700 via-slate-900 to-slate-950'
      : 'from-blue-200 via-slate-300 to-slate-700';
  }
  return isNight
    ? 'from-purple-900 via-indigo-900 to-slate-950'
    : hour < 12
    ? 'from-amber-300 via-orange-400 to-indigo-600'
    : 'from-sky-300 via-blue-500 to-indigo-700';
}

function getLocalHour(offsetSeconds: number) {
  const utc = new Date().getTime();
  const local = new Date(utc + offsetSeconds * 1000);
  return local.getUTCHours();
}
