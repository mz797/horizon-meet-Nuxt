<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class=" flex h-16 items-center justify-between">
                <div class=" inset-y-0 left-0 flex items-center sm:hidden"></div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"></div>
                <div class=" flex gap-4  pr-2  sm:ml-6 sm:pr-0">
                    <NuxtLink
                            class="rounded-md bg-white text-sm font-medium text-gray-900 py-2 px-3"
                            to="/login">
                        Login
                    </NuxtLink>
                    <NuxtLink
                            class="rounded-md bg-white text-sm font-medium text-gray-900 py-2 px-3"
                            to="/signup">
                        Signup
                    </NuxtLink>
                </div>
            </div>
        </div>
    </nav>
</template>