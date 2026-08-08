import { quizPart1 } from './quiz/part1';
import { quizPart2 } from './quiz/part2';
import { quizPart3 } from './quiz/part3';
import { quizPart4 } from './quiz/part4';
import { quizPart5 } from './quiz/part5';

export interface QuizQuestion {
  id: string;
  category: 'Computer Fundamentals' | 'MS Office (Word/Excel/PowerPoint)' | 'Networking & Internet' | 'Hardware & Security' | 'General Awareness & Reasoning';
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctOptionIndex: number; // 0, 1, 2, or 3
  explanationEn?: string;
  explanationHi?: string;
}

export const CPCT_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...quizPart1,
  ...quizPart2,
  ...quizPart3,
  ...quizPart4,
  ...quizPart5
];
