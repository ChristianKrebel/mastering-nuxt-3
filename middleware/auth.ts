export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const { data: hasAccess } = await useFetch("/api/user/hasAccess", {
    headers: useRequestHeaders(["cookie"]),
  })

  if (
    hasAccess.value ||
    to.params.chaptersSlug === "1-chapter-1" ||
    to.path === "/" ||
    to.path.includes("/landing") ||
    to.path.includes("/login")
  ) {
    return // allow access
  } else if (user.value && !hasAccess.value) {
    try {
      const sb = useSupabaseClient()
      await sb.auth.signOut()
    } catch (e) {
      console.error(e)
    }
    return navigateTo(`/landing`)
  }

  return navigateTo(`/login?redirectTo=${to.path}`)
})
