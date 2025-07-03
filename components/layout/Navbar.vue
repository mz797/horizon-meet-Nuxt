<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                        <img
                                class="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                        />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <NuxtLink to="/events" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 text-white">Events</NuxtLink>
                            <NuxtLink to="/registrations" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 text-white">Registrations</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
<!--                    <form action={handleLogout}>-->
<!--                        <LogoutButton label={"Logout"} />-->
<!--                    </form>-->
                    <div class="flex  gap-2 rounded-md ml-2 bg-white text-sm font-medium text-gray-900 py-2 px-3 ">
                        {{ userName }}
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
                                class="lucide lucide-circlassser-icon lucide-circle-user"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
const { data: session } = await useFetch('/api/session')

const userName = computed(() => session.value?.userName || 'Guest')

</script>