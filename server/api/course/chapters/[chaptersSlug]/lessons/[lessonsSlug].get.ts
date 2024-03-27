import { PrismaClient } from "@prisma/client"
import protectRoute from "~/server/utils/protectRoute"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.context.params?.chaptersSlug !== "1-chapter-1") {
    await protectRoute(event)
  }

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
