import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // Create skills
    const skills = [
      {
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

    for (const skill of skills) {
      await db.insert(schema.skills).values(skill).onConflictDoNothing();
    }

    // Create projects
    const projects = [
      {
        title: "Neon City E-commerce",
        description: "A futuristic e-commerce platform with cyberpunk aesthetics",
        technologies: "React, Next.js, Tailwind CSS",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "websites",
        titleColor: "neon-blue",
        borderColor: "neon-blue",
        primaryBtnColor: "neon-blue",
        secondaryBtnColor: "neon-pink"
      },
      {
        title: "Cyber Beats Music App",
        description: "A music streaming application with Y2K aesthetics",
        technologies: "React Native, Redux, WebAudio API",
        imageUrl: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "mobile",
        titleColor: "neon-green",
        borderColor: "neon-green",
        primaryBtnColor: "neon-green",
        secondaryBtnColor: "neon-pink"
      },
      {
        title: "Quantum Dashboard",
        description: "An admin dashboard with data visualization",
        technologies: "Vue.js, D3.js, Firebase",
        imageUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "ui/ux",
        titleColor: "neon-pink",
        borderColor: "neon-pink",
        primaryBtnColor: "neon-pink",
        secondaryBtnColor: "neon-blue"
      },
      {
        title: "Neural Chat Interface",
        description: "A real-time chat application with AI features",
        technologies: "TypeScript, WebSockets, Three.js",
        imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "websites",
        titleColor: "neon-yellow",
        borderColor: "neon-yellow",
        primaryBtnColor: "neon-yellow",
        secondaryBtnColor: "neon-green"
      },
      {
        title: "VR Portfolio Experience",
        description: "An immersive portfolio website with VR capabilities",
        technologies: "A-Frame, React, WebXR API",
        imageUrl: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "ui/ux",
        titleColor: "digital-orange",
        borderColor: "digital-orange",
        primaryBtnColor: "digital-orange",
        secondaryBtnColor: "neon-blue"
      },
      {
        title: "Cyberpunk Blog Template",
        description: "A futuristic blog template with cyberpunk aesthetics",
        technologies: "Gatsby.js, GraphQL, GSAP",
        imageUrl: "https://images.unsplash.com/photo-1560415755-bd80d06eda60",
        projectUrl: "#",
        caseStudyUrl: "#",
        category: "websites",
        titleColor: "electric-purple",
        borderColor: "electric-purple",
        primaryBtnColor: "electric-purple",
        secondaryBtnColor: "neon-yellow"
      }
    ];

    for (const project of projects) {
      await db.insert(schema.projects).values(project).onConflictDoNothing();
    }

    // Create services
    const services = [
      {
        title: "Frontend Development",
        description: "Transforming designs into responsive, interactive websites with clean, maintainable code.",
        icon: "fas fa-laptop-code",
        titleColor: "neon-pink",
        borderColor: "neon-pink",
        accentColor: "neon-blue",
        checkColor: "neon-green",
        hoverColor: "neon-blue",
        features: [
          "Modern JavaScript frameworks (React, Vue, Angular)",
          "Responsive layouts & Progressive Web Apps",
          "Performance optimization & accessibility"
        ]
      },
      {
        title: "UI/UX Design",
        description: "Creating visually stunning interfaces with intuitive user experiences that engage and delight.",
        icon: "fas fa-paint-brush",
        titleColor: "neon-blue",
        borderColor: "neon-blue",
        accentColor: "neon-green",
        checkColor: "neon-green",
        hoverColor: "neon-pink",
        features: [
          "User research & experience strategy",
          "Wireframing, prototyping & user flows",
          "Visual design & interactive prototypes"
        ]
      },
      {
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

    for (const service of services) {
      await db.insert(schema.services).values(service).onConflictDoNothing();
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
