export interface PortfolioProfile {
  name: string;
  title: string;
  subTitle: string;
  location: string;
  email: string;
  instagram: string;
  github: string;
  facebook: string;
  bio: string;
  currentEducation: {
    program: string;
    level: string;
    school: string;
    details: string;
  };
  educationHistory: Array<{
    period: string;
    school: string;
    level: string;
    description: string;
  }>;
  family: {
    parents: string;
    brothers: string[];
    sisters: string[];
    note: string;
  };
  skills: Array<{
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'tools';
    proficiency: number;
  }>;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'Portrait' | 'Coding & School' | 'Gospel Music' | 'Gatsibo Home' | 'Family';
  imageUrl: string;
  caption: string;
  date: string;
  isCustom?: boolean;
}

export interface TutorialItem {
  id: string;
  title: string;
  topic: 'HTML & CSS' | 'React & Vite' | 'Node.js APIs' | 'Mobile Apps' | 'Databases';
  duration: string;
  level: 'Beginner' | 'Intermediate';
  summary: string;
  videoPlaceholderUrl?: string;
  codeSnippet: string;
  keyTakeaways: string[];
}

export interface GospelSong {
  id: string;
  title: string;
  artist: string;
  theme: string;
  favoriteLyrics: string;
  whyRelaxing: string;
  tone: 'Peaceful' | 'Joyful' | 'Worship' | 'Acoustic';
}

export interface VisitorMessage {
  id: string;
  name: string;
  email?: string;
  type: 'Message' | 'Feedback' | 'Gospel Song Suggestion' | 'Tech Collaboration';
  content: string;
  createdAt: string;
  likes: number;
}

export interface FamilyMemberItem {
  id: string;
  name: string;
  relationship: 'Brother' | 'Sister' | 'Father' | 'Mother' | 'Cousin' | 'Relative';
  email: string;
  phone?: string;
  joinedAt: string;
  status: 'Active' | 'Invited';
  avatar?: string;
  inviteToken?: string;
}

export interface DailyEventLog {
  id: string;
  date: string;
  title: string;
  category: 'L5 SOD Studies' | 'Family Gathering' | 'Gospel Choir' | 'Coding Project' | 'Personal Milestone';
  summary: string;
  details: string;
  mood?: string;
  photos?: string[];
  loggedBy: string;
}

export interface StoryArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'Tech & Coding' | 'Faith & Gospel' | 'Family & Roots' | 'Life in Gatsibo';
  publishedAt: string;
  readTime: string;
  coverImage?: string;
  author: string;
  likes: number;
}

export interface FamilyChatMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isAnnouncement?: boolean;
  avatarColor?: string;
}

