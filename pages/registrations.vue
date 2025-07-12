<template>
    <div class="mx-2 my-10 md:mx-10">
        <EventsGrid v-if="data" :events="data as Event[]" />
        <span v-else>You are not registered for any event</span>
    </div>
</template>
<script setup lang="ts">
import type {Event} from "../types/event";

const { data } = await useFetch(`/api/registrations`)

</script>