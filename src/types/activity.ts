export type ActivityCategory = 
  | "contest" 
  | "activity" 
  | "internship" 
  | "certificate" 
  | "hackathon" 
  | "assignment" 
  | "interview" 
  | "etc";

export type ActivityStatus = 
  | "interested" 
  | "preparing" 
  | "submitted" 
  | "document_passed" 
  | "interview_scheduled" 
  | "accepted" 
  | "rejected";

export interface DocumentItem {
  id: string;
  title: string;
  checked: boolean;
}

export interface QuestionItem {
  id: string;
  title: string;
  answer?: string;
}

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  status: ActivityStatus;
  deadline: string; // ISO format: YYYY-MM-DD
  link?: string;
  documents: DocumentItem[];
  questions: QuestionItem[];
  memo?: string;
  createdAt: string;
  updatedAt: string;
}
