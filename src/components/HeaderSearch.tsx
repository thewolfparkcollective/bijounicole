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
    <div className="glass-panel flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm text-slate-300">Active location</p>
          <p className="text-xl font-semibold text-white">
            {activeLocation ? `${activeLocation.name}, ${activeLocation.country || ''}` : '—'}
          </p>
        </div>
        <button
          onClick={onAddFavorite}
          className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30"
        >
          Save
        </button>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (value.trim()) onSearch(value.trim());
          }}
          className="flex flex-1 items-center gap-2"
        >
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Search cities..."
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-slate-300 focus:border-sky-300 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 py-2 font-semibold text-white shadow-card hover:opacity-90"
          >
            Search
          </button>
        </form>
        <button
          onClick={onUseLocation}
          className="rounded-xl border border-white/30 px-4 py-2 font-semibold text-white hover:bg-white/10"
        >
          Use my location
        </button>
      </div>
    </div>
  );
}
