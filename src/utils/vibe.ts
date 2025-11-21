import { WeatherData } from '../types/weather';

const vibeRules = [
  {
    test: (temp: number, hasRain: boolean, wind: number) => temp < 5 || hasRain && temp < 10,
    vibe: 'Stay inside, it is pretty rough out',
    outfit: 'Heavy coat + waterproof boots',
    item: 'Keep a sturdy umbrella handy'
  },
  {
    test: (temp: number, hasRain: boolean) => hasRain && temp >= 10,
    vibe: 'Cozy hoodie weather',
    outfit: 'Hoodie or light sweater + jeans',
    item: 'Grab an umbrella or rain shell'
  },
  {
    test: (temp: number) => temp >= 28,
    vibe: 'Poolside and cold drinks',
    outfit: 'Tank top + shorts',
    item: 'SPF and a big bottle of water'
  },
  {
    test: (temp: number, hasRain: boolean, wind: number) => temp >= 18 && temp < 28 && !hasRain && wind < 25,
    vibe: 'Perfect picnic weather',
    outfit: 'Breathable layers + sneakers',
    item: 'Sunglasses and a blanket'
  },
  {
    test: (temp: number) => temp < 18 && temp >= 10,
    vibe: 'Light jacket adventure',
    outfit: 'Denim jacket + comfy pants',
    item: 'Maybe a beanie after sunset'
  }
];

export function buildVibe(data?: WeatherData) {
  if (!data) {
    return {
      headline: 'Waiting for a forecast…',
      outfit: '—',
      item: '—'
    };
  }
  const temp = data.current.temperature.current;
  const hasRain = data.current.condition.main.toLowerCase().includes('rain');
  const wind = data.current.windSpeed;

  const match = vibeRules.find(rule => rule.test(temp, hasRain, wind));
  return {
    headline: match?.vibe ?? 'Steady day ahead',
    outfit: match?.outfit ?? 'Comfy tee + layers',
    item: match?.item ?? 'Stay hydrated and enjoy the breeze'
  };
}
