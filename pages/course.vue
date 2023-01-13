<template>
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
        class="prose mr-4 p-10 bg-emerald-50 rounded-3xl min-w-[20ch] max-w-[30ch] flex flex-col"
    >
      <h3 class="text-xl">Chapters</h3>
      <template v-for="chapter in chapters" :key="chapter.slug">
        <h4>{{ chapter.title }}</h4>
        <template v-for="(lesson, index) in chapter.lessons" :key="lesson.slug">
          <NuxtLink :to="lesson.path"
                    :class="{'bg-white': lesson.path === $route.fullPath}"
                    class="group -mx-4 mb-1 py-1 px-4 no-underline rounded-xl hover:bg-white">
            <span class="text-emerald-600 group-hover:text-emerald-800" >{{ `${index + 1}. ` }}</span>
            <span class="group-hover:text-emerald-900"
                  >{{ lesson.title }}</span>
          </NuxtLink>
        </template>
      </template>
    </div>

    <div class="prose p-10 bg-white rounded-3xl ">
      <NuxtErrorBoundary>
        <NuxtPage/>
        <template #error="{ error }">
          <h3>Something went wrong with the lesson 😿</h3>
          <code>{{ error.value }}</code><br />
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
</template>

<script lang="ts" setup>
const {chapters} = useCourses()

const resolveError = async (error: { value: any; }) => {
  await navigateTo("/")
  error.value = null
}
</script>
