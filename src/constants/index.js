import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  tailwind,
  mongodb,
  mysql,
  django,
  python,
  nextjs,
  git,
  docker,
  intellect,
  vishleshan,
  skycrm,
  spreadingknowledge,
  edukaan,
  technician,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "tech",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "awards",
    title: "Awards",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

export const socialLinks = {
  name: "Nimesh Vishwakarma",
  role: "Software Developer",
  email: "nimeshvishwav@gmail.com",
  phone: "+91 79728 61253",
  phoneHref: "tel:+917972861253",
  location: "Mumbai, Maharashtra, India",
  github: "https://github.com/Nimesh9172",
  linkedin: "https://www.linkedin.com/in/nimesh-vishwakarma-053912211",
  resume: "/Nimesh_Vishwakarma_Resume.pdf",
};

const services = [
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Cloud & DevOps",
    icon: creator,
  },
  {
    title: "Mobile Developer",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Django",
    icon: django,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Git",
    icon: git,
  },
];

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["Django", "Django REST Framework", "React.js", "React Native", "Next.js", "Flask"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Azure", "Docker", "Jenkins", "CI/CD"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL", "PostgreSQL"],
  },
];

const experiences = [
  {
    title: "Senior Software Engineer",
    company_name: "Vishleshan AI Solutions",
    year: "2026",
    date: "Apr 2026 – Present",
    summary:
      "Leading backend delivery for enterprise platforms, mentoring peers, and driving Git branching, production deployments, and development best practices across AWS and Azure.",
    icon: vishleshan,
    iconBg: "#383E56",
    points: [
      "Introduced Git branching strategies, mentored peers, and drove production-ready development practices.",
      "Played a key role in requirement analysis, production deployments, and maintaining robust, performant code.",
      "Deployed and managed applications on AWS and Azure, keeping environments consistent with Docker.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Vishleshan AI Solutions",
    year: "2023",
    date: "Dec 2023 – Mar 2026",
    summary:
      "Built backends and database schemas from scratch for field-service and B2B eCommerce platforms using Python, Django, and Docker. Improved performance with Celery, RabbitMQ, materialized views, and database replication.",
    icon: vishleshan,
    iconBg: "#383E56",
    points: [
      "Designed and implemented the backend and database schema from scratch for the Technician App, enabling real-time field operations and job tracking.",
      "Developed scalable backend services using Python, Django, and Docker, with a strong emphasis on REST APIs and third-party integrations.",
      "Improved performance for a B2B eCommerce platform using materialized views, Celery + RabbitMQ, and database replication.",
      "Built a modular notification system with real-time and scheduled alerts via email, SMS, and in-app messaging.",
    ],
  },
  {
    title: "Python Developer",
    company_name: "Intellect Infotrade Pvt. Ltd.",
    year: "2022",
    date: "Apr 2022 – Nov 2023",
    summary:
      "Built Django and MySQL web applications, designed React and React Native interfaces, and integrated MQTT for real-time communication and calling features.",
    icon: intellect,
    iconBg: "#E6DEDD",
    points: [
      "Built and maintained web applications using Django and MySQL with a focus on backend scalability.",
      "Designed frontend interfaces using React.js and React Native for cross-platform accessibility.",
      "Developed RESTful APIs with Django REST Framework for seamless frontend–backend integration.",
      "Integrated MQTT for real-time communication and calling features.",
      "Collaborated with UI/UX designers and product teams to align deliverables with business goals.",
    ],
  },
];

const awards = [
  {
    title: "Ultimate Team Player Award",
    company: "Vishleshan AI Solutions",
    year: "2024",
    description:
      "Recognized for exceptional collaboration, ownership, and contribution to team success across key projects.",
  },
];

const projects = [
  {
    name: "Edukaan (Tata Motors)",
    description:
      "Scalable B2B eCommerce platform that helps dealers manage orders, inventory, and product catalogs. Performance was improved with materialized views, Celery + RabbitMQ, and database replication.",
    tags: [
      { name: "django", color: "blue-text-gradient" },
      { name: "mysql", color: "green-text-gradient" },
      { name: "celery", color: "orange-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
    ],
    image: edukaan,
    live_link: "",
    source_code_link: "",
  },
  {
    name: "Technician App (Havells)",
    description:
      "Technician-facing app that optimizes service job assignments, workflow tracking, and real-time field updates. Backend and database schema were designed from scratch for live operations.",
    tags: [
      { name: "django", color: "blue-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
      { name: "rest-api", color: "pink-text-gradient" },
      { name: "react-native", color: "orange-text-gradient" },
    ],
    image: technician,
    live_link: "",
    source_code_link: "",
  },
  {
    name: "SkyCRM",
    description:
      "Centralized CRM integrating IVR, ACD, omnichannel support (email, chat, social), analytics, and workforce management — including live call monitoring and in-depth reporting.",
    tags: [
      { name: "django", color: "blue-text-gradient" },
      { name: "mysql", color: "green-text-gradient" },
      { name: "mqtt", color: "pink-text-gradient" },
    ],
    image: skycrm,
    live_link: "https://creditfair.skycrm.app/",
    source_code_link: "",
  },
  {
    name: "Spreading Knowledge",
    description:
      "Full-stack e-learning platform similar to UpGrad, with course browsing, user progress tracking, secure authentication, and payment integration using Django, React.js, and REST APIs.",
    tags: [
      { name: "django", color: "blue-text-gradient" },
      { name: "react", color: "green-text-gradient" },
      { name: "rest-api", color: "pink-text-gradient" },
    ],
    image: spreadingknowledge,
    live_link: "http://spreadingknowledge.in/",
    source_code_link: "",
  },
];

export {
  services,
  technologies,
  skillCategories,
  experiences,
  awards,
  projects,
};
