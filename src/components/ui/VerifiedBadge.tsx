import { ShieldCheck } from "lucide-react";

interface Props {
  size?: "sm" | "md";
  className?: string;
}

export default function VerifiedBadge({ size = "sm", className = "" }: Props) {
  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-0.5 gap-1"
      : "text-sm px-2.5 py-1 gap-1.5";
  const iconSize = size === "sm" ? 12 : 14;

  return (
    <span
      className={`inline-flex items-center rounded-full bg-emerald-brand/10 text-emerald-brand font-medium border border-emerald-brand/20 ${sizeClasses} ${className}`}
      title="This provider has been personally screened by the Colibri team — credentials checked, references collected, and quality verified before being listed."
    >
      <ShieldCheck size={iconSize} aria-hidden="true" />
      Verified by Colibrí
    </span>
  );
}
