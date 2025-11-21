import { useState } from 'react';
import { LocationSummary } from '../types/weather';

interface Props {
  onSearch(city: string): void;
  onUseLocation(): void;
  onAddFavorite(): void;
  activeLocation?: LocationSummary;
}

export function HeaderSearch({ onSearch, onUseLocation, onAddFavorite, activeLocation }: Props) {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-title">Active location</p>
          <p className="text-2xl font-semibold text-white">
            {activeLocation ? `${activeLocation.name}${activeLocation.country ? `, ${activeLocation.country}` : ''}` : 'Not set'}
          </p>
          <p className="text-sm text-white/70">Quickly swap to your saved spots or let us detect where you are.</p>
        </div>
        <button
          onClick={onAddFavorite}
          className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-inner transition hover:bg-white/30"
        >
          Save to favorites
        </button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (value.trim()) onSearch(value.trim());
          }}
          className="flex flex-1 items-center gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Search a city (e.g. Copenhagen, Nairobi, Seattle)"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-sky-300 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:opacity-90"
          >
            Search
          </button>
        </form>
        <button
          onClick={onUseLocation}
          className="rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10"
        >
          Use my location
        </button>
      </div>
    </div>
  );
}
