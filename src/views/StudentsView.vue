<script setup lang="ts">
import StudentTable from '@/components/StudentTable.vue';
import { useStudentStore } from '@/stores/students';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const props = defineProps<{
  courseId: string
}>()

const store = useStudentStore();
import { ref } from 'vue';
const { fetchStudents } = store;
const { students } = storeToRefs(store);

const errorLoading = ref(false);

onMounted(async () => {
  try {
    await fetchStudents(+props.courseId, new Date());
  } catch (error: any) {
    errorLoading.value = true;
  }
});
</script>

<template>
  <section class="max-w-7xl mx-auto p-3 sm:p-5">
    <div class="mt-20 flex justify-between">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Student Attendance
      </h1>
      <RouterLink to="/" class="rounded-md bg-gray-800 text-white px-3 py-2">
        Return to Courses List
      </RouterLink>
    </div>
    <StudentTable :course-id="courseId" :students="students" :errorLoading="errorLoading" />
  </section>
</template>
