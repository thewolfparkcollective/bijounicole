import { LocationSummary } from '../types/weather';

interface Props {
  favorites: LocationSummary[];
  onSelect(fav: LocationSummary): void;
  onRemove(fav: LocationSummary): void;
}

export function FavoritesBar({ favorites, onSelect, onRemove }: Props) {
  if (!favorites.length) {
    return <p className="mt-4 text-sm text-white/70">No favorites yet. Save a spot and it will stick around.</p>;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {favorites.map(fav => (
        <div
          key={`${fav.lat}-${fav.lon}`}
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 shadow-inner"
        >
          <button onClick={() => onSelect(fav)} className="font-semibold transition hover:text-white">
            {fav.name}
          </button>
          <span className="text-white/40">•</span>
          <button onClick={() => onRemove(fav)} className="text-white/60 transition hover:text-rose-200">Remove</button>
        </div>
      ))}
    </div>
  );
}
