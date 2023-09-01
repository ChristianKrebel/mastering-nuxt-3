import { RouteParamValue } from "vue-router"
import { StorageSerializers } from "@vueuse/core"
import { LessonWithPath } from "~/types/course"

export default async (chaptersSlug: string | RouteParamValue[], lessonsSlug: string | RouteParamValue[]) => {
  const url = `/api/course/chapters/${chaptersSlug}/lessons/${lessonsSlug}`
  const lesson = useSessionStorage<LessonWithPath>(url, null, { serializer: StorageSerializers.object })

  if (!lesson.value) {
    const { data, error } = await useFetch<LessonWithPath>(url)

    if (error.value) {
      throw createError({
        ...error.value,
        message: `Could not fetch lesson ${lessonsSlug} in chapter ${chaptersSlug}.`,
      })
    }

    // Update lesson from session storage
    lesson.value = data.value
  } else {
    console.log(`Getting lesson ${lessonsSlug} in chapter ${chaptersSlug} from cache.`)
  }

  return lesson
}
