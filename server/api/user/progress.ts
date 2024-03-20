import { PrismaClient } from "@prisma/client"
import type { ChapterProgress, CourseProgress } from "~/types/course"
import type { ChapterOutline, LessonOutline } from "~/server/api/course/meta.get"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  protectRoute(event)

  const {
    user: { email: userEmail },
  } = event.context

  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      Lesson: {
        chapter: {
          Course: {
            id: 1, // only one course available
          },
        },
      },
    },
    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          chapter: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  })

  const courseOutline = await $fetch("/api/course/meta")

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    })
  }

  const progress = courseOutline.chapters.reduce((courseProgress: CourseProgress, chapter: ChapterOutline) => {
    courseProgress[chapter.slug] = chapter.lessons.reduce((chapterProgress: ChapterProgress, lesson: LessonOutline) => {
      chapterProgress[lesson.slug] =
        userProgress.find(
          (progress) => progress.Lesson.slug === lesson.slug && progress.Lesson.chapter.slug === chapter.slug
        )?.completed || false
      return chapterProgress
    }, {})
    return courseProgress
  }, {})

  return progress
})
