import React, { useState, useEffect, useRef } from 'react';
import { Lead } from './types';
import { SERVICES, GYM_CONTACT } from './data';
import Hero from './components/Hero';
import ServicesShowcase from './components/ServicesShowcase';
import ClassSchedule from './components/ClassSchedule';
import PricingCalculator from './components/PricingCalculator';
import LeadForm from './components/LeadForm';
import ContactInfo from './components/ContactInfo';
import TestimonialsSection from './components/TestimonialsSection';
import LeadDashboard from './components/LeadDashboard';
import { Dumbbell, Calendar, MessageSquare, MapPin, Sparkles, LogIn, Users, CheckCircle } from 'lucide-react';

// Pre-populate some realistic sample leads for demonstration so the client is highly impressed instantly
const DEFAULT_DEMO_LEADS: Lead[] = [
  {
    id: "lead-demo-1",
    name: "Rohan Gowda",
    email: "rohan.gowda@gmail.com",
    phone: "9880123456",
    selectedPlan: "pro",
    preferredService: "hiit",
    preferredTime: "Morning (07:00 AM - 10:00 AM)",
    status: "New",
    notes: "Particularly interested in morning HIIT before heading down to tech park.",
    createdAt: "03/06/2026, 06:15:30 AM"
  },
  {
    id: "lead-demo-2",
    name: "Meera Hegde",
    email: "meera.h@yahoo.co.in",
    phone: "9164509876",
    selectedPlan: "elite",
    preferredService: "yoga",
    preferredTime: "Evening Rush (05:00 PM - 08:00 PM)",
    status: "Contacted",
    notes: "Enquired about customized nutrition diet plan since vegetarian.",
    createdAt: "02/06/2026, 05:40:11 PM"
  },
  {
    id: "lead-demo-3",
    name: "Karthik Subramanian",
    email: "karthik.sub@microsoft.com",
    phone: "9900224466",
    selectedPlan: "starter",
    preferredService: "weight_training",
    preferredTime: "Late Night (08:00 PM - 10:00 PM)",
    status: "Enrolled",
    notes: "Enrolled as an annual member. Setup card key.",
    createdAt: "01/06/2026, 08:22:15 PM"
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string>('starter');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('hiit');
  
  // Dashboard toggle and notification states
  const [showCrm, setShowCrm] = useState(false);
  const [newLeadNotification, setNewLeadNotification] = useState(false);

  // Layout scrolling references
  const formRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const scheduleRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Load and save leads from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('flex_it_gym_leads');
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        setLeads(DEFAULT_DEMO_LEADS);
      }
    } else {
      setLeads(DEFAULT_DEMO_LEADS);
      localStorage.setItem('flex_it_gym_leads', JSON.stringify(DEFAULT_DEMO_LEADS));
    }
  }, []);

  const updateLeadsInStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('flex_it_gym_leads', JSON.stringify(updatedLeads));
  };

  // Safe smooth scroll helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Sync pricing selected CTA and scroll down
  const handleSelectPlan = (planSlug: string) => {
    setSelectedPlanSlug(planSlug);
    scrollTo(formRef);
  };

  // Sync service selected CTA and scroll down
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollTo(formRef);
  };

  // Handle new lead submission from form
  const handleLeadSubmitted = (newLead: Lead) => {
    const updatedLeads = [newLead, ...leads];
    updateLeadsInStorage(updatedLeads);
    
    // Highlight owners portal callback visual alert
    setNewLeadNotification(true);
    setTimeout(() => {
      setNewLeadNotification(false);
    }, 6000);
  };

  // Edit status from owner's portal
  const handleUpdateLeadStatus = (leadId: string, status: 'New' | 'Contacted' | 'Enrolled' | 'Archived') => {
    const updated = leads.map(l => l.id === leadId ? { ...l, status } : l);
    updateLeadsInStorage(updated);
  };

  // Edit notes from owner's portal
  const handleUpdateLeadNotes = (leadId: string, notes: string) => {
    const updated = leads.map(l => l.id === leadId ? { ...l, notes } : l);
    updateLeadsInStorage(updated);
  };

  // Clear leads database action
  const handleClearLeads = () => {
    updateLeadsInStorage([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-yellow-400 selection:text-zinc-900 pb-12">
      
      {/* Dynamic alert bar for real-time lead generation demonstration */}
      {newLeadNotification && (
        <div id="lead-notification-alert" className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4 animate-bounce">
          <div className="rounded-xl bg-zinc-950 border-2 border-yellow-400 p-4 shadow-xl text-white flex gap-3 items-center">
            <span className="flex h-3 w-3 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <div className="flex-1 text-xs">
              <p className="font-bold text-yellow-400">⚡ New Lead Received Instantly!</p>
              <p className="text-zinc-300 mt-0.5">Lead stored in local storage database. Open Owner CRM portal to view.</p>
            </div>
          </div>
        </div>
      )}

      {/* Primary Sticky Header Menu */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-yellow-400 p-2 text-zinc-950 shadow shadow-yellow-400/20">
              <Dumbbell className="h-5 w-5 fill-zinc-900" />
            </div>
            <div>
              <span className="font-display text-lg font-black tracking-tight text-zinc-950 uppercase">
                FLEX IT <span className="text-yellow-500">GYM</span>
              </span>
              <span className="block text-[8px] font-bold text-zinc-400 uppercase tracking-widest leading-none">hanumanthnagar</span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-zinc-600">
            <button onClick={() => scrollTo(servicesRef)} className="hover:text-yellow-600 transition">Services</button>
            <button onClick={() => scrollTo(scheduleRef)} className="hover:text-yellow-600 transition">Schedules</button>
            <button onClick={() => scrollTo(pricingRef)} className="hover:text-yellow-600 transition">Pricing Plans</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:text-yellow-600 transition">Location Map</button>
          </nav>

          {/* CTAs and Owners CRM Trigger Portal */}
          <div className="flex items-center gap-3">
            {/* Subtle owner toggle to showcase leads captured */}
            <button
              id="header-crm-portal-btn"
              onClick={() => setShowCrm(true)}
              className="relative rounded-lg border border-zinc-200 hover:border-zinc-300 bg-zinc-50 px-3.5 py-2 text-[11px] font-bold text-zinc-700 hover:text-zinc-950 uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="h-3.5 w-3.5" /> Owner CRM
              {leads.filter(l => l.status === 'New').length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white ring-2 ring-white">
                  {leads.filter(l => l.status === 'New').length}
                </span>
              )}
            </button>

            {/* Main Red CTA Button */}
            <button
              id="header-red-cta-join"
              onClick={() => scrollTo(formRef)}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition duration-200 shadow shadow-red-600/10 cursor-pointer"
            >
              Sign Up Trial
            </button>
          </div>

        </div>
      </header>

      {/* Main Single Screen Scroll Area */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 mt-6 space-y-16">
        
        {/* 1. Hero Welcome section */}
        <section id="hero-block">
          <Hero 
            onCtaclick={() => scrollTo(formRef)} 
            onExploreClick={() => scrollTo(scheduleRef)} 
          />
        </section>

        {/* 2. Interactive Services Showcase */}
        <section ref={servicesRef} id="services-block" className="scroll-mt-24">
          <ServicesShowcase onSelectService={handleSelectService} />
        </section>

        {/* 3. Class Scheduler block */}
        <section ref={scheduleRef} id="schedules-block" className="scroll-mt-24">
          <ClassSchedule onSelectClass={handleSelectService} />
        </section>

        {/* 4. Flexible Pricing Customizer */}
        <section ref={pricingRef} id="pricing-block" className="scroll-mt-24">
          <PricingCalculator onSelectPlan={handleSelectPlan} />
        </section>

        {/* 5. Realistic Testimonial reviews block */}
        <section id="testimonials-block">
          <TestimonialsSection onCtaclick={() => scrollTo(formRef)} />
        </section>

        {/* 6. Lead signup generator Form */}
        <section id="signup-form-block">
          <LeadForm 
            initialPlanSlug={selectedPlanSlug} 
            initialServiceId={selectedServiceId} 
            onLeadSubmitted={handleLeadSubmitted}
            formRef={formRef}
          />
        </section>

        {/* 7. Contact Info & Interactive Maps */}
        <section ref={contactRef} id="coordinates-block" className="scroll-mt-24 border-t border-zinc-200 pt-16">
          <ContactInfo />
        </section>

      </main>

      {/* Simple Footer details */}
      <footer className="mx-auto max-w-7xl px-6 pt-16 text-center border-t border-zinc-200 mt-16 font-sans">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row text-xs text-zinc-500 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-zinc-700">
            <span className="font-display font-black uppercase text-sm">
              FLEX IT <span className="text-yellow-500">GYM</span>
            </span>
            <span className="text-zinc-300">|</span>
            <span>Hanumanthnagar, Bangalore</span>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => scrollTo(servicesRef)} className="hover:text-yellow-600 transition">Services</button>
            <span>•</span>
            <button onClick={() => scrollTo(scheduleRef)} className="hover:text-yellow-600 transition">Timetable</button>
            <span>•</span>
            <button onClick={() => scrollTo(pricingRef)} className="hover:text-yellow-600 transition">Pricing</button>
            <span>•</span>
            <button onClick={() => setShowCrm(true)} className="text-yellow-600 hover:underline">CRM Owner Portal</button>
          </div>

          <div className="text-[10px] font-mono tracking-normal text-zinc-400">
            © 2026 Flex It Gym. Licensed sample preview format.
          </div>
        </div>
      </footer>

      {/* Toggle CRM Administrator Lead Viewer Module overlay */}
      {showCrm && (
        <LeadDashboard 
          onClose={() => setShowCrm(false)} 
          leads={leads}
          onUpdateLeadStatus={handleUpdateLeadStatus}
          onUpdateLeadNotes={handleUpdateLeadNotes}
          onClearLeads={handleClearLeads}
        />
      )}

    </div>
  );
}
