type OutlineBase = {
  title: string
  slug: string
  number: number
}

export type OutlineLesson = OutlineBase & {
  path: string
}

export type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[]
}

export type CourseMeta = {
  title: string
  chapters: OutlineChapter[]
}
