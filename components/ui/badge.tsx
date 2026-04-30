import type { ReactNode } from "react";

type BadgeVariant = "success" | "warning" | "urgent" | "neutral";

const variants: Record<BadgeVariant, string> = {
  success: "bg-hbf-green/12 text-hbf-green ring-hbf-green/20",
  warning: "bg-hbf-orange/12 text-hbf-brown ring-hbf-orange/24",
  urgent: "bg-red-50 text-red-700 ring-red-200",
  neutral: "bg-stone-100 text-stone-700 ring-stone-200",
};

export function Badge({
  children,
  variant = "success",
  className = "",
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ring-1",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
