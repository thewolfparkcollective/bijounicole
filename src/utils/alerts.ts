import { AlertRule, WeatherData } from '../types/weather';

export function buildDefaultRules(): AlertRule[] {
  return [
    {
      id: 'rain-today',
      label: 'Notify me if it will rain today',
      enabled: true,
      rainNotification: true
    },
    {
      id: 'too-cold',
      label: 'Alert me if it drops below 5°C',
      enabled: false,
      rainNotification: false,
      coldThreshold: 5
    }
  ];
}

export function evaluateRules(rules: AlertRule[], data?: WeatherData) {
  if (!data) return [] as string[];
  const today = data.daily[0];
  const hasRain = data.hourly.some(hour => hour.description.toLowerCase().includes('rain'));

  return rules
    .filter(rule => rule.enabled)
    .map(rule => {
      if (rule.rainNotification && hasRain) {
        return 'Rain is expected today. You will want an umbrella!';
      }
      if (rule.coldThreshold !== undefined && today.temp.min <= rule.coldThreshold) {
        return `Temps may dip below ${rule.coldThreshold}°C. Layer up.`;
      }
      if (rule.heatThreshold !== undefined && today.temp.max >= rule.heatThreshold) {
        return `Highs cross ${rule.heatThreshold}°C today. Hydrate and find shade.`;
      }
      return undefined;
    })
    .filter(Boolean) as string[];
}
