"use client";

import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  categorySlug: string | null;
  category: { name: string } | null;
  message: string;
  budget: string | null;
  status: string;
  createdAt: Date;
}

interface Props {
  leads: Lead[];
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-gray-100 text-gray-600",
};

export default function LeadsTable({ leads: initialLeads }: Props) {
  const [leads, setLeads] = useState(initialLeads);
  const [expanded, setExpanded] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Client</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Budget</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-ink/40 text-sm">
                  No leads yet.
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <>
                  <tr
                    key={l.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{l.name}</p>
                      <p className="text-xs text-ink/50">{l.email}</p>
                      {l.phone && <p className="text-xs text-ink/40">{l.phone}</p>}
                    </td>
                    <td className="px-4 py-3 text-ink/70 text-xs">
                      {l.category?.name ?? l.categorySlug ?? "Not specified"}
                    </td>
                    <td className="px-4 py-3 text-ink/60 text-xs">{l.budget ?? "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                          STATUS_COLORS[l.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-ink/40 text-xs whitespace-nowrap">
                      {new Date(l.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  {expanded === l.id && (
                    <tr key={`${l.id}-expanded`} className="bg-blue-50">
                      <td colSpan={5} className="px-4 py-4">
                        <p className="text-sm font-semibold text-ink mb-1">Message:</p>
                        <p className="text-sm text-ink/70 whitespace-pre-wrap">{l.message}</p>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
