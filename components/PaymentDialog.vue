<template>
  <modal @close="$emit('close')">
    <div class="prose p-10 bg-white text-emerald-900 rounded-3xl">
      <h1 class="text-emerald-900">💸 Buy the Course</h1>
      <p class="-mt-4">
        This would be the dialog to purchase the course if it was real. Put in your details and pay some amount here.
      </p>
      <input type="email" placeholder="E-Mail" class="w-full border-2 mt-4 p-2 rounded-xl" />
      <button
        class="bg-orange-300 text-orange-900 rounded-xl mt-6 px-6 py-2 hover:bg-orange-200 hover:text-orange-800 w-full"
        @click="$emit('pay')"
      >
        Pay 123 €
      </button>
    </div>
  </modal>
</template>

<script setup lang="ts">
defineEmits(["close", "pay"])
</script>
