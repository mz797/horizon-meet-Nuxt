<template>
    <div class="flex justify-center items-center gap-8">
        <select
                @change="onRowsPerPageChanged"
                :value="rows"
                class="cursor-pointer border border-gray-300 text-gray-900 text-sm rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
            <option disabled>Rows per page</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>

        <div class="flex items-center gap-8">
            <button
                    :disabled="currentPageNumber === 0"
                    @click="onPrevPageClick"
                    class="cursor-pointer rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                            fill-rule="evenodd"
                            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                            clip-rule="evenodd"
                    />
                </svg>
            </button>

            <p class="text-slate-600 text-nowrap">
                Page <strong class="text-slate-800">{{ currentPageNumber + 1 }}</strong> of
                <strong class="text-slate-800">{{ pagesNumber }}</strong>
            </p>

            <button
                    :disabled="currentPageNumber + 1 === pagesNumber"
                    @click="onNextPageClick"
                    class="cursor-pointer rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path
                            fill-rule="evenodd"
                            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  currentPageNumber?: number
  pagesNumber?: number
  rows?: string
}>()

const currentPageNumber = props.currentPageNumber ?? 0
const pagesNumber = props.pagesNumber ?? 1
const rows = props.rows ?? '10'

const route = useRoute()
const router = useRouter()

const onPrevPageClick = () => {
  const params = new URLSearchParams(route.query as Record<string, string>)
  params.set('page', (currentPageNumber - 1).toString())
  router.push({ path: route.path, query: Object.fromEntries(params.entries()) })
}

const onNextPageClick = () => {
  const params = new URLSearchParams(route.query as Record<string, string>)
  params.set('page', (currentPageNumber + 1).toString())
  router.push({ path: route.path, query: Object.fromEntries(params.entries()) })
}

const onRowsPerPageChanged = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  const params = new URLSearchParams(route.query as Record<string, string>)
  params.set('rows', value)
  router.push({ path: route.path, query: Object.fromEntries(params.entries()) })
}
</script>
