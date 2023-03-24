import courseData from "./courseData"

export const useCourses = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
    const lessons: Lesson[] = chapter.lessons.map((lesson: Lesson) => ({
      ...lesson,
      path: `/course/chapters/${chapter.slug}/lessons/${lesson.slug}`,
    }))
    return {
      ...chapter,
      lessons,
    }
  })
  return {
    ...courseData,
    chapters,
  }
}
