<template>
  <div class="px-4 bg-emerald-50 rounded-3xl flex items-center space-x-3 h-16 min-w-fit group">
    <template v-if="user">
      <img class="rounded-full w-12 h-12" :src="avatarUrl" alt="profileImage" />
      <div class="text-right pr-2">
        <div class="font-medium text-base">{{ userFullName }}</div>
        <div class="font-normal text-xs text-slate-500 group-hover:hidden">{{ `@${userName}` }}</div>
        <div
          class="font-bold text-xs text-black hover:text-emerald-900 hidden group-hover:block cursor-pointer"
          @click="logout"
        >
          Log out
        </div>
      </div>
    </template>
    <template v-else>
      <button class="text-black rounded-xl px-4 py-1 hover:bg-white hover:text-emerald-900" @click="login">
        Log in with GitHub
      </button>
    </template>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
const sb = useSupabaseClient()

const userFullName = computed(() => user.value?.user_metadata?.full_name)
const userName = computed(() => user.value?.user_metadata?.user_name)
const avatarUrl = computed(() => user.value?.user_metadata?.avatar_url)

const login = async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: "github",
  })

  if (error) {
    console.error(error)
  }
}

const logout = async () => {
  const { error } = await sb.auth.signOut()

  if (error) {
    console.error(error)
  }

  await navigateTo("/login")
}
</script>
