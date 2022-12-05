<template>
  <h1 class="text-lg font-black text-emerald-600">{{ chapter.title }}</h1>
  <h2 class="mt-0 text-xxl font-bold">{{ lesson.title }}</h2>
  <video-player v-if="lesson.videoId" :video-id="lesson.videoId" class="my-4" />
  <a v-if="lesson.downloadUrl" :href="lesson.downloadUrl">
    <button class="bg-orange-300 text-orange-900 rounded-xl px-4 py-1 hover:bg-orange-200 hover:text-orange-800">Download Video</button>
  </a>
  <p>{{ lesson.text }}</p>
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
