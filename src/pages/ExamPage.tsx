import { useState, useEffect } from 'react';
import { User, ExamQuestion } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { generateQuestions } from '../data';
import { useNavigate } from 'react-router-dom';

interface ExamPageProps {
  user: User;
}

export default function ExamPage({ user }: ExamPageProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate 30 questions for the specific jurusan
    // For demo, we repeat sample data to reach 30 if needed
    const qBase = generateQuestions(user.jurusan || 'TKJ');
    const q30: ExamQuestion[] = [];
    for (let i = 0; i < 30; i++) {
       q30.push({ ...qBase[i % qBase.length], id: `q-${i}` });
    }
    setQuestions(q30);
  }, [user.jurusan]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelect = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: optionIndex }));
  };

  const finishExam = () => {
    setIsFinished(true);
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    return Math.round((correctCount / questions.length) * 100);
  };

  const score = calculateScore();
  const passed = score >= 50;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isFinished) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center border border-slate-100 shadow-2xl relative overflow-hidden"
        >
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8 ${passed ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
             {passed ? <Trophy size={48} /> : <AlertCircle size={48} />}
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-2">Hasil Ujian Anda</h2>
          <p className="text-slate-500 font-medium mb-8 uppercase tracking-widest text-[10px] font-bold">SMK PRIMA UNGGUL PORTAL</p>
          
          <div className="bg-slate-50 rounded-[2rem] p-10 mb-8 border border-slate-100">
             <h3 className="text-6xl font-black text-slate-900 mb-2">{score}</h3>
             <p className={`font-black uppercase tracking-[0.2em] text-xs ${passed ? 'text-green-600' : 'text-primary'}`}>
                {passed ? 'LULUS (KKM: 50)' : 'BELUM LULUS (KKM: 50)'}
             </p>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 uppercase tracking-tight">
                <span>Total Soal</span>
                <span>{questions.length}</span>
             </div>
             <div className="flex justify-between p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600 uppercase tracking-tight">
                <span>Terjawab</span>
                <span>{Object.keys(answers).length}</span>
             </div>
          </div>

          <button 
             onClick={() => navigate('/app/exam-results')}
             className="w-full mt-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
             Lihat Rincian
             <ArrowRight size={20} />
          </button>
          
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] flex flex-col gap-4">
             <Trophy size={80} />
             <CheckCircle2 size={80} />
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase">Live Exam</span>
              <span className="text-sm font-bold text-slate-400">Jurusan: {user.jurusan}</span>
           </div>
           <h1 className="text-3xl font-black text-slate-900">Ujian Kompetensi Keahlian</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <div className={`px-6 py-4 rounded-3xl border flex items-center gap-3 transition-all ${timeLeft < 300 ? 'bg-red-50 border-red-100 text-red-600' : 'bg-white border-slate-100 text-slate-900'}`}>
              <Clock size={24} className={timeLeft < 300 ? 'animate-pulse' : ''} />
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Sisa Waktu</p>
                 <p className="text-xl font-black leading-none">{formatTime(timeLeft)}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Progress Navigation Panel */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-2">
                 {questions.map((_, i) => {
                    const isAnswered = answers[questions[i].id] !== undefined;
                    const isActive = i === currentIndex;
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`aspect-square rounded-xl text-xs font-black transition-all flex items-center justify-center ${
                          isActive 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2' 
                            : isAnswered 
                              ? 'bg-green-500 text-white' 
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                 })}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-50">
                 <button 
                  onClick={finishExam}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                 >
                    <CheckCircle2 size={16} />
                    Selesaikan Ujian
                 </button>
              </div>
           </div>
        </div>

        {/* Question Panel */}
        <div className="lg:col-span-9">
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentIndex}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden"
             >
                <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                         <HelpCircle size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pertanyaan {currentIndex + 1} dari {questions.length}</span>
                   </div>
                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${currentQuestion.difficulty === 'hard' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                      {currentQuestion.difficulty}
                   </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 leading-snug mb-12">
                   {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                   {currentQuestion.options.map((option, i) => (
                     <button
                       key={i}
                       onClick={() => handleSelect(i)}
                       className={`w-full p-6 bg-slate-50 rounded-[1.5rem] border-2 text-left flex items-center justify-between group transition-all ${
                         answers[currentQuestion.id] === i 
                           ? 'border-primary bg-white shadow-xl shadow-primary/5' 
                           : 'border-transparent hover:border-slate-200'
                       }`}
                     >
                        <div className="flex items-center gap-6">
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                             answers[currentQuestion.id] === i ? 'bg-primary text-white' : 'bg-white text-slate-400 group-hover:text-primary'
                           }`}>
                              {String.fromCharCode(65 + i)}
                           </div>
                           <span className={`text-base font-bold ${answers[currentQuestion.id] === i ? 'text-slate-900' : 'text-slate-600'}`}>{option}</span>
                        </div>
                        {answers[currentQuestion.id] === i && (
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                             <CheckCircle2 size={16} />
                          </div>
                        )}
                     </button>
                   ))}
                </div>

                <div className="mt-16 flex items-center justify-between">
                   <button 
                     disabled={currentIndex === 0}
                     onClick={() => setCurrentIndex(prev => prev - 1)}
                     className="px-8 py-3 bg-slate-100 text-slate-900 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-all"
                   >
                     <ChevronLeft size={20} />
                     Sebelumnya
                   </button>
                   <button 
                      onClick={() => {
                        if (currentIndex < questions.length - 1) {
                          setCurrentIndex(prev => prev + 1);
                        } else {
                          finishExam();
                        }
                      }}
                      className="px-10 py-3 bg-primary text-white rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                   >
                     {currentIndex === questions.length - 1 ? 'Selesaikan' : 'Selanjutnya'}
                     <ChevronRight size={20} />
                   </button>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
