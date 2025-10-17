<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { WeatherData } from '@/types/common'
import BackIcon from '@/components/Icons/BackIcon.vue'
import ForwardIcon from '@/components/Icons/ForwardIcon.vue'
import WeatherDataDetails from '@/components/WeatherDataDetails.vue'
import ClothingRecommendations from '@/components/ClothingRecommendations.vue'

const weatherData = defineModel<WeatherData>({ required: true })
const currentHourIndex = ref()
const currentDayOffset = ref(0) // 0 = today, 1 = tomorrow, 2 = day after tomorrow

// Group hourly data by day
const dayGroups = computed(() => {
  const groups: { [key: string]: typeof weatherData.value.hourlyData } = {}
  weatherData.value.hourlyData.forEach((hour) => {
    const date = new Date(hour.hour)
    const dayKey = date.toDateString()
    if (!groups[dayKey]) {
      groups[dayKey] = []
    }
    groups[dayKey].push(hour)
  })
  return Object.values(groups)
})

const currentDayData = computed(() => {
  return dayGroups.value[currentDayOffset.value] || []
})

const currentData = computed(() => {
  return currentDayData.value[currentHourIndex.value] || {}
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

const dayLabel = computed(() => {
  if (!currentDayData.value.length) return ''
  const date = new Date(currentDayData.value[0].hour)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

  if (date.toDateString() === today.toDateString()) {
    return 'today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'tomorrow'
  } else if (date.toDateString() === dayAfterTomorrow.toDateString()) {
    return 'dayAfterTomorrow'
  }
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })
})

function changeHour(offset: number) {
  const newIndex = currentHourIndex.value + offset
  if (newIndex >= 0 && newIndex < currentDayData.value.length) {
    currentHourIndex.value = newIndex
  }
}

function changeDay(offset: number) {
  const newDay = currentDayOffset.value + offset
  if (newDay >= 0 && newDay < dayGroups.value.length) {
    currentDayOffset.value = newDay
    // Reset to current hour or first hour of the day
    const now = new Date()
    currentHourIndex.value = currentDayData.value.findIndex((hour) => {
      const hourTime = new Date(hour.hour)
      return hourTime.getHours() === now.getHours()
    })
    if (currentHourIndex.value === -1) {
      currentHourIndex.value = 0
    }
  }
}

// Watch for day changes to reset hour index
watch(currentDayOffset, () => {
  const now = new Date()
  currentHourIndex.value = currentDayData.value.findIndex((hour) => {
    const hourTime = new Date(hour.hour)
    return hourTime.getHours() === now.getHours()
  })
  if (currentHourIndex.value === -1) {
    currentHourIndex.value = 0
  }
})

onMounted(() => {
  const now = new Date()
  // Find today's data
  currentDayOffset.value = 0
  currentHourIndex.value = currentDayData.value.findIndex((hour) => {
    const hourTime = new Date(hour.hour)
    return hourTime.getDate() === now.getDate() && hourTime.getHours() === now.getHours()
  })
  if (currentHourIndex.value === -1) {
    currentHourIndex.value = 0
  }
})
</script>

<template>
  <!-- Day navigation -->
  <div class="flex items-center justify-center mb-4 gap-4">
    <button
      @click="changeDay(-1)"
      :disabled="currentDayOffset === 0"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
      :title="$t('navigation.previousDay')"
    >
      <BackIcon />
    </button>

    <div class="text-center min-w-[150px]">
      <h3 class="text-lg font-semibold">{{ $t(`days.${dayLabel}`) }}</h3>
    </div>

    <button
      @click="changeDay(1)"
      :disabled="currentDayOffset >= dayGroups.length - 1"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
      :title="$t('navigation.nextDay')"
    >
      <ForwardIcon />
    </button>
  </div>

  <!-- Hour navigation -->
  <div class="flex items-center justify-between mb-4">
    <button
      @click="changeHour(-1)"
      :disabled="currentHourIndex === 0"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
      :title="$t('navigation.previousHour')"
    >
      <BackIcon />
    </button>

    <div class="text-center">
      <h2 class="text-xl font-bold">{{ weatherData.city }}</h2>
      <p class="text-gray-600">{{ formattedTime }}</p>
    </div>

    <button
      @click="changeHour(1)"
      :disabled="currentHourIndex >= currentDayData.length - 1"
      class="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
      :title="$t('navigation.nextHour')"
    >
      <ForwardIcon />
    </button>
  </div>

  <WeatherDataDetails :weatherData="currentData" />
  <ClothingRecommendations :weatherData="currentData" />
</template>
