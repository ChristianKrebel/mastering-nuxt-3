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
        class="prose mr-4 p-8 bg-emerald-50 rounded-3xl min-w-[20ch] flex flex-col"
      >
        <h3 class="text-xl">Chapters</h3>
        <!-- All the lessons for the course listed here -->
      </div>

      <div class="prose p-12 bg-white rounded-3xl w-[65ch]">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
