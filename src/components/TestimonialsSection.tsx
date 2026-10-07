import { TESTIMONIALS } from '../data';
import { Star, Quote, ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  onCtaclick: () => void;
}

export default function TestimonialsSection({ onCtaclick }: TestimonialsSectionProps) {
  return (
    <div className="space-y-10 font-sans">
      <div className="text-center">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
          Real Banashankari Success Cases
        </span>
        <h3 className="font-display text-4xl font-extrabold text-black uppercase tracking-tight mt-3">
          Why Members <span className="text-yellow-500">Love Us</span>
        </h3>
        <p className="text-sm text-zinc-600 mt-2 max-w-xl mx-auto">
          Read genuine reviews from local trainees who converted their energy and physical posture with us at Hanumanthnagar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((review) => (
          <div
            key={review.id}
            id={`testimonial-card-${review.id}`}
            className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
          >
            {/* Quote Icon watermark */}
            <div className="absolute right-6 top-6 text-zinc-100 group-hover:text-yellow-400/10 transition-colors pointer-events-none">
              <Quote className="h-10 w-10 fill-current" />
            </div>

            <div className="relative z-10 space-y-4">
              {/* Star assessment indicators */}
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-xs text-zinc-700 italic leading-relaxed">
                "{review.comment}"
              </p>
            </div>

            {/* Author Profile Details */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover border border-zinc-200"
              />
              <div>
                <h5 className="font-bold text-xs text-zinc-950 font-display uppercase tracking-tight">
                  {review.name}
                </h5>
                <span className="text-[10px] font-medium text-zinc-400">
                  {review.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded lead generation booster section */}
      <div className="rounded-3xl bg-zinc-50 border border-zinc-200/80 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1 z-10 max-w-xl">
          <h4 className="font-display text-lg font-black text-zinc-950 uppercase">
            Start Your Own Transformation story
          </h4>
          <p className="text-xs text-zinc-500">
            Pick a spot, fill our quick trial voucher, and experience Flex It Gym completely free of charge for 1 day.
          </p>
        </div>

        {/* bold red button */}
        <button
          id="testimonials-red-btn"
          onClick={onCtaclick}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition duration-200 shrink-0 shadow shadow-red-600/15 flex items-center justify-center gap-1 cursor-pointer"
        >
          Instant Free Registration <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
