import { Gallery4, Gallery4Item } from "@/components/blocks/gallery4";
import { team } from "@/lib/data";

const teamItems: Gallery4Item[] = team.map((member) => ({
  id: member.name.toLowerCase().replace(/\s+/g, "-"),
  title: member.name,
  description: `${member.role} — ${member.bio}`,
  href: "/team",
  image: member.image || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
}));

export function Team() {
  return (
    <div id="team" className="scroll-mt-20">
      <Gallery4 
        title="Team Leadership"
        description="Meet the dedicated individuals working tirelessly to create a brighter future for the youth of Haiti through education, sports, and mentorship."
        items={teamItems}
      />
    </div>
  );
}