export const BONETTE_PROFILE: PortfolioProfile = {
  name: 'IBYOYAKOZE Bonette',
  title: 'Aspiring Software Engineer & Tech Creator',
  subTitle: 'Student in Level 5 Software Development (L5 SOD) at Lycée Saint Alexandre Sauli de Muhura',
  location: 'Gatsibo District, Eastern Province, Rwanda',
  email: 'ibyoyakozebonette2008@gmail.com',
  instagram: 'bonette127',
  github: 'bonette127',
  facebook: 'IBYOYAKOZE Bonette',
  bio: 'Driven young software engineer from Gatsibo, Rwanda. Passionate about engineering clean web applications, cross-platform mobile apps, and sharing coding knowledge with peers. When resting my mind between coding sessions, I find deep joy and renewal in singing gospel songs.',
  currentEducation: {
    program: 'Software Development (SOD)',
    level: 'Senior 5 / Level 5 (L5 SOD)',
    school: 'Lycée Saint Alexandre Sauli de Muhura',
    details: 'Focusing on algorithmic thinking, full-stack web architectures, relational databases (SQLite, PostgreSQL, CockroachDB), object-oriented programming, and mobile application engineering.'
  },
  educationHistory: [
    {
      period: 'Current (Senior 5)',
      school: 'Lycée Saint Alexandre Sauli de Muhura',
      level: 'L5 SOD (Software Development)',
      description: 'Advanced technical curriculum in software engineering, frontend frameworks, backend web services, system design, and database modeling.'
    },
    {
      period: 'Lower Secondary (O-Level)',
      school: 'G.S. Kibondo',
      level: 'Ordinary Level (S1 - S3)',
      description: 'Built foundational excellence in mathematics, physical sciences, computer literacy, and English communication.'
    },
    {
      period: 'Early Foundation',
      school: 'G.S. Kibondo',
      level: 'Nursery & Primary School (P1 - P6)',
      description: 'Graduated with strong academic performance, community leadership in youth choir, and early curiosity about technology.'
    }
  ],
  family: {
    parents: 'Father & Mother (My pillar of blessing, prayer, and guidance)',
    brothers: ['Mugisha', 'Cedric'],
    sisters: ['Ruth', 'Reponce', 'Beryse'],
    note: 'Blessed with loving parents, two caring brothers Mugisha and Cedric, and three wonderful sisters Ruth, Reponce, and Beryse who constantly inspire and cheer my tech journey.'
  },
  skills: [
    { name: 'React.js & TypeScript', category: 'frontend', proficiency: 88 },
    { name: 'HTML5 & Tailwind CSS', category: 'frontend', proficiency: 94 },
    { name: 'Node.js & Express', category: 'backend', proficiency: 82 },
    { name: 'SQLite & CockroachDB', category: 'backend', proficiency: 78 },
    { name: 'Mobile App Architecture', category: 'mobile', proficiency: 75 },
    { name: 'Git & GitHub Workflows', category: 'tools', proficiency: 85 }
  ]
};

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    title: 'Bonette at the Software Dev Workstation',
    category: 'Portrait',
    imageUrl: '/src/assets/images/bonette_portrait_1791547560485.jpg',
    caption: 'Coding modern web and mobile applications with focus, curiosity, and high aspirations.',
    date: '2026'
  },
  {
    id: 'photo-2',
    title: 'Gospel Singing & Worship Session',
    category: 'Gospel Music',
    imageUrl: '/src/assets/images/bonette_gospel_singing_1791547578992.jpg',
    caption: 'Singing gospel songs is where I recharge my heart, spirit, and creative energy.',
    date: '2026'
  },
  {
    id: 'photo-3',
    title: 'Lycée Saint Alexandre Sauli Tech Classroom',
    category: 'Coding & School',
    imageUrl: '/src/assets/images/coding_classroom_lab_1791547598588.jpg',
    caption: 'Level 5 Software Development (L5 SOD) laboratory session building responsive user interfaces.',
    date: '2026'
  },
  {
    id: 'photo-4',
    title: 'My Peaceful Hometown: Gatsibo, Rwanda',
    category: 'Gatsibo Home',
    imageUrl: '/src/assets/images/gatsibo_rwanda_scenery_1791547617271.jpg',
    caption: 'The beautiful rolling green hills of Gatsibo District that remind me where my story began.',
    date: '2026'
  }
];

