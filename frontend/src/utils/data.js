import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
} from "lucide-react";

export const jobSeekerFeatures = [
  {
    icon: Search, // You can import icons from lucide-react or react-icons
    title: "Smart Job Matching",
    description:
      "AI-powered system matches your skills and preferences with the most relevant job openings.",
  },
  {
    icon: FileText,
    title: "Advanced Job Search",
    description:
      "Filter opportunities by location, experience, and role to find the perfect job faster.",
  },
  {
    icon: MessageSquare,
    title: "Resume Builder",
    description:
      "Create a professional resume instantly using templates tailored to your industry.",
  },
  {
    icon: Award,
    title: "Instant Job Alerts",
    description:
      "Get notified the moment a job that fits your profile is posted.",
  },
];

export const employerFeatures = [
  {
    icon: Users,
    title: "AI Talent Matching",
    description:
      "Find top candidates instantly with AI-powered skill and experience matching.",
  },
  {
    icon: BarChart3,
    title: "Smart Job Posting",
    description:
      "Create optimized job listings that attract the most relevant applicants automatically.",
  },
  {
    icon: Shield,
    title: "Recruitment Analytics",
    description:
      "Track performance metrics like application rates, time-to-hire, and candidate engagement.",
  },
  {
    icon: Clock,
    title: "Instant Chat & Interview",
    description:
      "Communicate with candidates directly and schedule interviews seamlessly.",
  },
];

// Navigation items configuration
export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "post-jobs",
    name: "Post Job",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "Manage Job",
    icon: Briefcase,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
  },
];

// Categories and job types
export const CATEGORIES = [
  { value: "Engineering", label: "Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Design", label: "Design" },
  { value: "Sales", label: "Sales" },
  { value: "IT & Software", label: "IT & Software" },
  { value: "Marketing", label: "Marketing" },
  { value: "Customer-service", label: "Customer Service" },
  { value: "Finance", label: "Finance" },
  { value: "HR", label: "Human Resources" },
  { value: "Other", label: "Other" },
];

export const JOB_TYPES = [
  { value: "Remote", label: "Remote" },
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

export const SALARY_RANGES = [
  "Less than $50,000",
  "$50,000 - $100,000",
  "More than $100,000",
];
