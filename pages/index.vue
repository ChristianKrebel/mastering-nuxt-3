<template><div /></template>

<script lang="ts" setup>
const user = useSupabaseUser()

const router = useRouter()
if (user.value) {
  router.push("/course/chapters/1-chapter-1/lessons/1-introduction-to-typescript-with-vue-js-3")
} else {
  router.push("/landing")
}
</script>
