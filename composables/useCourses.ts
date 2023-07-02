import courseData from "./courseData"
import { Chapter, Course, Lesson, LessonWithPath } from "~/types/course"

export const useCourses = (): Course => {
  const chapters: Chapter[] = courseData.chapters.map((chapter: Chapter) => {
    const lessons: LessonWithPath[] = chapter.lessons.map((lesson: Lesson) => ({
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
