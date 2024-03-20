import { defineStore } from "pinia"

export const useCourseProgress = defineStore("courseProgress", () => {
  const isInitialized = ref(false)

  async function initialize() {
    if (isInitialized.value) return
    isInitialized.value = true
  }

  const progress = ref<any>({})

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

    // Update the DB
    try {
      await $fetch(`/api/course/chapters/${chapter}/lessons/${lesson}/progress`, {
        method: "POST",
        body: {
          completed: !currentProgress,
        },
      })
    } catch (error) {
      console.log(error)
      // Revert the UI if there is an error
      progress.value[chapter] = {
        ...progress.value[chapter],
        [lesson]: currentProgress,
      }
    }
  }

  return {
    progress,
    isInitialized,
    initialize,
    toggleComplete,
  }
})
