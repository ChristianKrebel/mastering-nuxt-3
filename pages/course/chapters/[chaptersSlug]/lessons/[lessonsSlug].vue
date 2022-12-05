<template>
  <h1 class="text-lg font-black text-emerald-600">{{ chapter.title }}</h1>
  <h2 class="mt-0 text-xxl font-bold">{{ lesson.title }}</h2>
  <a v-if="lesson.downloadUrl" :href="lesson.downloadUrl">Download</a>
  <p>{{ lesson.text }}</p>
  <video-player v-if="lesson.videoId" :video-id="lesson.videoId" />
</template>

<script setup>
const courseData = useCourses()
const route = useRoute()

const chapter = computed(() => {
  return courseData.chapters.find((it) => it.slug === route.params.chaptersSlug)
})
const lesson = computed(() => {
  return chapter.value.lessons.find((it) => it.slug === route.params.lessonsSlug)
})
</script>

<style scoped>

</style>
