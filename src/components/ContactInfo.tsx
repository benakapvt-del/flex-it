import { GYM_CONTACT } from '../data';
import { Phone, Mail, Clock, MapPin, Compass, ShieldAlert, Award } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div id="contact-info-section" className="scroll-mt-24 font-sans">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
              Reach Out Directly
            </span>
            <h3 className="font-display text-4xl font-extrabold text-black uppercase tracking-tight mt-3">
              Essential Contact <span className="text-yellow-500">Details</span>
            </h3>
            <p className="text-zinc-600 text-sm mt-2">
              Have burning questions about class timings or membership custom price packages? Pin our coordinates below or phone call our Hanumanthnagar support desk.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phone numbers */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4.5 flex items-start gap-4">
              <div className="rounded-xl bg-yellow-400 p-2.5 shrink-0 shadow-md shadow-yellow-400/10">
                <Phone className="h-5 w-5 text-zinc-950" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Call Gym Helpline (Instant response)</span>
                <a href={`tel:${GYM_CONTACT.phone.replace(/\s+/g, '')}`} className="text-zinc-950 font-bold hover:text-yellow-600 transition text-sm">
                  {GYM_CONTACT.phone}
                </a>
                <div className="text-xs text-zinc-500 mt-0.5">Alternative: <strong className="text-zinc-700">{GYM_CONTACT.alternativePhone}</strong></div>
              </div>
            </div>

            {/* Email Address */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4.5 flex items-start gap-4">
              <div className="rounded-xl bg-yellow-400 p-2.5 shrink-0 shadow-md shadow-yellow-400/10">
                <Mail className="h-5 w-5 text-zinc-950" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Send Electronic Mail</span>
                <a href={`mailto:${GYM_CONTACT.email}`} className="text-zinc-950 font-bold hover:text-yellow-600 transition text-sm font-mono">
                  {GYM_CONTACT.email}
                </a>
                <p className="text-[11px] text-zinc-500 mt-0.5">Corporate business & lead applications</p>
              </div>
            </div>

            {/* Working Timings */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-4.5 flex items-start gap-4">
              <div className="rounded-xl bg-yellow-400 p-2.5 shrink-0 shadow-md shadow-yellow-400/10">
                <Clock className="h-5 w-5 text-zinc-950" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Operational Timings</span>
                <span className="text-zinc-900 font-bold text-xs leading-snug block mt-1">
                  {GYM_CONTACT.timings.split('|')[0]}
                </span>
                <span className="text-zinc-600 text-[11px] font-medium">
                  {GYM_CONTACT.timings.split('|')[1]}
                </span>
              </div>
            </div>
          </div>

          {/* Local Landmark Advisory block */}
          <div className="rounded-2xl bg-zinc-950 p-5 text-white border border-zinc-900 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-4 translate-y-4">
              <Compass className="h-28 w-28 text-yellow-400" />
            </div>
            <div className="relative z-10 flex gap-3.5 items-start">
              <MapPin className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">Physical Coordinates</span>
                <p className="text-zinc-100 font-bold text-xs mt-1 leading-snug">
                  {GYM_CONTACT.address}
                </p>
                <p className="text-zinc-400 text-[11px] mt-1.5 leading-normal">
                  Our landmark: <strong className="text-yellow-400 font-semibold">{GYM_CONTACT.landmark}</strong>. Easily reachable from Hanumathanagar signal & Srinagar area.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Real Embedded Location Maps using Iframe inside high-quality device container */}
        <div className="lg:col-span-7 flex flex-col justify-stretch">
          <div className="rounded-3xl border-4 border-zinc-900 overflow-hidden shadow-lg bg-zinc-100 flex-1 min-h-[350px] relative group">
            {/* Real Interactive Map Frame targeting Hanumanthnagar Banashankari Bangalore */}
            <iframe
              title="Flex It Gym Hanumanthnagar Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer"
              src="https://maps.google.com/maps?q=Hanumanthnagar%20Public%20Park,%20Bangalore%20India&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300 absolute inset-0"
            />
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 justify-center text-[10px] text-zinc-500 font-bold font-mono">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-ping" />
            <span>Interactive Map - Zoom or drag to locate 50 Ft Road</span>
          </div>
        </div>

      </div>
    </div>
  );
}
