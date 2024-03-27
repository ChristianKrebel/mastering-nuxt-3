import { PrismaClient } from "@prisma/client"
import stripeApi from "~/server/api/stripe/stripe"

type PaymentIntent = {
  id: string
}

const prisma = new PrismaClient()

const STRIPE_WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret

/**
 * Endpoint to receive stripe webhook events about payments
 */
export default defineEventHandler(async (event) => {
  const signature = getHeader(event, "stripe-signature")
  const body = await readRawBody(event) // disable h3 magic with raw

  if (body == null || signature == null) {
    throw createError({
      statusCode: 400,
      statusMessage: "Body or signature missing",
    })
  }

  // Put together the event
  let stripeEvent
  try {
    stripeEvent = stripeApi.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid signature",
    })
  }

  // Handle the event
  if (stripeEvent.type === "payment_intent.succeeded") {
    await verifyCoursePurchase(stripeEvent.data.object)
  } else if (stripeEvent.type === "payment_intent.payment_failed") {
    await deleteCoursePurchase(stripeEvent.data.object)
  }

  return 200
})

async function verifyCoursePurchase(paymentIntent: PaymentIntent) {
  try {
    await prisma.coursePurchase.update({
      where: {
        paymentId: paymentIntent.id,
      },
      data: {
        verified: true,
      },
    })
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to verify payment",
    })
  }
}

async function deleteCoursePurchase(paymentIntent: PaymentIntent) {
  try {
    await prisma.coursePurchase.delete({
      where: {
        paymentId: paymentIntent.id,
      },
    })
  } catch (e) {
    console.error(e)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete payment",
    })
  }
}
