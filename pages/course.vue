<template>
  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <div class="prose">
        <h1>
          <span class="font-medium">
            Course:
            <span class="font-bold">Mastering Nuxt 3</span>
          </span>
        </h1>
      </div>
      <account-card />
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div class="prose mr-4 p-10 bg-emerald-50 rounded-3xl min-w-[20ch] max-w-[30ch] flex flex-col">
        <div class="prose flex justify-between items-center gap-4">
          <h3 class="m-0">Chapters</h3>
          <!-- Normal progress elements are hard to style with Tailwind CSS, so we'll use a custom one -->
          <div v-if="percentageCompleted.course && user" class="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-600" :style="{ width: `${percentageCompleted.course}%` }" />
          </div>
        </div>
        <template v-for="(chapter, cIndex) in course.chapters" :key="chapter.slug">
          <h4 class="flex justify-between items-center">
            {{ chapter.title }}
            <span v-if="percentageCompleted.chapters && user" class="text-emerald-600 text-sm">
              {{ percentageCompleted.chapters[cIndex] }}%
            </span>
          </h4>
          <template v-for="(lesson, lIndex) in chapter.lessons" :key="lesson.slug">
            <NuxtLink
              :to="lesson.path"
              :class="{ 'bg-white': lesson.path === $route.fullPath }"
              class="cursor-pointer group -mx-4 mb-1 py-1 px-4 no-underline rounded-xl hover:bg-white"
            >
              <span class="text-emerald-600 group-hover:text-emerald-800">{{ `${lIndex + 1}. ` }}</span>
              <span class="group-hover:text-emerald-900">{{ lesson.title }}</span>
            </NuxtLink>
          </template>
        </template>
      </div>

      <div class="prose p-10 bg-white rounded-3xl">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <h3>Something went wrong with the lesson 😿</h3>
            <code>{{ error.value }}</code>
            <br />
            <button
              class="bg-orange-300 text-orange-900 rounded-xl px-4 py-1 hover:bg-orange-200 hover:text-orange-800 mt-6"
              @click="resolveError(error)"
            >
              Resolve
            </button>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const course = await useCourse()
const user = useSupabaseUser()
const { percentageCompleted } = storeToRefs(useCourseProgress())

const resolveError = async (error: { value: unknown }) => {
  await navigateTo("/")
  error.value = null
}
</script>
