import type { CourseMeta } from "~/types/meta"

export default async () => useFetchWithCache<CourseMeta>("/api/course/meta")
