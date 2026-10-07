export interface Service {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  duration: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  icon: string;
  spotsLeft: number;
}

export interface ScheduleItem {
  id: string;
  className: string;
  serviceId: string;
  instructor: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string; // e.g., "06:00 AM - 07:00 AM"
  spotsAvailable: number;
  room: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  slug: string;
  price: number;
  period: string; // e.g., "month", "quarter", "year"
  tagline: string;
  features: string[];
  isPopular?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  selectedPlan: string;
  preferredService: string;
  preferredTime: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Archived';
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
}
