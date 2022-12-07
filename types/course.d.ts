type Lesson = {
    title: string
    slug: string
    number: number
    downloadUrl: string
    sourceUrl?: string
    videoId: number
    text: string
    path?: string
}

type Chapter = {
    title: string
    slug: string
    number: number
    lessons: Lesson[]
}

type Course = {
    title: string
    chapters: Chapter[]
}
