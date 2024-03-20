<template>
  <h1 class="text-lg font-black text-emerald-600">{{ chapter.title }}</h1>
  <h2 class="mt-0 text-xxl font-bold">{{ lesson.title }}</h2>
  <video-player v-if="lesson.videoId" :video-id="lesson.videoId" class="my-4" />
  <div class="flex justify-between">
    <complete-button v-if="user" :is-completed="isCompleted" @update:is-completed="toggleComplete" />
    <div>
      <NuxtLink v-if="lesson.downloadUrl" :to="lesson.downloadUrl">
        <button class="bg-orange-300 text-orange-900 rounded-xl px-4 py-1 hover:bg-orange-200 hover:text-orange-800">
          Download Video
        </button>
      </NuxtLink>
      <NuxtLink v-if="lesson.sourceUrl" :to="lesson.sourceUrl">
        <button
          class="bg-orange-300 text-orange-900 rounded-xl px-4 py-1 ml-4 hover:bg-orange-200 hover:text-orange-800"
        >
          Download Source
        </button>
      </NuxtLink>
    </div>
  </div>
  <p>{{ lesson.text }}</p>
</template>

<script setup>
import auth from "~/middleware/auth"
import { useCourseProgress } from "~/stores/courseProgress"

const courseData = await useCourse()
const route = useRoute()

const chapter = computed(() => {
  return courseData.value.chapters.find((it) => it.slug === route.params.chaptersSlug)
})

const user = useSupabaseUser()

const { chaptersSlug, lessonsSlug } = route.params
const lesson = await useLesson(chaptersSlug, lessonsSlug)

const store = useCourseProgress()
const { initialize, toggleComplete } = store
await initialize()

definePageMeta({
  middleware: [
    async ({ params }) => {
      // Route validation.
      // Define constants again as the compiler macro scope does not include them.
      const courseData = await useCourse()
      const chapter = courseData.value.chapters.find((it) => it.slug === params.chaptersSlug)
      if (!chapter) {
        throw createError({
          statusCode: 404,
          message: "Chapter not found.",
        })
      }

      const lesson = chapter.lessons.find((it) => it.slug === params.lessonsSlug)
      if (!lesson) {
        throw createError({
          statusCode: 404,
          message: "Lesson not found.",
        })
      }
    },
    auth,
  ],
})

const isCompleted = computed(() => {
  return store.progress?.[chaptersSlug]?.[lessonsSlug] ?? false
})

const title = computed(() => `${lesson.value.title} / ${chapter.value.title} / Mastering Nuxt 3`)
useHead({
  title,
})
</script>

<style scoped></style>
