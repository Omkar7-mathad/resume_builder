export const initialResumeData = {
  resumeTitle: "Alex Rivera - Full Stack Engineer",
  personalInfo: {
    fullName: "Alex Rivera",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
    linkedin: "linkedin.com/in/alex-rivera",
    github: "github.com/alexrivera",
    summary: "Innovative Full Stack Software Engineer with 6+ years of experience building scalable web applications, cloud microservices, and reactive user interfaces. Skilled in React, Node.js, TypeScript, and AWS. Proven track record of improving system performance by 40% and leading high-performing agile engineering teams."
  },
  workExperience: [
    {
      id: "exp-1",
      company: "Apex Tech Solutions",
      jobTitle: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      currentlyWorking: true,
      description: "• Architected and deployed micro-frontend architecture using React and Vite, reducing initial load times by 45% across core customer portals.\n• Led a cross-functional team of 6 engineers to launch a real-time analytics dashboard servicing 100k+ daily active users.\n• Optimized PostgreSQL query performance and Redis caching strategy, cutting API response latency from 320ms to 85ms."
    },
    {
      id: "exp-2",
      company: "CloudScale Systems",
      jobTitle: "Software Engineer",
      location: "San Jose, CA",
      startDate: "2019-06",
      endDate: "2022-02",
      currentlyWorking: false,
      description: "• Developed scalable RESTful APIs and GraphQL endpoints using Node.js, Express, and Docker deployed on AWS ECS.\n• Implemented automated CI/CD pipelines via GitHub Actions, reducing deployment errors by 30%.\n• Mentored 3 junior developers and conducted code reviews to enforce software design best practices."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "Berkeley, CA",
      startDate: "2015-08",
      endDate: "2019-05",
      grade: "3.8 / 4.0 GPA"
    }
  ],
  skills: {
    technical: ["React", "TypeScript", "JavaScript (ES6+)", "Node.js", "Express", "Python", "GraphQL", "PostgreSQL", "MongoDB", "Docker", "AWS", "Git"],
    soft: ["Engineering Leadership", "System Architecture", "Agile/Scrum", "Code Review", "Problem Solving", "Technical Writing"]
  },
  projects: [
    {
      id: "proj-1",
      title: "FlowMetrics - Realtime Developer Analytics",
      technologies: "React, Node.js, WebSockets, Tailwind CSS, Redis",
      link: "github.com/alexrivera/flowmetrics",
      description: "Built an open-source real-time developer productivity monitor with interactive D3.js visualization charts, custom WebSockets streaming, and multi-tenant authentication."
    },
    {
      id: "proj-2",
      title: "TaskPulse - Collaborative Workspace App",
      technologies: "Next.js, TypeScript, Prisma, PostgreSQL",
      link: "taskpulse.app",
      description: "Created a modern task management application featuring drag-and-drop Kanban boards, team permissions, and automated email notifications."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "2023"
    },
    {
      id: "cert-2",
      name: "Certified ScrumMaster (CSM)",
      issuer: "Scrum Alliance",
      date: "2021"
    }
  ]
};

export const emptyResumeData = {
  resumeTitle: "My Resume",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: ""
  },
  workExperience: [],
  education: [],
  skills: {
    technical: [],
    soft: []
  },
  projects: [],
  certifications: []
};
