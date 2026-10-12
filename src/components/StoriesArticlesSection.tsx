import React, { useState } from 'react';
import { BookOpen, Clock, Heart, Share2, X, ArrowRight, Sparkles } from 'lucide-react';
import { StoryArticle } from '../data/portfolioData';

interface StoriesArticlesSectionProps {
  articles: StoryArticle[];
  isAdminLoggedIn: boolean;
  onOpenAdminPublish: () => void;
  onReadingProgressChange?: (
    progress: number,
    articleTitle: string | null,
    category?: string | null,
    readTime?: string | null
  ) => void;
}

export const StoriesArticlesSection: React.FC<StoriesArticlesSectionProps> = ({
  articles,
  isAdminLoggedIn,
  onOpenAdminPublish,
  onReadingProgressChange,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<StoryArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [likedArticles, setLikedArticles] = useState<Record<string, number>>({});
  const [copiedShare, setCopiedShare] = useState(false);

  const categories = ['All', 'Tech & Coding', 'Faith & Gospel', 'Life in Gatsibo', 'Family & Roots'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const handleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedArticles((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const [modalScrollProgress, setModalScrollProgress] = useState<number>(0);
  const articleScrollRef = React.useRef<HTMLDivElement>(null);

  const handleModalScroll = () => {
    if (articleScrollRef.current) {
      const el = articleScrollRef.current;
      const total = el.scrollHeight - el.clientHeight;
      if (total > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((el.scrollTop / total) * 100)));
        setModalScrollProgress(progress);
        if (selectedArticle) {
          onReadingProgressChange?.(progress, selectedArticle.title, selectedArticle.category, selectedArticle.readTime);
        }
      }
    }
  };

  const handleSelectArticle = (article: StoryArticle) => {
    setSelectedArticle(article);
    setModalScrollProgress(0);
    onReadingProgressChange?.(0, article.title, article.category, article.readTime);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setModalScrollProgress(0);
    onReadingProgressChange?.(0, null);
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              08. Stories, Reflections & Articles
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Articles & Devotionals by Bonette
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Read personal stories, academic insights from L5 SOD at Lycée Saint Alexandre Sauli, reflections on gospel songs, and memories of our heritage in Gatsibo.
            </p>
          </div>

          {isAdminLoggedIn && (
            <button
              onClick={onOpenAdminPublish}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
            >
              + Write New Article
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const likesCount = (article.likes || 0) + (likedArticles[article.id] || 0);
            return (
              <article
                key={article.id}
                onClick={() => handleSelectArticle(article)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={article.coverImage || '/src/assets/images/coding_classroom_lab_1791547598588.jpg'}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 rounded-md backdrop-blur-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2.5">
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{article.publishedAt}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 mt-2">
                  <span className="font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group-hover:underline">
                    Read Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>

                  <button
                    onClick={(e) => handleLike(article.id, e)}
                    className="inline-flex items-center gap-1 p-1 hover:text-rose-600 cursor-pointer transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span className="font-mono text-[11px]">{likesCount}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Full Article Reading Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
            onClick={handleCloseArticle}
          >
            <div
              className="relative max-w-3xl w-full max-h-[88vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reading Progress Indicator Bar also displayed right inside the modal */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 bg-slate-200 dark:bg-slate-800 z-20"
                role="progressbar"
                aria-valuenow={modalScrollProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 transition-all duration-75 ease-out"
                  style={{ width: `${modalScrollProgress}%` }}
                />
              </div>

              {/* Modal Top Nav */}
              <div className="pt-5 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{selectedArticle.category}</span>
                  <span>·</span>
                  <span>{selectedArticle.readTime}</span>
                  <span>·</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{modalScrollProgress}% read</span>
                </div>
                <button
                  onClick={handleCloseArticle}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Article Body with onScroll tracker */}
              <div
                ref={articleScrollRef}
                onScroll={handleModalScroll}
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6"
              >
                {selectedArticle.coverImage && (
                  <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <img
                      src={selectedArticle.coverImage}
                      alt={selectedArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {selectedArticle.title}
                  </h1>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                        B
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedArticle.author}</span>
                    </div>
                    <span>·</span>
                    <span>L5 SOD · Lycée Saint Alexandre Sauli</span>
                    <span>·</span>
                    <span>{selectedArticle.publishedAt}</span>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 whitespace-pre-line font-sans">
                  {selectedArticle.content}
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(selectedArticle.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 transition-colors text-xs font-semibold cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>Cheer this article ({selectedArticle.likes + (likedArticles[selectedArticle.id] || 0)})</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {copiedShare && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                        Link copied! ✓
                      </span>
                    )}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopiedShare(true);
                        setTimeout(() => setCopiedShare(false), 2000);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copiedShare ? 'Copied' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
