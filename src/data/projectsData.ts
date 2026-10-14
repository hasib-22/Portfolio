
export interface TechDecision {
  decision: string;
  reason: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  gitHub_link: string;
  live_link: string;
  colors: string[];
  role: string;
  problem: string;
  solution: string;
  outcomes: string[];
  challenges: string[];
  techDecisions: TechDecision[];
  architectureOverview: string;
  duration: string;
  teamSize: number;
  featured: boolean;
  highlights?: string[];
  upcomingFeatures?: string[];
}

export const projects: Project[] = [
  {
    title: "Edu-Matrix",
    slug: "edu-matrix",
    description:
      "A role-based education and institution-management platform that brings institution administration, course discovery, teacher assignments, student enrollment, and course payments into one application.",
    image: "https://i.ibb.co.com/nsGKXmQN/Screenshot-2026-10-14-161118.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "TanStack Query",
      "Stripe",
      "Tailwind CSS",
      "Zod",
    ],
    gitHub_link: "https://github.com/Adi-ops16/Edu-Matrix",
    live_link: "https://edu-matrix-weld.vercel.app/",
    colors: ["blue", "indigo", "white", "gray"],
    role: "Full stack Developer",
    problem:
      "Education workflows such as managing institutions, departments, courses, and student payments can be scattered across separate tools, making it harder for administrators, teachers, and students to manage their work.",
    solution:
      "Built a role-based education platform with separate workspaces for super admins, institution admins, teachers, and students, backed by typed API integrations and protected dashboard routes.",
    highlights: [
      "Role-specific dashboards and access-controlled routes",
      "Institution and department management, including applications and memberships",
      "Course creation, course details, and teacher assignments",
      "Student course discovery, enrollment views, and payment history",
      "Stripe checkout flow for course payments",
      "Credential registration, email verification, and Google OAuth sign-in",
    ],
    outcomes: [
      "Created distinct academic workflows for four user roles",
      "Connected frontend features to typed API functions and TanStack Query hooks",
      "Added form validation with Zod and TanStack Form",
      "Implemented Stripe checkout redirects and student payment history",
    ],
    challenges: [
      "Keeping authorization and navigation consistent across role-specific dashboards",
      "Managing asynchronous API data and mutation-driven cache updates",
      "Coordinating authentication redirects and session handling across protected routes",
    ],
    techDecisions: [
      {
        decision: "Next.js App Router with TypeScript",
        reason:
          "Provides structured route layouts and typed frontend code for a multi-role application.",
      },
      {
        decision: "TanStack Query for server state",
        reason:
          "Centralizes API data fetching, caching, and mutation-related invalidation.",
      },
      {
        decision: "Zod with TanStack Form",
        reason:
          "Supports validated forms with reusable schemas and typed form data.",
      },
      {
        decision: "Stripe for course payments",
        reason:
          "Lets students complete checkout through Stripe and return to the application afterward.",
      },
    ],
    architectureOverview:
      "A Next.js App Router frontend uses typed API functions to communicate with a separate backend service. TanStack Query manages server state, while role guards protect dashboard routes. The application supports credential and Google OAuth authentication and redirects students to Stripe for course checkout.",
    duration: "1 month",
    teamSize: 1,
    featured: true,
    upcomingFeatures: [
      "Class scheduling with dates, times, and meeting links",
      "Class materials and announcements for students",
      "Teacher attendance tracking and class management",
    ],
  },
  {
    title: "Fix-it Now",
    slug: "fix-it-now",
    description:
      "A home-services marketplace that connects customers with local technicians. Customers can discover services, book technicians, track bookings, and manage payments, while technicians and admins use role-specific dashboards to manage the platform.",
    image: "https://i.ibb.co.com/gbk1rHWP/Screenshot-2026-10-14-160426.png",
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "shadcn/ui",
      "React Hook Form",
      "Zod",
      "JWT",
    ],
    gitHub_link: "https://github.com/Adi-ops16/Fix-it-now-frontend",
    live_link: "https://fix-it-now-frontend-one.vercel.app/",
    colors: ["blue", "slate", "white", "green"],
    role: "Fullstack Developer",
    problem:
      "Customers need a convenient way to find and book local home-service professionals, while technicians need tools to manage their services, availability, and incoming bookings.",
    solution:
      "Built a role-based marketplace frontend with public service discovery, customer booking and payment flows, technician management tools, and admin controls. The app uses Next.js App Router and integrates with a REST API for data and authentication.",
    outcomes: [
      "Created service browsing and detail pages to help customers explore available services",
      "Implemented customer booking management, booking details, cancellation, payment, and review flows",
      "Added technician tools for managing service listings, availability, and incoming bookings",
      "Built admin features for managing users and service categories",
      "Used reusable shadcn/ui components to keep the interface consistent and speed up UI development",
    ],
    challenges: [
      "Keeping customer, technician, and admin experiences appropriately separated with role-based access",
      "Coordinating booking status changes across customer and technician workflows",
      "Integrating authenticated frontend requests with an external REST API",
    ],
    techDecisions: [
      {
        decision: "Next.js App Router for the application structure",
        reason:
          "It supports the app's public pages, protected customer flows, and role-specific dashboards within one routing system.",
      },
      {
        decision: "shadcn/ui for reusable interface components",
        reason:
          "Its composable components provide consistent building blocks for forms, dialogs, tables, navigation, and other UI patterns.",
      },
      {
        decision: "React Hook Form and Zod for forms and validation",
        reason:
          "They provide structured form handling and schema-based validation for authentication and marketplace workflows.",
      },
      {
        decision: "JWT authentication stored in an httpOnly cookie",
        reason:
          "The frontend can authenticate requests to the REST API while keeping the access token unavailable to client-side JavaScript.",
      },
    ],
    architectureOverview:
      "A Next.js App Router frontend built with React, TypeScript, and Tailwind CSS communicates with an external REST API. Server actions and service utilities handle API requests, while JWT authentication supports protected customer, technician, and admin experiences.",
    duration: "1 month",
    teamSize: 1,
    featured: true,
  },
  {
    title: "Swift-Tix",
    slug: "swift-tix",
    description:
      "Swift-Tix is a full-stack Online Ticket Booking Platform built with the MERN stack. It enables users to discover, book, and securely pay for travel tickets including Bus, Train, Launch, and Plane services, with a robust role-based system and real-world booking workflows.",
    image: "https://i.ibb.co.com/Mx1sGcm0/Screenshot-2026-01-05-012118.png",
    tags: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT"],
    gitHub_link: "https://github.com/Adi-ops16/Swift-Tix-client",
    live_link: "https://assignment-11-2501.web.app/",
    colors: ["yellow", "orange", "gray", "green"],
    role: "Full-Stack Developer",
    problem:
      "Travelers in Bangladesh have to visit physical counters or use fragmented apps to book multi-modal transport tickets, leading to long queues, missed journeys, and no unified digital record of bookings.",
    solution:
      "A single-page MERN application with role-based dashboards (User, Vendor, Admin) that aggregates transport services, processes payments via Stripe, and issues downloadable e-tickets with QR codes.",
    outcomes: [
      "Reduced the end-to-end booking flow to under 3 minutes from browsing to payment confirmation",
      "Enabled vendors to publish routes and manage seat availability through their dashboard without developer intervention",
      "Provided an admin dashboard with booking analytics and revenue breakdowns, reducing manual spreadsheet reporting",
      "Implemented JWT-based authentication with refresh tokens to maintain secure sessions without frequent re-login",
    ],
    challenges: [
      "Preventing inconsistent seat availability when multiple users select or book seats concurrently",
      "Implementing role-based route guards on both client and server so vendor and admin endpoints are not accessible to ordinary users",
      "Handling Stripe webhook retries idempotently so payment confirmations are not processed more than once",
    ],
    techDecisions: [
      {
        decision: "MongoDB for persistence",
        reason:
          "Schema flexibility allowed iteration on booking models, transport types, and seat maps without costly migrations during development.",
      },
      {
        decision: "Stripe for payment processing",
        reason:
          "Stripe's webhook system provides asynchronous payment confirmation, decoupling booking creation from the payment outcome.",
      },
      {
        decision: "JWT with refresh tokens instead of server sessions",
        reason:
          "Stateless authentication supports horizontal scaling without a shared session store, while short-lived access tokens reduce the impact of token leakage.",
      },
    ],
    architectureOverview:
      "React SPA communicates with an Express REST API hosted on Firebase. MongoDB Atlas stores users, routes, bookings, and vendor profiles. Stripe handles payments and sends webhooks to the API to update booking status. Firebase Auth supports social login; JWT manages subsequent authenticated sessions.",
    duration: "6 weeks",
    teamSize: 1,
    featured: true,
  },
  {
    title: "Krishi-Link",
    slug: "krishi-link",
    description: "KrishiLink is a modern agricultural marketplace that connects farmers, traders, and consumers directly, empowering farmers to showcase crops, helping buyers discover fresh local produce, and encouraging sustainable farming practices across Bangladesh.",
    image: "https://i.ibb.co.com/LhsThgf0/Screenshot-2026-01-05-011409.png",
    tags: ["React", "Node.js", "MongoDB", "Express", "Firebase"],
    gitHub_link: "https://github.com/Adi-ops16/Krishi-Link-client",
    live_link: "https://assignment-10-46c35.web.app/",
    colors: ["blue", "green", "gray"],
    role: "Full-Stack Developer",
    problem: "Smallholder farmers in Bangladesh lack a direct digital channel to reach buyers, resulting in heavy reliance on middlemen who capture most of the value margin and leave farmers with below-market prices.",
    solution: "A marketplace web app where farmers post crop listings with photos and pricing, and buyers browse, filter, and directly contact sellers, removing intermediaries and increasing price transparency.",
    outcomes: [
      "Farmers can publish a new crop listing in under two minutes using the guided form",
      "Buyers can filter listings by crop type, region, and price range, reducing discovery time",
      "Real-time listing updates ensure out-of-stock crops are surfaced immediately rather than after a page reload",
    ],
    challenges: [
      "Building a performant image upload flow that compresses images client-side before storing them to keep hosting costs low",
      "Designing a search and filter system that remains fast as the listing count grows, using MongoDB compound indexes",
      "Handling unauthenticated browsing while restricting listing creation and direct messaging to verified accounts",
    ],
    techDecisions: [
      {
        decision: "Firebase Authentication for user identity",
        reason: "Firebase Auth handles email/password and Google OAuth out of the box, cutting auth implementation time and providing a battle-tested security layer.",
      },
      {
        decision: "MongoDB compound indexes on crop type + region",
        reason: "The primary browse interaction is filtering by category and location; compound indexes bring those query times below 10 ms even on larger datasets.",
      },
    ],
    architectureOverview: "React frontend deployed on Firebase Hosting. Express API on Render connects to MongoDB Atlas. Firebase Auth issues tokens that the Express API verifies on protected routes. Images are stored as URLs via ImgBB CDN to avoid egress costs.",
    duration: "4 weeks",
    teamSize: 1,
    featured: false,
  },
  {
    title: "Toy-verse",
    slug: "toy-verse",
    description: "Toy Verse is a modern, responsive toy store web application. Users can explore toys, view featured products, and manage authentication securely with Firebase, designed for a smooth and interactive shopping experience.",
    image: "https://i.ibb.co.com/N2DpqZys/Screenshot-2025-12-05-180706.png",
    tags: ["React.js", "Firebase", "Tailwind CSS", "Node.js", "MongoDB"],
    gitHub_link: "https://github.com/Adi-ops16/toy-verse",
    live_link: "https://my-toy-store-59c1e.web.app/",
    colors: ["green", "yellow", "sky"],
    role: "Frontend Developer",
    problem: "Small toy retailers lack an affordable, visually engaging online storefront that handles user accounts, product discovery, and a shopping experience without requiring expensive e-commerce platforms.",
    solution: "A React + Firebase SPA with a product catalogue backed by MongoDB, featuring category filtering, a featured-products carousel, and Firebase Auth for secure user sessions.",
    outcomes: [
      "Product pages load in under 1.5 seconds on a standard 4G connection due to lazy-loaded images",
      "Category filtering narrows a 50+ product catalogue to relevant items in a single interaction",
      "Firebase Auth integration provides social login without building a custom auth system",
    ],
    challenges: [
      "Implementing a responsive product grid that gracefully handles varying image aspect ratios without layout shift",
      "Synchronising the shopping cart state between local state and Firebase Firestore for logged-in users",
    ],
    techDecisions: [
      {
        decision: "Tailwind CSS for styling",
        reason: "Utility-first CSS enabled rapid UI iteration and consistent spacing/color tokens across components without writing custom CSS files.",
      },
      {
        decision: "Firebase for auth and hosting",
        reason: "Zero-configuration deployment and built-in auth providers significantly reduced infrastructure overhead for a solo side project.",
      },
    ],
    architectureOverview: "React SPA hosted on Firebase Hosting. Firebase Auth manages sessions. Product data is stored in MongoDB Atlas and served through an Express API on Render. Cart state is persisted in localStorage for guests and Firestore for authenticated users.",
    duration: "3 weeks",
    teamSize: 1,
    featured: false,
  },
  {
    title: "Dragon News",
    slug: "dragon-news",
    description: "Dragon News is a local news website where users can read recent articles, watch headlines, and browse category-wise news. Only authenticated users can access full detailed articles, demonstrating a news application with authentication-gated content.",
    image: "https://i.ibb.co.com/7xNPkqF6/Screenshot-2025-12-05-181358.png",
    tags: ["React.js", "Firebase", "React Router"],
    gitHub_link: "https://github.com/Adi-ops16/Dragon-news",
    live_link: "https://dragon---news-25.web.app/category/0",
    colors: ["gray", "orange", "purple"],
    role: "Frontend Developer",
    problem: "Local news readers have no dedicated platform to browse categorised regional news with a clean reading experience — most aggregators are cluttered and do not gate in-depth articles to encourage account creation.",
    solution: "A React SPA using React Router for category-based navigation and Firebase Auth to gate full article access, providing a clean, distraction-free reading experience with a headline ticker.",
    outcomes: [
      "Users can browse all categories without login and see previews, driving account sign-up to read full articles",
      "Category-based routing enables direct deep-linking to any news section via URL",
      "Firebase Auth provides instant login via Google, reducing friction to zero for new readers",
    ],
    challenges: [
      "Implementing protected routes in React Router v6 that redirect unauthenticated users to login while preserving their intended destination",
      "Designing a headline ticker that auto-scrolls without causing layout reflow on the main content area",
    ],
    techDecisions: [
      {
        decision: "React Router v6 for navigation",
        reason: "Nested routes and the new loader API made category-based navigation clean and declarative without manual conditional rendering.",
      },
      {
        decision: "Firebase Auth for article gating",
        reason: "Firebase Auth's onAuthStateChanged listener allows instant, reactive UI updates when session state changes without polling.",
      },
    ],
    architectureOverview: "React SPA deployed on Firebase Hosting. News data is fetched from a third-party REST API. Firebase Auth manages user sessions. React Router handles all client-side navigation including protected routes that redirect unauthenticated users.",
    duration: "2 weeks",
    teamSize: 1,
    featured: false,
  },
];
