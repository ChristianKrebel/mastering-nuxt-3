import course from "~/server/courseData"
import { Chapter, Lesson } from "~/types/course"
import { CourseMeta } from "~/types/meta"

export default defineEventHandler(
  (): CourseMeta => ({
    title: course.title,
    chapters: course.chapters.map((chapter: Chapter) => ({
      title: chapter.title,
      slug: chapter.slug,
      number: chapter.number,
      lessons: chapter.lessons.map((lesson: Lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapters/${chapter.slug}/lessons/${lesson.slug}`,
      })),
    })),
  })
)
