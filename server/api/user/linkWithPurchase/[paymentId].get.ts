import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { paymentId } = event.context.params as { paymentId: string }
  const user = event.context.user

  // Replace mail from purchase with mail from login
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId,
      },
      data: {
        userEmail: user.email,
      },
    })
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to link purchase with user",
    })
  }

  return user
})
