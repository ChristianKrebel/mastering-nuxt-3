import { defineStore } from "pinia"
import type { CourseProgress } from "~/types/course"

export const useCourseProgress = defineStore("courseProgress", () => {
  const progress = ref<CourseProgress>({})
  const isInitialized = ref(false)

  async function initialize() {
    if (isInitialized.value) return

    const { data: userProgress } = await useFetch<CourseProgress>("/api/user/progress", {
      headers: useRequestHeaders(["cookie"]),
    })
    if (userProgress.value) {
      progress.value = userProgress.value
    }

    isInitialized.value = true
  }

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

  const percentageCompleted = computed(() => {
    const chapters = Object.values(progress.value).map((chapter) => {
      const lessons = Object.values(chapter)
      const completedLessons = lessons.filter((lesson) => lesson)

      return Number((completedLessons.length / lessons.length) * 100).toFixed(0)
    }, []) // convert to array

    const totalLessonsCount = Object.values(progress.value).reduce((numberAcc, chapter) => {
      return numberAcc + Object.values(chapter).length
    }, 0)

    const totalCompletedLessonsCount = Object.values(progress.value).reduce((numberAcc, chapter) => {
      return numberAcc + Object.values(chapter).filter((lesson) => lesson).length
    }, 0)

    const course = Number((totalCompletedLessonsCount / totalLessonsCount) * 100).toFixed(0)

    return { course, chapters }
  })

  return {
    progress,
    isInitialized,
    initialize,
    toggleComplete,
    percentageCompleted,
  }
})
