import React, { useState, useEffect } from 'react';
import { SERVICES, PRICING_PLANS } from '../data';
import { Lead } from '../types';
import { Send, CheckCircle2, Trophy, Clock, PhoneCall, Sparkles } from 'lucide-react';

interface LeadFormProps {
  initialPlanSlug: string;
  initialServiceId: string;
  onLeadSubmitted: (lead: Lead) => void;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function LeadForm({ initialPlanSlug, initialServiceId, onLeadSubmitted, formRef }: LeadFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('starter');
  const [preferredService, setPreferredService] = useState('hiit');
  const [preferredTime, setPreferredTime] = useState('Morning (06:00 AM - 09:00 AM)');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync initial values when user clicks from other sections
  useEffect(() => {
    if (initialPlanSlug) {
      setSelectedPlan(initialPlanSlug);
    }
  }, [initialPlanSlug]);

  useEffect(() => {
    if (initialServiceId) {
      setPreferredService(initialServiceId);
    }
  }, [initialServiceId]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Full Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Valid 10-digit Indian phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Keep numbers and common symbols only
    setPhone(value.replace(/[^0-9+\s-]/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate real database delays
    setTimeout(() => {
      const newLead: Lead = {
        id: "lead-" + Date.now(),
        name,
        email,
        phone,
        selectedPlan,
        preferredService,
        preferredTime,
        status: 'New',
        createdAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      };

      onLeadSubmitted(newLead);
      setLoading(false);
      setSuccess(true);

      // Reset Form fields except selections to keep context nice
      setName('');
      setEmail('');
      setPhone('');
    }, 1200);
  };

  return (
    <div
      ref={formRef}
      id="signup-section"
      className="scroll-mt-24 rounded-3xl border-4 border-zinc-900 bg-black p-6 md:p-10 shadow-3xl text-white relative overflow-hidden"
    >
      {/* Visual Yellow accent background glows */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      {success ? (
        <div id="signup-success-view" className="flex flex-col items-center justify-center text-center py-12 relative z-10 animate-fade-in">
          <div className="mb-6 rounded-full bg-green-500/10 p-5 ring-8 ring-green-500/5">
            <CheckCircle2 className="h-16 w-16 text-green-400 animate-bounce" />
          </div>
          <h3 className="font-display text-4xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
            You're Signed Up!
          </h3>
          <p className="mt-3 max-w-md text-base text-zinc-300">
            Welcome to <strong className="text-yellow-400 font-semibold">Flex It Gym</strong>! Your free 1-Day VIP dynamic pass has been generated. 
          </p>
          <div className="mt-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 text-left text-xs max-w-sm w-full divide-y divide-zinc-800">
            <div className="pb-2.5 flex justify-between items-center">
              <span className="text-zinc-500">Selected Class Trial:</span>
              <span className="text-yellow-400 font-bold">{SERVICES.find(s => s.id === preferredService)?.name || preferredService}</span>
            </div>
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-zinc-500">Tier Selected:</span>
              <span className="text-white font-bold">{PRICING_PLANS.find(p => p.slug === selectedPlan || p.id === selectedPlan)?.name || selectedPlan}</span>
            </div>
            <div className="pt-2.5 flex justify-between items-center">
              <span className="text-zinc-500">Target Time Slot:</span>
              <span className="text-zinc-300 font-medium">{preferredTime}</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            Our head fitness coordinator in Hanumanthnagar, Banashankari will phone call you within 15 minutes to schedule your session.
          </p>
          <button
            id="register-another-btn"
            onClick={() => setSuccess(false)}
            className="mt-6 font-display font-black text-xs uppercase tracking-wider text-yellow-400 border border-yellow-400/20 px-5 py-2.5 rounded-full hover:bg-yellow-400/10 hover:border-yellow-400/40 transition"
          >
            Register Another Person
          </button>
        </div>
      ) : (
        <div className="relative z-10">
          <div className="mb-8 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/15 border border-yellow-400/30 px-3.5 py-1 text-xs font-semibold text-yellow-400 mb-3">
              <Trophy className="h-3.5 w-3.5" /> Book Free 1-Day Trial Passes
            </div>
            <h3 className="font-display text-3xl font-black tracking-tight text-white uppercase md:text-4xl">
              Claim Your Free Workout <span className="text-yellow-400">Pass</span>
            </h3>
            <p className="mt-2 text-sm text-zinc-300 max-w-lg">
              Unlock access to HIIT, cycling, weights, and CrossFit in Hanumanthnagar, Banashankari. Zero risk. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Quick Contact Inputs */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-name-input"
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full rounded-xl border-2 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-zinc-800'
                  }`}
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-600 font-bold border-r border-zinc-800 pr-2">+91</span>
                  <input
                    id="signup-phone-input"
                    type="tel"
                    placeholder="98765 43210"
                    maxLength={14}
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full rounded-xl border-2 bg-zinc-950 pl-16 pr-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-zinc-800'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-email-input"
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border-2 bg-zinc-950 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-zinc-800'
                  }`}
                />
                {errors.email && <p className="text-red-400 text-[11px] mt-1 font-medium">{errors.email}</p>}
              </div>
            </div>

            {/* Interest Selections */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Preferred Service / Class
                </label>
                <select
                  id="signup-service-select"
                  value={preferredService}
                  onChange={(e) => setPreferredService(e.target.value)}
                  className="w-full rounded-xl border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id} className="bg-zinc-950 text-white">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Target Membership Tier
                </label>
                <select
                  id="signup-plan-select"
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full rounded-xl border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                >
                  {PRICING_PLANS.map(p => (
                    <option key={p.slug} value={p.slug} className="bg-zinc-950 text-white">
                      {p.name} ({p.period})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-1.5">
                  Preferred timing frame
                </label>
                <select
                  id="signup-timing-select"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full rounded-xl border-2 border-zinc-800 bg-zinc-950 px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
                >
                  <option value="Early Morning (05:00 AM - 07:00 AM)" className="bg-zinc-950 text-white">Early Morning (05:00 AM - 07:00 AM)</option>
                  <option value="Morning (07:00 AM - 10:00 AM)" className="bg-zinc-950 text-white">Morning (07:00 AM - 10:00 AM)</option>
                  <option value="Noon / Offline (11:00 AM - 03:00 PM)" className="bg-zinc-950 text-white">Noon / Offline (11:00 AM - 03:00 PM)</option>
                  <option value="Evening Rush (05:00 PM - 08:00 PM)" className="bg-zinc-950 text-white">Evening Rush (05:00 PM - 08:00 PM)</option>
                  <option value="Late Night (08:00 PM - 10:00 PM)" className="bg-zinc-950 text-white">Late Night (08:00 PM - 10:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Red Lead General CTA Button as requested */}
            <div className="pt-3">
              <button
                id="submit-signup-btn"
                type="submit"
                disabled={loading}
                className="w-full relative overflow-hidden bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-sm uppercase tracking-widest py-4.5 rounded-xl transition duration-200 shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating Free Pass...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Start Your Transformations Today
                  </>
                )}
              </button>
            </div>

            {/* Trust factors */}
            <div className="grid grid-cols-1 divide-y divide-zinc-900 sm:grid-cols-3 sm:divide-y-0 sm:divide-x pt-4 border-t border-zinc-900 text-center gap-3">
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs py-2 sm:py-0">
                <Clock className="h-3.5 w-3.5 text-yellow-400" />
                <span>Instant Phone Callback (15M)</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs py-2 sm:py-0">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                <span>Premium Quality Locker & Sauna</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-zinc-400 text-xs py-2 sm:py-0">
                <PhoneCall className="h-3.5 w-3.5 text-yellow-400" />
                <span>No Commitment 1-Day Trial</span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
