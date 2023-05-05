export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  attendance: boolean;
  created_at: string;
  updated_at: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedStudents {
  data: Student[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export interface Course {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateAttendancePayload {
  student_id: number;
  course_id: number;
  date: Date;
  attendance: boolean;
}