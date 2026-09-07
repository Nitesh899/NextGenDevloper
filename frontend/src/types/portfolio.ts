import type { ReactNode } from "react";

export interface SiteSettings {
  id: number;
  site_name: string;
  tagline: string;
  description: string;

  email: string;
  phone: string;

  address: string;

  logo: string | null;
  favicon: string | null;

  facebook_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  twitter_url: string | null;

  is_active: boolean;
}


export interface HomeContent {
  id: number;

  title: string;
  subtitle: string;
  description: string;

  primary_button_text: string;
  primary_button_url: string;

  secondary_button_text: string;
  secondary_button_url: string;

  hero_image: string | null;

  is_active: boolean;
}


export interface Technology {
  icon_name: string | null;
  category: ReactNode;
  id: number;

  name: string;
  slug: string;

  description: string;

  icon: string | null;

  website_url: string | null;

  display_order: number;

  is_active: boolean;
}


export interface Roadmap {
  is_completed: any;
  id: number;

  title: string;
  description: string;

  status: string;

  target_date: string | null;

  display_order: number;

  is_active: boolean;
}


export interface AboutPage {
  id: number;

  title: string;
  subtitle: string;
  short_description:string;
  description: string;
  

  profile_image: string | null;

  mission: string;
  vision: string;

  years_of_experience: number;
  projects_completed: number;
  clients_served: number;
  technologies_count: number;

  is_active: boolean;
}


export interface Skill {
  id: number;

  name: string;
  category: string;

  proficiency: number;

  icon: string | null;

  display_order: number;

  is_active: boolean;
}


export interface Experience {
  id: number;

  company_name: string;
  job_title: string;

  description: string;

  location: string;

  start_date: string;
  end_date: string | null;

  is_current: boolean;

  company_logo: string | null;

  display_order: number;

  is_active: boolean;
}


export interface Service {
  name: string;
  
  id: number;
  title:string;
  slug: string;

  short_description: string;
  description: string;

  icon: string | null;

  category: string;

  status: string;

  display_order: number;
}


export interface ServiceFeature {
  id: number;

  service: number;

  title: string;
  description: string;

  icon: string | null;

  display_order: number;

  is_active: boolean;
}


export interface ServiceProcess {
  id: number;

  service: number;

  step_number: number;

  title: string;
  description: string;

  is_active: boolean;
}


export interface Project {
  id: number;

  title: string;
  slug: string;

  short_description: string;
  description: string;

  category: string;

  client_name: string | null;
  client_company: string | null;

  thumbnail: string | null;

  gallery_image_1: string | null;
  gallery_image_2: string | null;
  gallery_image_3: string | null;

  technologies: string | string[] ;

  features: string[];

  github_url: string | null;
  live_url: string | null;
  demo_url: string | null;
  documentation_url: string | null;

  status: string;

  start_date: string | null;
  end_date: string | null;

  featured: boolean;
  is_active: boolean;

  display_order: number;
}


export interface BlogCategory {
  id: number;

  name: string;
  slug: string;

  description: string;

  is_active: boolean;
}


export interface BlogTag {
  id: number;

  name: string;
  slug: string;
}


export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category: number | null;
  tags: number[];
  author: number | null;
  status: string;
  is_featured: boolean;
  is_active: boolean;
  reading_time: number;
  views_count: number;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
}


export interface BlogSEO {
  id: number;

  post: number;

  meta_title: string;
  meta_description: string;

  keywords: string;

  og_title: string;
  og_description: string;
  og_image: string | null;
}


export interface CareerDepartment {
  id: number;

  name: string;
  slug: string;

  description: string;

  is_active: boolean;
}


export interface JobOpening {
  id: number;

  title: string;
  slug: string;

  department: number | null;

  short_description: string;
  description: string;

  responsibilities: string;
  requirements: string;
  preferred_qualifications: string;

  required_skills: string;
  benefits: string;

  employment_type: string;
  work_mode: string;

  experience: string;
  location: string;

  salary: string;

  application_url: string | null;
  application_email: string | null;

  application_deadline: string | null;

  status: string;

  featured: boolean;

  display_order: number;

  created_at: string;
}

export interface Testimonial {
  id: number;
  client_photo: string | null;
  client_name: string;
  client_designation: string;
  company_name: string;
  company_website: string;
  testimonial: string;
  rating: number;
  project_name: string;
  status: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}


/**
 * Complete response from:
 *
 * GET /api/portfolio/
 */
export interface PortfolioData {
  site_settings: SiteSettings | null;

  home: HomeContent | null;

  technologies: Technology[];

  roadmap: Roadmap[];

  about: AboutPage | null;

  skills: Skill[];

  experience: Experience[];

  services: Service[];

  service_features: ServiceFeature[];

  service_processes: ServiceProcess[];

  projects: Project[];

  blog_categories: BlogCategory[];

  blog_tags: BlogTag[];

  blog_posts: BlogPost[];

  blog_seo: BlogSEO[];

  career_departments: CareerDepartment[];

  job_openings: JobOpening[];

  testimonials: Testimonial[];
}