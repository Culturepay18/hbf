export type ScholarshipStatus = "Open" | "Coming soon" | "Closed";

export type Scholarship = {
  title: string;
  status: ScholarshipStatus;
  location: string;
  level: string;
  description: string;
  prize: string;
  deadline: string;
  href: string;
};

export type TeamMember = {
  name: string;
  role: string;
  school: string;
  bio: string;
  image?: string;
};

export type MethodStep = {
  title: string;
  text: string;
};

export type BlogPost = {
  title: string;
  href: string;
  excerpt: string;
};

export const contact = {
  email: "info@hbfhaiti.org",
  whatsapp: "+1 (954) 274-4509",
  whatsappUrl: "https://wa.me/19542744509",
  instagram: "@hbfhaiti",
  instagramUrl: "https://www.instagram.com/hbfhaiti/",
};

export const donation = {
  goalUsd: 50000,
  collectedUsd: 15620,
  href: "https://donate.stripe.com/dR6cOjd394On2J2dQQ",
};

export const mission =
  "Creating opportunities for students in Haiti through scholarships, sports, and youth programs to help them pursue their aspirations and transform the future of the country.";

export const vision =
  "Helping transform the future of the country by supporting future leaders as they pursue their aspirations.";

export const about =
  "Haiti Bright Futures is a nonprofit organization founded on the belief that every child in Haiti deserves the opportunity to succeed. Its mission is to break down the barriers that prevent young people from accessing quality education, engaging in sports, and participating in youth development programs.";

export const methodSteps: MethodStep[] = [
  {
    title: "Listen to their needs",
    text: "Guided by the insights of students, HBF makes sure their voices are heard before shaping programs.",
  },
  {
    title: "Prove viable options",
    text: "We work with Haitian youth and educators to create opportunities that can lead students to success.",
  },
  {
    title: "Provide support",
    text: "Scholarships, sports activities, personal development workshops, mentoring, confidence, and civic responsibility.",
  },
];

export const scholarships: Scholarship[] = [
  {
    title: "Essay Competition 2026",
    status: "Open",
    location: "Cap-Haitien",
    level: "NS3 / Rheto / 11th grade",
    description:
      "School nominations, essay submission, 20 finalists, a community project phase, and 5 final winners.",
    prize: "5 MacBooks + $1,000 school support prize",
    deadline: "2026-01-31",
    href: "/scholarship-application",
  },
  {
    title: "Youth Leadership Scholarship",
    status: "Coming soon",
    location: "Northern Haiti",
    level: "High school",
    description:
      "Support for students who show leadership in school, community service, and youth development.",
    prize: "Mentorship + academic support",
    deadline: "2026-06-30",
    href: "/scholarship-application",
  },
  {
    title: "Sports & Education Program",
    status: "Closed",
    location: "Cap-Haitien",
    level: "Young athletes",
    description:
      "A program connecting sports discipline, school achievement, teamwork, and personal growth.",
    prize: "Equipment + registration support",
    deadline: "2025-11-15",
    href: "/scholarship-application",
  },
];

export const team: TeamMember[] = [
  {
    name: "Dr. Steve Antoine",
    role: "Co-founder and President",
    school: "Institution Saint Louis de Gonzague",
    image: "/images/steve-antoine.jpg",
    bio: "Steve Antoine was born and raised in Haiti. After attending high school at the Institution Saint Louis de Gonzague he moved to the States in his late teens where he attended College. His hard work led him to being one of the few black advanced heart failure and transplant cardiologists. Throughout his career, his passion for giving back to Haiti has left him eager to build something that will impact future generations in Haiti. Haiti Bright Futures is his way of giving back to Haiti on a larger scale.",
  },
  {
    name: "Dr. Marsha Antoine",
    role: "Co-founder and Social Media",
    school: "Institution Sainte Rose de Lima",
    image: "/images/marsha-antoine.jpg",
    bio: "Marsha Antoine is a dedicated ICU physician who fled Haiti with her family at 14 due to political turmoil, finding solace in the United States. Despite the challenges of relocation, her parents' emphasis on education propelled her towards a career in medicine, influenced by family and personal interests. Marsha co-founded Haiti Bright Futures, to support her desire to give back to her homeland. Though her high school years at the Institution Sainte Rose de Lima were cut short by her move to the states, it is a significant influence on Marsha's passion for her profession and her community, both in the U.S. and in Haiti.",
  },
  {
    name: "Wesna Poteau",
    role: "Treasury",
    school: "Lycée du Cent Cinquantenaire",
    image: "/images/wesna-poteau.jpg",
    bio: "Wesna Poteau, a Haiti native, completed her High School education at Lycée du Cent Cinquantenaire and pursued higher education at the Episcopal University of Haiti, where she studied accounting. Currently working at the General Administration of Customs in Port-au-Prince, she is a testament to the success achievable through dedication and hard work. Despite her remarkable professional achievements, including balancing her career with being a wife and mother, Wesna remains committed to making a difference. As the foundation's treasurer, Wesna brings her expertise and passion to empower the next generation of Haitian students.",
  },
  {
    name: "Dr. Jean Gedeon Charles",
    role: "Administration",
    school: "Institution Saint Louis de Gonzague",
    image: "/images/jean-gedeon-charles.jpg",
    bio: "Jean Gedeon Charles was born and raised in Haiti, where he also attended Institution Saint Louis de Gonzague for high school. He then pursued his medical education, a debt he feels he owes to his homeland. Moving to the US at 28, he was struck by the disparity between the wealth and opportunities available in both countries. Driven by a deep sense of responsibility, he joined the board for Haiti Bright Futures with the hope of uniting the Haitian diaspora to contribute to the development of Haiti. Despite the challenges he faced, including financial struggles as a doctor in Haiti, his commitment to his country and its people remains unwavering. Jean Gedeon Charles is a passionate advocate for the potential of the Haitian diaspora to bring about positive change in Haiti.",
  },
];

export const impactStats = [
  { value: "36", label: "Applicants" },
  { value: "20", label: "Finalists" },
  { value: "4", label: "Teams" },
  { value: "1", label: "National competition" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/hbfhaiti/", platform: "instagram" },
  { label: "WhatsApp", href: "https://wa.me/19542744509", platform: "whatsapp" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Innovation Lab", href: "/innovation-lab" },
  { label: "About us", href: "/about" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Team", href: "/team" },
  { label: "Contact us", href: "/contact" },
];
