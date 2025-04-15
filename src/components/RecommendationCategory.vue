<script setup lang="ts">
const { items, category } = defineProps<{ items: string[]; category: string }>()
</script>
<template>
  <div v-if="items.length" class="mb-2">
    <h2 class="font-semibold">{{ $t(`categories.${category}`) }}:</h2>
    <ul>
      <li v-for="item in items" :key="item">{{ $t(`items.${category}.${item}`) }}</li>
    </ul>
  </div>
</template>