export const TUTORIALS_DATA: TutorialItem[] = [
  {
    id: 'tut-1',
    title: 'How to Build Your First Modern Website with React & Tailwind',
    topic: 'React & Vite',
    duration: '18 min tutorial',
    level: 'Beginner',
    summary: 'A step-by-step masterclass by Bonette on breaking down a UI into reusable React components and styling with utility classes.',
    codeSnippet: `// Welcome to Bonette's React Tutorial
import React, { useState } from 'react';

export function WelcomeHero() {
  const [greet, setGreet] = useState('Muraho! Welcome to coding!');
  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl">
      <h1 className="text-2xl font-bold">{greet}</h1>
      <button 
        onClick={() => setGreet('Ready to build your next app!')}
        className="mt-4 px-4 py-2 bg-emerald-500 rounded text-sm font-semibold"
      >
        Click to Start Learning
      </button>
    </div>
  );
}`,
    keyTakeaways: [
      'Understanding JSX syntax and state hooks (useState)',
      'Structuring clean component folders in React',
      'Using Tailwind CSS for mobile-responsive interfaces'
    ]
  },
  {
    id: 'tut-2',
    title: 'Creating a Fast REST API in Node.js & Express for Web & Apps',
    topic: 'Node.js APIs',
    duration: '22 min tutorial',
    level: 'Intermediate',
    summary: 'Learn how to handle HTTP requests, configure clean endpoints, and store visitor messages safely.',
    codeSnippet: `// Node.js + Express API endpoint example
import express from 'express';
const app = express();
app.use(express.json());

const messages = [];

app.post('/api/messages', (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newMsg = { id: Date.now(), name, content, time: new Date() };
  messages.unshift(newMsg);
  res.status(201).json(newMsg);
});`,
    keyTakeaways: [
      'Setting up Express server and JSON body parsers',
      'Validating client payloads and returning proper HTTP status codes',
      'Connecting client fetch requests to backend endpoints'
    ]
  },
  {
    id: 'tut-3',
    title: 'Relational Database Design: SQLite to CockroachDB Migration',
    topic: 'Databases',
    duration: '15 min tutorial',
    level: 'Intermediate',
    summary: 'How to design clean relational schemas, write SQL queries, and scale from local SQLite to CockroachDB distributed clusters.',
    codeSnippet: `-- SQLite & CockroachDB Compatible Table
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(64) PRIMARY KEY,
  author_name VARCHAR(120) NOT NULL,
  email VARCHAR(160),
  message_type VARCHAR(40) DEFAULT 'General',
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
    keyTakeaways: [
      'Primary keys and indexing best practices',
      'Writing portable SQL queries that work on both SQLite and CockroachDB',
      'Handling timestamps and constraints cleanly'
    ]
  },
  {
    id: 'tut-4',
    title: 'Mobile App Foundations: Responsive Layouts & Touch Interactions',
    topic: 'Mobile Apps',
    duration: '25 min tutorial',
    level: 'Intermediate',
    summary: 'Bonette explains how to build cross-platform mobile apps for Android & iOS with smooth touch targets and clean navigation.',
    codeSnippet: `// Mobile-first responsive card pattern
export function MobileFeatureCard({ title, desc, icon }) {
  return (
    <article className="touch-manipulation p-4 rounded-xl border border-slate-200 bg-white shadow-sm active:scale-98 transition-transform">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </article>
  );
}`,
    keyTakeaways: [
      'Touch target minimum dimensions (>= 44px)',
      'Designing for unstable mobile internet connections',
      'Caching state locally for offline readiness'
    ]
  }
];

export const GOSPEL_SONGS: GospelSong[] = [
  {
    id: 'song-1',
    title: 'Ni Wowe Mugenga (You are the Ruler)',
    artist: 'Traditional Rwandan Gospel Hymn',
    theme: 'Gratitude & Divine Guidance',
    favoriteLyrics: 'Imana irakora ibikomeye mu buzima bwacu. Muri wowe nizeye imbaraga zo gukomera.',
    whyRelaxing: 'Singing this gentle praise centers my thoughts whenever I finish long hours debugging code.',
    tone: 'Peaceful'
  },
  {
    id: 'song-2',
    title: 'Nta cyatandukanya n’Urukundo rwawe (Nothing Separates Us)',
    artist: 'Chorale Worship Reflection',
    theme: 'Unwavering Hope & Faith',
    favoriteLyrics: 'Umunezero w’Umwami nizo mbaraga zanjye buri gitondo n’umugoroba.',
    whyRelaxing: 'Reminds me that my future as a software engineer is guided by grace and diligence.',
    tone: 'Worship'
  },
  {
    id: 'song-3',
    title: 'Yesu Niwe Rutare (Jesus is My Rock)',
    artist: 'Acoustic Gospel Melody',
    theme: 'Strength & Peace',
    favoriteLyrics: 'Buri ntambwe ntera mbona ubuntu bwawe burankikije.',
    whyRelaxing: 'The acoustic guitar rhythm helps soothe mental fatigue and brings deep peace.',
    tone: 'Acoustic'
  }
];

export const INITIAL_MESSAGES: VisitorMessage[] = [
  {
    id: 'msg-1',
    name: 'Mugisha & Cedric (Brothers)',
    type: 'Message',
    content: 'Very proud of your tech journey and dedication to L5 SOD! Keep shining, sister Bonette!',
    createdAt: 'Today, 08:30 AM',
    likes: 7
  },
  {
    id: 'msg-2',
    name: 'Sister Ruth & Reponce',
    type: 'Message',
    content: 'We love your portfolio! May God bless your studies at Lycée Saint Alexandre Sauli de Muhura and bless your gospel singing.',
    createdAt: 'Yesterday, 04:15 PM',
    likes: 5
  },
  {
    id: 'msg-3',
    name: 'Classmate from L5 SOD',
    type: 'Tech Collaboration',
    content: 'The web tutorial you prepared on React state management really helped our revision group. Keep teaching!',
    createdAt: '2 days ago',
    likes: 4
  },
  {
    id: 'msg-4',
    name: 'Alumni from G.S Kibondo',
    type: 'Feedback',
    content: 'Greetings from Kibondo! Inspiring to see your progress in software engineering and your love for Gatsibo.',
    createdAt: '3 days ago',
    likes: 6
  }
];

export const INITIAL_FAMILY_MEMBERS: FamilyMemberItem[] = [
  {
    id: 'fam-1',
    name: 'Mugisha',
    relationship: 'Brother',
    email: 'mugisha.ibyoyakoze@gmail.com',
    phone: '+250 788 112 341',
    joinedAt: 'Jan 2026',
    status: 'Active',
    avatar: 'M',
    inviteToken: 'fam-token-mugisha-01'
  },
  {
    id: 'fam-2',
    name: 'Cedric',
    relationship: 'Brother',
    email: 'cedric.ibyoyakoze@gmail.com',
    phone: '+250 788 112 342',
    joinedAt: 'Jan 2026',
    status: 'Active',
    avatar: 'C',
    inviteToken: 'fam-token-cedric-02'
  },
  {
    id: 'fam-3',
    name: 'Ruth',
    relationship: 'Sister',
    email: 'ruth.ibyoyakoze@gmail.com',
    phone: '+250 788 112 343',
    joinedAt: 'Jan 2026',
    status: 'Active',
    avatar: 'R',
    inviteToken: 'fam-token-ruth-03'
  },
  {
    id: 'fam-4',
    name: 'Reponce',
    relationship: 'Sister',
    email: 'reponce.ibyoyakoze@gmail.com',
    phone: '+250 788 112 344',
    joinedAt: 'Feb 2026',
    status: 'Active',
    avatar: 'R',
    inviteToken: 'fam-token-reponce-04'
  },
  {
    id: 'fam-5',
    name: 'Beryse',
    relationship: 'Sister',
    email: 'beryse.ibyoyakoze@gmail.com',
    phone: '+250 788 112 345',
    joinedAt: 'Feb 2026',
    status: 'Active',
    avatar: 'B',
    inviteToken: 'fam-token-beryse-05'
  },
  {
    id: 'fam-6',
    name: 'Papa (Father)',
    relationship: 'Father',
    email: 'father.gatsibo@gmail.com',
    joinedAt: 'Dec 2025',
    status: 'Active',
    avatar: 'P',
    inviteToken: 'fam-token-father-06'
  },
  {
    id: 'fam-7',
    name: 'Mama (Mother)',
    relationship: 'Mother',
    email: 'mother.gatsibo@gmail.com',
    joinedAt: 'Dec 2025',
    status: 'Active',
    avatar: 'M',
    inviteToken: 'fam-token-mother-07'
  }
];

export const INITIAL_DAILY_EVENTS: DailyEventLog[] = [
  {
    id: 'event-1',
    date: 'Today, Oct 2026',
    title: 'Completed Fullstack Web Architecture Review at Muhura Lab',
    category: 'L5 SOD Studies',
    summary: 'Mastered React state propagation and REST API design with our class instructor at Lycée Saint Alexandre Sauli.',
    details: 'Practiced building decoupled UI modules, TypeScript interfaces, and SQL queries that scale to distributed databases.',
    mood: 'Inspired & Energized',
    loggedBy: 'IBYOYAKOZE Bonette (Admin)'
  },
  {
    id: 'event-2',
    date: 'Yesterday',
    title: 'Sunday Gospel Choir Praise in Muhura Chapel',
    category: 'Gospel Choir',
    summary: 'Sang acoustic soprano worship songs with our church youth choir. Recharged spirit for the upcoming week.',
    details: 'Sang traditional Rwandan hymn "Ni Wowe Mugenga" and shared testimonies on how technology can be used to serve others.',
    mood: 'Peaceful & Grateful',
    loggedBy: 'IBYOYAKOZE Bonette (Admin)'
  },
  {
    id: 'event-3',
    date: '3 days ago',
    title: 'Family Gathering & Software Demo to Mugisha & Cedric',
    category: 'Family Gathering',
    summary: 'Showed brothers Mugisha and Cedric our new SQLite and CockroachDB live database schema viewer.',
    details: 'They were thrilled to see their names in the family table schema and gave valuable feedback on the user interface.',
    mood: 'Proud & Warm',
    loggedBy: 'IBYOYAKOZE Bonette (Admin)'
  }
];

export const INITIAL_STORIES_ARTICLES: StoryArticle[] = [
  {
    id: 'story-1',
    title: 'From G.S Kibondo to Lycée Saint Alexandre Sauli: My Journey into Software Development',
    slug: 'journey-from-kibondo-to-sauli',
    excerpt: 'How early curiosity for mathematics in primary and lower secondary at G.S Kibondo transformed into a calling to build software in L5 SOD.',
    content: `When I was completing my nursery and primary education at G.S Kibondo, computers looked like magical boxes. Every mathematical equation felt like a riddle waiting to be cracked. Later, during ordinary level (lower secondary) at G.S Kibondo, I realized that modern computers speak the language of logic, algebra, and problem-solving.

Entering Lycée Saint Alexandre Sauli de Muhura for Level 5 Software Development (L5 SOD) was a life milestone. In our computer laboratory, surrounded by peers from across the country, we write lines of code that become working apps. Coding has taught me perseverance: an error in syntax is not a failure, but an invitation to inspect and improve.

My goal is to demonstrate that a young woman from Gatsibo District can build world-class software solutions that uplift education, agriculture, and healthcare across Rwanda and Africa.`,
    category: 'Tech & Coding',
    publishedAt: 'Oct 2026',
    readTime: '4 min read',
    coverImage: '/src/assets/images/coding_classroom_lab_1791547598588.jpg',
    author: 'IBYOYAKOZE Bonette',
    likes: 19
  },
  {
    id: 'story-2',
    title: 'Why Singing Gospel Songs Heals My Mind Between Coding Sessions',
    slug: 'gospel-songs-healing-mind',
    excerpt: 'Mental stamina is essential for software developers. Here is why acoustic hymns and church worship give me clarity and peace.',
    content: `Writing code requires intense cerebral concentration. After hours of debugging nested state variables, designing relational SQL schemas, and aligning pixel-perfect layouts, the mind naturally craves renewal.

For me, that renewal is found in gospel music. When I sing "Ni Wowe Mugenga", every anxious thought fades away. Music connects me to God, reminds me that my talents are a blessing, and gives me gratitude for my loving parents, my brothers Mugisha and Cedric, and my sisters Ruth, Reponce, and Beryse.

When I return to the computer keyboard after singing, my thinking is clear, bugs seem easier to solve, and creativity flows naturally.`,
    category: 'Faith & Gospel',
    publishedAt: 'Oct 2026',
    readTime: '3 min read',
    coverImage: '/src/assets/images/bonette_gospel_singing_1791547578992.jpg',
    author: 'IBYOYAKOZE Bonette',
    likes: 24
  },
  {
    id: 'story-3',
    title: 'The Green Terraces of Gatsibo: Home, Heritage, and Rwandan Tech Horizons',
    slug: 'green-terraces-of-gatsibo',
    excerpt: 'Reflecting on my roots in Eastern Rwanda and how our local heritage grounds my technical aspirations.',
    content: `Gatsibo is a place of rolling hills, morning mist, and hardworking communities. Growing up here taught me the value of community: people help each other till the soil, build homes, and celebrate together.

In the tech industry, we call this collaboration and open-source spirit. Just as terracing allows hillsides to retain water and nourish crops, structured software architecture allows systems to scale without breaking. 

Every time I look out at the landscape of Gatsibo, I am reminded that great innovation does not only happen in giant metropolitan cities—it begins in the hearts and minds of students with big dreams.`,
    category: 'Life in Gatsibo',
    publishedAt: 'Oct 2026',
    readTime: '5 min read',
    coverImage: '/src/assets/images/gatsibo_rwanda_scenery_1791547617271.jpg',
    author: 'IBYOYAKOZE Bonette',
    likes: 31
  }
];

export const INITIAL_FAMILY_CHAT: FamilyChatMessage[] = [
  {
    id: 'chat-1',
    senderName: 'IBYOYAKOZE Bonette',
    senderEmail: 'byoyakozebonette@protonmail.com',
    senderRole: 'Admin / Student Developer',
    content: 'Muraho family! Welcome to our private family chat room on my portfolio. I added this so we can share updates, prayer points, and school highlights together!',
    timestamp: 'Today, 08:30 AM',
    isAnnouncement: true,
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'chat-2',
    senderName: 'Mugisha',
    senderEmail: 'mugisha.ibyoyakoze@gmail.com',
    senderRole: 'Brother',
    content: 'Muraho Bonette! Wow, this is impressive! Your coding skills at Lycée Saint Alexandre Sauli are truly advancing rapidly.',
    timestamp: 'Today, 08:42 AM',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'chat-3',
    senderName: 'Ruth',
    senderEmail: 'ruth.ibyoyakoze@gmail.com',
    senderRole: 'Sister',
    content: 'Praise God sister! We are praying for your upcoming exams in L5 SOD. Also loved the gospel singing photos you posted!',
    timestamp: 'Today, 09:15 AM',
    avatarColor: 'bg-amber-600'
  },
  {
    id: 'chat-4',
    senderName: 'Cedric',
    senderEmail: 'cedric.ibyoyakoze@gmail.com',
    senderRole: 'Brother',
    content: 'Can you teach me how you connected the CockroachDB and SQLite databases on the site? It looks super fast.',
    timestamp: 'Today, 09:40 AM',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'chat-5',
    senderName: 'Reponce & Beryse',
    senderEmail: 'reponce.ibyoyakoze@gmail.com',
    senderRole: 'Sisters',
    content: 'Hello Bonette! Sending love from home. Papa and Mama send their blessings!',
    timestamp: 'Today, 10:05 AM',
    avatarColor: 'bg-rose-600'
  }
];
