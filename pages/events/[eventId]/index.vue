<template>
    <section class="py-8 bg-white md:py-16 antialiased min-h-screen">
        <div v-if="event" class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div
                        class="shrink-0 max-w-md lg:max-w-lg mx-auto relative w-full rounded-md overflow-hidden h-80 md:h-[500px]"
                >
                    <NuxtImg :src="event.image" :alt="event.title" class="object-cover w-full h-full" />
                </div>

                <div class="mt-6 sm:mt-8 lg:mt-0">
                    <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">{{ event.title }}</h1>

                    <div class="my-4 sm:items-center sm:gap-4 sm:flex">
                        <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            {{ new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                        </p>
                    </div>

                    <div class="flex gap-6">
                        <div class="flex text-emerald-800">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                            >
                                <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                />
                            </svg>
                            <span>By {{ event.organizer.name }}</span>
                        </div>
                        <div class="flex text-red-800">
                            <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6"
                            >
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                            <span>{{ event.registration.length }}</span>
                        </div>
                    </div>

                    <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                        <form @submit.prevent="toggleSubscribe">
                            <button type="submit" class="btn mb-2 flex items-center justify-center">
                                <svg v-if="userRegistration"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-5 h-5 -ms-2 me-2"
                                >
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    <path d="m12 13-1-1 2-2-3-3 2-2" />
                                </svg>
                                <svg v-else
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                >
                                    <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                </svg>
                                {{ userRegistration ? 'Unsubscribe' : 'Subscribe' }}
                            </button>
                        </form>
                        <template v-if="userId === event.organizer.id">
                            <NuxtLink :to="`/events/${event.id}/edit`" class="btn mb-2 flex items-center justify-center">
                                <svg
                                        class="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                >
                                    <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16.862 3.487a2.56 2.56 0 1 1 3.622 3.622L7.5 20.093 3 21l.907-4.5 12.955-13.013Z"
                                    />
                                </svg>
                                Edit
                            </NuxtLink>
                            <form @submit.prevent="deleteEvent">
                                <button type="submit" class="btn btn-danger flex items-center justify-center mb-2">
                                    <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-trash2-icon lucide-trash-2 w-5 h-5 -ms-2 me-2"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                    </svg>
                                    Delete
                                </button>
                            </form>
                        </template>
                    </div>

                    <hr class="my-5 md:mb-8 md:mt-7.5 border-gray-200" />
                    <p class="mb-6 text-gray-500">{{ event.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const eventId = route.params.eventId as string

const { data: session } = await useAsyncData('session', () => $fetch('/api/session'))

const userId = session.value?.userId

const { data: event} = await useAsyncData(`event-${eventId}`, () => {
    if (!eventId) throw createError({ statusCode: 400, message: 'Missing event ID' })
    return $fetch(`/api/events/${eventId}`)
    },
  { watch: [userId]}
)

if (!event.value && process.server) {
  throw createError({ statusCode: 404, statusMessage: 'Event not found' })
}

const userRegistration = computed(() =>
  event.value?.registration.find((r) => r.userId === userId)
)

const toggleSubscribe = async () => {
  const endpoint = userRegistration.value
    ? `/api/events/${eventId}/unregister`
    : `/api/events/${eventId}/register`

    const body = userRegistration.value ? {id: userRegistration.id} : {}

  await $fetch(endpoint, {
    method: 'POST',
    body,
  })
  await refreshNuxtData(`event-${eventId}`)
}

const deleteEvent = async () => {
  // const res = await $fetch(`/api/events/${eventId}`, {
  //   method: 'DELETE',
  // })
  //
  // if (res.success) {
  //   await navigateTo('/events')
  // }
}
</script>
