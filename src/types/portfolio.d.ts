export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'mail' | 'phone';
}

export interface ProfileConfig {
  fullName: string;
  verifiedBadge: boolean;
  handle: string;
  role: string;
  degree: string;
  location: string;
  coordinates: string;
  avatarPath: string;
  resumePath: string;
  email: string;
  phone: string;
  statusText: string;
  isAvailable: boolean;
  socials: SocialLink[];
}

export interface HeroConfig {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string; isDownload?: boolean };
}

export interface DailyDriver {
  name: string;
  tag: string;
}

export interface ProjectDeepDive {
  problem: string;
  solution: string;
}

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoBadge: string;
  deepDive: ProjectDeepDive;
}

export interface ServiceItem {
  num: string;
  name: string;
  desc: string;
}

export interface CredentialItem {
  title: string;
  issuer: string;
  year: string;
  badge: string;
}

export interface FieldStat {
  metric: string;
  label: string;
}

export interface TelemetryConfig {
  initialVisits: number;
  depotName: string;
  colophonText: string;
}

export interface PortfolioConfig {
  profile: ProfileConfig;
  hero: HeroConfig;
  dailyDrivers: DailyDriver[];
  projects: ProjectItem[];
  services: ServiceItem[];
  credentials: CredentialItem[];
  fieldStats: FieldStat[];
  telemetry: TelemetryConfig;
}

export type SessionRole = 'operator' | 'authorized' | 'guest';

export interface RegisteredAccount {
  username: string;
  email: string;
  role: 'authorized';
  createdAt: string;
}

export interface AuthSession {
  role: SessionRole;
  username?: string;
  email?: string;
  loginTime: string;
}

export type EmailSource = 'registration_otp' | 'ai_chat_inquiry' | 'contact_form' | 'terminal';

export interface CapturedEmail {
  id: string;
  email: string;
  name?: string;
  source: EmailSource;
  message?: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'contacted';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  followUp?: string[];
}


