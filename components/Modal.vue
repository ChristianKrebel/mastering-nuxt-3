<template>
  <div
    class="backdrop-blur-md backdrop-brightness-50 w-100vw h-100vh flex flex-col justify-center items-center fixed inset-0"
  >
    <button
      class="absolute top-4 right-4 bg-gray-300 text-gray-900 rounded-xl px-6 py-2 hover:bg-gray-200 hover:text-gray-800"
      @click="$emit('close')"
    >
      🗙 Close
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineEmits(["close"])

const previousOverflow = ref("")

// lock scrolling
onMounted(() => {
  previousOverflow.value = document.body.style.overflow
  document.body.style.overflow = "hidden"
})

// re-enable scrolling
onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow.value
})
</script>
