import { useEffect, useState } from 'react';
import { LocationSummary } from '../types/weather';

const STORAGE_KEY = 'weather-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<LocationSummary[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (location: LocationSummary) => {
    if (favorites.some(f => f.name === location.name && f.country === location.country)) return;
    setFavorites(prev => [...prev, location]);
  };

  const removeFavorite = (name: string) => {
    setFavorites(prev => prev.filter(f => f.name !== name));
  };

  return { favorites, addFavorite, removeFavorite };
}
