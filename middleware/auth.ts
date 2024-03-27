export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const { data: hasAccess } = await useFetch("/api/user/hasAccess", {
    headers: useRequestHeaders(["cookie"]),
  })

  if (hasAccess.value || to.params.chaptersSlug === "1-chapter-1") {
    return // allow access
  } else if (user.value && !hasAccess.value) {
    await useSupabaseClient().auth.signOut()
  }

  return navigateTo(`/login?redirectTo=${to.path}`)
})
