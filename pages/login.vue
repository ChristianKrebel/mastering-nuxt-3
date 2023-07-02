<template>
  <div class="flex justify-center p-20 w-full h-full">
    <div class="prose p-10 bg-white text-emerald-900 rounded-3xl">
      <h1 class="text-emerald-900">🔐 Login</h1>
      <p class="-mt-4">Log in to view the course {{ title }}.</p>
      <button
        class="bg-emerald-300 text-emerald-900 rounded-xl px-4 py-1 mt-4 hover:bg-emerald-200 hover:text-emerald-800"
        @click="login"
      >
        Log in with GitHub
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { title } = useCourse()
const sb = useSupabaseClient()
const user = useSupabaseUser()
const { query } = useRoute()

/* manual redirect is needed as supabase does redirect to login page (session problem) */
watchEffect(async () => {
  if (user.value && query.redirectTo) {
    await navigateTo(query.redirectTo as string, { replace: true })
  }
})

const login = async () => {
  const redirectTo = `${window.location.origin}${query.redirectTo}`
  const { error } = await sb.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  })

  if (error) {
    console.error(error)
  }
}
</script>
