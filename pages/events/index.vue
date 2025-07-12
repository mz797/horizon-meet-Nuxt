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

        <EventsGrid v-if="eventsData" :events="eventsData.events ?? []" />
        <div class="flex items-center justify-center mt-6">
            <EventsPagination
                v-if="eventsData"
                :currentPageNumber="currentPage"
                :pagesNumber="totalPages.count"
                :rows="rows"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentPage = ref(0)
const rows = ref('10')
const count = ref(0)

const eventsData = ref<{ events: any[]; count: number } | null>(null)
const isLoading = ref(false)

const fetchEvents = async () => {
    isLoading.value = true

    const pageParam = Number(route.query.page) || 0
    const rowsParam = Number(route.query.rows) || 10

    try {
        const data = await $fetch('/api/events/get-all', {
            method: 'POST',
            body: {
                pageNumber: pageParam,
                rows: rowsParam,
            },
        })

        eventsData.value = data
        count.value = data.count
        currentPage.value = pageParam
        rows.value = rowsParam.toString()

        if (route.query.count !== String(data.count)) {
            router.replace({
                path: route.path,
                query: {
                    ...route.query,
                    count: String(data.count),
                },
            })
        }

    } catch (err) {
        console.error('Błąd pobierania danych:', err)
        eventsData.value = null
    } finally {
        isLoading.value = false
    }
}

watch(
    () => [route.query.page, route.query.rows],
    fetchEvents,
    { immediate: true }
)

const totalPages = computed(() => {
    const r = Number(rows.value)
    return Math.ceil(count.value / (r > 0 ? r : 1))
})
</script>
