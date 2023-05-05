<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useStudentStore } from '@/stores/students';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const store = useStudentStore();
const { fetchCourses } = store;
const { courses } = storeToRefs(store);

onMounted(async () => {
  await fetchCourses();
});
</script>

<template>
  <section class="max-w-7xl mx-auto p-3 sm:p-5">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Courses</h1>
    <ul class="w-full text-center mt-20">
      <li v-for="course in courses" :key="course.id">
        <RouterLink :to="`/courses/${course.id}`" class="text-3xl font-bold text-gray-800 dark:text-gray-100 underline">
          {{ course.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
