export interface FilterProps {
  filter: string;
  options: string[];
}

const Budget: string[] = ["low", "mid", "high"];

const JobCategory: string[] = [
  "Fashion designer",
  "Carpenter",
  "Electrician",
  "Mechanic",
  "Others",
];

const JobDuration: string[] = [
  "a week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months+",
  "others",
];

const Duration: string[] = [
  "Week(s)",
  "Month(s)",
  "Year(s)",
]

const ExperienceLevel: string[] = [
  "BEGINNER",
  "INTERMEDIATE",
  "EXPERT"
]

const Rating: string[] = [
  "1 star",
  "2 stars",
  "3 stars",
  "4 stars",
  "5 stars"
]

const JobHistory: string[] = [
  "No Employment",
  "1-9 Employments",
  "10+ Employments"
]

const Location: string[] = [
  "Nigeria",
  "United States",
  "Others"
]
const Language: string[] = [
  "English",
  "Yoruba",
  "Hausa",
  "French",
  "Igbo",
  "Arabic",
  "Others"
]


const JobType: string[] = [
  "Fixed Price",
  "Negotiable Price"
]

const Deadline: string[] = [
  "1-3 days left",
  "4-7 days left",
  "More than 7 days left"
]

export const ArtisanCategory: FilterProps = {
  filter: "Artisan Category",
  options: JobCategory
}

export const LevelOfExperience: FilterProps = {
  filter: "Level of Experience",
  options: ExperienceLevel
}

export const PreferedLanguage: FilterProps = {
  filter: "Prefered Language",
  options: Language
}

export const Timeline: FilterProps = {
  filter: "",
  options: Duration
}

export const ArtisanLocation: FilterProps = {
  filter: "Preferred Location",
  options: Location
}


export const filters: FilterProps[] = [
  {
    filter: "Budget",
    options: Budget,
  },
  {
    filter: "Job Category",
    options: JobCategory,
  },
  {
    filter: "Job Duration",
    options: JobDuration,
  },
  {
    filter: "Experience Level",
    options: ExperienceLevel,
  },
  {
    filter: "Client Rating",
    options: Rating,
  },
  {
    filter: "Client Job History",
    options: JobHistory,
  },
  {
    filter: "Location",
    options: Location,
  },
];


export const appliedJobFilters:  FilterProps[] = [
  {
    filter: "Status",
    options: JobDuration,
  },
  {
    filter: "Job Type",
    options: JobType,
  },
  {
    filter: "Sort By",
    options: ExperienceLevel,
  },
  {
    filter: "Deadline",
    options: Deadline,
  },
  {
    filter: "Location",
    options: Location,
  },
];