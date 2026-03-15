import type { SessionNode, OfferData } from '../types';

export const MOCK_NODES: SessionNode[] = [
  // 1. Single choice
  {
    id: 'q1-goal',
    type: 'question',
    questionType: 'single_choice',
    title: 'What brings you here?',
    description: 'Select your primary focus to personalize your daily wellness journey.',
    options: [
      { id: 'o1', label: 'Mindfulness & Calm', description: 'Reduce stress and stay present', value: 'mindfulness', displayOrder: 1 },
      { id: 'o2', label: 'Better Rest', description: 'Improve sleep quality and routine', value: 'sleep', displayOrder: 2 },
      { id: 'o3', label: 'Physical Vitality', description: 'Boost energy and move more', value: 'vitality', displayOrder: 3 },
      { id: 'o4', label: 'Weight Loss', description: 'Shed extra weight effectively', value: 'weight_loss', displayOrder: 4 },
      { id: 'o5', label: 'Build Strength', description: 'Get stronger and more toned', value: 'strength', displayOrder: 5 },
    ],
  },

  // 2. Single choice with image
  {
    id: 'q2-context',
    type: 'question',
    questionType: 'single_choice',
    title: 'Where do you prefer to work out?',
    description: 'We\'ll tailor exercises to your environment.',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    options: [
      { id: 'o6', label: 'At Home', description: 'No equipment needed', value: 'home', displayOrder: 1 },
      { id: 'o7', label: 'At the Gym', description: 'Full equipment access', value: 'gym', displayOrder: 2 },
      { id: 'o8', label: 'Outdoors', description: 'Parks, trails, fresh air', value: 'outdoor', displayOrder: 3 },
    ],
  },

  // 3. Info page
  {
    id: 'info-1',
    type: 'info_page',
    title: 'Great choice!',
    description: 'Based on thousands of users with similar goals, we\'ve seen an average 73% improvement in well-being within just 4 weeks. Let\'s fine-tune your plan with a few more questions.',
  },

  // 4. Multi choice
  {
    id: 'q3-barriers',
    type: 'question',
    questionType: 'multi_choice',
    title: 'What\'s been holding you back?',
    description: 'Select all that apply — no judgment here.',
    options: [
      { id: 'o9', label: 'Lack of time', description: 'Busy schedule', value: 'time', displayOrder: 1 },
      { id: 'o10', label: 'Low motivation', description: 'Hard to stay consistent', value: 'motivation', displayOrder: 2 },
      { id: 'o11', label: 'Stress & anxiety', description: 'Mental load is heavy', value: 'stress', displayOrder: 3 },
      { id: 'o12', label: 'Physical limitations', description: 'Injuries or constraints', value: 'physical', displayOrder: 4 },
      { id: 'o13', label: 'Don\'t know where to start', description: 'Need guidance', value: 'guidance', displayOrder: 5 },
    ],
  },

  // 5. Input (number)
  {
    id: 'q4-age',
    type: 'question',
    questionType: 'input',
    title: 'How old are you?',
    description: 'This helps us calibrate intensity and recovery recommendations.',
    inputType: 'number',
    inputPlaceholder: 'Enter your age',
  },

  // 6. Single choice
  {
    id: 'q5-level',
    type: 'question',
    questionType: 'single_choice',
    title: 'What\'s your fitness level?',
    description: 'Be honest — this is your starting point, not your limit.',
    options: [
      { id: 'o14', label: 'Beginner', description: 'Just getting started', value: 'beginner', displayOrder: 1 },
      { id: 'o15', label: 'Intermediate', description: 'Some experience', value: 'intermediate', displayOrder: 2 },
      { id: 'o16', label: 'Advanced', description: 'Regular training', value: 'advanced', displayOrder: 3 },
    ],
  },

  // 7. Single choice
  {
    id: 'q6-time',
    type: 'question',
    questionType: 'single_choice',
    title: 'How much time per day?',
    description: 'Even 10 minutes can make a difference.',
    options: [
      { id: 'o17', label: '10–15 minutes', description: 'Quick & focused', value: '10-15', displayOrder: 1 },
      { id: 'o18', label: '20–30 minutes', description: 'Balanced session', value: '20-30', displayOrder: 2 },
      { id: 'o19', label: '30+ minutes', description: 'Deep workout', value: '30+', displayOrder: 3 },
    ],
  },

  // 8. Info page with image
  {
    id: 'info-2',
    type: 'info_page',
    title: 'Almost there!',
    description: 'We\'re building your personalized plan right now. One last question to make it perfect.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
  },

  // 9. Single choice (stress level)
  {
    id: 'q7-stress',
    type: 'question',
    questionType: 'single_choice',
    title: 'How would you rate your stress level?',
    description: 'This helps us add the right mental wellness modules.',
    options: [
      { id: 'o20', label: 'Low', description: 'Life is pretty chill', value: 'low', displayOrder: 1 },
      { id: 'o21', label: 'Moderate', description: 'Some days are tough', value: 'moderate', displayOrder: 2 },
      { id: 'o22', label: 'High', description: 'Constantly overwhelmed', value: 'high', displayOrder: 3 },
    ],
  },

  // 10. Input (text)
  {
    id: 'q8-motivation',
    type: 'question',
    questionType: 'input',
    title: 'Why is now the right time?',
    description: 'A short answer helps us understand your motivation.',
    inputType: 'text',
    inputPlaceholder: 'e.g. I want to feel confident again',
  },
];

export const MOCK_OFFERS: OfferData[] = [
  {
    id: 'offer-1',
    name: 'Weight Loss Starter',
    description:
      'A 4-week home program designed for your schedule. Short, effective workouts combined with mindful stress management to help you lose weight sustainably.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    digitalPlan: '4-week home fat-burn program — 20–30 min sessions, 5 days/week with progressive overload and recovery days.',
    kit: {
      name: 'Home Fat-Burn Kit',
      description: 'Everything you need to get started at home.',
      items: [
        'Resistance Bands',
        'Jump Rope',
        'Shaker Bottle',
        'Electrolyte Pack',
        'Healthy Snack Box',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    },
    reason:
      'Based on your goal of weight loss at home with 20–30 min sessions, and considering your moderate stress level, we\'ve added stress-management micro-routines to your plan.',
    ctaLabel: 'Choose This Plan',
  },
  {
    id: 'offer-2',
    name: 'Lean Strength Builder',
    description:
      'A strength-focused path with simple weekly progression, mobility recovery, and higher-protein meal guidance to build lean muscle steadily.',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    digitalPlan: '6-week strength plan — 4 training days per week with guided progression, deload pacing, and recovery prompts.',
    kit: {
      name: 'Strength Support Kit',
      description: 'Helpful add-ons for stronger training sessions and easier recovery.',
      items: [
        'Mini Resistance Loop',
        'Grip Trainer',
        'Recovery Balm',
        'Protein Sample Pack',
        'Workout Journal',
      ],
      imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
    },
    reason:
      'Since you want visible progress and more structure, this option leans into consistency, measurable strength gains, and recovery support.',
    ctaLabel: 'Get This Offer',
  },
];
