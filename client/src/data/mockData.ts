// Dados estáticos para a aplicação
import { Skill, Project, Service } from "../types";

export const skills: Skill[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Creating responsive, interactive user interfaces with modern technologies.",
    icon: "fas fa-code",
    iconColor: "neon-blue", 
    titleColor: "neon-blue",
    borderColor: "neon-blue",
    items: [
      { text: "HTML5, CSS3, JavaScript (ES6+)", bulletColor: "neon-pink" },
      { text: "React, Next.js, Vue.js", bulletColor: "neon-green" },
      { text: "Tailwind CSS, SASS, Styled Components", bulletColor: "neon-blue" }
    ]
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Crafting visually stunning and intuitive user experiences.",
    icon: "fas fa-paint-brush",
    iconColor: "neon-green",
    titleColor: "neon-green",
    borderColor: "neon-green",
    items: [
      { text: "Figma, Adobe XD, Sketch", bulletColor: "neon-pink" },
      { text: "User Research & Wireframing", bulletColor: "neon-green" },
      { text: "Animation & Micro-interactions", bulletColor: "neon-blue" }
    ]
  },
  {
    id: 3,
    title: "Backend Integration",
    description: "Connecting frontend interfaces to powerful backend systems.",
    icon: "fas fa-server",
    iconColor: "neon-pink",
    titleColor: "neon-pink",
    borderColor: "neon-pink",
    items: [
      { text: "RESTful APIs & GraphQL", bulletColor: "neon-pink" },
      { text: "Node.js, Express, Firebase", bulletColor: "neon-green" },
      { text: "Authentication & Data Management", bulletColor: "neon-blue" }
    ]
  },
  {
    id: 4,
    title: "Mobile Development",
    description: "Building cross-platform mobile applications with modern frameworks.",
    icon: "fas fa-mobile-alt",
    iconColor: "neon-yellow",
    titleColor: "neon-yellow",
    borderColor: "neon-yellow",
    items: [
      { text: "React Native, Expo", bulletColor: "neon-pink" },
      { text: "Progressive Web Apps (PWA)", bulletColor: "neon-green" },
      { text: "Native UI Components & Animations", bulletColor: "neon-blue" }
    ]
  },
  {
    id: 5,
    title: "Development Tools",
    description: "Leveraging modern tools for efficient and collaborative development.",
    icon: "fas fa-cogs",
    iconColor: "digital-orange",
    titleColor: "digital-orange",
    borderColor: "digital-orange",
    items: [
      { text: "Git, GitHub, GitLab", bulletColor: "neon-pink" },
      { text: "Webpack, Vite, Babel", bulletColor: "neon-green" },
      { text: "CI/CD, Docker, Testing Frameworks", bulletColor: "neon-blue" }
    ]
  },
  {
    id: 6,
    title: "Creative Technologies",
    description: "Implementing cutting-edge creative technologies for unique experiences.",
    icon: "fas fa-layer-group",
    iconColor: "electric-purple",
    titleColor: "electric-purple",
    borderColor: "electric-purple",
    items: [
      { text: "WebGL, Three.js, GSAP", bulletColor: "neon-pink" },
      { text: "Canvas API, SVG Animations", bulletColor: "neon-green" },
      { text: "Parallax Effects, Particle Systems", bulletColor: "neon-blue" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Neon City E-commerce",
    description: "A futuristic e-commerce platform with cyberpunk aesthetics",
    technologies: "React, Next.js, Tailwind CSS",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    projectUrl: "#",
    caseStudyUrl: "#",
    category: "websites",
    titleColor: "neon-blue",
    borderColor: "neon-blue",
    primaryBtnColor: "neon-pink",
    secondaryBtnColor: "neon-green"
  },
  {
    id: 2,
    title: "Digital Portfolio",
    description: "Interactive portfolio showcasing creative works with immersive experiences",
    technologies: "Vue.js, GSAP, Three.js",
    imageUrl: "https://images.unsplash.com/photo-1551817958-d9d86fb29431",
    projectUrl: "#",
    caseStudyUrl: "#",
    category: "websites",
    titleColor: "neon-pink",
    borderColor: "neon-pink",
    primaryBtnColor: "neon-blue",
    secondaryBtnColor: "neon-yellow"
  },
  {
    id: 3,
    title: "AR Product Viewer",
    description: "Augmented reality application for visualizing products in real spaces",
    technologies: "React Native, AR.js, Three.js",
    imageUrl: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
    projectUrl: "#",
    caseStudyUrl: "#",
    category: "mobile",
    titleColor: "neon-green", 
    borderColor: "neon-green",
    primaryBtnColor: "neon-yellow",
    secondaryBtnColor: "neon-pink"
  },
  {
    id: 4,
    title: "Motion Design System",
    description: "Comprehensive design system with animated components and interactions",
    technologies: "Figma, GSAP, React",
    imageUrl: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f",
    projectUrl: "#",
    caseStudyUrl: "#",
    category: "ui/ux",
    titleColor: "neon-yellow",
    borderColor: "neon-yellow",
    primaryBtnColor: "neon-green",
    secondaryBtnColor: "neon-blue"
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Creating responsive, interactive web interfaces with modern frameworks and optimal performance.",
    icon: "fas fa-code",
    titleColor: "neon-blue",
    borderColor: "neon-blue",
    accentColor: "neon-pink",
    checkColor: "neon-green",
    hoverColor: "neon-pink",
    features: [
      "React & Vue.js development",
      "Responsive UIs & CSS frameworks",
      "Performance optimization"
    ]
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Crafting beautiful user interfaces and experiences that engage and delight users while meeting business goals.",
    icon: "fas fa-paint-brush",
    titleColor: "neon-pink",
    borderColor: "neon-pink",
    accentColor: "neon-blue",
    checkColor: "neon-green",
    hoverColor: "neon-pink",
    features: [
      "User research & experience strategy",
      "Wireframing, prototyping & user flows",
      "Visual design & interactive prototypes"
    ]
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Building cross-platform mobile applications with native-like performance and user experience.",
    icon: "fas fa-mobile-alt",
    titleColor: "neon-green",
    borderColor: "neon-green",
    accentColor: "neon-yellow",
    checkColor: "neon-pink",
    hoverColor: "neon-yellow",
    features: [
      "React Native & Expo development",
      "Native UI components & animations",
      "App store submission & optimization"
    ]
  },
  {
    id: 4,
    title: "Creative Web Experiences",
    description: "Developing immersive web experiences with cutting-edge animation and interaction technologies.",
    icon: "fas fa-code-branch",
    titleColor: "neon-yellow",
    borderColor: "neon-yellow",
    accentColor: "digital-orange",
    checkColor: "neon-pink",
    hoverColor: "neon-pink",
    features: [
      "WebGL & Three.js 3D experiences",
      "Advanced animations & micro-interactions",
      "Interactive storytelling & parallax effects"
    ]
  }
];