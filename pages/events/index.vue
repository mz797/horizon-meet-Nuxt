<!-- pages/events.vue -->
<template>
    <div class="mx-2 my-10 md:mx-10">
        <div class="flex flex-row justify-between items-center">
            <p class="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Events
            </p>
            <NuxtLink to="/events/create" class="btn">
                Add event
            </NuxtLink>
        </div>

        <EventsGrid :events="events" />

        <div class="flex items-center justify-center mt-6">
            <EventsPagination
                    :currentPageNumber="page"
                    :pagesNumber="count"
                    :rows="rows"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// parse query params
const page = Number(route.query.page) || 0
const rows = route.query.rows?.toString() || '10'

// fetch data from server utils or API
const { events, count } = {events: [], count: 0}
// const { events, count } = await getEvents({ pageNumber: page, rows: Number(rows) })

// validate and redirect if needed
if (
  !route.query.count ||
  route.query.count !== count.toString() ||
  !['10', '25', '50', '100'].includes(rows)
) {
  await navigateTo(`/events?page=${page}&count=${count}&rows=${rows}`, { replace: true })
}
</script>
