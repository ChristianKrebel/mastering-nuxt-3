<template>
  <h1 class="text-lg font-black text-emerald-600">{{ chapter.title }}</h1>
  <h2 class="mt-0 text-xxl font-bold">{{ lesson.title }}</h2>
  <video-player v-if="lesson.videoId" :video-id="lesson.videoId" class="my-4" />
  <div class="flex justify-between">
    <complete-button :is-completed="isLessonCompleted" @update:is-completed="toggleCompletion" />
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

const courseData = useCourse()
const route = useRoute()

const chapter = computed(() => {
  return courseData.chapters.find((it) => it.slug === route.params.chaptersSlug)
})

const { chaptersSlug, lessonsSlug } = route.params
const lesson = await useLesson(chaptersSlug, lessonsSlug)

definePageMeta({
  middleware: [
    ({ params }) => {
      // Route validation.
      // Define constants again as the compiler macro scope does not include them.
      const courseData = useCourse()
      const chapter = courseData.chapters.find((it) => it.slug === params.chaptersSlug)
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

const progress = useLocalStorage("progress", () => [])

const isLessonCompleted = computed(() => {
  if (!progress.value[chapter.value.number - 1] || !progress.value[chapter.value.number - 1][lesson.value.number - 1]) {
    return false
  }
  return progress.value[chapter.value.number - 1][lesson.value.number - 1]
})

const toggleCompletion = () => {
  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = []
  }
  progress.value[chapter.value.number - 1][lesson.value.number - 1] = !isLessonCompleted.value
}

const title = computed(() => `${lesson.value.title} / ${chapter.value.title} / Mastering Nuxt 3`)
useHead({
  title,
})
</script>

<style scoped></style>
