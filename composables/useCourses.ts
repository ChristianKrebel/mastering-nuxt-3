import courseData from "./courseData"

export const useCourses = () => {
  return {
    ...courseData,
    chapters: courseData.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapters/${ chapter.slug }/lessons/${ lesson.slug }`
      }))
    }))
  }
}
