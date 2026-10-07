import { Service, ScheduleItem, PricingPlan, Testimonial } from './types';

export const GYM_CONTACT = {
  name: "Flex It Gym",
  phone: "+91 80 4321 8899",
  alternativePhone: "+91 98860 12345",
  email: "info@flexitgym.in",
  address: "No. 42, 1st Floor, 50 Feet Road, Hanumanthnagar, Banashankari 1st Stage, Bangalore - 560019",
  landmark: "Opposite Hanumanthnagar Public Park, near Harihara Gudda",
  timings: "Monday - Saturday: 5:00 AM - 10:00 PM | Sunday: 6:00 AM - 12:00 PM"
};

export const SERVICES: Service[] = [
  {
    id: "hiit",
    name: "HIIT Exercises Classes",
    description: "High-Intensity Interval Training designed to spike your metabolism, burn fat fast, and build cardiovascular endurance using rapid bursts of peak effort.",
    benefits: ["Extreme calorie burn, up to 24h afterburn", "Boosts aerobic and anaerobic fitness", "No equipment needed - client weight power"],
    duration: "45 Mins",
    intensity: "Advanced",
    icon: "Zap",
    spotsLeft: 8
  },
  {
    id: "crossfit",
    name: "CrossFit Power",
    description: "Elite level functional training blending weightlifting, gymnastics, and high-intensity athletics to create ultimate full-body fitness.",
    benefits: ["Builds raw muscle power", "Dynamic community-driven workout culture", "Improves balance, agility, and stamina"],
    duration: "60 Mins",
    intensity: "Advanced",
    icon: "Flame",
    spotsLeft: 5
  },
  {
    id: "weight_training",
    name: "Weight & Strength Training",
    description: "Sculpt and fortify your body. Access premium free-weights, Olympic isolation racks, and professional selectorized machinery under guided coach expertise.",
    benefits: ["Stimulates targeted skeletal muscle hypertrophy", "Increases bone density and posture strength", "Individual custom hypertrophy plans"],
    duration: "60 Mins",
    intensity: "All Levels",
    icon: "Dumbbell",
    spotsLeft: 12
  },
  {
    id: "personal_training",
    name: "1-on-1 Personal Training",
    description: "Work exclusively with certified high-tier master physical coaches to map workouts, tracking form discipline, nutrition, and lifestyle execution.",
    benefits: ["Laser-targeted program tailored to genetic goals", "Accelerated safety, injury recovery, and execution", "Unwavering coaching accountability"],
    duration: "60 Mins",
    intensity: "All Levels",
    icon: "UserCheck",
    spotsLeft: 4
  },
  {
    id: "aerobics",
    name: "Aerobics & Rhythm Workout",
    description: "Energetic group workouts combining rhythmic choreography with aerobic step training to maximize heart health and positive muscle toning.",
    benefits: ["Incredibly fun group dancing style", "Improves rhythm, mental release, and flexibility", "High steady-state fat-burning workout"],
    duration: "50 Mins",
    intensity: "Beginner",
    icon: "Sparkles",
    spotsLeft: 15
  },
  {
    id: "yoga",
    name: "Yoga & Vinyasa Flow",
    description: "Unite physical strength with spiritual calm. Focus on classic asanas, deep flexibility extension, structural alignment, and stress-release breathwork.",
    benefits: ["Reduces cortisol and mental stress", "Deepens core stability and joint range", "Enhanced mind-muscle sensory connection"],
    duration: "60 Mins",
    intensity: "All Levels",
    icon: "Compass",
    spotsLeft: 10
  },
  {
    id: "cycling",
    name: "Spin & Cycling Studio",
    description: "Immersive indoor cycling sessions in our high-energy soundproof studio with custom light arrays and simulated uphill/sprint visualizer profiles.",
    benefits: ["High-octane leg muscle defining engine", "Zero joint impact, high cardio performance", "Enthusiastic team sprint competitions"],
    duration: "45 Mins",
    intensity: "Intermediate",
    icon: "Bike",
    spotsLeft: 7
  },
  {
    id: "nutrition_consulting",
    name: "Nutrition & Diet Consulting",
    description: "Tailor-made macro-nutrient targets and real meal planning designed for Bangalore lifestyle habits (vegetarian, non-vegetarian, energy-packed).",
    benefits: ["Clear science-based guidance without gimmick diets", "Custom charts matching home cooking methods", "Weekly progress updates and body fat scans"],
    duration: "30 Mins",
    intensity: "Beginner",
    icon: "Apple",
    spotsLeft: 6
  }
];

