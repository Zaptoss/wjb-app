export interface Offer {
  id: string;
  name: string;
  tagline: string;
  category: string;
}

export const OFFERS: Offer[] = [
  { id: 'offer_1', name: 'Weight Loss Starter', category: 'weight', tagline: '4-week home plan' },
  { id: 'offer_2', name: 'Lean Strength Builder', category: 'strength', tagline: 'Gym progression program' },
  { id: 'offer_3', name: 'Low-Impact Fat Burn', category: 'joint', tagline: 'Knee & back friendly' },
  { id: 'offer_4', name: 'Run Your First 5K', category: 'cardio', tagline: 'Outdoor running plan' },
  { id: 'offer_5', name: 'Yoga & Mobility', category: 'yoga', tagline: 'Flexibility + posture' },
  { id: 'offer_6', name: 'Stress Reset Program', category: 'stress', tagline: 'Breathing & mindfulness' },
  { id: 'offer_7', name: 'Quick Fit Micro-Workouts', category: 'micro', tagline: '10-15 min daily' },
];
