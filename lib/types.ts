// User Types
export interface User {
  userId: string;
  farcasterId: string;
  createdAt: Date;
}

// Cycle Entry Types
export interface CycleEntry {
  entryId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
  predictedEndDate?: Date;
  cycleLength?: number;
  periodLength?: number;
}

// Symptom Log Types
export interface SymptomLog {
  logId: string;
  userId: string;
  date: Date;
  mood: MoodType;
  energy: EnergyType;
  physicalSymptoms: PhysicalSymptom[];
}

export type MoodType = 'happy' | 'sad' | 'anxious' | 'irritable' | 'calm' | 'emotional';
export type EnergyType = 'high' | 'medium' | 'low' | 'exhausted';
export type PhysicalSymptom = 'cramps' | 'bloating' | 'headache' | 'breast_tenderness' | 'acne' | 'back_pain' | 'nausea';

// Forum Types
export interface ForumPost {
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  anonymous: boolean;
  replies?: ForumComment[];
}

export interface ForumComment {
  commentId: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  anonymous: boolean;
}

// Content Types
export interface ContentSnippet {
  id: string;
  title: string;
  content: string;
  category: 'nutrition' | 'exercise' | 'wellness' | 'education';
  cyclePhase: CyclePhase;
  isPremium: boolean;
}

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

// Calendar Types
export interface CalendarDay {
  date: Date;
  isPeriod: boolean;
  isFertile: boolean;
  isPredicted: boolean;
  symptoms?: SymptomLog;
}

// Component Props Types
export interface CycleInputFormProps {
  onSubmit: (startDate: Date, endDate?: Date) => void;
  isLoading?: boolean;
}

export interface SymptomLoggerProps {
  date: Date;
  onSubmit: (symptoms: Omit<SymptomLog, 'logId' | 'userId'>) => void;
  isLoading?: boolean;
}

export interface CalendarViewProps {
  entries: CycleEntry[];
  symptoms: SymptomLog[];
  onDateSelect: (date: Date) => void;
  selectedDate?: Date;
}

export interface ForumFeedProps {
  posts: ForumPost[];
  onNewPost: (content: string) => void;
  onReply: (postId: string, content: string) => void;
  isLoading?: boolean;
}
