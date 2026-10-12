import React, { useState } from 'react';
import {
  Users,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  MessageCircle,
  Plus,
  Trash2,
  Mail,
  Send,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Heart,
  Clock,
  Filter
} from 'lucide-react';
import {
  FamilyMemberItem,
  DailyEventLog,
  StoryArticle,
  PhotoItem,
  FamilyChatMessage
} from '../data/portfolioData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  // State and Dispatchers
  familyMembers: FamilyMemberItem[];
  onAddFamilyMember: (member: FamilyMemberItem) => void;
  onRemoveFamilyMember: (id: string) => void;
  dailyEvents: DailyEventLog[];
  onAddDailyEvent: (event: DailyEventLog) => void;
  onRemoveDailyEvent: (id: string) => void;
  articles: StoryArticle[];
  onAddArticle: (article: StoryArticle) => void;
  onRemoveArticle: (id: string) => void;
  onAddPhoto: (photo: PhotoItem) => void;
  onSendFamilyChat: (msg: string, isAnnouncement?: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  familyMembers,
  onAddFamilyMember,
  onRemoveFamilyMember,
  dailyEvents,
  onAddDailyEvent,
  onRemoveDailyEvent,
  articles,
  onAddArticle,
  onRemoveArticle,
  onAddPhoto,
  onSendFamilyChat,
}) => {
  const [activeTab, setActiveTab] = useState<'family' | 'events' | 'articles' | 'photos' | 'chat'>('family');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // --- Family Member Form State ---
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState<FamilyMemberItem['relationship']>('Brother');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [inviteModalData, setInviteModalData] = useState<{ member: FamilyMemberItem; link: string } | null>(null);
  const [copiedInvite, setCopiedInvite] = useState(false);

  // --- Daily Event Form State ---
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<DailyEventLog['category']>('L5 SOD Studies');
  const [eventSummary, setEventSummary] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [eventMood, setEventMood] = useState('Focused & Thankful');

  // --- Article Form State ---
  const [articleTitle, setArticleTitle] = useState('');
  const [articleCategory, setArticleCategory] = useState<StoryArticle['category']>('Tech & Coding');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleReadTime, setArticleReadTime] = useState('4 min read');
  const [articleCover, setArticleCover] = useState('/src/assets/images/coding_classroom_lab_1791547598588.jpg');

  // --- Photo Form State ---
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState<PhotoItem['category']>('Coding & School');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');

  // --- Chat Announcement State ---
  const [announcementText, setAnnouncementText] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  // 1. Submit Family Member
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    const token = `fam-invite-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newMember: FamilyMemberItem = {
      id: `fam-${Date.now()}`,
      name: newMemberName.trim(),
      relationship: newMemberRelation,
      email: newMemberEmail.trim(),
      phone: newMemberPhone.trim() || undefined,
      joinedAt: 'Just now',
      status: 'Active',
      avatar: newMemberName.trim().charAt(0).toUpperCase(),
      inviteToken: token,
    };

    onAddFamilyMember(newMember);

    // Generate email invite link
    const inviteLink = `${window.location.origin}${window.location.pathname}?family_invite=${token}&name=${encodeURIComponent(newMember.name)}`;
    setInviteModalData({ member: newMember, link: inviteLink });

    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberPhone('');
    showNotification(`Added ${newMember.name} and generated invitation email link!`);
  };

  // 2. Submit Daily Event Log
  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventSummary.trim()) return;

    const newEvent: DailyEventLog = {
      id: `event-${Date.now()}`,
      date: 'Today, Oct 2026',
      title: eventTitle.trim(),
      category: eventCategory,
      summary: eventSummary.trim(),
      details: eventDetails.trim() || eventSummary.trim(),
      mood: eventMood,
      loggedBy: 'IBYOYAKOZE Bonette (Admin)',
    };

    onAddDailyEvent(newEvent);
    setEventTitle('');
    setEventSummary('');
    setEventDetails('');
    showNotification('Daily event logged successfully!');
  };

  // 3. Submit Story / Article
  const handleAddArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleContent.trim()) return;

    const newArticle: StoryArticle = {
      id: `story-${Date.now()}`,
      title: articleTitle.trim(),
      slug: articleTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: articleExcerpt.trim() || articleContent.slice(0, 160) + '...',
      content: articleContent.trim(),
      category: articleCategory,
      publishedAt: 'Just now',
      readTime: articleReadTime,
      coverImage: articleCover,
      author: 'IBYOYAKOZE Bonette',
      likes: 1,
    };

    onAddArticle(newArticle);
    setArticleTitle('');
    setArticleExcerpt('');
    setArticleContent('');
    showNotification(`Story "${newArticle.title}" published for family & visitors!`);
  };

  // 4. Submit Photo
  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim() || !photoUrl.trim()) return;

    const newPhoto: PhotoItem = {
      id: `photo-${Date.now()}`,
      title: photoTitle.trim(),
      category: photoCategory,
      imageUrl: photoUrl.trim(),
      caption: photoCaption.trim() || 'Uploaded by Admin Bonette.',
      date: '2026',
      isCustom: true,
    };

    onAddPhoto(newPhoto);
    setPhotoTitle('');
    setPhotoUrl('');
    setPhotoCaption('');
    showNotification('Photo uploaded and added to the gallery!');
  };

  // 5. Send Admin Chat Announcement
  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    onSendFamilyChat(announcementText.trim(), true);
    setAnnouncementText('');
    showNotification('Admin announcement posted to family chat!');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Bonette's Admin Management Suite
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Admin Full Access
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Logged in as <span className="font-mono text-emerald-700 dark:text-emerald-400">byoyakozebonette@protonmail.com</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Global Success Notification Pill */}
        {successNotice && (
          <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto bg-white dark:bg-slate-900 text-xs font-medium">
          <button
            onClick={() => setActiveTab('family')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'family'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Family Members ({familyMembers.length})
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Daily Events ({dailyEvents.length})
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'articles'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Stories & Articles ({articles.length})
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'photos'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Upload Photo
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`py-3 px-3 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-bold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Family Chat Console
          </button>
        </div>

        {/* Tab Body Container */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-slate-950/40">
          {/* TAB 1: FAMILY MANAGEMENT */}
          {activeTab === 'family' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Add Family Member Form */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  Add Family Member & Generate Invite Link
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Register brothers Mugisha & Cedric, sisters Ruth, Reponce, Beryse, or parents. They receive an email invite link to join the Family Chat!
                </p>

                <form onSubmit={handleAddMemberSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="e.g., Mugisha, Ruth, Cedric..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Relationship *
                    </label>
                    <select
                      value={newMemberRelation}
                      onChange={(e) => setNewMemberRelation(e.target.value as FamilyMemberItem['relationship'])}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    >
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Relative">Relative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address (for Invite Link) *
                    </label>
                    <input
                      type="email"
                      required
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      placeholder="member@gmail.com"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={newMemberPhone}
                      onChange={(e) => setNewMemberPhone(e.target.value)}
                      placeholder="+250 78..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Register Member & Dispatch Email Link
                  </button>
                </form>
              </div>

              {/* Right: Members List */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Registered Family Members ({familyMembers.length})
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Auto-synced to Family Chat
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                          {member.avatar || member.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white">{member.name}</span>
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded">
                              {member.relationship}
                            </span>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                              ● {member.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}${window.location.pathname}?family_invite=${member.inviteToken || member.id}&name=${encodeURIComponent(member.name)}`;
                            setInviteModalData({ member, link });
                          }}
                          className="px-2.5 py-1 text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                          title="View / Send Invite Link"
                        >
                          <Mail className="w-3 h-3 text-emerald-600" />
                          Invite Link
                        </button>
                        <button
                          onClick={() => onRemoveFamilyMember(member.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded cursor-pointer transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DAILY EVENTS LOGGER */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Log Daily Event or Update
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Record study progress at Lycée Saint Alexandre Sauli, choir practices, family reunions, or code milestones.
                </p>

                <form onSubmit={handleAddEventSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g., Finished Mobile App UI Lab"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value as DailyEventLog['category'])}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    >
                      <option value="L5 SOD Studies">L5 SOD Studies</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Gospel Choir">Gospel Choir</option>
                      <option value="Coding Project">Coding Project</option>
                      <option value="Personal Milestone">Personal Milestone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Mood / State of Heart
                    </label>
                    <input
                      type="text"
                      value={eventMood}
                      onChange={(e) => setEventMood(e.target.value)}
                      placeholder="e.g., Inspired, Peaceful, Grateful"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Summary *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={eventSummary}
                      onChange={(e) => setEventSummary(e.target.value)}
                      placeholder="Brief highlight of what occurred..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={eventDetails}
                      onChange={(e) => setEventDetails(e.target.value)}
                      placeholder="Key takeaways, prayers, or code details..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Save Event to Log
                  </button>
                </form>
              </div>

              {/* Recent Logs Feed */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Logged Events & Milestones ({dailyEvents.length})
                </h3>

                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {dailyEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400 text-[11px] block">
                            {evt.category} · {evt.date}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                            {evt.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveDailyEvent(evt.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {evt.summary}
                      </p>

                      {evt.details && evt.details !== evt.summary && (
                        <p className="text-slate-500 dark:text-slate-400 italic text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                          {evt.details}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Mood: <strong className="text-slate-700 dark:text-slate-300">{evt.mood}</strong></span>
                        <span>{evt.loggedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUBLISH STORIES & ARTICLES */}
          {activeTab === 'articles' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Write & Publish Story or Article
                </h3>

                <form onSubmit={handleAddArticleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={articleTitle}
                      onChange={(e) => setArticleTitle(e.target.value)}
                      placeholder="e.g., Overcoming Challenges in Software Engineering"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Category
                      </label>
                      <select
                        value={articleCategory}
                        onChange={(e) => setArticleCategory(e.target.value as StoryArticle['category'])}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                      >
                        <option value="Tech & Coding">Tech & Coding</option>
                        <option value="Faith & Gospel">Faith & Gospel</option>
                        <option value="Family & Roots">Family & Roots</option>
                        <option value="Life in Gatsibo">Life in Gatsibo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={articleReadTime}
                        onChange={(e) => setArticleReadTime(e.target.value)}
                        placeholder="e.g., 4 min read"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Cover Image (Select from Bonette's gallery or enter URL)
                    </label>
                    <select
                      value={articleCover}
                      onChange={(e) => setArticleCover(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    >
                      <option value="/src/assets/images/coding_classroom_lab_1791547598588.jpg">Tech Classroom Lab</option>
                      <option value="/src/assets/images/bonette_gospel_singing_1791547578992.jpg">Gospel Singing Sanctuary</option>
                      <option value="/src/assets/images/gatsibo_rwanda_scenery_1791547617271.jpg">Gatsibo Rolling Hills</option>
                      <option value="/src/assets/images/bonette_portrait_1791547560485.jpg">Bonette Portrait</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Short Excerpt (Lead sentence)
                    </label>
                    <textarea
                      rows={2}
                      value={articleExcerpt}
                      onChange={(e) => setArticleExcerpt(e.target.value)}
                      placeholder="Brief hook for readers..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Article Content *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={articleContent}
                      onChange={(e) => setArticleContent(e.target.value)}
                      placeholder="Write your story, advice, devotional thoughts, or coding reflections..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    Publish Article to Portfolio
                  </button>
                </form>
              </div>

              {/* Published Stories List */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-850 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Published Stories & Articles ({articles.length})
                </h3>

                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            {art.category} · {art.readTime}
                          </span>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                            {art.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveArticle(art.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {art.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                        <span>By {art.author}</span>
                        <span>{art.publishedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PHOTO UPLOADER */}
          {activeTab === 'photos' && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-850 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Upload Photo & Event Highlight
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Add new pictures of family events, gospel singing in Gatsibo, or coding moments at Lycée Saint Alexandre Sauli directly to the live portfolio gallery.
              </p>

              <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="e.g., Coding with classmates at Sauli de Muhura"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as PhotoItem['category'])}
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  >
                    <option value="Coding & School">Coding & School</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Gospel Music">Gospel Music</option>
                    <option value="Gatsibo Home">Gatsibo Home</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Image File URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://... or /src/assets/images/..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Caption / Achievement Story
                  </label>
                  <textarea
                    rows={3}
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="Describe what was accomplished in this picture..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer"
                >
                  Upload & Publish to Gallery
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: FAMILY CHAT CONSOLE */}
          {activeTab === 'chat' && (
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-850 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Post Admin Announcement to Family Chat Room
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                As the admin, your announcements appear pinned with a verified gold/emerald shield in the Family Chat room for brothers, sisters, and parents.
              </p>

              <form onSubmit={handleSendAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Announcement Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="e.g., Dear family, my exams schedule is confirmed for next Tuesday. Please pray for my software development practicals!"
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-emerald-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Broadcast Announcement to Family
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Invite Link Modal Popup */}
        {inviteModalData && (
          <div
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setInviteModalData(null)}
          >
            <div
              className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Email Invitation Dispatched!</span>
                </div>
                <button
                  onClick={() => setInviteModalData(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5 text-xs">
                <p><strong>Recipient:</strong> {inviteModalData.member.name} ({inviteModalData.member.relationship})</p>
                <p><strong>Email:</strong> {inviteModalData.member.email}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ An email notification with the secure join link has been simulated.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Direct Join Link for {inviteModalData.member.name}:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={inviteModalData.link}
                    className="flex-1 px-3 py-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inviteModalData.link);
                      setCopiedInvite(true);
                      setTimeout(() => setCopiedInvite(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 dark:bg-emerald-600 text-white rounded-lg text-xs font-medium cursor-pointer"
                  >
                    {copiedInvite ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setInviteModalData(null)}
                className="w-full py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
