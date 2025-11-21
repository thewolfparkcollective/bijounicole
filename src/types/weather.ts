export type WeatherQuery =
  | { type: 'coords'; lat: number; lon: number; label?: string }
  | { type: 'city'; city: string };

export interface LocationSummary {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export interface TemperatureSummary {
  current: number;
  feelsLike: number;
  high: number;
  low: number;
}

export interface ConditionSummary {
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temperature: TemperatureSummary;
  condition: ConditionSummary;
  humidity: number;
  windSpeed: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
}

export interface HourlyForecastItem {
  timestamp: number;
  temp: number;
  icon: string;
  description: string;
}

export interface DailyForecastItem {
  timestamp: number;
  temp: { min: number; max: number };
  icon: string;
  description: string;
}

export interface AirQuality {
  index: number;
  label: string;
}

export interface WeatherData {
  location: LocationSummary;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality?: AirQuality;
  uvIndex?: number;
}

export interface AlertRule {
  id: string;
  label: string;
  enabled: boolean;
  rainNotification: boolean;
  coldThreshold?: number; // Celsius
  heatThreshold?: number; // Celsius
}
