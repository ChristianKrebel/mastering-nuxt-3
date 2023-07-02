import { RouteParamValue } from "vue-router"

export default async (chaptersSlug: string | RouteParamValue[], lessonsSlug: string | RouteParamValue[]) => {
  const { data, error } = await useFetch(`/api/course/chapters/${chaptersSlug}/lessons/${lessonsSlug}`)

  if (error.value) {
    throw createError({
      ...error.value,
      message: `Could not fetch lesson ${lessonsSlug} in chapter ${chaptersSlug}.`,
    })
  }

  return data
}
