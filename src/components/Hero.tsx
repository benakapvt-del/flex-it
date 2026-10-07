import { Dumbbell, MapPin, Award, ArrowRight } from 'lucide-react';

interface HeroProps {
  onCtaclick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onCtaclick, onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-zinc-950 px-6 py-20 text-white md:px-12 md:py-32 rounded-3xl border-2 border-zinc-900 shadow-xl">
      {/* High impact background visual - utilizing black overlay for absolute readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&h=1080&fit=crop&q=80"
          alt="Premium Gym Interior"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
        {/* Yellow ambient bubble glow */}
        <div className="absolute top-1/4 left-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        {/* Dynamic Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-extrabold text-zinc-950 uppercase tracking-widest shadow-md">
          <Award className="h-3.5 w-3.5 fill-zinc-950" /> Hanumanthnagar's Elite Fitness Hub
        </div>

        {/* Title utilizing Spaces Grotesk display headers */}
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white uppercase sm:text-6xl md:text-7xl">
          FLEX IT <span className="text-yellow-400 block sm:inline">GYM</span>
        </h1>

        <p className="mt-4 font-display text-lg font-bold tracking-wide uppercase text-zinc-300">
          POWERING BANASHANKARI & HANUMANTHNAGAR, BANGALORE
        </p>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
          Welcome to Bengaluru's high-octane powerhouse. Fully loaded with premium Olympic weights, dynamic CrossFit frames, custom cycling simulators, and premium steam baths. Fuel your body, hone your strength, and accelerate your results.
        </p>

        {/* Essential neighborhood location marker */}
        <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-bold text-yellow-400 font-mono">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> 50 Feet Road, Hanumanthnagar (Near Public Park)
          </span>
          <span className="text-zinc-500 hidden md:inline">|</span>
          <span className="flex items-center gap-1.5 text-white">
            <Dumbbell className="h-4 w-4 text-yellow-400" /> Over 12,000 sq.ft of pure power
          </span>
        </div>

        {/* CTAs using interactive bold red colour for Buttons as requested */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            id="hero-red-cta-pass"
            onClick={onCtaclick}
            className="group bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition duration-200 shadow-xl shadow-red-600/35 flex items-center justify-center gap-2 cursor-pointer"
          >
            Claim Free Trial Pass <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-outline-cta-schedule"
            onClick={onExploreClick}
            className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-display font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            View Live Schedules
          </button>
        </div>
      </div>

      {/* Trust elements on the bottom grid */}
      <div className="mt-14 relative z-10 grid grid-cols-2 gap-4 border-t border-zinc-900 pt-8 sm:grid-cols-4">
        <div>
          <span className="block font-display text-2xl font-black text-yellow-400 sm:text-3xl">5:00 AM</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mt-0.5">Early Opening</span>
        </div>
        <div>
          <span className="block font-display text-2xl font-black text-white sm:text-3xl">8+ Coach</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mt-0.5">Master Trainers</span>
        </div>
        <div>
          <span className="block font-display text-2xl font-black text-yellow-400 sm:text-3xl">98% Fit</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mt-0.5">Success Rating</span>
        </div>
        <div>
          <span className="block font-display text-2xl font-black text-white sm:text-3xl">Lockers</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold block mt-0.5">VIP Steam Facility</span>
        </div>
      </div>
    </div>
  );
}
