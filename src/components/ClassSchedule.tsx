import { useState } from 'react';
import { SCHEDULES, SERVICES } from '../data';
import { Calendar, Users, MapPin, User, ChevronRight, Filter } from 'lucide-react';

interface ClassScheduleProps {
  onSelectClass: (serviceId: string) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export default function ClassSchedule({ onSelectClass }: ClassScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<typeof DAYS[number]>('Monday');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter schedule items based on selections
  const filteredSchedule = SCHEDULES.filter(item => {
    const matchesDay = item.day === selectedDay;
    const matchesCategory = selectedCategory === 'all' || item.serviceId === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const getServiceColorTag = (serviceId: string) => {
    switch (serviceId) {
      case 'hiit': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'crossfit': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'weight_training': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'personal_training': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'aerobics': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'yoga': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'cycling': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-display text-2xl font-black text-black uppercase tracking-tight">
            Weekly Class <span className="text-yellow-500">Schedules</span>
          </h3>
          <p className="text-sm text-zinc-600 mt-0.5">
            Filter classes by day or fitness category. Book directly to reserve your trial spot in Hanumanthnagar.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 self-start md:self-auto max-w-full">
          <span className="text-xs font-bold text-zinc-500 flex items-center gap-1 mr-1 shrink-0 bg-zinc-100 px-2 py-1 rounded">
            <Filter className="h-3 w-3" /> Filter
          </span>
          <button
            id="cat-filter-all"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer shrink-0 ${
              selectedCategory === 'all' 
                ? 'bg-black text-white' 
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            All Classes
          </button>
          {SERVICES.map(service => (
            <button
              key={service.id}
              id={`cat-filter-${service.id}`}
              onClick={() => setSelectedCategory(service.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer shrink-0 ${
                selectedCategory === service.id 
                  ? 'bg-black text-yellow-500 font-bold border-2 border-yellow-400' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {service.name.split(' ')[0]} {/* shortened display name */}
            </button>
          ))}
        </div>
      </div>

      {/* Week Day Selector Tabs - high premium touch */}
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 border-b border-zinc-200 pb-3">
        {DAYS.map(day => (
          <button
            key={day}
            id={`day-tab-${day.toLowerCase()}`}
            onClick={() => setSelectedDay(day)}
            className={`rounded-xl py-3.5 text-xs font-bold tracking-tight uppercase transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedDay === day
                ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20 outline-none scale-[1.03]'
                : 'bg-white text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800'
            }`}
          >
            <span>{day.substring(0, 3)}</span>
            <span className="text-[10px] opacity-75 hidden sm:inline">Active</span>
          </button>
        ))}
      </div>

      {/* Schedule Grid List */}
      <div className="space-y-3 min-h-[220px]">
        {filteredSchedule.length === 0 ? (
          <div id="no-classes-placeholder" className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 py-12 text-center text-zinc-500">
            <Calendar className="mx-auto h-8 w-8 text-zinc-300 mb-2" />
            <p className="font-semibold text-zinc-700">No scheduled classes found</p>
            <p className="text-xs text-zinc-400 mt-0.5">Try changing the category filter above or view another day.</p>
          </div>
        ) : (
          filteredSchedule.map(item => {
            const relativeService = SERVICES.find(s => s.id === item.serviceId);
            return (
              <div
                key={item.id}
                id={`schedule-card-${item.id}`}
                className="group rounded-2xl border border-zinc-200/80 bg-white p-5 hover:bg-zinc-50/50 hover:border-yellow-400/50 transition-all shadow-sm flex flex-col justify-between md:flex-row md:items-center gap-4"
              >
                {/* Time slot and room */}
                <div className="flex gap-4 items-center">
                  <div className="rounded-xl bg-zinc-900 px-4 py-3.5 text-center text-white shrink-0">
                    <div className="font-display text-xs font-black uppercase text-yellow-400">Class Time</div>
                    <div className="font-mono text-sm font-semibold tracking-tight mt-1">{item.time.replace(/ - .*/, '')}</div>
                    <div className="text-[9px] text-zinc-500 font-mono mt-0.5">{item.time.replace(/.* - /, '')}</div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display font-black text-lg text-zinc-950 group-hover:text-yellow-600 transition-colors">
                        {item.className}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border lowercase ${getServiceColorTag(item.serviceId)}`}>
                        {relativeService?.name || 'Class'}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-zinc-400" />
                        Instructed by: <strong className="text-zinc-700 font-medium">{item.instructor}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                        Room: <strong className="text-zinc-700 font-medium">{item.room}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Counter & Bold Red CTA Booking Button */}
                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 md:pt-0 md:border-0 md:justify-end gap-5">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Trial Spaces Left</span>
                    <span className="text-sm font-bold text-zinc-800 flex items-center justify-start md:justify-end gap-1">
                      <Users className="h-3.5 w-3.5 text-zinc-400" />
                      {item.spotsAvailable} / 20 spots
                    </span>
                  </div>

                  <button
                    id={`book-class-btn-${item.id}`}
                    onClick={() => onSelectClass(item.serviceId)}
                    className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-[11px] uppercase tracking-wider px-5 py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg hover:shadow-red-600/15 flex items-center gap-1 cursor-pointer"
                  >
                    Reserve Spot <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
