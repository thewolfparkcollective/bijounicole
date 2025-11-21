import { LocationSummary } from '../types/weather';

interface Props {
  favorites: LocationSummary[];
  onSelect(location: LocationSummary): void;
  onRemove(name: string): void;
}

export function FavoritesBar({ favorites, onSelect, onRemove }: Props) {
  if (!favorites.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {favorites.map(f => (
        <div
          key={`${f.name}-${f.country}`}
          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white"
        >
          <button onClick={() => onSelect(f)} className="font-semibold hover:underline">
            {f.name}
          </button>
          <button onClick={() => onRemove(f.name)} className="text-slate-200 hover:text-rose-200">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
