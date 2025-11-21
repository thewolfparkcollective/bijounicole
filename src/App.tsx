import { useEffect, useMemo, useState } from 'react';
import { HeaderSearch } from './components/HeaderSearch';
import { FavoritesBar } from './components/FavoritesBar';
import { WeatherSummaryCard } from './components/WeatherSummaryCard';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { VibePanel } from './components/VibePanel';
import { AirQualityPanel } from './components/AirQualityPanel';
import { AlertRulesPanel } from './components/AlertRulesPanel';
import { LoadingBlock } from './components/LoadingBlock';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { AlertRule, LocationSummary, WeatherQuery } from './types/weather';
import { buildDefaultRules } from './utils/alerts';
import { gradientFor } from './utils/gradients';

function App() {
  const [query, setQuery] = useState<WeatherQuery>();
  const [rules, setRules] = useState<AlertRule[]>(buildDefaultRules());
  const { data, loading, error } = useWeather(query);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Try to read stored last location
    const cached = localStorage.getItem('last-query');
    if (cached) {
      setQuery(JSON.parse(cached));
      return;
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        setQuery({ type: 'coords', lat: pos.coords.latitude, lon: pos.coords.longitude, label: 'Current location' });
      });
    }
  }, []);

  useEffect(() => {
    if (query) localStorage.setItem('last-query', JSON.stringify(query));
  }, [query]);

  const gradient = useMemo(() => gradientFor(data), [data]);

  const handleSearch = (city: string) => setQuery({ type: 'city', city });
  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      setQuery({ type: 'coords', lat: pos.coords.latitude, lon: pos.coords.longitude, label: 'Current location' });
    });
  };

  const handleAddFavorite = () => {
    if (data) addFavorite(data.location);
  };

  const handleRuleUpdate = (rule: AlertRule) => {
    setRules(prev => prev.map(r => (r.id === rule.id ? rule : r)));
  };

  const onSelectFavorite = (favorite: LocationSummary) => {
    setQuery({ type: 'coords', lat: favorite.lat, lon: favorite.lon, label: favorite.name });
  };

  return (
    <div className={`app-shell min-h-screen bg-gradient-to-br ${gradient} text-white`}>
      <div className="layer-content mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:py-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="chip text-xs">Weather Vibes</p>
            <h1 className="mt-2 text-4xl font-black leading-tight">A sleek forecast for your day</h1>
            <p className="mt-1 max-w-2xl text-white/80">Auto-location, fast city search, vibe-based tips, and alerts—all wrapped in a modern, extensible UI.</p>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:border-white/40 hover:bg-white/20"
          >
            {theme === 'dark' ? 'Switch to light' : 'Switch to dark'} mode
          </button>
        </header>

        <div className="glass-panel p-4 md:p-6">
          <HeaderSearch
            onSearch={handleSearch}
            onUseLocation={handleUseLocation}
            onAddFavorite={handleAddFavorite}
            activeLocation={data?.location}
          />
          <FavoritesBar favorites={favorites} onSelect={onSelectFavorite} onRemove={removeFavorite} />
        </div>

        {loading && <LoadingBlock />}
        {error && <div className="rounded-2xl bg-rose-500/40 p-4 text-sm shadow-lg">{error}</div>}

        {data && (
          <>
            <WeatherSummaryCard data={data} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
              <HourlyForecast items={data.hourly} />
              <VibePanel data={data} />
            </div>
            <DailyForecast items={data.daily} />
            <AirQualityPanel data={data} />
            <AlertRulesPanel rules={rules} onUpdate={handleRuleUpdate} data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
