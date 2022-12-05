<template>
  <div
    class="p-12 bg-emerald-400 w-full h-full min-h-screen flex flex-col items-center"
  >
    <div class="prose mb-12">
      <h1>
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <div class="flex flex-row justify-center flex-grow">
      <div
          class="prose mr-4 p-8 bg-emerald-50 rounded-3xl min-w-[20ch] max-w-[30ch] flex flex-col"
      >
        <h3 class="text-xl">Chapters</h3>
        <template v-for="chapter in chapters" :key="chapter.slug">
          <h4>{{ chapter.title }}</h4>
          <template v-for="(lesson, index) in chapter.lessons" :key="lesson.slug">
            <NuxtLink :to="lesson.path" class="group -mx-4 py-1 px-4 no-underline hover:bg-white hover:rounded-xl">
              <span class="text-emerald-600 group-hover:text-emerald-800">{{ `${index + 1}. ` }}</span>
              <span class="group-hover:text-emerald-900">{{ lesson.title }}</span>
            </NuxtLink>
          </template>
        </template>
      </div>

      <div class="prose p-12 bg-white rounded-3xl w-[65ch]">
        <NuxtPage/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {chapters} = useCourses()
</script>
