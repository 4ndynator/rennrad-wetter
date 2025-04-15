<script setup lang="ts">
import { computed } from 'vue'
import type { HourlyWeather } from '@/types/common'
import RecommendationCategory from '@/components/RecommendationCategory.vue'

const { weatherData } = defineProps<{ weatherData: HourlyWeather }>()

function getHeadRecommendations() {
  const recs = []
  const { temperature, rain_probability } = weatherData

  if (temperature > 30) {
    recs.push('cap')
  } else if (temperature > 25) {
    recs.push('ventedHelmet')
  } else if (temperature <= 15 && temperature > 5) {
    recs.push('sleeve')
  } else if (temperature <= 5) {
    recs.push('thermalHat')
  }

  if (temperature <= 25) {
    recs.push('helmet')
  }
  if (rain_probability > 50) recs.push('waterproofHood')
  return recs
}

function getBaseLayer() {
  const { temperature } = weatherData
  if (temperature < 0) return ['merinoBaseLong']
  if (temperature < 10) return ['merinoBaseShort']
  return temperature > 20 ? ['baseSleeveless'] : ['baseShort']
}

function getMidLayer() {
  const { temperature, wind_speed, rain_probability } = weatherData
  const layers = []

  if (temperature < 10) layers.push('fleeceJacket')
  if (wind_speed > 20) layers.push('windbreaker')
  if (rain_probability > 50) layers.push('rainjacket')

  if (temperature >= 10) {
    if (temperature <= 20) {
      layers.push(temperature < 15 ? 'longsleeveJersey' : 'shortsleeveJersey')
      if (temperature >= 15) layers.push('sleevesOnly')
    } else if (temperature < 30) {
      layers.push('shortsleeveJersey')
    } else {
      layers.push('sleevelessJersey')
    }
  }

  if (wind_speed > 15 && wind_speed <= 20) layers.push('windvest')
  return layers
}

function getLowerBody() {
  const { temperature, rain_probability } = weatherData
  if (rain_probability > 50) return ['waterproofPants']

  if (temperature < 5) return ['thermalTights']
  if (temperature <= 15) return ['thirdBibShorts']
  if (temperature <= 20) return ['leglings', 'bibshorts']
  return ['bibshorts']
}

function getFeetRecommendations() {
  const { temperature, wind_speed, rain_probability } = weatherData
  const recs = []

  if (temperature < 10) recs.push('thermalSocks')
  if (rain_probability > 50) recs.push('waterproofOvershoes')

  if (temperature > 20) {
    recs.push('shortGloves')
  } else if (temperature >= 10) {
    recs.push('longGloves')
  }

  if (wind_speed > 15) recs.push('windproofGloves')
  return recs
}

const recommendations = computed(() => ({
  head: getHeadRecommendations(),
  baselayer: getBaseLayer(),
  midlayer: getMidLayer(),
  bottoms: getLowerBody(),
  feet: getFeetRecommendations(),
}))
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-3 mt-3">{{ $t('recommendations.title') }}</h1>

    <RecommendationCategory
      v-for="(item, category) in recommendations"
      :key="category"
      :items="item"
      :category="category"
    />
  </div>
</template>
