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
    <div className={`min-h-screen bg-gradient-to-br ${gradient} text-white transition-colors`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/80">Weather Vibes</p>
            <h1 className="text-3xl font-black leading-tight">Modern forecast dashboard</h1>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30"
          >
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </header>

        <HeaderSearch
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
          onAddFavorite={handleAddFavorite}
          activeLocation={data?.location}
        />

        <FavoritesBar favorites={favorites} onSelect={onSelectFavorite} onRemove={removeFavorite} />

        {loading && <LoadingBlock />}
        {error && <div className="rounded-xl bg-rose-500/40 p-4 text-sm">{error}</div>}

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
