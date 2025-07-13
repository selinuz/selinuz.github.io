export interface Project {
  id: string;
  title: string;
  duration: string;
  description: string;
  detailsTitle?: string;
  details: string[];
  skills: string[];
  link?: string;
  iconType: "github" | "link";
  context?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Website",
    duration: "Dec 2024 – Now",
    description: "A responsive portfolio site built with Next.js.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Built reusable components",
      "Styled with custom CSS and variables",
      "Mobile-responsive and dark mode ready",
    ],
    skills: ["Next.js", "TypeScript", "CSS"],
    link: "https://github.com/selinuz/selinuz.github.io",
    iconType: "github",
    context: "Personal project",
  },
  {
    id: "2",
    title: "Feral Freedom",
    duration: "Sep 2024 – Dec 2024",
    description: "A 2D pixel-art survival game made with OpenGL.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Lives system",
      "Room transitions",
      "Animated sprites",
      "AI-based patrol and encounter logic",
      "Designed frontend features using OpenGL",
    ],
    skills: ["C++", "OpenGL"],
    link: "https://github.com/selinuz/FeralFreedom",
    iconType: "github",
    context: "for CPSC 427: Video Game Development",
  },
  {
    id: "3",
    title: "PLUMAGE",
    duration: "Apr 6–7, 2024",
    description:
      "Hackathon project using Arc'teryx data for personal sizing and AI-based color analysis.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Built landing, signup, and login pages in React",
      "Secure user login with Axios via internal API",
    ],
    skills: ["React.js", "JavaScript", "npm"],
    link: "https://github.com/irmikimikmik/PLUMAGE-for-YouCode2024",
    iconType: "github",
    context: "for youCode 2024 Hackathon",
  },
  {
    id: "4",
    title: "Pocket Pelvis: AR Birth Animation",
    duration: "Jan 2024 – Apr 2024",
    description:
      "An AR educational app enhancing 3D pelvis visualization and birth animation.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Implemented recentering in AR mode with C#",
      "Integrated Lean Touch for gesture interaction",
    ],
    skills: ["Unity", "C#", "Vuforia AR SDK"],
    link: "https://eml.ubc.ca/projects/ar-application-for-midwifery-education/",
    iconType: "link",
    context: "for ELEC 491: Capstone Design Project",
  },
  {
    id: "5",
    title: "youCode Hackathon Website Design",
    duration: "Dec 2023 – Jan 2024",
    description:
      "Designed a unicorn-themed hackathon website for UBC's youCode event.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Designed user-friendly UI using Figma",
      "Drew custom unicorn mascots aligned with wellness theme",
    ],
    skills: ["Figma", "Graphic Design"],
    link: "https://www.figma.com/design/jdvdb6tb3pxmRsGOnqbPzT/youCode-Designs?node-id=89-5&t=g1LlRCM6xjy7UOM9-1",
    iconType: "link",
    context: "for Women in CS @ UBC",
  },
  {
    id: "6",
    title: "Project Buddies",
    duration: "Jul 2023 – Aug 2023",
    description:
      "Collaboration platform for IT projects with full stack technologies.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Frontend with HTML5, CSS, and JavaScript",
      "Backend with PHP and CodeIgniter",
      "MySQL database management",
    ],
    skills: ["HTML5", "CSS", "JavaScript", "PHP", "CodeIgniter", "MySQL"],
    link: "https://github.com/selinuz/ProjectBuddies",
    iconType: "github",
    context: "Final year group project in high school",
  },
];
