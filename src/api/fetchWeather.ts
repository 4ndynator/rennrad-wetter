import axios from 'axios'
import type { HourlyWeather, WeatherData } from '@/types/common'
import { getWindDirection } from '@/util/helper.ts'

interface GeoLocation {
  name: string
  latitude: number
  longitude: number
}

export async function fetchLocation(city: string): Promise<GeoLocation> {
  const geocodeResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name: city, countryCode: 'DE', count: 1 },
  })

  const location = geocodeResponse.data?.results?.[0]
  if (!location) {
    throw 'City not found in Germany'
  }
  return location
}

export async function fetchWeatherData(location: GeoLocation): Promise<WeatherData> {
  const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      hourly: 'temperature_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m',
      wind_speed_unit: 'kmh',
      forecast_days: 1,
    },
  })

  const hourlyData: HourlyWeather[] = weatherResponse.data.hourly.time.map(
    (time: number, index: number): HourlyWeather => ({
      hour: time,
      temperature: weatherResponse.data.hourly.temperature_2m[index],
      temperature_feel: weatherResponse.data.hourly.apparent_temperature[index],
      wind_speed: weatherResponse.data.hourly.wind_speed_10m[index],
      wind_direction: getWindDirection(weatherResponse.data.hourly.wind_direction_10m[index]),
      rain_probability: weatherResponse.data.hourly.precipitation[index],
    }),
  )

  return {
    city: location.name,
    hourlyData,
  }
}
