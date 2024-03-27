import stripeApi from "~/server/api/stripe/stripe"

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  const paymentIntent = await stripeApi.paymentIntents.create({
    amount: 123 * 100, // cents
    currency: "eur",
    metadata: {
      email,
    },
  })

  // return secret to try performing a payment
  return paymentIntent.client_secret
})
