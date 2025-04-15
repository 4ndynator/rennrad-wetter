<script setup lang="ts">
import SearchLocation from '@/components/SearchLocation.vue'
import WeatherResult from '@/components/WeatherResult.vue'
import type { WeatherData } from '@/types/common'
import LocaleChanger from '@/components/LocaleChanger.vue'

const weatherData = defineModel<WeatherData>('weather-data')
</script>

<template>
  <main>
    <div class="min-h-screen bg-gray-100">
      <LocaleChanger />
      <div class="p-8">
        <div class="max-w-md mx-auto">
          <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <h1 class="text-2xl font-bold">{{ $t('title') }}</h1>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 mb-4">
            <SearchLocation v-model:weather-data="weatherData" />
          </div>
          <div class="bg-white rounded-lg shadow-md p-6 animate-fade-in" v-if="weatherData">
            <WeatherResult v-model="weatherData" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
