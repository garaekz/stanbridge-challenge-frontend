import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Course, PaginatedStudents, Student, UpdateAttendancePayload } from '@/types'

const BASE_API_URL = 'http://localhost:8000/api';
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const useStudentStore = defineStore('students', () => {
  const courses = ref<Course[]>([])
  const students = ref<PaginatedStudents | null>(null)

  const fetchStudents = async (id:number, rawDate: Date) => {
    const date = rawDate.toISOString().split('T')[0]
    try {
      const response = await fetch(`${BASE_API_URL}/courses/${id}/students?date=${date}`)
      students.value = await response.json()
    } catch (error) {
      throw new Error("Unable to fetch students");
    }
  }

  const fetchCourses = async () => {
    courses.value = await fetch(`${BASE_API_URL}/courses`).then(res => res.json())
  }

  const updateAttendance = async (payload: UpdateAttendancePayload) => {
    const date = payload.date.toISOString().split('T')[0]
    try {
      await fetch(`${BASE_API_URL}/attendances`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ ...payload, date })
      })

      const student = students.value?.data.find(student => student.id === payload.student_id)
      if (student) {
        student.attendance = payload.attendance
      }
    } catch (error) {
      throw new Error("Unable to update attendance");
    }
  }

  return { courses, students, fetchCourses, fetchStudents, updateAttendance }
})
