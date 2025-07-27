export interface Project {
  id: string;
  title: string;
  subtitle?: string;
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
    subtitle: "(this)",
    duration: "December 2024 – now",
    description:
      "Built a fully responsive, interactive personal portfolio website showcasing my projects, values, and contact details.",
    detailsTitle: "Features:",
    details: [
      "Responsive design for seamless viewing on all devices.",
      "Implemented interactive project filtering and animations using JavaScript.",
      "Integrated contact form allowing visitors to submit messages.",
      "Interactive core values map with draggable and expandable elements.",
    ],
    skills: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/selinuz/selinuz.github.io",
    iconType: "github",
  },
  {
    id: "2",
    title: "Feral Freedom",
    subtitle: "(Video Game)",
    duration: "September 2024 – December 2024",
    description:
      "Collaborated with a team of six to develop a 2D pixel-art survival game featuring AI-driven patrols, Undertale-style encounters, and resource collection mechanics.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Designed and implemented core frontend features using C++ and OpenGL.",
      "Developed systems like lives, HP bar, inventory, stats displays, and interactive screens.",
      "Originated the project idea, defined the vision, and led weekly scrum meetings.",
    ],
    skills: ["C++", "OpenGL"],
    link: "https://github.com/SELINUZ/FERALFREEDOM",
    iconType: "github",
    context: "for CPSC427: Video Game Development",
  },
  {
    id: "3",
    title: "PLUMAGE",
    subtitle: "(Hackathon Project)",
    duration: "April 6–7, 2024",
    description:
      "With the data provided by Arc’teryx, we created a website in 24 hours where users can access personal sizing technology, AI-powered color analysis, and 3D garment visualization for virtual try-ons.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Implemented sign-up, login, and landing pages frontend using React and JavaScript.",
      "Created the authentication service with Axios to ensure secure user registration and login via internal API.",
    ],
    skills: ["React.js", "JavaScript", "npm"],
    link: "https://github.com/irmikimikmik/PLUMAGE-for-YouCode2024",
    iconType: "github",
    context: "for youCode x Arc'teryx 2024",
  },
  {
    id: "4",
    title: "Pocket Pelvis: AR Birth Animation",
    duration: "January 2024 – April 2024",
    description:
      "Pocket Pelvis is an AR app that enhances the 3D visualization of the complex anatomy of the human pelvis. Our team worked to integrate a birth animation into the existing application, along with implementing image recognition in AR mode with a physical 3D printed pelvis model.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Identified a UX issue with the baby model becoming lost in AR mode; implemented a recenter feature in Unity with C#.",
      "Integrated Lean Touch for intuitive touch-based interaction, allowing users to explore the birth process with rotation and scaling.",
    ],
    skills: ["Unity", "C#", "Vuforia AR SDK"],
    link: "https://eml.ubc.ca/projects/ar-application-for-midwifery-education/",
    iconType: "link",
    context: "for MDIA470: Developing Emerging Technologies",
  },
  {
    id: "5",
    title: "Project Buddies",
    duration: "July 2023 – August 2023",
    description:
      "Developed a web-based collaboration platform for IT projects with HTML5, CSS, and JavaScript for frontend, PHP with CodeIgniter for backend, and SQL/MySQL for database management.",
    detailsTitle: "Personal Contributions:",
    details: [
      "Developed frontend components using HTML5, CSS, and JavaScript.",
      "Implemented backend logic with PHP and CodeIgniter framework.",
      "Designed and managed a MySQL database for secure and efficient data storage.",
    ],
    skills: ["HTML5", "CSS", "JavaScript", "PHP", "CodeIgniter", "MySQL"],
    link: "https://github.com/selinuz/ProjectBuddies",
    iconType: "github",
    context: "for CPSC304: Introduction to Relational Databases",
  },
];
