<template>
    <div class="flex flex-col w-full h-full overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-gray-100">
        <div class="relative h-60">
            <img
                    :src="image"
                    class="object-cover w-full h-full absolute inset-0"
                    :alt="`Image of ${title} event.`"
            />
        </div>
        <div class="p-5 flex flex-col justify-between flex-grow">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {{ title }}
            </h5>
            <div class="flex flex-col">
                <p class="mb-3 font-normal text-gray-700">
                    {{ formatDate(date) }}
                </p>
                <NuxtLink :to="`/events/${id}`" class="block btn">
                    Read more
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  title: string
  description?: string
  date: Date | string
  image: string
}>()

function formatDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString('en-EN', { dateStyle: 'full' })
}
</script>
