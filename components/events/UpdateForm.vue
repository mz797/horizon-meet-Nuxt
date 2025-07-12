<template>
    <div v-if="event" class="px-4 md:px-8 flex flex-col justify-center items-center">
        <h1 class="text-5xl mt-8 text-center">Edit Event</h1>
        <form @submit.prevent="onSubmit" class="flex flex-col justify-center items-center max-w-lg w-full md:px-8">
            <div class="form-container w-full">
                <label class="label">Title</label>
                <input v-model="form.title" class="input w-full" />
                <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
            </div>

            <div class="form-container w-full">
                <label class="label">Description</label>
                <textarea v-model="form.description" rows="7" class="input" />
                <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
            </div>

            <div class="form-container w-full">
                <label class="label">Date</label>
                <input v-model="form.date" type="date" class="input" />
                <p v-if="errors.date" class="error-message">{{ errors.date }}</p>
            </div>

            <div>
                <label class="label">Image</label>
                <button type="button" class="btn" @click="pickImage">Pick Image</button>
                <input type="file" ref="imageInput" class="hidden" accept="image/*" @change="handleImage" />
                <p v-if="errors?.image" class="text-red-500 text-sm">{{ errors.image }}</p>
                <div v-if="previewImage" class="mt-2">
                    <img :src="previewImage" class="w-48 rounded" />
                </div>
            </div>

            <button type="submit" class="btn mt-4">Update</button>
        </form>
    </div>
    <div v-else>
        loading...
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {reactive, ref} from "vue";
import type {CreateEventSchemaType} from "../../lib/zod-schemas";

const props = defineProps<{
  event: {
    title: string
    description: string
    date: string
    image: File | string
  },
  eventId: string
}>()

const router = useRouter()

const form = reactive<CreateEventSchemaType>({
    title: props.event.title,
    description: props.event.description,
    date: props.event.description,
    image: undefined,
})

const errors = reactive<CreateEventSchemaType>()
const imageInput = ref<HTMLInputElement | null>(null)
const previewImage = ref<string | null>(null)

function pickImage() {
    imageInput.value?.click()
}

function handleImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (!file) return

    form.image = file
    const reader = new FileReader()
    reader.onload = () => {
        previewImage.value = reader.result as string
    }
    reader.readAsDataURL(file)
}

const onSubmit = (async (form) => {
    console.log(222)
  const formData = new FormData()
  Object.entries(form).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const res = await $fetch(`/api/events/${props.eventId}/edit`, {
    method: 'PUT',
    body: formData,
  })

  if (res?.success) {
    router.push(`/events/${props.eventId}`)
  }
})
</script>

