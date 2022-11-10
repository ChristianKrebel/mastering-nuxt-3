<template>
  <h2>{{ chapter.title }} / {{ lesson.title }}</h2>
  <p>This is a lesson test</p>
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
