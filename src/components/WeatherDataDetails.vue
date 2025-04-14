<script setup lang="ts">
import type { HourlyWeather } from '@/types/common'

const { weatherData } = defineProps<{ weatherData: HourlyWeather }>()
</script>

<template>
  <div class="space-y-2">
    <p>🌡️ {{ $t('weather.temperature') }}: {{ weatherData.temperature }}°C</p>
    <p>🤒 {{ $t('weather.temperature_feel') }}: {{ weatherData.temperature_feel }}°C</p>
    <p>🌬️ {{ $t('weather.wind_speed') }}: {{ weatherData.wind_speed }} km/h</p>
    <p>🧭 {{ $t('weather.wind_direction') }}: {{ weatherData.wind_direction }}</p>
    <p>🌧️ {{ $t('weather.rain_probability') }}: {{ weatherData.rain_probability }} mm</p>
  </div>
</template>
