<script setup lang="ts">
import SearchLocation from '@/components/SearchLocation.vue'
import WeatherResult from '@/components/WeatherResult.vue'
import type { WeatherData } from '@/types/common'

const weatherData = defineModel<WeatherData>('weather-data')
</script>

<template>
  <main>
    <div class="flex bg-blue-400 p-2 justify-end">
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
    </div>
    <div class="min-h-screen bg-gray-100 p-8">
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
  </main>
</template>
