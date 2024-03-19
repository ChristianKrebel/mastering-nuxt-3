import type { RouteParamValue } from "vue-router"
import type { LessonWithPath } from "~/types/course"
import useFetchWithCache from "~/composables/useFetchWithCache"

export default async (chaptersSlug: string | RouteParamValue[], lessonsSlug: string | RouteParamValue[]) => {
  const url = `/api/course/chapters/${chaptersSlug}/lessons/${lessonsSlug}`
  return useFetchWithCache<LessonWithPath>(url)
}
