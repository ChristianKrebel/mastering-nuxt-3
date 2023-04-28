export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (user.value || to.params.chaptersSlug === "1-chapter-1") {
    return true
  }
  return navigateTo(`/login?redirectTo=${to.path}`)
})
