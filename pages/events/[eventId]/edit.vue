<template>
    <EventsUpdateForm :event="eventToUpdate" :event-id="eventId" />
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const eventId = route.params.eventId as string

const { data: event, error } = await useFetch(`/api/events/${eventId}`)

if (error.value || !event.value) {
  throw createError({ statusCode: 404, statusMessage: 'Event not found' })
}

const imageBlob = await $fetch<Blob>(event.value.image, { responseType: 'blob' })
const file = new File([imageBlob], 'event-image.jpg', { type: imageBlob.type })

const eventToUpdate = ref({
  title: event.value.title,
  description: event.value.description,
  date: event.value.date.split('T')[0],
  image: file,
})
</script>

