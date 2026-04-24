export type Role = 'admin' | 'guru' | 'staff' | 'siswa';
export type Jurusan = 'TKJ' | 'DKV' | 'AK' | 'BC' | 'MPLB' | 'BD';

export interface User {
  id: string;
  username: string;
  nama: string;
  role: Role;
  nisn?: string; // Only for students
  jurusan?: Jurusan; // Only for students and maybe teachers
  email?: string;
}

export interface Student extends User {
  nis: string;
  kelas: string;
}

export interface Attendance {
  id: string;
  userId: string;
  userName: string;
  date: string;
  time: string;
  status: 'hadir' | 'izin' | 'sakit' | 'alpha';
  role: Role;
  location: string;
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'hard';
  jurusan: Jurusan;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  studentJurusan: Jurusan;
  score: number;
  date: string;
  passed: boolean; // KKM 50
}
