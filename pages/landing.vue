<template>
  <section class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold">Welcome to my version of Mastering Nuxt 3</h1>
    <p class="text-lg mt-4">It's just a course project!</p>
    <div class="flex flex-row justify-center items-center gap-4 mt-8">
      <NuxtLink
        to="/course/chapters/1-chapter-1/lessons/1-introduction-to-typescript-with-vue-js-3"
        class="text-xl rounded-xl px-6 py-2 bg-emerald-300 text-emerald-900 hover:bg-emerald-200 hover:text-emerald-800 text-center min-w-[180px]"
      >
        Start learning
      </NuxtLink>
      <button
        class="text-xl bg-orange-300 text-orange-900 rounded-xl px-6 py-2 hover:bg-orange-200 hover:text-orange-800 min-w-[180px]"
        @click="showModal = true"
      >
        Buy course
      </button>
    </div>
    <img src="~/assets/course.png" alt="Course Screenshot" class="mt-16 max-w-xl rounded-xl" />
  </section>
  <section class="flex flex-col items-center justify-center h-screen bg-emerald-500 text-white">
    <h1 class="text-4xl font-bold">So much wow! Good content!</h1>
    <ul class="mt-8">
      <li v-for="chapter in course.chapters" :key="chapter.slug" class="mb-12">
        <div class="flex items-center gap-3">
          <div class="rounded-full bg-white h-8 w-8 flex items-center justify-center">🌲</div>
          <p class="text-lg">{{ chapter.title }}</p>
        </div>
        <ul>
          <li v-for="lesson in chapter.lessons" :key="lesson.slug" class="ml-16 my-4">
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-white h-8 w-8 flex items-center justify-center">🌱</div>
              <p class="text-lg">{{ lesson.title }}</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </section>
  <info-footer />
</template>

<script setup lang="ts">
const course = await useCourse()

definePageMeta({
  layout: false, // Disable the default layout
})

useHead({
  title: "My Version of Mastering Nuxt 3",
})
</script>
