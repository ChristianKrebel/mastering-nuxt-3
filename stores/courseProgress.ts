import { defineStore } from "pinia"

export const useCourseProgress = defineStore("courseProgress", () => {
  const isInitialized = ref(false)

  async function initialize() {
    if (isInitialized.value) return
    isInitialized.value = true
  }

  const progress = useLocalStorage("progress", {})

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser()
    if (!user.value) return

    if (!chapter || !lesson) {
      const {
        params: { chaptersSlug, lessonsSlug },
      } = useRoute()
      chapter = chaptersSlug as string
      lesson = lessonsSlug as string
    }

    const currentProgress = progress.value[chapter]?.[lesson]

    // Optimistic update in UI, don't wait for DB
    progress.value[chapter] = {
      ...progress.value[chapter],
      [lesson]: !currentProgress,
    }
  }

  return {
    progress,
    isInitialized,
    initialize,
    toggleComplete,
  }
})
