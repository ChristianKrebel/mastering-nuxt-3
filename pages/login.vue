<template>
  <div class="flex justify-center p-20 w-full h-full">
    <div class="prose p-10 bg-white text-emerald-900 rounded-3xl">
      <h1 class="text-emerald-900">🔐 Login</h1>
      <p class="-mt-4">Log in to view the course {{ title }}.</p>
      <button
        class="bg-emerald-300 text-emerald-900 rounded-xl px-4 py-1 mt-4 hover:bg-emerald-200 hover:text-emerald-800"
        @click="login"
      >
        Log in with GitHub
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { title } = useCourses()
const login = () => {
  console.log("Logged in")
}
</script>
