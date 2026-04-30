import { Calendar, Trophy } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { scholarships, type ScholarshipStatus } from "@/lib/data";

const statusVariant: Record<ScholarshipStatus, "success" | "warning" | "neutral"> = {
  Open: "success",
  "Coming soon": "warning",
  Closed: "neutral",
};

function isUrgent(deadline: string) {
  const today = new Date();
  const date = new Date(`${deadline}T00:00:00`);
  const days = Math.ceil((date.getTime() - today.getTime()) / 86_400_000);
  return days >= 0 && days < 30;
}

export function Scholarships() {
  return (
    <section id="scholarships" className="bg-hbf-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-orange">Scholarships</p>
          <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-normal text-hbf-dark">
            Scholarship Opportunities
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.title} className="flex min-h-[23rem] flex-col">
              <div className="flex items-center justify-between gap-4">
                <Badge variant={statusVariant[scholarship.status]}>{scholarship.status}</Badge>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-hbf-muted">
                  {scholarship.location}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-medium leading-7 text-hbf-dark">{scholarship.title}</h3>
              <p className="mt-3 line-clamp-2 text-sm text-hbf-muted">{scholarship.description}</p>
              <div className="mt-6 space-y-3 text-sm text-hbf-dark">
                <p className="flex gap-3">
                  <Trophy aria-hidden="true" className="mt-0.5 shrink-0 text-hbf-orange" size={18} />
                  <span>{scholarship.prize}</span>
                </p>
                <p className={["flex gap-3", isUrgent(scholarship.deadline) ? "text-red-700" : ""].join(" ")}>
                  <Calendar aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                  <span>
                    Deadline:{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(`${scholarship.deadline}T00:00:00`))}
                  </span>
                </p>
              </div>
              <Link
                href={scholarship.href}
                className="focus-hbf mt-auto inline-flex rounded-full pt-8 text-sm font-semibold text-hbf-green hover:text-hbf-orange"
              >
                View details
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
