<template>
    <div class="px-4 md:px-8">
        <form @submit.prevent="onSubmit" class="flex flex-col justify-center items-center h-screen">
            <h1 class="text-5xl mb-8">Login in</h1>
            <div class="max-w-xl w-full md:min-w-xl md:px-8">
                <div class="form-container">
                    <label for="email" class="label">
                        Email
                    </label>
                        <input v-model="credentials.email" id="email" type="email" class="input" />
                </div>
                <div class="form-container">
                    <label for="password" class="label">
                        Password
                    </label>
                        <input v-model="credentials.password" id="password" type="password" class="input"/>
                </div>
                <SubmitButton type="submit">Submit</SubmitButton>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

definePageMeta({
    layout: 'authLayout'
})

const credentials = reactive({
    email: '',
    password: ''
})

async function onSubmit() {
    const result  = await $fetch('/api/login', {
        method: 'post',
        body: {...credentials}
    })
    if(result.success){
        await navigateTo({ path: '/' })
    }
}
</script>