export interface TimeSlot {
  time: string;
  period: "morning" | "evening" | "night";
  note?: string;
}

export interface ScheduleDay {
  label: string;
  slots: readonly TimeSlot[];
}

export interface Professor {
  name: string;
  schedule: string;
}

export interface Service {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export interface PricePlan {
  price: string;
  period: string;
  highlighted?: boolean;
  badge?: string;
  description?: string;
}

export interface TkdGroup {
  days: string;
  group: string;
}

export interface ComingSoonItem {
  name: string;
  emoji: string;
}

export interface NavSection {
  id: string;
  label: string;
}
