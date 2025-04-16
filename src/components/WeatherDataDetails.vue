<script setup lang="ts">
import type { HourlyWeather } from '@/types/common'

const { weatherData } = defineProps<{ weatherData: HourlyWeather }>()
</script>

<template>
  <div
    class="flex flex-row items-center justify-center gap-4 md:gap-10 items-center w-full max-w-full overflow-x-auto py-2"
  >
    <div class="flex flex-col items-center min-w-[60px]">
      <div
        class="relative md:w-24 md:h-24 w-20 h-20 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg"
      >
        <span class="text-xl">🌡️</span>
        <span class="text-lg font-semibold">{{ weatherData.temperature }}°C</span>
        <span class="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-gray-600"
          >{{ weatherData.temperature_feel }}°C</span
        >
      </div>
      <span class="text-sm mt-2 text-gray-500">{{ $t('weather.temperature') }}</span>
    </div>
    <div class="flex flex-col items-center min-w-[60px]">
      <div
        class="relative md:w-24 md:h-24 w-20 h-20 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg"
      >
        <span class="text-xl">🌬️</span>
        <span class="text-lg font-semibold">{{ weatherData.wind_speed }} km/h</span>
      </div>
      <span class="text-sm mt-2 text-gray-500">{{ $t('weather.wind_speed') }}</span>
    </div>
    <div class="flex flex-col items-center min-w-[60px]">
      <div
        class="relative md:w-24 md:h-24 w-20 h-20 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-400 shadow-lg"
      >
        <span class="text-xl">🌧️</span>
        <span class="text-lg font-semibold">{{ weatherData.rain_probability }}%</span>
      </div>
      <span class="text-sm mt-2 text-gray-500">{{ $t('weather.rain_probability') }}</span>
    </div>
  </div>
</template>
