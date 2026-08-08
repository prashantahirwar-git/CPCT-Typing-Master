import React from 'react';
import { QuizQuestion, CPCT_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { soundEngine } from '../lib/audio';
import {
  getQuestionsFromCache,
  saveQuestionsToCache,
  clearQuizCache,
  getCacheInfo,
  exportQuestionsJSON,
  CacheInfo
} from '../lib/quizCache';
import {
  HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight,
  BookOpen, Sparkles, Filter, Check, Clock, Volume2, Download, HardDrive,
  Database, RefreshCw, Trash2, FileDown, WifiOff, Zap
} from 'lucide-react';

export const CPCTQuizSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [lang, setLang] = React.useState<'hi' | 'en'>('hi'); // Default to Hindi as requested

  // Local Offline Cache State
  const [questionsBank, setQuestionsBank] = React.useState<QuizQuestion[]>(() => {
    const cached = getQuestionsFromCache();
    return (cached && cached.length > 0) ? cached : CPCT_QUIZ_QUESTIONS;
  });
  const [cacheStatus, setCacheStatus] = React.useState<CacheInfo>(() => getCacheInfo());
  const [cacheNotice, setCacheNotice] = React.useState<string | null>(null);

  // Automatically seed local cache on initial load if empty
  React.useEffect(() => {
    if (!cacheStatus.isCached) {
      const success = saveQuestionsToCache(CPCT_QUIZ_QUESTIONS);
      if (success) {
        const updatedInfo = getCacheInfo();
        setCacheStatus(updatedInfo);
        const cachedQs = getQuestionsFromCache();
        if (cachedQs) setQuestionsBank(cachedQs);
        setCacheNotice('⚡ All 230+ MCQs auto-saved to local browser cache! Offline mode active.');
        setTimeout(() => setCacheNotice(null), 4000);
      }
    }
  }, []);

  const handleDownloadToCache = () => {
    const success = saveQuestionsToCache(CPCT_QUIZ_QUESTIONS);
    if (success) {
      const updatedInfo = getCacheInfo();
      setCacheStatus(updatedInfo);
      const cachedQs = getQuestionsFromCache();
      if (cachedQs) setQuestionsBank(cachedQs);
      soundEngine.playKeyPress();
      setCacheNotice(`✅ Successfully saved ${CPCT_QUIZ_QUESTIONS.length} MCQs (${updatedInfo.sizeKb} KB) to local storage!`);
      setTimeout(() => setCacheNotice(null), 4000);
    }
  };

  const handleClearCache = () => {
    clearQuizCache();
    setCacheStatus(getCacheInfo());
    setQuestionsBank(CPCT_QUIZ_QUESTIONS);
    soundEngine.playError();
    setCacheNotice('🗑️ Local MCQ cache cleared. Using bundled data.');
    setTimeout(() => setCacheNotice(null), 4000);
  };

  const handleExportJSON = () => {
    exportQuestionsJSON(questionsBank);
    soundEngine.playKeyPress();
    setCacheNotice('📥 Exported MCQ Question Bank JSON file!');
    setTimeout(() => setCacheNotice(null), 4000);
  };

  const categories = [
    'All',
    'Computer Fundamentals',
    'MS Office (Word/Excel/PowerPoint)',
    'Hardware & Security',
    'Networking & Internet',
    'General Awareness & Reasoning'
  ];

  // Filtered Question List
  const filteredQuestions = React.useMemo(() => {
    if (selectedCategory === 'All') return questionsBank;
    return questionsBank.filter(q => q.category === selectedCategory);
  }, [selectedCategory, questionsBank]);

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);
  const [answeredCount, setAnsweredCount] = React.useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = React.useState<boolean>(false);

  const currentQuestion: QuizQuestion | undefined = filteredQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    setAnsweredCount(prev => prev + 1);

    if (selectedOption === currentQuestion.correctOptionIndex) {
      soundEngine.playKeyPress(); // positive sound
      setScore(prev => prev + 1);
    } else {
      soundEngine.playError(); // error sound
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      soundEngine.playSuccessFanfare();
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnsweredCount(0);
    setIsQuizCompleted(false);
  };

  // Switch Category
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setAnsweredCount(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-2xl p-4 sm:p-6 text-white shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> CPCT MCQ Practice (230+ Questions)
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight">
            CPCT Exam Computer Proficiency Quiz
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
            {lang === 'hi'
              ? 'आधिकारिक सीपीसीटी पिछले वर्षों के प्रश्नपत्रों से संकलित कंप्यूटर ज्ञान, एमएस ऑफिस, नेटवर्किंग एवं सामान्य ज्ञान के बहुविकल्पीय प्रश्न।'
              : 'Practice curated MCQs from official CPCT past papers covering Computer Hardware, MS Office, Networks, and General Knowledge.'}
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center bg-blue-950/60 p-1 rounded-xl border border-blue-400/30">
          <button
            onClick={() => setLang('hi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              lang === 'hi' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            🇮🇳 हिंदी
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
              lang === 'en' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-blue-200 hover:text-white'
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>

      {/* Local Offline Cache Control Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs">
          <div className={`p-2 rounded-xl flex items-center justify-center ${
            cacheStatus.isCached
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300/50'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300/50'
          }`}>
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Local Offline Cache Status:</span>
              {cacheStatus.isCached ? (
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-black text-[11px] border border-emerald-500/30">
                  ⚡ 200+ MCQs Cached
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black text-[11px] border border-amber-500/30">
                  ⚠️ Local Storage Empty
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {cacheStatus.isCached
                ? `${cacheStatus.count} questions stored (${cacheStatus.sizeKb} KB) in browser storage. Zero fetching needed.`
                : 'Download all 230+ questions to local cache for instant offline practice without network calls.'}
            </p>
          </div>
        </div>

        {/* Cache Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <button
            onClick={handleDownloadToCache}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm flex items-center gap-1.5"
            title="Download full 200+ MCQ question set into browser local cache"
          >
            <Download className="w-3.5 h-3.5" />
            {cacheStatus.isCached ? 'Update Cache' : 'Download to Local Cache'}
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-all border border-slate-300 dark:border-slate-700 flex items-center gap-1.5"
            title="Export full MCQ question bank as a .json file"
          >
            <FileDown className="w-3.5 h-3.5 text-blue-500" />
            Export JSON
          </button>

          {cacheStatus.isCached && (
            <button
              onClick={handleClearCache}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-bold transition-all border border-rose-200 dark:border-rose-900/60 flex items-center gap-1"
              title="Clear local browser storage cache"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Notification Toast */}
      {cacheNotice && (
        <div className="p-3 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-between animate-fadeIn">
          <span>{cacheNotice}</span>
          <button onClick={() => setCacheNotice(null)} className="text-white/80 hover:text-white text-xs font-bold px-1">✕</button>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Category:
        </div>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Quiz Card View */}
      {!isQuizCompleted && currentQuestion ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xl space-y-5">
          {/* Progress & Question Counter */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black">
                {currentQuestion.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              {/* Question Jump Selector */}
              <select
                value={currentIndex}
                onChange={(e) => {
                  setCurrentIndex(Number(e.target.value));
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                }}
                className="ml-2 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {filteredQuestions.map((_, idx) => (
                  <option key={idx} value={idx}>
                    Q{idx + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-xs font-black">
              <span className="text-emerald-600 dark:text-emerald-400">
                Score: {score}/{answeredCount}
              </span>
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 underline"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {lang === 'hi' ? currentQuestion.questionHi : currentQuestion.questionEn}
            </h3>
            {lang === 'hi' && currentQuestion.questionEn && (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                En: {currentQuestion.questionEn}
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQuestion.optionsEn.map((optEn, idx) => {
              const optText = lang === 'hi' ? currentQuestion.optionsHi[idx] : optEn;
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctOptionIndex;

              let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200 font-black ring-2 ring-emerald-500/40';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-200 font-bold';
                } else {
                  btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/30';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 font-extrabold ring-2 ring-blue-500/30';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optText}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs sm:text-sm space-y-1">
              <span className="font-extrabold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" />
                {lang === 'hi' ? 'स्पष्टीकरण (Explanation):' : 'Explanation:'}
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                {lang === 'hi'
                  ? (currentQuestion.explanationHi || currentQuestion.explanationEn)
                  : (currentQuestion.explanationEn || currentQuestion.explanationHi)}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" /> Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95 flex items-center gap-2 ml-auto"
              >
                Next Question <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : isQuizCompleted ? (
        /* Completed Score Overview */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center space-y-6 shadow-xl max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Quiz Session Completed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              You tested your CPCT Computer Proficiency knowledge.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-around">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {score} / {filteredQuestions.length}
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                Correct Answers
              </div>
            </div>
            <div className="w-px h-10 bg-slate-300 dark:bg-slate-700" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {Math.round((score / Math.max(1, filteredQuestions.length)) * 100)}%
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                Accuracy Score
              </div>
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Practice Quiz Again
          </button>
        </div>
      ) : null}
    </div>
  );
};
