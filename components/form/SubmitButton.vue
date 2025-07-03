<template>
    <button type="submit" class="btn w-full" :disabled="isSubmitting">
        {{ isSubmitting ? '...' : $slots.default?.() }}
    </button>
</template>

<script setup lang="ts">
import { useIsSubmitting } from 'vee-validate'

const isSubmitting = useIsSubmitting()
</script>
