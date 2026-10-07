import { useState } from 'react';
import { PRICING_PLANS } from '../data';
import { Check, Compass, Dumbbell, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingCalculatorProps {
  onSelectPlan: (planSlug: string) => void;
}

interface CustomAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ADD_ONS: CustomAddon[] = [
  { id: 'sauna', name: 'Unlimited Steam & Sauna Room Access', price: 699, description: 'Direct dynamic thermal spa chamber entry anytime' },
  { id: 'locker', name: 'Dedicated Permanent VIP Storage Locker', price: 299, description: 'A secure, personal keypad storage locker for all your items' },
  { id: 'nutrition', name: 'Continuous Nutrition & Weekly Diet Planning', price: 1200, description: 'Personal reviews of your home diet by our head advisor' },
  { id: 'apparel', name: 'Flex It Branded Fitness Shaker & Gym Kit', price: 150, description: 'Custom shaker bottle & premium anti-sweat tanktop' }
];

export default function PricingCalculator({ onSelectPlan }: PricingCalculatorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-pro');
  const [activeAddons, setActiveAddons] = useState<string[]>(['sauna']);

  const currentPlan = PRICING_PLANS.find(p => p.id === selectedPlanId) || PRICING_PLANS[1];

  const handleToggleAddon = (id: string) => {
    setActiveAddons(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getAddonsTotal = () => {
    return ADD_ONS
      .filter(a => activeAddons.includes(a.id))
      .reduce((sum, addon) => sum + addon.price, 0);
  };

  const calculateFinalCost = () => {
    const basePrice = currentPlan.price;
    const addonsCost = getAddonsTotal();
    
    // Scale addons pricing based on billing period to keep logic realistic
    let multiplier = 1;
    if (currentPlan.period === 'Quarterly') multiplier = 3;
    if (currentPlan.period === 'Annual') multiplier = 12;

    return basePrice + (addonsCost * multiplier);
  };

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h3 className="font-display text-2xl font-black text-black uppercase tracking-tight">
          Flexible Membership <span className="text-yellow-500">Pricing</span>
        </h3>
        <p className="text-sm text-zinc-600 mt-1.5 max-w-2xl mx-auto">
          Tailored packages to match your workout rhythm. Configure your plans below with active add-ons to build your custom package.
        </p>
      </div>

      {/* Main Standard Plan Comparison Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_PLANS.map(plan => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              id={`pricing-plan-${plan.slug}`}
              className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                plan.isPopular 
                  ? 'bg-black text-white ring-4 ring-yellow-400 scale-[1.02] shadow-xl md:scale-[1.04]' 
                  : 'bg-white border-2 border-zinc-100 text-zinc-900 shadow-sm'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold text-zinc-950 uppercase tracking-widest shadow-md">
                  Gym Recommendation
                </span>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className={`font-display text-xl font-bold tracking-tight uppercase ${plan.isPopular ? 'text-yellow-400' : 'text-zinc-950'}`}>
                    {plan.name}
                  </h4>
                  {plan.isPopular && <ShieldCheck className="h-5 w-5 text-yellow-400" />}
                </div>

                <p className={`text-xs mt-1 leading-snug ${plan.isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {plan.tagline}
                </p>

                <div className="my-6 border-b border-zinc-100/10 pb-6 flex items-baseline">
                  <span className={`text-4xl font-display font-black tracking-tight ${plan.isPopular ? 'text-white' : 'text-zinc-950'}`}>
                    ₹{plan.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-xs ml-1 bg-zinc-200/20 px-1.5 py-0.5 rounded ${plan.isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    / {plan.period}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3 text-xs mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-yellow-400' : 'text-green-600'}`} />
                      <span className={plan.isPopular ? 'text-zinc-300' : 'text-zinc-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red CTA Selection Button */}
              <button
                id={`choose-plan-btn-${plan.slug}`}
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  onSelectPlan(plan.slug);
                }}
                className={`w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition duration-200 cursor-pointer text-center block shadow hover:shadow-lg`}
              >
                Select {plan.name}
              </button>
            </div>
          );
        })}
      </div>

      {/* Interactive Custom Add-on Pricing Calculator - Extremely powerful visual proof */}
      <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row">
          
          {/* Add-on Selectors */}
          <div className="flex-1 space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400/25 px-3 py-1 text-[10px] font-bold text-zinc-800 uppercase tracking-widest mb-1.5">
                Dynamic Personalization
              </span>
              <h4 className="font-display text-lg font-black text-zinc-900 uppercase">
                Customize Your Perfect Package
              </h4>
              <p className="text-xs text-zinc-500">
                Enhance your base plan with local premium services. Tick custom add-ons to preview real-time pricing updates below.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ADD_ONS.map(addon => {
                const isChecked = activeAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    id={`addon-card-${addon.id}`}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`rounded-2xl p-4 border transition duration-200 cursor-pointer bg-white flex flex-col justify-between ${
                      isChecked 
                        ? 'border-yellow-400 bg-yellow-400/5 ring-1 ring-yellow-400' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-zinc-900">{addon.name}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by click of parent card
                          className="h-4 w-4 rounded text-yellow-500 accent-yellow-400 cursor-pointer pointer-events-none"
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1 lines-clamp-2 leading-snug">
                        {addon.description}
                      </p>
                    </div>

                    <div className="mt-3 text-xs font-extrabold text-zinc-950 font-mono">
                      + ₹{addon.price}/Month
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary Side Board */}
          <div className="rounded-2xl border-2 border-zinc-900 bg-zinc-950 p-6 text-white lg:w-80 shrink-0 flex flex-col justify-between">
            <div>
              <h5 className="font-display text-sm font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-800 pb-3">
                Calculated Estimate
              </h5>

              <div className="mt-4 space-y-2.5 text-xs text-zinc-300">
                <div className="flex justify-between">
                  <span>Selected Tier Base:</span>
                  <span className="font-bold text-white">₹{currentPlan.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Cycle:</span>
                  <span className="font-semibold text-yellow-400">{currentPlan.period}</span>
                </div>
                {activeAddons.length > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Add-ons Volume ({activeAddons.length}):</span>
                    <span>+ ₹{getAddonsTotal()}/mo</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-900 pt-5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">Estimated Final Price ({currentPlan.period})</span>
              <div className="text-3xl font-display font-black tracking-tight text-white mt-1">
                ₹{calculateFinalCost().toLocaleString('en-IN')}
              </div>
              <p className="text-[9px] text-zinc-500 mt-1.5 leading-snug">
                * Prices include Hanumanthnagar center locker rights and facility access. All government taxes are fully integrated.
              </p>

              {/* Bold Red CTA Trigger Signup */}
              <button
                id="request-membership-btn"
                onClick={() => onSelectPlan(currentPlan.slug)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-display font-black text-xs uppercase tracking-widest py-3 rounded-lg transition duration-200 cursor-pointer shadow shadow-red-600/10"
              >
                Request Membership Details
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
