<template>
    <button
        @click="isLessonCompleted = !isLessonCompleted"
        class="rounded-xl px-4 py-1 mr-4"
        :class="isLessonCompleted ? 'completed' : 'notCompleted'"
    >
      {{ isLessonCompleted ? "Lesson Completed" : "Complete Lesson" }}
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  isCompleted: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:isCompleted'])

const isLessonCompleted = computed({
  get() {
    return props.isCompleted
  },
  set(value) {
    emit('update:isCompleted', value)
  }
})
</script>

<style scoped>
.completed {
  @apply bg-emerald-300 text-emerald-900 hover:bg-emerald-200 hover:text-emerald-800;
}

.notCompleted {
  @apply bg-gray-300 text-gray-900 hover:bg-gray-200 hover:text-gray-800;
}
</style>
