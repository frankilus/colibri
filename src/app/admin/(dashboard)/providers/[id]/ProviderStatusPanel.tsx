"use client";

import { useState } from "react";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface Props {
  providerId: string;
  currentStatus: string;
  currentNotes: string;
}

const STATUSES = [
  { value: "pending", label: "Pending", icon: Clock, color: "text-amber-500" },
  { value: "verified", label: "Verified", icon: CheckCircle, color: "text-emerald-600" },
  { value: "flagged", label: "Flagged", icon: AlertTriangle, color: "text-red-500" },
];

export default function ProviderStatusPanel({ providerId, currentStatus, currentNotes }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/providers/${providerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes: notes }),
      });
      if (!res.ok) throw new Error("Save failed.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-ink/50 mb-4">
        Status & Notes
      </h2>

      {/* Status selector */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {STATUSES.map((s) => {
          const Icon = s.icon;
          const active = status === s.value;
          return (
            <button
              key={s.value}
              onClick={() => setStatus(s.value)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-xs font-medium transition-all ${
                active
                  ? "border-current bg-current/5"
                  : "border-gray-100 text-ink/40 hover:border-gray-200"
              } ${s.color}`}
            >
              <Icon size={16} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Internal notes */}
      <label className="block text-xs text-ink/50 mb-1.5">Internal notes</label>
      <textarea
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add private notes about this provider…"
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-brand resize-none bg-gray-50"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <button
        onClick={save}
        disabled={saving}
        className={`w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          saved
            ? "bg-emerald-100 text-emerald-700"
            : "bg-emerald-deep text-white hover:bg-emerald-deep/90"
        } disabled:opacity-60`}
      >
        {saving ? "Saving…" : saved ? "✓ Saved" : "Save changes"}
      </button>
    </div>
  );
}
