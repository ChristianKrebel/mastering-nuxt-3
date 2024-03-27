import stripe, { Stripe } from "stripe"

const config = useRuntimeConfig()
const stripeApi: stripe = new Stripe(config.stripeSecret)

export default stripeApi
