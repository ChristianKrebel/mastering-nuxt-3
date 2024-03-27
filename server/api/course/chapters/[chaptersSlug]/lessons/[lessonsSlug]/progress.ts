import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Allow only these methods
  assertMethod(event, ["PUT", "PATCH", "POST"])

  await protectRoute(event)

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

  // get the body from the request
  const { completed } = await readBody(event)
  // get the user email from supabase
  const {
    user: { email: userEmail },
  } = event.context

  // Update or insert new progress if not exists
  return prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        // Unique constraint
        lessonId: lesson.id,
        userEmail,
      },
    },
    update: {
      completed,
    },
    create: {
      completed,
      userEmail,
      Lesson: {
        connect: {
          // relation to the lesson
          id: lesson.id,
        },
      },
    },
  })
})
