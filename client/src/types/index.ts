export interface Skill {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  titleColor: string;
  borderColor: string;
  items: Array<{ text: string; bulletColor: string }>;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  imageUrl: string;
  projectUrl: string;
  caseStudyUrl: string;
  category: string;
  titleColor: string;
  borderColor: string;
  primaryBtnColor: string;
  secondaryBtnColor: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  titleColor: string;
  borderColor: string;
  accentColor: string;
  checkColor: string;
  hoverColor: string;
  features: string[];
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}