/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { AboutEducationSection } from './components/AboutEducationSection';
import { TutorialsSection } from './components/TutorialsSection';
import { StoriesArticlesSection } from './components/StoriesArticlesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { GospelSanctuarySection } from './components/GospelSanctuarySection';
import { FamilyChatSection } from './components/FamilyChatSection';
import { MessageBoardSection } from './components/MessageBoardSection';
import { GitHubSocialSyncSection } from './components/GitHubSocialSyncSection';
import { DatabaseStudioSection } from './components/DatabaseStudioSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Sparkles, Heart } from 'lucide-react';
import {
  BONETTE_PROFILE,
  VisitorMessage,
  FamilyMemberItem,
  DailyEventLog,
  StoryArticle,
  PhotoItem,
  FamilyChatMessage,
  INITIAL_FAMILY_MEMBERS,
  INITIAL_DAILY_EVENTS,
  INITIAL_STORIES_ARTICLES,
  INITIAL_FAMILY_CHAT
} from './data/portfolioData';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('about');

  // Reading Progress State for browser window top bar
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [activeStoryTitle, setActiveStoryTitle] = useState<string | null>(null);
  const [activeStoryCategory, setActiveStoryCategory] = useState<string | null>(null);
  const [activeStoryReadTime, setActiveStoryReadTime] = useState<string | null>(null);
  const [isReadingActive, setIsReadingActive] = useState<boolean>(false);

  // --- Admin State ---
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('bonette_admin_session');
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);

  // --- Dynamic Application Data with localStorage Persistence ---
  const [familyMembers, setFamilyMembers] = useState<FamilyMemberItem[]>(() => {
    try {
      const saved = localStorage.getItem('bonette_family_members');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FAMILY_MEMBERS;
  });

  const [dailyEvents, setDailyEvents] = useState<DailyEventLog[]>(() => {
    try {
      const saved = localStorage.getItem('bonette_daily_events');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DAILY_EVENTS;
  });

  const [articles, setArticles] = useState<StoryArticle[]>(() => {
    try {
      const saved = localStorage.getItem('bonette_articles');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STORIES_ARTICLES;
  });

  const [familyChat, setFamilyChat] = useState<FamilyChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('bonette_family_chat');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FAMILY_CHAT;
  });

  // URL Invite Welcome Banner State
  const [inviteWelcomeName, setInviteWelcomeName] = useState<string | null>(null);

  // Modal Form State for Guestbook
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<VisitorMessage['type']>('Message');
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  // References for scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const tutorialsRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const gospelRef = useRef<HTMLDivElement>(null);
  const familyChatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const databaseRef = useRef<HTMLDivElement>(null);

  // Check URL params for family invite link
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const inviteToken = params.get('family_invite');
      const inviteName = params.get('name');
      if (inviteToken) {
        setInviteWelcomeName(inviteName || 'Family Member');
        // Scroll to Family Chat
        setTimeout(() => {
          handleSelectTab('family-chat');
        }, 800);
      }
    } catch {}
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bonette_family_members', JSON.stringify(familyMembers));
    } catch {}
  }, [familyMembers]);

  useEffect(() => {
    try {
      localStorage.setItem('bonette_daily_events', JSON.stringify(dailyEvents));
    } catch {}
  }, [dailyEvents]);

  useEffect(() => {
    try {
      localStorage.setItem('bonette_articles', JSON.stringify(articles));
    } catch {}
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem('bonette_family_chat', JSON.stringify(familyChat));
    } catch {}
  }, [familyChat]);

  // Track scroll reading progress across stories and articles
  useEffect(() => {
    if (isReadingActive) return; // Active article modal takes priority

    const handleWindowScroll = () => {
      if (!articlesRef.current) return;
      const rect = articlesRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Start measuring when the articles section reaches the viewport reading zone
      const startTrigger = windowHeight * 0.75;
      const scrolled = startTrigger - rect.top;

      if (scrolled > 0 && rect.bottom > 0) {
        const total = sectionHeight + windowHeight * 0.25;
        const progress = Math.min(100, Math.max(0, Math.round((scrolled / total) * 100)));
        setReadingProgress(progress);
        if (progress > 5 && progress < 99) {
          setActiveStoryTitle('Articles & Devotionals by Bonette');
          setActiveStoryCategory('L5 SOD Stories');
        } else if (progress >= 99) {
          setActiveStoryTitle('Articles Completed');
          setActiveStoryCategory('Done');
        } else {
          setActiveStoryTitle(null);
          setActiveStoryCategory(null);
        }
      } else {
        setReadingProgress(0);
        setActiveStoryTitle(null);
        setActiveStoryCategory(null);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [isReadingActive]);

  const handleReadingProgressChange = (
    progress: number,
    title: string | null,
    category?: string | null,
    readTime?: string | null
  ) => {
    if (title) {
      setIsReadingActive(true);
      setActiveStoryTitle(title);
      setActiveStoryCategory(category || null);
      setActiveStoryReadTime(readTime || null);
      setReadingProgress(progress);
    } else {
      setIsReadingActive(false);
      setActiveStoryTitle(null);
      setActiveStoryCategory(null);
      setActiveStoryReadTime(null);
      setReadingProgress(0);
    }
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      about: aboutRef,
      tutorials: tutorialsRef,
      articles: articlesRef,
      photos: photosRef,
      gospel: gospelRef,
      'family-chat': familyChatRef,
      messages: messagesRef,
      database: databaseRef,
    };

    const target = map[tab];
    if (target?.current) {
      target.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenAdminPortal = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('bonette_admin_session');
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  // Dispatchers for Admin Actions
  const handleAddFamilyMember = (newMember: FamilyMemberItem) => {
    setFamilyMembers([newMember, ...familyMembers]);
  };

  const handleRemoveFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter((m) => m.id !== id));
  };

  const handleAddDailyEvent = (newEvent: DailyEventLog) => {
    setDailyEvents([newEvent, ...dailyEvents]);
  };

  const handleRemoveDailyEvent = (id: string) => {
    setDailyEvents(dailyEvents.filter((e) => e.id !== id));
  };

  const handleAddArticle = (newArticle: StoryArticle) => {
    setArticles([newArticle, ...articles]);
  };

  const handleRemoveArticle = (id: string) => {
    setArticles(articles.filter((a) => a.id !== id));
  };

  const handleAddPhoto = (newPhoto: PhotoItem) => {
    try {
      const existing = localStorage.getItem('bonette_portfolio_photos');
      const photos = existing ? JSON.parse(existing) : [];
      localStorage.setItem('bonette_portfolio_photos', JSON.stringify([newPhoto, ...photos]));
    } catch {}
  };

  const handleSendFamilyChat = (
    content: string,
    senderName = 'IBYOYAKOZE Bonette (Admin)',
    senderEmail = 'byoyakozebonette@protonmail.com',
    senderRole = 'Admin / Student Developer',
    isAnnouncement = false
  ) => {
    const newMsg: FamilyChatMessage = {
      id: `chat-${Date.now()}`,
      senderName,
      senderEmail,
      senderRole,
      content,
      timestamp: 'Just now',
      isAnnouncement,
    };
    setFamilyChat([...familyChat, newMsg]);
  };

  const handleOpenMessageModal = (type: VisitorMessage['type'] = 'Message') => {
    setModalType(type);
    setIsMessageModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim() || !modalContent.trim()) return;

    try {
      const existing = localStorage.getItem('bonette_portfolio_messages');
      const messagesList = existing ? JSON.parse(existing) : [];
      const newEntry: VisitorMessage = {
        id: `msg-${Date.now()}`,
        name: modalName.trim(),
        email: modalEmail.trim() || undefined,
        type: modalType,
        content: modalContent.trim(),
        createdAt: 'Just now',
        likes: 1,
      };
      const updated = [newEntry, ...messagesList];
      localStorage.setItem('bonette_portfolio_messages', JSON.stringify(updated));
    } catch {}

    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
      setIsMessageModalOpen(false);
      setModalName('');
      setModalEmail('');
      setModalContent('');
      handleSelectTab('messages');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-200 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors">
      {/* Reading Progress Indicator Bar at the very top of the browser window */}
      <ReadingProgressBar
        progress={readingProgress}
        activeStoryTitle={activeStoryTitle}
        category={activeStoryCategory}
        readTime={activeStoryReadTime}
        isVisible={isReadingActive || readingProgress > 0}
        onCloseReader={() => {
          setIsReadingActive(false);
          setActiveStoryTitle(null);
          setActiveStoryCategory(null);
          setActiveStoryReadTime(null);
          setReadingProgress(0);
        }}
      />

      {/* Top Navigation Bar with Admin Portal button and Light/Dark toggle */}
      <HeaderNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenMessageModal={() => handleOpenMessageModal('Message')}
        theme={theme}
        onToggleTheme={toggleTheme}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdminPortal}
      />

      {/* Welcome Banner when arriving from a Family Email Invite Link */}
      {inviteWelcomeName && (
        <div className="bg-emerald-700 text-white px-4 py-3 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            <span>
              Welcome to the family circle, <strong>{inviteWelcomeName}</strong>! Your email invite token is verified. You can now chat in the private Family Chat below!
            </span>
          </div>
          <button
            onClick={() => setInviteWelcomeName(null)}
            className="text-white hover:text-emerald-200 p-1"
          >
            ✕
          </button>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenMessageModal={() => handleOpenMessageModal('Message')}
          onNavigateTab={handleSelectTab}
        />

        {/* Section 1: About, Academic Journey (L5 SOD & G.S Kibondo), Family & Gatsibo */}
        <div ref={aboutRef}>
          <AboutEducationSection />
        </div>

        {/* Section 2: Video Tutorials on How to Develop Website & App */}
        <div ref={tutorialsRef}>
          <TutorialsSection />
        </div>

        {/* Section 3: Stories & Articles by Bonette (Admin Published) */}
        <div ref={articlesRef}>
          <StoriesArticlesSection
            articles={articles}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminPublish={() => {
              if (isAdminLoggedIn) {
                setIsAdminDashboardOpen(true);
              } else {
                setIsAdminLoginOpen(true);
              }
            }}
            onReadingProgressChange={handleReadingProgressChange}
          />
        </div>

        {/* Section 4: Photo Moments & Uploads (What I Done & My Photos) */}
        <div ref={photosRef}>
          <PhotoGallerySection />
        </div>

        {/* Section 5: Gospel Singing Sanctuary */}
        <div ref={gospelRef}>
          <GospelSanctuarySection
            onSuggestSong={() => handleOpenMessageModal('Gospel Song Suggestion')}
          />
        </div>

        {/* Section 6: Family Chat Room (Admin & Members with Email Invite System) */}
        <div ref={familyChatRef}>
          <FamilyChatSection
            messages={familyChat}
            onSendMessage={(msg, name, email, role) => handleSendFamilyChat(msg, name, email, role, false)}
            familyMembers={familyMembers}
            isAdminLoggedIn={isAdminLoggedIn}
            onOpenAdminModal={() => setIsAdminLoginOpen(true)}
            onOpenAddMemberModal={handleOpenAdminPortal}
          />
        </div>

        {/* Section 7: Community Guestbook & Message Board */}
        <div ref={messagesRef}>
          <MessageBoardSection />
        </div>

        {/* Section 8: GitHub Commit Console & Social Media Broadcast */}
        <GitHubSocialSyncSection />

        {/* Section 9: SQLite & CockroachDB Database Studio */}
        <div ref={databaseRef}>
          <DatabaseStudioSection />
        </div>
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Full Admin Management Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleAdminLogout}
        familyMembers={familyMembers}
        onAddFamilyMember={handleAddFamilyMember}
        onRemoveFamilyMember={handleRemoveFamilyMember}
        dailyEvents={dailyEvents}
        onAddDailyEvent={handleAddDailyEvent}
        onRemoveDailyEvent={handleRemoveDailyEvent}
        articles={articles}
        onAddArticle={handleAddArticle}
        onRemoveArticle={handleRemoveArticle}
        onAddPhoto={handleAddPhoto}
        onSendFamilyChat={(msg) => handleSendFamilyChat(msg, 'IBYOYAKOZE Bonette (Admin)', 'byoyakozebonette@protonmail.com', 'Admin / Student Developer', true)}
      />

      {/* Floating Send Message Modal for Visitors */}
      {isMessageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsMessageModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Send a Message to {BONETTE_PROFILE.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  L5 SOD · Lycée Saint Alexandre Sauli de Muhura
                </p>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalSuccess ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3 text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Message Sent Successfully!</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">Bonette has received your note.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Category
                  </label>
                  <select
                    value={modalType}
                    onChange={(e) => setModalType(e.target.value as VisitorMessage['type'])}
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  >
                    <option value="Message">Friendly Message</option>
                    <option value="Feedback">Feedback on Portfolio or Tutorials</option>
                    <option value="Gospel Song Suggestion">Gospel Song Suggestion</option>
                    <option value="Tech Collaboration">Tech Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message Content *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={modalContent}
                    onChange={(e) => setModalContent(e.target.value)}
                    placeholder="Write your note for Bonette..."
                    className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsMessageModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
