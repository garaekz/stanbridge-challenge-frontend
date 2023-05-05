<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Dialog,
    DialogPanel,
    DialogDescription,
  } from '@headlessui/vue'

  defineProps<{
    message: string
  }>()

  const emits = defineEmits(['close'])

  const isOpen = ref(true)

  function setIsOpen(value: boolean) {
    isOpen.value = value
  }

  function close() {
    emits('close')
  }
</script>
<template>
  <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-sm bg-white rounded-lg shadow dark:bg-gray-700">
        <DialogDescription>
          <div class="p-6 text-center">
                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {{ message }}
                </h3>
                <button
                  @click="close"
                  type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Understood
                </button>
            </div>
        </DialogDescription>
      </DialogPanel>
    </div>
  </Dialog>
</template>