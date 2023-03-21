<script lang="ts" setup>
import ErrorLayout from './layouts/errorLayout.vue'

const router = useRouter()
const error = useError() as Ref<{
  url: string
  statusCode: number
  statusMessage: string
  message: string
  description: string
  data?: any
}>
</script>

<template>
  <ErrorLayout>
    <div>
      <h2 class="text-3xl font-black">{{ error.statusCode }}</h2>
    </div>
    <div>
      <button
        class="rounded-xl p-3 transition-colors duration-200 bg-opacity-0 bg-gray-200 hover:bg-opacity-5 dark:text-gray-300 hover:dark:text-white"
        @click="router.push({ path: '/' })"
      >
        <Icon name="uil:home-alt" size="24" />
      </button>
    </div>
  </ErrorLayout>
</template>
