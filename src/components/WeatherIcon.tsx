interface Props {
  icon?: string;
  alt?: string;
  size?: number;
}

export function WeatherIcon({ icon, alt = 'weather icon', size = 48 }: Props) {
  if (!icon) return null;
  const url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return <img src={url} alt={alt} width={size} height={size} className="drop-shadow-lg" loading="lazy" />;
}
