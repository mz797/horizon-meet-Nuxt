<template>
    <div>
        <label :for="name" class="label">
            {{ label }}
        </label>

        <div class="flex flex-col gap-6 mb-4">
            <button
                    class="btn text-gray-950 border-2 border-gray-950 bg-white hover:bg-gray-900 hover:text-white"
                    type="button"
                    @click="triggerFileInput"
            >
                Pick an Image
            </button>

            <div
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg min-w-60 w-full h-40 overflow-hidden relative flex justify-center items-center"
            >
                <p v-if="!pickedImage" class="p-4 m-0">No image picked yet</p>
                <img
                        v-else
                        :src="pickedImage"
                        alt="Image picked by the user"
                        class="object-cover w-full h-full absolute inset-0"
                />
            </div>

            <input
                    class="hidden"
                    type="file"
                    :id="name"
                    accept="image/png, image/jpeg, image/jpg"
                    :name="name"
                    ref="fileInput"
                    @change="onImageChange"
                    required
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  label: string
  name: string
  setValue: (field: string, value: File | undefined, options?: any) => void
}>()

const pickedImage = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]

  if (!file) {
    pickedImage.value = null
    props.setValue(props.name, undefined, { shouldValidate: true })
    return
  }

  props.setValue(props.name, file, { shouldValidate: true })

  const reader = new FileReader()
  reader.readAsDataURL(file)

  reader.onload = () => {
    if (reader.result) {
      pickedImage.value = reader.result as string
    }
  }
}
</script>
