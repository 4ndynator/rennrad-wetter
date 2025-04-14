<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WeatherData } from '@/types/common'
import { fetchLocation, fetchWeatherData } from '@/api/fetchWeather.ts'

const weatherData = defineModel<WeatherData>('weather-data');

const city = ref<string>()
const loading = ref(false)
const error = ref()

async function fetchWeather() {
  if (isDisabled.value) return
  try {
    error.value = null
    loading.value = true
    if (city.value) {
      const location = await fetchLocation(city.value)
      city.value = location.name
      weatherData.value = await fetchWeatherData(location)
    }
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
const isDisabled = computed(() => city.value === weatherData.value?.city)
</script>

<template>
    <input
      type="text"
      v-model="city"
      @keyup.enter="fetchWeather"
      placeholder="Enter city"
      class="w-full p-2 border rounded mb-4"
    />
    <button
      @click="fetchWeather"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:bg-blue-300"
      :disabled="loading || isDisabled"
    >
      {{ loading ? 'Loading...' : 'Get Weather' }}
    </button>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
</template>

<style scoped></style>
