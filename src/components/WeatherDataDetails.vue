<script setup lang="ts">
import type { HourlyWeather } from '@/types/common'

const { weatherData } = defineProps<{ weatherData: HourlyWeather }>()
</script>

<template>
  <div class="space-y-2">
    <p>🌡️ Temperature: {{ weatherData.temperature }}°C</p>
    <p>🤒 Feels Like: {{ weatherData.temperature_feel }}°C</p>
    <p>🌬️ Wind Speed: {{ weatherData.wind_speed }} km/h</p>
    <p>🧭 Wind Direction: {{ weatherData.wind_direction }}</p>
    <p>🌧️ Precipitation: {{ weatherData.rain_probability }} mm</p>
  </div>
</template>
