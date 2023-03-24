<template>
  <div class="p-12 bg-emerald-400 w-full h-full min-h-screen flex flex-col items-center">
    <slot />
  </div>
  <div class="p-12 bg-orange-900">
    <div class="flex justify-center w-full">
      <div class="prose p-10 bg-orange-100 text-orange-900 rounded-3xl">
        <span>
          <NuxtLink :to="urls.fork" target="_blank">This is a fork</NuxtLink>
          of the
          <NuxtLink :to="urls.origin" target="_blank">Mastering Nuxt 3 repository</NuxtLink>
          from the
          <NuxtLink :to="urls.course" target="_blank">online course "Mastering Nuxt 3"</NuxtLink>
          . Some changes have been made by Christian Krebel. Deployed to
          <NuxtLink :to="urls.deployment" target="_blank">Vercel</NuxtLink>
          .
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const urls = {
  fork: "https://github.com/ChristianKrebel/mastering-nuxt-3/",
  origin: "https://github.com/MasteringNuxt/mastering-nuxt-3",
  course: "https://masteringnuxt.com/nuxt3",
  deployment: "https://vercel.com/",
}
</script>
