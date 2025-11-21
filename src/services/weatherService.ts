import { DailyForecastItem, HourlyForecastItem, LocationSummary, WeatherData, WeatherQuery } from '../types/weather';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Insert your API key here
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const AQI_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function geocodeCity(city: string): Promise<LocationSummary> {
  const url = `${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
  const [result] = await getJson<any[]>(url);
  if (!result) {
    throw new Error('City not found');
  }
  return {
    name: result.name,
    country: result.country,
    lat: result.lat,
    lon: result.lon
  };
}

function normalizeDaily(daily: any[]): DailyForecastItem[] {
  return daily.slice(0, 8).map((item: any) => ({
    timestamp: item.dt * 1000,
    temp: { min: item.temp.min, max: item.temp.max },
    icon: item.weather[0].icon,
    description: item.weather[0].description
  }));
}

function normalizeHourly(hourly: any[]): HourlyForecastItem[] {
  return hourly.slice(0, 18).map((item: any) => ({
    timestamp: item.dt * 1000,
    temp: item.temp,
    icon: item.weather[0].icon,
    description: item.weather[0].description
  }));
}

function normalizeAQI(value?: number) {
  if (!value) return undefined;
  const labels: Record<number, string> = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor'
  };
  return { index: value, label: labels[value] ?? 'Unknown' };
}

export async function fetchWeather(query: WeatherQuery): Promise<WeatherData> {
  const location =
    query.type === 'city'
      ? await geocodeCity(query.city)
      : { name: query.label ?? 'Current Location', country: '', lat: query.lat, lon: query.lon };

  const url = `${BASE_URL}?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=minutely&appid=${API_KEY}`;
  const data = await getJson<any>(url);

  const aqi = await getJson<any>(`${AQI_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);
  const aqiValue = aqi?.list?.[0]?.main?.aqi as number | undefined;

  return {
    location,
    current: {
      temperature: {
        current: data.current.temp,
        feelsLike: data.current.feels_like,
        high: data.daily[0].temp.max,
        low: data.daily[0].temp.min
      },
      condition: {
        main: data.current.weather[0].main,
        description: data.current.weather[0].description,
        icon: data.current.weather[0].icon
      },
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      pressure: data.current.pressure,
      sunrise: data.current.sunrise * 1000,
      sunset: data.current.sunset * 1000,
      timezoneOffset: data.timezone_offset
    },
    hourly: normalizeHourly(data.hourly),
    daily: normalizeDaily(data.daily),
    uvIndex: data.current.uvi,
    airQuality: normalizeAQI(aqiValue)
  };
}
