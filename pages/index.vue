<template><div /></template>

<script lang="ts" setup>
const user = useSupabaseUser()

const router = useRouter()
if (user) {
  router.push("/course")
} else {
  router.push("/landing")
}
</script>
