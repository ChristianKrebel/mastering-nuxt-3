<template>
  <iframe
      :src="`https://player.vimeo.com/video/${props.videoId}`"
      width="560"
      height="315"
      title="Video player"
      frameborder="0"
      allowfullscreen
      class="rounded-xl"
  >
  </iframe>
</template>

<script lang="ts" setup>
const props = defineProps({
  videoId: {
    type: String,
    required: true,
  }
})
</script>
