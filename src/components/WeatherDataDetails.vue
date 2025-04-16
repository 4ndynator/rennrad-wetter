<script setup lang="ts">
import type { HourlyWeather } from '@/types/common'

const { weatherData } = defineProps<{ weatherData: HourlyWeather }>()
</script>

<template>
  <div class="flex justify-between items-start gap-4 w-full max-w-2xl mx-auto">
    <div class="flex-1 flex flex-col items-center">
      <span class="mb-2 text-s font-semibold text-gray-700">{{ $t('weather.temperature') }}</span>
      <div
        class="relative w-28 h-28 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg"
      >
        <span class="text-3xl">🌡️</span>
        <span class="text-lg font-bold text-pink-600">{{ weatherData.temperature }}°C</span>
        <span class="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-xs text-pink-900">
          {{ weatherData.temperature_feel }}°C
        </span>
      </div>
    </div>

    <div class="flex-1 flex flex-col items-center">
      <span class="mb-2 text-s font-semibold text-gray-700">{{ $t('weather.wind_speed') }}</span>
      <div
        class="w-28 h-28 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg"
      >
        <span class="text-3xl">🌬️</span>
        <span class="text-lg font-bold text-blue-700">{{ weatherData.wind_speed }} km/h</span>
      </div>
    </div>

    <div class="flex-1 flex flex-col items-center">
      <span class="mb-2 text-s font-semibold text-gray-700">{{
        $t('weather.rain_probability')
      }}</span>
      <div
        class="w-28 h-28 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-purple-400 shadow-lg"
      >
        <span class="text-3xl">🌧️</span>
        <span class="text-lg font-bold text-purple-700">{{ weatherData.rain_probability }}%</span>
      </div>
    </div>
  </div>
</template>
