<script setup lang="ts">
import { ref } from 'vue';
import type { PaginatedStudents, Student, UpdateAttendancePayload } from '@/types';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useStudentStore } from '@/stores/students';
import ErrorModal from '@/components/ErrorModal.vue';

const date = ref(new Date);
const errorModal = ref({
  open: false,
  message: ''
})

const props = defineProps<{
  courseId: string,
  students: PaginatedStudents | null
  errorLoading: boolean
}>()

const store = useStudentStore();
const { fetchStudents, updateAttendance } = store;

const handleDateChange = async (date: Date) => {
  try {
    await fetchStudents(+props.courseId, date);
  } catch (error: any) {
    errorModal.value = {
      open: false,
      message: ''
    }
  }
}

const handleAttendanceChange = async (student: Student) => {
  const payload = {
    student_id: student.id,
    course_id: +props.courseId,
    date: date.value,
    attendance: !student.attendance
  } as UpdateAttendancePayload;

  try {
    await updateAttendance(payload);
  } catch (error: any) {
    console.error(error.message);
    errorModal.value = {
      open: true,
      message: error.message
    }
  }
}

const resetModal = () => {
  errorModal.value = {
    open: false,
    message: ''
  }
}
</script>

<template>
  <ErrorModal :open="errorModal.open" :message="errorModal.message" @close="resetModal" />
  <div class="max-w-7xl mx-auto mt-16">
    <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div
          class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          <VueDatePicker v-model="date" :enable-time-picker="false" @update:model-value="handleDateChange" auto-apply>
          </VueDatePicker>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">
                Full Name
              </th>
              <th scope="col" class="px-4 py-3">
                Email
              </th>
              <th scope="col" class="px-4 py-3">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="students">
              <tr v-for="(student, index) in students.data" :key="student.id"
                :class="index === students.data.length - 1 ? '' : 'border-b'" class="dark:border-gray-700">
                <td class="px-4 py-3">
                  {{ `${student.first_name} ${student.last_name}` }}
                </td>
                <td class="px-4 py-3">
                  {{ student.email }}
                </td>
                <td class="px-4 py-3">
                  <label class="relative inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" @change="handleAttendanceChange(student)" :value="student.attendance"
                      class="sr-only peer" :checked="student.attendance">
                    <div
                      class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {{ student.attendance ? 'Present' : 'Absent' }}
                    </span>
                  </label>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr v-if="errorLoading" class="border-b dark:border-gray-700">
                <td colspan="3" class="w-full text-center px-4 py-3">
                  There was an error loading the students for this course. 
                  <RouterLink to="/" class="underline text-blue-500">Go back to courses</RouterLink>
                </td>
              </tr>
              <tr v-else class="border-b dark:border-gray-700">
                <td colspan="3" class="w-full text-center px-4 py-3">
                  Loading...
                </td>
              </tr>
            </template>
          </tbody>
          <!-- We could've added a paginator component here -->
        </table>
      </div>
    </div>
  </div>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">

  </section>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
