<template><div /></template>

<script setup lang="ts">
// Component only needed to redirect user after linking with purchase

const user = useSupabaseUser()

watch(
  () => user.value,
  async (user) => {
    console.log(user)
    if (user?.email) {
      const route = useRoute()
      await useFetch(`/api/user/linkWithPurchase/${route.params.paymentId}`, {
        headers: useRequestHeaders(["cookie"]),
      })
    }

    await navigateTo("/", { replace: true })
  }
)
</script>
