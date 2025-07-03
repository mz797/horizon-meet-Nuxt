<!-- components/events/EventsGrid.vue -->
<template>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mx-auto my-8 list-none p-0">
        <li v-for="event in events" :key="event.id">
            <EventsCard v-bind="event" />
        </li>
    </ul>
</template>

<script setup lang="ts">

interface Event {
  id: string
  title: string
  description: string
  image: string
  date: Date | string
}

defineProps<{
  events: Event[]
}>()
</script>
