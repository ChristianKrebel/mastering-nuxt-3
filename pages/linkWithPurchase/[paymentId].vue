<template>
  <div><button v-if="user" @click="connect" /></div>
</template>

<script setup lang="ts">
// Component only needed to redirect user after linking with purchase

const user = useSupabaseUser()

const connect = async () => {
  console.log(user.value)
  if (user.value) {
    const route = useRoute()
    await useFetch(`/api/user/linkWithPurchase/${route.params.paymentId}`, {
      headers: useRequestHeaders(["cookie"]),
    })
  }

  await navigateTo("/", { replace: true })
}
</script>
