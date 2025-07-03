<template>
    <div class="px-4 md:px-8 flex flex-col justify-center items-center">
        <h1 class="text-5xl mt-8 text-center">Create event</h1>

        <form @submit.prevent="onSubmit" class="flex flex-col max-w-lg w-full space-y-4 mt-10">
            <!-- Title -->
            <div>
                <label for="title" class="label">Title</label>
                <input v-model="form.title" id="title" class="input" />
                <p v-if="errors?.title" class="text-red-500 text-sm">{{ errors.title }}</p>
            </div>

            <!-- Description -->
            <div>
                <label for="description" class="label">Description</label>
                <textarea v-model="form.description" id="description" class="input" />
                <p v-if="errors?.description" class="text-red-500 text-sm">{{ errors.description }}</p>
            </div>

            <!-- Date -->
            <div>
                <label for="date" class="label">Date</label>
                <input v-model="form.date" id="date" type="date" class="input" />
                <p v-if="errors?.date" class="text-red-500 text-sm">{{ errors.date }}</p>
            </div>

            <!-- Image -->
            <div>
                <label class="label">Image</label>
                <button type="button" class="btn" @click="pickImage">Pick Image</button>
                <input type="file" ref="imageInput" class="hidden" accept="image/*" @change="handleImage" />
                <p v-if="errors?.image" class="text-red-500 text-sm">{{ errors.image }}</p>
                <div v-if="previewImage" class="mt-2">
                    <img :src="previewImage" class="w-48 rounded" />
                </div>
            </div>

            <button type="submit" class="btn">Create</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { createEventSchema, type CreateEventSchemaType } from '../../lib/zod-schemas'

const form = reactive<CreateEventSchemaType>({
    title: '',
    description: '',
    date: '',
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

async function onSubmit() {
    const result = await createEventSchema.safeParseAsync(form)

    console.log(form, result)

    if (!result.success) {
        // map errors
        for (const issue of result.error.issues) {
            const field = issue.path[0] as keyof CreateEventSchemaType
            errors[field] = issue.message
        }
        return
    }

    // Clear previous errors
    console.log(errors)
    if(errors){
        Object.keys(errors).forEach((key) => delete errors[key as keyof typeof errors])
    }

    // Submit valid form
    const formData = new FormData()
    Object.entries(result.data).forEach(([key, value]) => {
        console.log(key, value)
        formData.append(key, value as any)
    })

    const res = await fetch('/api/events/create', {
        method: 'POST',
        body: formData as any,
    })

    navigateTo('/events')
}
</script>