export const SCHEDULES: ScheduleItem[] = [
  // Monday
  { id: "mon-1", className: "HIIT Blast", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Monday", time: "06:00 AM - 06:45 AM", spotsAvailable: 8, room: "Studio A" },
  { id: "mon-2", className: "Olympic Lifters", serviceId: "weight_training", instructor: "Coach Harish M.", day: "Monday", time: "07:30 AM - 08:30 AM", spotsAvailable: 12, room: "Main Floor" },
  { id: "mon-3", className: "CrossFit WOD", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Monday", time: "09:00 AM - 10:00 AM", spotsAvailable: 5, room: "Rigs Corner" },
  { id: "mon-4", className: "Spin Sprints", serviceId: "cycling", instructor: "Coach Shwetha P.", day: "Monday", time: "06:30 PM - 07:15 PM", spotsAvailable: 7, room: "Spin Zone" },
  { id: "mon-5", className: "Aerobic Rhythm", serviceId: "aerobics", instructor: "Coach Preethi R.", day: "Monday", time: "07:30 PM - 08:20 PM", spotsAvailable: 15, room: "Studio B" },

  // Tuesday
  { id: "tue-1", className: "Vinyasa Flow Yoga", serviceId: "yoga", instructor: "Achar Anjali", day: "Tuesday", time: "06:30 AM - 07:30 AM", spotsAvailable: 10, room: "Zen Studio" },
  { id: "tue-2", className: "HIIT Melt", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Tuesday", time: "08:00 AM - 08:45 AM", spotsAvailable: 10, room: "Studio A" },
  { id: "tue-3", className: "Advanced CrossFit", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Tuesday", time: "11:00 AM - 12:00 PM", spotsAvailable: 4, room: "Rigs Corner" },
  { id: "tue-4", className: "Strength Conditioning", serviceId: "weight_training", instructor: "Coach Harish M.", day: "Tuesday", time: "06:00 PM - 07:00 PM", spotsAvailable: 14, room: "Main Floor" },
  { id: "tue-5", className: "Cycling Climb", serviceId: "cycling", instructor: "Coach Shwetha P.", day: "Tuesday", time: "07:15 PM - 08:00 PM", spotsAvailable: 9, room: "Spin Zone" },

  // Wednesday
  { id: "wed-1", className: "CrossFit Core", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Wednesday", time: "06:00 AM - 07:00 AM", spotsAvailable: 6, room: "Rigs Corner" },
  { id: "wed-2", className: "Aerobic Steps", serviceId: "aerobics", instructor: "Coach Preethi R.", day: "Wednesday", time: "08:00 AM - 08:50 AM", spotsAvailable: 12, room: "Studio B" },
  { id: "wed-3", className: "Hypertrophy Session", serviceId: "weight_training", instructor: "Coach Harish M.", day: "Wednesday", time: "05:00 PM - 06:00 PM", spotsAvailable: 10, room: "Main Floor" },
  { id: "wed-4", className: "HIIT Burnout", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Wednesday", time: "06:30 PM - 07:15 PM", spotsAvailable: 6, room: "Studio A" },
  { id: "wed-5", className: "Mindful Meditation Yoga", serviceId: "yoga", instructor: "Achar Anjali", day: "Wednesday", time: "07:30 PM - 08:30 PM", spotsAvailable: 11, room: "Zen Studio" },

  // Thursday
  { id: "thu-1", className: "Power Spin", serviceId: "cycling", instructor: "Coach Shwetha P.", day: "Thursday", time: "06:00 AM - 06:45 AM", spotsAvailable: 8, room: "Spin Zone" },
  { id: "thu-2", className: "Yoga Recovery", serviceId: "yoga", instructor: "Achar Anjali", day: "Thursday", time: "07:30 AM - 08:30 AM", spotsAvailable: 15, room: "Zen Studio" },
  { id: "thu-3", className: "WOD Strength", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Thursday", time: "09:00 AM - 10:00 AM", spotsAvailable: 7, room: "Rigs Corner" },
  { id: "thu-4", className: "Aerobic Fit Dance", serviceId: "aerobics", instructor: "Coach Preethi R.", day: "Thursday", time: "06:00 PM - 06:50 PM", spotsAvailable: 14, room: "Studio B" },
  { id: "thu-5", className: "HIIT Cardio", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Thursday", time: "07:00 PM - 07:45 PM", spotsAvailable: 8, room: "Studio A" },

  // Friday
  { id: "fri-1", className: "Ashtanga Intro", serviceId: "yoga", instructor: "Achar Anjali", day: "Friday", time: "06:30 AM - 07:30 AM", spotsAvailable: 12, room: "Zen Studio" },
  { id: "fri-2", className: "HIIT Metabolic", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Friday", time: "08:00 AM - 08:45 AM", spotsAvailable: 9, room: "Studio A" },
  { id: "fri-3", className: "Powerlifting Basic", serviceId: "weight_training", instructor: "Coach Harish M.", day: "Friday", time: "05:30 PM - 06:30 PM", spotsAvailable: 10, room: "Main Floor" },
  { id: "fri-4", className: "CrossFit Team Challenge", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Friday", time: "06:45 PM - 07:45 PM", spotsAvailable: 5, room: "Rigs Corner" },
  { id: "fri-5", className: "Cycling Burner", serviceId: "cycling", instructor: "Coach Shwetha P.", day: "Friday", time: "08:00 PM - 08:45 PM", spotsAvailable: 6, room: "Spin Zone" },

  // Saturday
  { id: "sat-1", className: "Weekend Warrior CrossFit", serviceId: "crossfit", instructor: "Coach Sunil S.", day: "Saturday", time: "07:00 AM - 08:00 AM", spotsAvailable: 4, room: "Rigs Corner" },
  { id: "sat-2", className: "Weekend HIIT Blast", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Saturday", time: "08:30 AM - 09:15 AM", spotsAvailable: 7, room: "Studio A" },
  { id: "sat-3", className: "Power Lift Battle", serviceId: "weight_training", instructor: "Coach Harish M.", day: "Saturday", time: "10:00 AM - 11:30 AM", spotsAvailable: 8, room: "Main Floor" },
  { id: "sat-4", className: "Combined Aerobics Studio", serviceId: "aerobics", instructor: "Coach Preethi R.", day: "Saturday", time: "04:00 PM - 05:00 PM", spotsAvailable: 16, room: "Studio B" },
  { id: "sat-5", className: "Sunset Yoga Nidra", serviceId: "yoga", instructor: "Achar Anjali", day: "Saturday", time: "05:30 PM - 06:30 PM", spotsAvailable: 14, room: "Zen Studio" },

  // Sunday
  { id: "sun-1", className: "Morning Glory Spin", serviceId: "cycling", instructor: "Coach Shwetha P.", day: "Sunday", time: "07:00 AM - 07:45 AM", spotsAvailable: 10, room: "Spin Zone" },
  { id: "sun-2", className: "Community Yoga Alignment", serviceId: "yoga", instructor: "Achar Anjali", day: "Sunday", time: "08:15 AM - 09:30 AM", spotsAvailable: 25, room: "Zen Studio" },
  { id: "sun-3", className: "Super HIIT Sunday", serviceId: "hiit", instructor: "Coach Rahul K.", day: "Sunday", time: "10:00 AM - 10:45 AM", spotsAvailable: 12, room: "Studio A" }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan-starter",
    name: "Classic Entry",
    slug: "starter",
    price: 1499,
    period: "Month",
    tagline: "Perfect for starting weight training & classic general cardio access",
    features: [
      "Access to premium gyms floor & free-weights",
      "Full locker room and shower access",
      "General trainer workout floor advice",
      "Included: 2 monthly group sessions (Cycling/Yoga)",
      "WIFI, drinking water refills"
    ]
  },
  {
    id: "plan-pro",
    name: "Pro Performance",
    slug: "pro",
    price: 3499,
    period: "Quarterly",
    tagline: "Our most popular value package for active fitness goals",
    features: [
      "UNLIMITED access to all group classes (HIIT, Aerobics, Cycling)",
      "Access to CrossFit zones and standard resistance area",
      "1 initial body fat composition scan & trainer alignment",
      "Access code for off-peak reservation discounts",
      "Steam bath & Sauna access (twice per month)",
      "Custom workout tracker book"
    ],
    isPopular: true
  },
  {
    id: "plan-elite",
    name: "Flex It Unlimited",
    slug: "elite",
    price: 9999,
    period: "Annual",
    tagline: "The absolute premium ultimate year-long absolute fitness pass",
    features: [
      "365 Days UNLIMITED gym and CrossFit area rights",
      "Guaranteed priority entry into all dynamic class styles",
      "6 fully personal trainer workouts (1-on-1 coaching)",
      "Monthly detailed body scan + expert nutrition review",
      "Dedicated personal permanent VIP locker allocation",
      "Unlimited premium stream and massage room access",
      "Free Flex It gym designer shaker & stringer tank"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Anand Gowda",
    location: "Hanumanthnagar, Bangalore",
    rating: 5,
    comment: "The HIIT and CrossFit sessions here at Flex It are absolutely insane. Clean environment, and Coach Rahul really pays attention to your posture. Best decision to join!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces&q=80"
  },
  {
    id: "review-3",
    name: "Priya Murthy",
    location: "Banashankari, Bangalore",
    rating: 5,
    comment: "Flex It is very energetic. Yellow-white branding makes you feel alert instantly when walking in. The yoga classes are serene and the instructors are deeply knowledgeable.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces&q=80"
  },
  {
    id: "review-2",
    name: "Vikram Sen",
    location: "Srinagar near Hanumanthnagar",
    rating: 5,
    comment: "Excellent weight training arrays. Uncongested space and state-of-the-art weights. Nutrition consulting helped me drop 8 kgs in 3 months safely. Bold recommendation!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&q=80"
  }
];
