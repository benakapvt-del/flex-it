import { useState, useEffect } from 'react';
import { Lead } from '../types';
import { SERVICES, PRICING_PLANS } from '../data';
import { Download, Users, CheckCircle, BarChart3, ChevronDown, RotateCcw, Award } from 'lucide-react';

interface LeadDashboardProps {
  onClose: () => void;
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, status: 'New' | 'Contacted' | 'Enrolled' | 'Archived') => void;
  onUpdateLeadNotes: (leadId: string, notes: string) => void;
  onClearLeads: () => void;
}

export default function LeadDashboard({ onClose, leads, onUpdateLeadStatus, onUpdateLeadNotes, onClearLeads }: LeadDashboardProps) {
  const [filterService, setFilterService] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, enrolled: 0 });

  useEffect(() => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
    const enrolledLeads = leads.filter(l => l.status === 'Enrolled').length;

    setStats({
      total: totalLeads,
      new: newLeads,
      contacted: contactedLeads,
      enrolled: enrolledLeads
    });
  }, [leads]);

  const filteredLeads = leads.filter(lead => {
    const serviceMatch = filterService === 'all' || lead.preferredService === filterService;
    const statusMatch = filterStatus === 'all' || lead.status === filterStatus;
    return serviceMatch && statusMatch;
  });

  const getServiceName = (id: string) => {
    const service = SERVICES.find(s => s.id === id);
    return service ? service.name : id;
  };

  const getPlanName = (id: string) => {
    const plan = PRICING_PLANS.find(p => p.id === id || p.slug === id);
    return plan ? plan.name : 'No Membership Plan Chosen';
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export!");
      return;
    }
    const headers = ["ID", "Name", "Email", "Phone", "Plan Selected", "Preferred Class", "Preferred Hour", "Status", "Date Created", "Notes"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.email,
      l.phone,
      getPlanName(l.selectedPlan),
      getServiceName(l.preferredService),
      l.preferredTime,
      l.status,
      l.createdAt,
      l.notes || ""
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.toString().replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `flex_it_gym_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="lead-dashboard-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/80 font-sans backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Main Glass Panel */}
        <div className="w-full max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl md:p-8">
          
          {/* Header */}
          <div className="mb-6 flex flex-col items-start justify-between border-b border-zinc-800 pb-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-yellow-400" />
                <h2 className="font-display text-2xl font-bold tracking-tight text-white uppercase">
                  CRM Lead Center Dashboard
                </h2>
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                Review, filter, and export incoming free trial and membership leads for Flex It Gym (Hanumanthnagar).
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-0">
              <button
                id="export-csv-btn"
                onClick={handleExportCSV}
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-xs font-semibold text-zinc-950 hover:bg-yellow-300 transition-colors"
              >
                <Download className="h-4 w-4" /> Export CSV
              </button>
              <button
                id="close-crm-btn"
                onClick={onClose}
                className="rounded-lg border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white hover:border-zinc-700 transition"
              >
                Close Portal
              </button>
            </div>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium">Captured Leads</span>
                <Users className="h-4 w-4 text-yellow-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stats.total}</div>
              <p className="mt-0.5 text-[10px] text-zinc-500">Real-time submissions</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium">Status: New</span>
                <span className="h-2 w-2 rounded-full bg-blue-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-400">{stats.new}</div>
              <p className="mt-0.5 text-[10px] text-zinc-500">Awaiting contact</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium">Status: Contacted</span>
                <span className="h-2 w-2 rounded-full bg-orange-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-orange-400">{stats.contacted}</div>
              <p className="mt-0.5 text-[10px] text-zinc-500">In communication</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 font-bold border-yellow-400/20">
              <div className="flex items-center justify-between text-zinc-300">
                <span className="text-xs font-medium">Enrolled Members</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="mt-2 text-2xl font-bold text-green-400">{stats.enrolled}</div>
              <p className="mt-0.5 text-[10px] text-zinc-500">Successfully Joined</p>
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div>
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Filter by Class Plan</label>
                <div className="relative">
                  <select
                    id="filter-class-select"
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-yellow-400 pr-8"
                  >
                    <option value="all">All Services ({SERVICES.length})</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-3 w-3 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Filter by Lead Status</label>
                <div className="relative">
                  <select
                    id="filter-status-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-yellow-400 pr-8"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Archived">Archived</option>
                  </select>
                  <ChevronDown className="h-3 w-3 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {leads.length > 0 && (
              <button
                id="reset-leads-btn"
                onClick={() => {
                  if (confirm("Are you sure you want to clear simulated lead storage?")) {
                    onClearLeads();
                  }
                }}
                className="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 text-xs transition-colors self-end md:self-auto"
              >
                <RotateCcw className="h-3 w-3" /> Clear Database
              </button>
            )}
          </div>

          {/* Lead List Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/20">
            {filteredLeads.length === 0 ? (
              <div id="no-leads-placeholder" className="py-12 text-center">
                <BarChart3 className="mx-auto h-8 w-8 text-zinc-600 mb-2" />
                <p className="text-zinc-400 font-medium">No active leads match the filters</p>
                <p className="text-xs text-zinc-600 mt-1">Submit the public signun form to test lead collection!</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    <th className="p-4">Lead Contact Info</th>
                    <th className="p-4">Gym Preferences</th>
                    <th className="p-4">Schedule Frame</th>
                    <th className="p-4">Status & Action</th>
                    <th className="p-4 text-right">Owner Action Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="text-xs hover:bg-zinc-900/40 transition">
                      <td className="p-4">
                        <div className="font-semibold text-white">{lead.name}</div>
                        <div className="text-zinc-400 mt-0.5">{lead.phone}</div>
                        <div className="text-zinc-500 text-[11px] font-mono">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-yellow-400 font-medium">{getServiceName(lead.preferredService)}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Tier: <span className="text-zinc-300 font-semibold">{getPlanName(lead.selectedPlan)}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-zinc-300">{lead.preferredTime}</div>
                        <div className="text-zinc-500 text-[10px] mt-0.5">{lead.createdAt}</div>
                      </td>
                      <td className="p-4">
                        <div className="relative inline-block w-full">
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold font-sans uppercase border transition focus:outline-none ${
                              lead.status === 'New' 
                                ? 'bg-blue-400/10 border-blue-400/20 text-blue-400'
                                : lead.status === 'Contacted'
                                ? 'bg-orange-400/10 border-orange-400/20 text-orange-400'
                                : lead.status === 'Enrolled'
                                ? 'bg-green-400/10 border-green-400/20 text-green-400'
                                : 'bg-zinc-400/10 border-zinc-400/20 text-zinc-400'
                            }`}
                          >
                            <option value="New" className="bg-zinc-950 text-white">New</option>
                            <option value="Contacted" className="bg-zinc-950 text-white">Contacted</option>
                            <option value="Enrolled" className="bg-zinc-950 text-white">Enrolled</option>
                            <option value="Archived" className="bg-zinc-950 text-white">Archived</option>
                          </select>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <input
                          type="text"
                          placeholder="Add comments/notes..."
                          value={lead.notes || ''}
                          onChange={(e) => onUpdateLeadNotes(lead.id, e.target.value)}
                          className="w-full shrink rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-yellow-400"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Dummy Leads Helper Box to showcase functionality to clients */}
          <div className="mt-6 flex flex-col gap-3 rounded-xl bg-yellow-400/5 border border-yellow-400/10 p-4 md:flex-row md:items-center md:justify-between text-zinc-300 text-xs">
            <div className="flex gap-2.5 items-start">
              <Award className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-200">Interactive Lead Demonstration</p>
                <p className="text-zinc-400 mt-0.5">
                  This simulated CRM reads directly from your browser's Local Storage. Every form submitted from the frontend instantly refreshes here without reloading, allowing you to show your client the complete end-to-end lead workflow live!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
