import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (user == null) return false

  const purchases = await prisma.coursePurchase.findMany({
    where: {
      userEmail: user.email,
      verified: true,
      courseId: 1, // only one course for now
    },
  })

  return purchases.length > 0
})
