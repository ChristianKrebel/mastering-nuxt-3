import stripeApi from "~/server/api/stripe/stripe"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  // create payment intent
  let paymentIntent
  try {
    paymentIntent = await stripeApi.paymentIntents.create({
      amount: 123 * 100, // cents
      currency: "eur",
      metadata: {
        email,
      },
    })
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create payment intent",
    })
  }

  // save payment intent to database
  try {
    await prisma.coursePurchase.create({
      data: {
        userEmail: email,
        courseId: 1, // only one course for now
        paymentId: paymentIntent.id,
      },
    })
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save payment intent",
    })
  }

  // return secret to try performing a payment
  return paymentIntent.client_secret
})
