import { Chapter, Lesson, LessonWithPath } from "~/types/course"
import course from "~/server/courseData"

export default defineEventHandler((event): LessonWithPath => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { chaptersSlug, lessonsSlug } = event.context.params

  const chapter: Option<Chapter> = course.chapters.find((it) => it.slug === chaptersSlug)
  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: "Chapter not found.",
    })
  }

  const lesson: Option<Lesson> = chapter.lessons.find((it) => it.slug === lessonsSlug)
  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: "Lesson not found.",
    })
  }

  return {
    ...lesson,
    path: `/course/chapters/${chapter.slug}/lessons/${lesson.slug}`,
  }
})
