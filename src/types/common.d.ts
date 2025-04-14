export interface WeatherData {
  city: string
  hourlyData: HourlyWeather[]
}

export interface HourlyWeather {
  hour: number
  temperature: number
  temperature_feel: number
  wind_speed: number
  wind_direction: Direction
  rain_probability: number
}
