import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface ReadingProgressBarProps {
  progress: number; // 0 - 100
  activeStoryTitle?: string | null;
  category?: string | null;
  readTime?: string | null;
  isVisible: boolean;
  onCloseReader?: () => void;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  progress,
  activeStoryTitle,
  category,
  readTime,
  isVisible,
  onCloseReader,
}) => {
  if (!isVisible && progress === 0) return null;

  const isCompleted = progress >= 99;

  return (
    <aside
      aria-label="Reading progress bar"
      className="fixed top-0 left-0 right-0 z-[100] transition-opacity duration-300"
    >
      {/* Visual Progress Bar Track at absolute top of browser window */}
      <div
        className="w-full h-1.5 sm:h-2 bg-slate-200/60 dark:bg-slate-900/80 backdrop-blur-xs relative overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article reading progress"
      >
        <div
          className={`h-full transition-all duration-150 ease-out relative ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-600 via-teal-400 to-amber-300'
              : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400'
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* Glowing pulse indicator at leading edge */}
          {progress > 0 && progress < 100 && (
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 shadow-[0_0_8px_#34d399] animate-pulse rounded-r-full" />
          )}
        </div>
      </div>

      {/* Floating Active Story Indicator Pill (Visible when reading an article) */}
      {activeStoryTitle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md text-xs">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <BookOpen className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                )}
              </span>

              <div className="flex items-center gap-2 truncate max-w-[200px] sm:max-w-md">
                {category && (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 text-[11px] uppercase tracking-wider hidden sm:inline">
                    [{category}]
                  </span>
                )}
                <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                  {activeStoryTitle}
                </span>
              </div>

              <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono text-[11px] shrink-0">
                <span
                  className={
                    isCompleted
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 font-semibold'
                  }
                >
                  {isCompleted ? 'Finished!' : `${progress}%`}
                </span>
                {readTime && !isCompleted && (
                  <span className="hidden md:inline">· {readTime}</span>
                )}
              </div>

              {onCloseReader && (
                <button
                  onClick={onCloseReader}
                  className="ml-1 p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded cursor-pointer transition-colors"
                  title="Close Reader"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
