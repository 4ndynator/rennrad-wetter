<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { WeatherData } from '@/types/common'
import BackIcon from '@/components/Icons/BackIcon.vue'
import ForwardIcon from '@/components/Icons/ForwardIcon.vue'
import WeatherDataDetails from '@/components/WeatherDataDetails.vue'

const weatherData = defineModel<WeatherData>({ required: true })
const currentHourIndex = ref()

const currentData = computed(() => {
  return weatherData.value.hourlyData[currentHourIndex.value] || {}
})

const formattedTime = computed(() => {
  const date = new Date(currentData.value.hour)
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  } as const
  return date.toLocaleString('en-GB', options).replace(',', '')
})

function changeHour(offset: number) {
  const newIndex = currentHourIndex.value + offset
  if (newIndex >= 0 && newIndex < weatherData.value.hourlyData.length) {
    currentHourIndex.value = newIndex
  }
}

onMounted(() => {
  const now = new Date()
  currentHourIndex.value = weatherData.value.hourlyData.findIndex((hour) => {
    const hourTime = new Date(hour.hour)
    return hourTime.getDate() === now.getDate() && hourTime.getHours() === now.getHours()
  })
})
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <button
      @click="changeHour(-1)"
      :disabled="currentHourIndex === 0"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
    >
      <BackIcon />
    </button>

    <div class="text-center">
      <h2 class="text-xl font-bold">{{ weatherData.city }}</h2>
      <p class="text-gray-600">{{ formattedTime }}</p>
    </div>

    <button
      @click="changeHour(1)"
      :disabled="currentHourIndex >= weatherData.hourlyData.length - 1"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
    >
      <ForwardIcon />
    </button>
  </div>

  <WeatherDataDetails :weatherData="currentData" />
</template>
