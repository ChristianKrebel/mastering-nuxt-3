import { StorageSerializers } from "@vueuse/core"

export default async <T>(url: string) => {
  const cachedData = useSessionStorage<T>(url, null, { serializer: StorageSerializers.object })

  if (!cachedData.value) {
    const { data, error } = await useFetch<T>(url)

    if (error.value) {
      throw createError({
        ...error.value,
        message: `Could not fetch data for ${url}`,
      })
    }

    // Update data from session storage
    cachedData.value = data.value as T
  } else {
    console.log(`Getting data from cache for ${url}`)
  }

  return cachedData
}
