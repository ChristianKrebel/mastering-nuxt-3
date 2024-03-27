<template>
  <modal @close="$emit('close')">
    <div class="prose p-10 bg-white text-emerald-900 rounded-3xl">
      <form @submit.prevent="handleSubmit">
        <h1 class="text-emerald-900">💸 Buy the Course</h1>
        <p class="-mt-4">
          This would be the dialog to purchase the course if it was real. Put in your details and pay some amount here.
        </p>

        <div class="mt-4">E-Mail</div>
        <input
          v-model="email"
          type="email"
          placeholder="your@mail.com"
          autocomplete="email"
          required
          class="w-full border-2 p-2 rounded-xl"
        />

        <div class="mt-2">Card (via Stripe)</div>
        <!-- Gets injected because Stripe has their own components -->
        <div id="card-element" class="w-full border-2 px-2 py-3 rounded-xl" />

        <button
          type="submit"
          class="bg-orange-300 text-orange-900 rounded-xl mt-8 px-6 py-2 hover:bg-orange-200 hover:text-orange-800 w-full"
        >
          Pay 123 €
        </button>
      </form>
    </div>
  </modal>
</template>

<script setup lang="ts">
defineEmits(["close", "pay"])

const config = useRuntimeConfig()
const stripe = ref(null)
const card = ref(null)
const email = ref("")
const isProcessingPayment = ref(false)
const isSuccess = ref(false)

const handleSubmit = async () => {
  if (email.value === "") {
    return
  }

  isProcessingPayment.value = true

  // Call own endpoint to get secret with amount to pay we defined
  let secret
  try {
    secret = await $fetch("/api/stripe/paymentIntent", {
      method: "POST",
      body: {
        email: email.value,
      },
    })
  } catch (e) {
    console.error(e)
  }

  // Then call Stripe's API with the secret
  try {
    const response = await stripe.value?.confirmCardPayment(secret, {
      payment_method: {
        card: card.value,
        billing_details: {
          email: email.value,
        },
      },
      receipt_email: email.value,
    })

    if (response.paymentIntent.status === "succeeded") {
      isSuccess.value = true
    }
  } catch (e) {
    console.error(e)
  } finally {
    isProcessingPayment.value = false
  }
}

// needed to customize the Stripe Elements
const formStyle = {
  base: {
    fontSize: "16px",
    color: "#074f3c",
    iconColor: "#9ca3af",
    "::placeholder": {
      color: "#9ca3af",
    },
  },
}

const elements = computed(() => stripe.value?.elements())

// has to be on top of useHead
const setupStripe = async () => {
  stripe.value = Stripe(config.public.stripeKey) // Stripe object comes from the Stripe JS script

  if (!card.value && elements.value) {
    card.value = elements.value.create("card", { style: formStyle })
  }
  card.value?.mount("#card-element")
}

useHead({
  script: [
    {
      src: "https://js.stripe.com/v3/", // load Stripe JS
      onload: setupStripe, // when finished loading, call this function
    },
  ],
})
</script>
