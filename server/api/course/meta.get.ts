import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const lessonSelect = Prisma.validator<Prisma.LessonArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  },
})

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect>

// validate the structure and include own modifications like adding the lessons
const chapterSelect = Prisma.validator<Prisma.ChapterArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
})

// generate the type automatically
export type ChapterOutline = Prisma.ChapterGetPayload<typeof chapterSelect>

const courseSelect = Prisma.validator<Prisma.CourseArgs>()({
  select: {
    title: true,
    chapters: chapterSelect,
  },
})

export type CourseOutline = Prisma.CourseGetPayload<typeof courseSelect>

export default defineEventHandler(() => {
  return prisma.course.findFirst(courseSelect)
})
