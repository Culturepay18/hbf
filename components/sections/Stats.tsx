"use client";

import Image from "next/image";
import { 
  Users, 
  Trophy, 
  UsersRound, 
  Globe 
} from "lucide-react";

const impactData = [
  { 
    icon: Users, 
    value: "36", 
    label: "Applicants",
    color: "text-hbf-green",
  },
  { 
    icon: UsersRound, 
    value: "20", 
    label: "Finalists",
    color: "text-hbf-orange",
  },
  { 
    icon: Trophy, 
    value: "4", 
    label: "Teams",
    color: "text-hbf-brown",
  },
  { 
    icon: Globe, 
    value: "1", 
    label: "National-level competition",
    color: "text-hbf-green",
  },
];

export function Stats() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Photo à gauche */}
          <div className="w-full lg:w-1/2 relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
            <Image
              src="/images/DSC08667.jpg"
              alt="Haiti Bright Futures Impact"
              fill
              className="object-cover"
            />
          </div>

          {/* Stats à droite */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-hbf-dark font-[family-name:var(--font-patrick-hand)]">
                Our Real Impact
              </h2>
              <p className="text-xl text-hbf-muted font-[family-name:var(--font-patrick-hand)]">
                Tangible results from our latest programs, supporting the next generation of leaders in Haiti.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-1 md:gap-y-10">
              {impactData.map((stat) => (
                <div 
                  key={stat.label}
                  className="flex items-start gap-3 sm:gap-6 md:items-center"
                >
                  <div className={`flex-shrink-0 mt-1 md:mt-0 ${stat.color}`}>
                    <stat.icon className="h-8 w-8 sm:h-9 sm:w-9" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className={`text-4xl md:text-5xl font-bold ${stat.color} leading-none font-[family-name:var(--font-patrick-hand)]`}>
                      {stat.value}
                    </h3>
                    <p className="text-hbf-dark font-bold text-lg md:text-2xl mt-1 font-[family-name:var(--font-patrick-hand)] leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
