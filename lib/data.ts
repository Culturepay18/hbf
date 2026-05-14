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

export const blogPosts: BlogPost[] = [
  {
    title: "The Importance of Youth Leadership in Haiti",
    href: "#",
    excerpt: "Discover how empowering the next generation can transform communities and drive sustainable development in Haiti.",
  },
  {
    title: "Highlights from the 2024 Essay Competition",
    href: "#",
    excerpt: "A look back at the incredible ideas and solutions proposed by students from Cap-Haitien in our latest competition.",
  },
  {
    title: "How Sports Build Character and Teamwork",
    href: "#",
    excerpt: "Learn about our Sports & Education program and its impact on helping young athletes develop critical life skills.",
  },
];

export const contact = {
  email: "info@hbfhaiti.org",
  whatsapp: "+34 687 03 80 92",
  whatsappUrl: "https://wa.me/34687038092",
  instagram: "@hbfhaiti",
  instagramUrl: "https://www.instagram.com/hbfhaiti/",
};

export const donation = {
  goalUsd: 50000,
  collectedUsd: 15620,
  href: "https://donate.stripe.com/dR6cOjd394On2J2dQQ",
};

export const mission =
  "Haiti Bright Futures identifies high-performing students in northern Haiti and equips them with technology, mentorship, and real-world problem-solving experience to develop the next generation of civic and economic leaders. We invest in high-potential youth to remove barriers to education, empowering them to drive lasting, positive transformation through academic excellence and collaborative community action.";

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
    bio: "Dr. Steve M. Antoine is an advanced heart failure and transplant cardiologist at the Michael E. DeBakey VA Medical Center in Houston, Texas, and serves on the faculty of Baylor College of Medicine. He specializes in the management of complex cardiovascular disease, advanced heart failure therapies, remote heart failure monitoring, hemodynamics, mechanical circulatory support devices, heart transplantation, and pulmonary hypertension. Dr. Antoine is board certified in internal medicine, cardiovascular disease, cardiovascular nuclear medicine, echocardiography, advanced heart failure, and heart transplant. He has contributed to numerous peer-reviewed publications in the field of advanced heart failure and transplant cardiology.\n\nBorn in the United States to Haitian immigrant parents and raised in Haiti, Dr. Antoine developed a deep personal understanding of both the extraordinary potential of Haitian youth and the systemic barriers that too often limit their opportunities.\n\nHe completed his medical degree at the American University of the Caribbean in 2013, where he tutored physiology, an experience that ignited his passion for cardiovascular physiology and heart failure. He completed his internal medicine residency at SUNY Upstate Medical University in Syracuse, New York, earning multiple teaching awards including Resident Teacher of the Year. Following residency, he served as a hospitalist before pursuing his cardiovascular disease fellowship at the University of Florida in Jacksonville, where he was nominated for Fellow of the Year and received research grants for his work on Patent Foramen Ovale Shunting in Heart Failure Patients research that earned first prize as an abstract at the Inova Advanced Heart Failure Symposium in 2019. He completed his advanced heart failure fellowship at the University of Florida in Gainesville in 2021 before joining the DeBakey VA Medical Center in Houston.\n\nA member of the medical team that performed the Houston VA’s first ever heart transplant, Dr. Antoine is an actively practicing proceduralist who performs cardiac interventions weekly, combining the diagnostic expertise of an advanced heart failure specialist with hands-on clinical skills that few cardiologists exercise at his level. His academic work spans advanced heart failure, remote patient monitoring, artificial intelligence applications in medicine, and cardiovascular device therapies.\n\nDr. Antoine is the co-founder and president of Haiti Bright Futures, a nonprofit organization dedicated to identifying and developing the next generation of Haitian civic leaders through merit-based scholarship competition, civic innovation programming, and structured diaspora mentorship. Built on the conviction that Haiti possesses exceptional talent that deserves exceptional opportunity, Haiti Bright Futures reflects a vision that extends beyond scholarships alone; one focused on building a long-term ecosystem where Haitian youth become future leaders, innovators, professionals, and changemakers within their communities. It is also his most personal commitment: to the country and the people who shaped him.\n\nDr. Antoine is fluent in English, French, and Haitian Creole.",
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
  { label: "WhatsApp", href: "https://wa.me/34687038092", platform: "whatsapp" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Innovation Lab", href: "/innovation-lab" },
  { label: "About us", href: "/about" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];
