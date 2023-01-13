<template>
  <div class="p-20 bg-orange-900 w-full h-full min-h-screen">
    <div class="flex justify-center w-full h-full">
      <div
          class="prose p-10 bg-orange-100 text-orange-900 rounded-3xl"
      >
        <h1 class="text-orange-900">😿 {{ error.statusCode }}</h1>
        <h2 class="-mt-4">{{ title }}</h2>
        <p class="-mt-4">{{ error.message }}</p>
        <button
            class="bg-orange-300 text-orange-900 rounded-xl px-4 py-1 mt-4 hover:bg-orange-200 hover:text-orange-800"
            @click="handleError"
        >
          Back to start
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const error = useError()

const title = computed(() => {
  return error.value.statusCode === "404" ? "This page does not exist ..." : "An Error occurred."
})

const handleError = () => clearError({ redirect: "/" })
</script>
