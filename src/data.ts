import { ExamQuestion, Jurusan } from './types';

export const JURUSAN_LIST: Jurusan[] = ['TKJ', 'DKV', 'AK', 'BC', 'MPLB', 'BD'];

export const SAMPLE_QUESTIONS: ExamQuestion[] = [
  // TKJ - Easy
  {
    id: 'tkj-e1',
    question: 'Apa kepanjangan dari LAN?',
    options: ['Local Area Network', 'Large Area Network', 'Link Access Node', 'Local Access Network'],
    correctAnswer: 0,
    difficulty: 'easy',
    jurusan: 'TKJ'
  },
  {
    id: 'tkj-e2',
    question: 'Perangkat yang digunakan untuk menghubungkan dua jaringan yang berbeda adalah...',
    options: ['Switch', 'Hub', 'Router', 'Repeater'],
    correctAnswer: 2,
    difficulty: 'easy',
    jurusan: 'TKJ'
  },
  // TKJ - Hard
  {
    id: 'tkj-h1',
    question: 'Berapakah jumlah maksimal host pada subnet mask 255.255.255.240?',
    options: ['12', '14', '16', '30'],
    correctAnswer: 1,
    difficulty: 'hard',
    jurusan: 'TKJ'
  },
  // DKV - Easy
  {
    id: 'dkv-e1',
    question: 'Warna primer terdiri dari...',
    options: ['Merah, Kuning, Hijau', 'Merah, Kuning, Biru', 'Merah, Hijau, Biru', 'Biru, Kuning, Hijau'],
    correctAnswer: 1,
    difficulty: 'easy',
    jurusan: 'DKV'
  },
  // AK - Easy
  {
    id: 'ak-e1',
    question: 'Persamaan dasar akuntansi adalah...',
    options: ['Aset = Kewajiban + Ekuitas', 'Aset = Kewajiban - Ekuitas', 'Kewajiban = Aset + Ekuitas', 'Ekuitas = Aset + Kewajiban'],
    correctAnswer: 0,
    difficulty: 'easy',
    jurusan: 'AK'
  }
];

// Generate more to reach 30 if needed, but for now I'll use logic to populate
export const generateQuestions = (jurusan: Jurusan): ExamQuestion[] => {
  // Real implementation should have 30 units, here's a helper for demo
  const filtered = SAMPLE_QUESTIONS.filter(q => q.jurusan === jurusan);
  if (filtered.length === 0) {
    // Return generic if specific jurusan questions not found
    return SAMPLE_QUESTIONS.map(q => ({ ...q, jurusan }));
  }
  return filtered;
};
