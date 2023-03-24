export default defineNuxtRouteMiddleware(({ params }) => {
  if (params.chaptersSlug === "1-chapter-1") {
    return true
  }
  return navigateTo("/login")
})
