import type { PortfolioContent } from './types.js';

/**
 * Single source of truth for every word and link on the site.
 *
 * Rules kept while editing this file:
 *  - No invented employers, metrics, testimonials, demo links or credential IDs.
 *  - AngularJS experience is never described as Angular.
 *  - The three Ultimate Solutions workstreams belong to one Backend Developer role.
 */
export const content: PortfolioContent = {
  meta: {
    name: 'Mostafa Atef Mohamed',
    role: '.NET Backend Developer',
    monogram: 'MA',
  },

  seo: {
    title: 'Mostafa Atef Mohamed | .NET Backend Developer',
    description:
      '.NET Backend Developer based in Cairo, building RESTful APIs, multi-tenant SaaS platforms, ERP, and POS systems with ASP.NET Core, PostgreSQL, and MongoDB.',
    siteName: 'Mostafa Atef Mohamed',
    // Left blank on purpose: no production domain exists yet. Fill this in to
    // switch on <link rel="canonical">, og:url and structured-data `url`.
    canonicalUrl: 'https://MostafaAtef4.github.io/portfolio/',
  },

  nav: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  // The CV PDF was not supplied with this build. Drop
  // `Mostafa-Atef-Mohamed-CV.pdf` into `static/` and set this object to
  // { file: 'Mostafa-Atef-Mohamed-CV.pdf', downloadName: 'Mostafa-Atef-Mohamed-CV.pdf' }
  // to render the header and hero download buttons.
  cv: {
    file: 'assets/Mostafa-Atef-MohamedCV.pdf',
    downloadName: 'Mostafa-Atef-Mohamed-CV.pdf',
  },

  hero: {
    eyebrow: '.NET Backend Developer',
    name: 'Mostafa Atef Mohamed',
    headline: 'Building reliable backends for complex business systems.',
    paragraph:
      'I build RESTful APIs and multi-tenant applications using ASP.NET Core, Entity Framework Core, PostgreSQL, and MongoDB, with experience across ERP, POS, and clinic management systems.',
    primaryAction: { label: 'Explore my projects', href: '#projects' },
    location: 'Nasr City, Cairo, Egypt',
  },

  about: {
    number: '01',
    heading: 'Practical experience. Structured engineering.',
    intro:
      'I am a .NET Backend Developer with a background in technical support and production troubleshooting. I specialize in building maintainable backend systems using ASP.NET Core, Entity Framework Core, and relational and document databases. My work includes multi-tenant ERP platforms, point-of-sale systems, and clinic management applications.',
    themes: [
      {
        title: 'Business-focused development',
        body: 'Experience with Sales, Accounting, Warehouse, Purchase, HR, and POS workflows.',
      },
      {
        title: 'Maintainable backend architecture',
        body: 'Experience applying Clean Architecture, Repository Pattern, Unit of Work, DTOs, validation, and object mapping.',
      },
      {
        title: 'Production awareness',
        body: 'A technical support background covering deployment, database troubleshooting, reporting, and resolving live system issues.',
      },
    ],
  },

  experience: {
    number: '02',
    heading: 'Experience',
    intro:
      'Two roles at the same company, moving from supporting live systems to building them.',
    roles: [
      {
        title: 'Backend Developer',
        employer: 'Ultimate Solutions',
        period: 'June 2024 — Present',
        workstreamsNote:
          'Three products I work on within this role, not separate positions.',
        workstreams: [
          {
            name: 'FERP — Legacy ERP System',
            summary: 'Full-stack work on a live ERP running ASP.NET MVC and AngularJS.',
            points: [
              'Maintained and extended a live ERP system using ASP.NET MVC on .NET Framework 4.6 and AngularJS.',
              'Worked across Sales, Warehouse, Accounting, and HR modules.',
              'Implemented business screens and workflows.',
              'Enhanced backend logic and SQL operations.',
              'Built and customized Stimulsoft reports.',
              'Resolved production issues affecting business processes.',
            ],
          },
          {
            name: 'POSFerp — Point of Sale System',
            summary: 'An ASP.NET Core 6 and MongoDB backend serving POS operations.',
            points: [
              'Developed and enhanced a backend using ASP.NET Core 6 Web API and MongoDB.',
              'Designed RESTful APIs supporting POS operations and Flutter mobile integration.',
              'Optimized transactional data handling.',
              'Resolved production issues to improve stability and performance.',
            ],
          },
          {
            name: 'FERP V2 — SaaS ERP Platform',
            summary: 'A multi-tenant rebuild on ASP.NET Core, EF Core, and PostgreSQL.',
            points: [
              'Led backend development work for a SaaS ERP system covering POS, Sales, Accounting, Warehouse, and HR.',
              'Built RESTful APIs using ASP.NET Core, EF Core, and PostgreSQL.',
              'Applied Clean Architecture and multi-tenant design.',
              'Used DTOs, Unit of Work, and FluentValidation.',
              'Integrated RabbitMQ for inter-module communication and automated stock workflows.',
              'Worked on deployment, Stimulsoft reporting, performance optimization, and production support.',
            ],
          },
        ],
      },
      {
        title: 'Technical Support Engineer',
        employer: 'Ultimate Solutions',
        period: 'July 2022 — May 2024',
        points: [
          'Performed manual testing and investigated application and database issues.',
          'Installed, configured, and deployed web applications using IIS.',
          'Set up and supported SQL Server and MongoDB databases.',
          'Diagnosed database issues and maintained data integrity.',
          'Customized client reports using Stimulsoft Report Editor.',
          'Supported client onboarding, implementation, and troubleshooting.',
          'Collaborated with other teams to improve usability and resolve issues.',
        ],
      },
    ],
  },

  projects: {
    number: '03',
    heading: 'Selected projects',
    intro:
      'Business systems I have built or extended, with what I contributed to each.',
    items: [
      {
        id: 'ferp-v2',
        name: 'FERP V2 / FERP ERP',
        category: 'Multi-Tenant SaaS ERP',
        description:
          'A multi-module ERP platform for restaurant operations, covering Sales, Accounting, Warehouse, Purchase, HR, and POS.',
        contribution:
          'Backend API development, multi-tenant architecture, business workflows, messaging integration, reporting, deployment, and production support.',
        technologies: [
          'ASP.NET Core Web API',
          'Entity Framework Core',
          'PostgreSQL',
          'RabbitMQ',
          'FluentValidation',
          'AutoMapper',
          'Stimulsoft',
          'IIS',
        ],
        details: [
          {
            label: 'Architecture',
            items: [
              'Clean Architecture',
              'Repository Pattern',
              'Unit of Work',
              'DTOs',
              'Multi-tenant support',
            ],
          },
          {
            label: 'Modules covered',
            items: ['Sales', 'Accounting', 'Warehouse', 'Purchase', 'HR', 'POS'],
          },
        ],
        featured: true,
        visual: 'erp',
      },
      {
        id: 'posferp',
        name: 'POSFerp',
        category: 'Point of Sale Backend',
        description:
          'A point-of-sale backend supporting transactional operations and integration with a Flutter mobile application.',
        contribution:
          'RESTful API development, transactional data handling, performance optimization, and production troubleshooting.',
        technologies: ['ASP.NET Core 6 Web API', 'MongoDB'],
        notes: [
          'The Flutter mobile application was an integration target for these APIs. I did not develop the Flutter client.',
        ],
        featured: true,
        visual: 'pos',
      },
      {
        id: 'descliniques',
        name: 'DesCliniques',
        category: 'Clinic Management SaaS',
        description:
          'A multi-tenant clinic management platform that helps doctors manage patient records, appointments, consultations, and access permissions for sub-users.',
        contribution:
          'Backend APIs, data access, complex querying, and object mapping.',
        technologies: [
          'ASP.NET Core Web API',
          'Entity Framework Core',
          'PostgreSQL',
          'LINQ',
          'Mapster',
        ],
        details: [
          {
            label: 'Patterns',
            items: ['Repository Pattern', 'Unit of Work'],
          },
        ],
        featured: true,
        visual: 'clinic',
      },
      {
        id: 'surveybasket',
        name: 'SurveyBasket API',
        category: 'Surveys and Questionnaires',
        description:
          'A polling and questionnaire API that enables users to create and manage surveys, questions, and responses.',
        contribution: 'Backend API development and data access.',
        technologies: [
          'ASP.NET Core Web API',
          'Entity Framework Core',
          'PostgreSQL',
          'LINQ',
          'Mapster',
          'FluentValidation',
          'Stimulsoft',
        ],
        featured: false,
      },
      {
        id: 'restaurant-crud',
        name: 'Restaurant CRUD API',
        category: 'Restaurant Operations API',
        description:
          'A backend API for managing restaurant menus, orders, and analytics.',
        contribution: 'Backend API development and data access.',
        technologies: [
          'ASP.NET Core',
          'Entity Framework Core',
          'PostgreSQL',
          'LINQ',
          'Swagger',
          'Postman',
        ],
        featured: false,
      },
    ],
  },

  skills: {
    number: '04',
    heading: 'Technical skills',
    intro: 'Grouped by what I use them for, with the weight on backend work.',
    groups: [
      {
        label: 'Backend',
        skills: [
          'C#',
          'ASP.NET Core Web API',
          'ASP.NET MVC',
          'RESTful APIs',
          'LINQ',
          'Entity Framework / EF Core',
        ],
      },
      {
        label: 'Architecture and patterns',
        skills: [
          'OOP',
          'Clean Architecture',
          'Repository Pattern',
          'Unit of Work',
          'DTOs',
          'Multi-tenancy',
        ],
      },
      {
        label: 'Databases',
        skills: ['SQL Server', 'PostgreSQL', 'MongoDB'],
      },
      {
        label: 'Messaging and backend capabilities',
        skills: [
          'RabbitMQ',
          'MassTransit',
          'gRPC',
          'Background jobs',
          'Logging',
          'Caching',
          'CORS',
        ],
      },
      {
        label: 'Validation and mapping',
        skills: ['FluentValidation', 'AutoMapper', 'Mapster'],
      },
      {
        label: 'Frontend experience',
        skills: ['JavaScript', 'AngularJS', 'HTML', 'CSS'],
      },
      {
        label: 'Deployment, reporting, and collaboration',
        skills: ['IIS', 'Linux', 'Stimulsoft', 'Swagger', 'Postman', 'Agile', 'Trello'],
      },
    ],
  },

  education: {
    number: '05',
    heading: 'Education and certificates',
    education: {
      degree: "Bachelor's Degree — Faculty of Computer and Information",
      institution: 'Menoufia University',
      period: '2016 — 2020',
      grade: 'Good',
    },
    certificates: [
      { name: 'Open Source Web Development', issuer: 'ITI' },
      { name: 'Web Design', issuer: 'NTI' },
    ],
    languages: ['Arabic', 'English'],
  },

  contact: {
    number: '06',
    heading: "Let's discuss your next backend project.",
    intro:
      'For backend development opportunities, ERP and SaaS projects, or technical collaboration, feel free to get in touch.',
    details: {
      email: 'mostafaatef6066@gmail.com',
      phoneDisplay: '01022163403',
      phoneHref: 'tel:+201022163403',
      location: 'Nasr City, Cairo, Egypt',
      linkedin: 'https://www.linkedin.com/in/mostafa-atef-204m/',
      github: 'https://github.com/MostafaAtef4',
    },
  },
};
