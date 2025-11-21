import { useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import { WeatherData, WeatherQuery } from '../types/weather';

export function useWeather(query?: WeatherQuery) {
  const [data, setData] = useState<WeatherData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchWeather(query)
      .then(result => {
        if (!cancelled) setData(result);
      })
      .catch(err => {
        if (!cancelled) setError(err.message ?? 'Failed to load weather');
      })
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(query)]);

  return { data, loading, error };
}
