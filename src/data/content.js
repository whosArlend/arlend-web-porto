/**
 * Portfolio content
 */

export const siteConfig = {
  name: "Alif Arlendi",

  tagline: "Web Developer & Security Analyst",

  intro:
    "Computer Engineering student passionate about building modern web applications and improving cybersecurity through vulnerability assessment and secure software development.",

  email: "alifarlendi123@gmail.com",

  github: "https://github.com/whosArlend",

  linkedin: "https://linkedin.com/in/alif-arlendi",
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
]

export const aboutContent = {
  heading: "About",

  paragraphs: [
    "I'm a Computer Engineering student with a strong passion for web development and cybersecurity.",

    "My experience includes developing responsive web applications and performing vulnerability assessments using industry-standard security tools. I enjoy building secure, scalable, and user-friendly software while continuously expanding my knowledge of offensive and defensive security.",

    "Currently, I'm focusing on full-stack web development, penetration testing, and security engineering while creating projects that solve real-world problems and strengthen my technical expertise.",
  ],
}

export const skillsContent = {
  heading: "Skills",

  groups: [
    {
      title: "Development",

      items: [
        "React",
        "Vue",
        "Flask",
        "FastAPI",
        "JavaScript",
        "TypeScript",
        "PHP",
        "Node.js",
        "MySQL",
        "PostgreSQL",
        "Docker",
        "Git",
        "Tailwind CSS",
        "REST API",
      ],
    },

    {
      title: "Security",

      items: [
        "Burp Suite",
        "Nmap",
        "Wireshark",
        "Kali Linux",
        "OWASP Top 10",
        "OpenVAS",
        "Nuclei",
        "SQLMap",
        "Dalfox",
        "ParamSpider",
        "Gau",
        "Httpx",
        "Vulnerability Assessment",
      ],
    },
  ],
}

export const projectsContent = {
  heading: "Projects",

  items: [
    {
      title: "KataFinder",

      description:
        "A modern web application for searching and exploring Indonesian words with a clean, intuitive, and responsive user interface.",

      tech: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Vite",
      ],

      github: "https://github.com/whosArlend/katafinder",

      live: "#",
    },

    {
      title: "Attack Defense Platform",

      description:
        "A capstone project designed to simulate attack and defense scenarios by integrating monitoring, vulnerability assessment, and intrusion detection into a modern web platform.",

      tech: [
        "Docker",
        "Flask",
        "React",
        "PostgreSQL",
        "Snort IDS/IPS",
      ],

      github: "https://github.com/whosArlend/attack-defense-platform",

      live: "#",
    },

    {
      title: "Personal Portfolio",

      description:
        "A minimalist monochrome portfolio website showcasing my projects, technical skills, certifications, and professional experience.",

      tech: [
        "React",
        "Vite",
        "Tailwind CSS",
      ],

      github: "https://github.com/whosArlend/portfolio",

      live: "#",
    },
  ],
}

export const experienceContent = {
  heading: "Experience",

  items: [
    {
      role: "Web Developer Intern",

      company: "Department of Industry and Trade of Central Java Province",

      period: "2025",

      description:
        "Developed and maintained internal web applications, collaborated with the development team, and improved application functionality, usability, and performance.",
    },

    {
      role: "IT Security Intern",

      company: "Department of Industry and Trade of Central Java Province",

      period: "2025",

      description:
        "Conducted vulnerability assessments on government web applications using tools such as Burp Suite, Nmap, OpenVAS, Nuclei, Dalfox, SQLMap, and Wireshark. Documented security findings and provided remediation recommendations based on OWASP Top 10.",
    },
  ],
}

export const certificationsContent = {
  heading: "Certifications",

  items: [
    {
      title: "Website Hacking / Penetration Testing",
      issuer: "zSecurity (Udemy)",
      year: "2025",
    },

    {
      title: "OverTheWire — Natas",
      issuer: "OverTheWire",
      year: "2025",
    },

    {
      title: "Hack The Box",
      issuer: "Hack The Box",
      year: "2025",
    },
  ],
}