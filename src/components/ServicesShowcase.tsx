import { useState } from 'react';
import { SERVICES } from '../data';
import { Zap, Flame, Dumbbell, UserCheck, Sparkles, Compass, Bike, Apple, ChevronRight } from 'lucide-react';

interface ServicesShowcaseProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesShowcase({ onSelectService }: ServicesShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    const iconProps = { className: "h-6 w-6 text-zinc-950 font-bold" };
    switch (iconName) {
      case 'Zap': return <Zap {...iconProps} />;
      case 'Flame': return <Flame {...iconProps} />;
      case 'Dumbbell': return <Dumbbell {...iconProps} />;
      case 'UserCheck': return <UserCheck {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Compass': return <Compass {...iconProps} />;
      case 'Bike': return <Bike {...iconProps} />;
      case 'Apple': return <Apple {...iconProps} />;
      default: return <Dumbbell {...iconProps} />;
    }
  };

  return (
    <div className="space-y-10 font-sans">
      <div className="text-center">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
          Supercharged Training Systems
        </span>
        <h3 className="font-display text-4xl font-extrabold text-black uppercase tracking-tight mt-3">
          Our Specialised <span className="text-yellow-500">Services</span>
        </h3>
        <p className="text-sm text-zinc-600 mt-2 max-w-xl mx-auto">
          From high-energy cycling to quiet alignment yoga, we provide tailored fitness avenues explicitly directed by certified Bangalore master coaches.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(service => {
          const isHovered = hoveredId === service.id;
          return (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group rounded-3xl border border-zinc-200 bg-white p-5 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Yellow and White header pairing with custom dynamic icon wrapper */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-2xl bg-yellow-400 p-3 shadow-md shadow-yellow-400/15 group-hover:scale-110 transition duration-300">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase bg-zinc-50 px-2 py-1 rounded">
                    {service.duration}
                  </span>
                </div>

                <h4 className="font-display text-lg font-black tracking-tight text-zinc-950 uppercase group-hover:text-yellow-600 transition-colors">
                  {service.name}
                </h4>

                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits mini list */}
                <div className="mt-4 border-t border-zinc-100 pt-3 space-y-1.5">
                  <span className="text-[9px] font-extrabold uppercase text-zinc-400 tracking-wider block mb-1">Key Outcomes</span>
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-1.5 items-start text-[11px] text-zinc-600">
                      <span className="h-1 w-1 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intensity block and Bold Red Button footer */}
              <div className="mt-6 border-t border-zinc-100 pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Trainer Level</span>
                  <span className="text-[11px] font-bold text-zinc-800">{service.intensity}</span>
                </div>

                <button
                  id={`claim-${service.id}-btn`}
                  onClick={() => onSelectService(service.id)}
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-[10px] uppercase tracking-wider px-3 px-4 py-2.5 rounded-xl transition duration-200 flex items-center gap-0.5 shadow hover:shadow-md cursor-pointer"
                >
                  Book Session <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
