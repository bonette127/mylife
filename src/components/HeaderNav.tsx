import React from 'react';
import { Sun, Moon, ShieldCheck, Lock } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface HeaderNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMessageModal: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenMessageModal,
  theme,
  onToggleTheme,
  isAdminLoggedIn,
  onOpenAdmin,
}) => {
  const isDark = theme === 'dark';

  const navLinks = [
    { id: 'about', label: 'About & Roots' },
    { id: 'tutorials', label: 'Web & App Tutorials' },
    { id: 'articles', label: 'Stories & Articles' },
    { id: 'photos', label: 'Photo Moments' },
    { id: 'gospel', label: 'Gospel Corner' },
    { id: 'family-chat', label: 'Family Chat' },
    { id: 'messages', label: 'Guestbook' },
    { id: 'database', label: 'Database Studio' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onSelectTab('about')}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            IBYOYAKOZE Bonette
          </button>

          {/* Zone 2: 5–8 clean single-line text navigation links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + theme toggle + admin portal */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                isAdminLoggedIn
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isAdminLoggedIn ? 'Open Admin Management Suite' : 'Admin Login (byoyakozebonette@protonmail.com)'}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Admin Suite</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>Admin Portal</span>
                </>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-colors" />
              )}
            </button>

            <button
              onClick={onOpenMessageModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Mobile / Compact Navigation Row */}
        <div className="xl:hidden flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-100 dark:border-slate-800 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/80'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
