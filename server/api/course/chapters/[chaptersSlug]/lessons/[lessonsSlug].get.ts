import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { chaptersSlug, lessonsSlug } = event.context.params as { chaptersSlug: string; lessonsSlug: string }

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonsSlug,
      chapter: {
        slug: chaptersSlug,
      },
    },
  })

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: "Lesson not found",
    })
  }

  return {
    ...lesson,
    path: `/course/chapters/${chaptersSlug}/lessons/${lessonsSlug}`,
  }
})
