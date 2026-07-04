"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Typewriter } from "@/components/ui/typewriter-text";

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  // Fetch projects and track visitor count on load
  useEffect(() => {
    // Force scroll to top on load/reload
    if (typeof window !== "undefined") {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // 1. Fetch Projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Failed to load projects:", err);
        // Fallback projects list in case API fails
        setProjects([
          {
            id: "ktuprephub",
            title: "KTU PrepHub",
            description: "A comprehensive academic portal for APJ Abdul Kalam Technological University (KTU) students. Providing high-quality study materials, notes, question papers, and syllabus updates in a unified, modern interface.",
            url: "https://ktuprephub.vercel.app/",
            tags: ["HTML", "CSS", "JavaScript", "Education", "Vercel"],
            icon: "学",
          },
          {
            id: "mandhi-website",
            title: "Mandhi Resto",
            description: "A responsive and visually rich web application for a traditional Mandhi restaurant. Showcases items like Chicken, Lamb, and Mutton Mandhi, integrates a custom reservation system, and features a backend database.",
            url: "https://mandhi-website.vercel.app/",
            tags: ["Node.js", "Express", "Lowdb", "Vanilla JS", "Vanilla CSS"],
            icon: "食",
          },
          {
            id: "ktu-canteen",
            title: "KTU Canteen Menu",
            description: "An interactive, mobile-optimized digital canteen menu system designed to streamline food ordering, reduce queue times, and display live availability of menu items for university students.",
            url: "https://ktu-canteen.vercel.app/menu.html",
            tags: ["HTML", "CSS", "JavaScript", "Canteen API", "UI/UX"],
            icon: "味",
          },
          {
            id: "linkedin-undo",
            title: "LinkedIn Undo",
            description: "A productivity extension designed for LinkedIn professionals. Allows users to undo post publishes, comments, or connection requests within a custom grace period to prevent networking mishaps.",
            url: "#",
            tags: ["Chrome Extension", "JavaScript", "LinkedIn API", "Productivity"],
            icon: "業",
            status: "Currently under working"
          }
        ]);
      });

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          loading: false,
          success: data.message || "Message sent successfully!",
          error: null,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus({
          loading: false,
          success: null,
          error: data.error || "Failed to send message.",
        });
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setFormStatus({
        loading: false,
        success: null,
        error: "Network error. Please try again later.",
      });
    }
  };

  return (
    <div className={styles.main}>
      {/* Header & Sticky Nav */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.nav}`}>
          <div className={styles.logo}>
            <Image
              src="/logo.png"
              alt="HMK Logo"
              width={80}
              height={80}
              className={styles.logoImage}
              priority
            />
          </div>
          <nav>
            <ul className={styles.navLinks}>
              <li className={styles.navItem}><a href="#home">Home</a></li>
              <li className={styles.navItem}><a href="#about">About</a></li>
              <li className={styles.navItem}><a href="#projects">Projects</a></li>
              <li className={styles.navItem}><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <a href="#contact" className={styles.contactBtn}>Hire Me</a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.matrixContainer}>
          <div className={styles.matrixPattern}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className={styles.matrixColumn}></div>
            ))}
          </div>
        </div>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Hey, I'm <br />
              <Typewriter
                text={["Hashir Muhiyudheen", "a Full-Stack Developer", "a Creative Coder"]}
                speed={80}
                delay={2000}
                loop={true}
                className={styles.titleAccent}
              />
            </h1>
            <p className={styles.heroSubtitle}>
              A passionate full-stack developer crafting immersive, responsive, and robust web applications with clean frontend design and solid backend solutions.
            </p>
            <div className={styles.heroActions}>
              <a href="#projects" className={styles.primaryBtn}>
                View Work
                <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className={styles.secondaryBtn}>Let's Connect</a>
            </div>
          </div>


        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            About <span className={styles.titleAccent}>Me</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Get to know my journey, skills, and what drives me to build great software.
          </p>

          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>
                I'm a second-year Computer Science student at the College of Engineering Thalassery, living in Kerala, India. Most of what I know about coding hasn't come from a classroom—it's self-taught by building actual web apps, documenting the process publicly, and working heavily with AI developer tools. I build freelance projects for clients on the side, including <strong>Mandhi Resto</strong>, a digital restaurant menu, and <strong>KTU PrepHub</strong>, an academic resources platform used by university students.
              </p>
              <p>
                Right now, I'm focusing on building cleaner interfaces and teaching myself more backend systems to handle larger, more reliable codebases. I'm keeping my goals straightforward: build tools that work well, keep shipping code, and learn as I go.
              </p>

              <div className={styles.aboutLinkedInWrapper}>
                <div className={styles.tooltipContainer}>
                  <span className={styles.tooltip}>
                    <div className={styles.profile}>
                      <div className={styles.user}>
                        <div className={styles.img}>
                          <Image
                            src="/profile.jpg"
                            alt="Hashir Muhiyudheen Konnola"
                            width={45}
                            height={45}
                            className={styles.tooltipProfileImage}
                          />
                        </div>
                        <div className={styles.details}>
                          <div className={styles.name}>Hashir Muhiyudheen Konnola</div>
                          <div className={styles.school}>College of Engineering, Thalassery</div>
                        </div>
                      </div>
                      <div className={styles.about}>
                        CS Student | Building Real Products with AI Tools | Backend Dev in Progress
                      </div>
                      <div className={styles.stats}>
                        <span className={styles.followers}>630 followers</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.connections}>500+ connections</span>
                      </div>
                    </div>
                  </span>
                  <a href="https://www.linkedin.com/in/hashir-muhiyudheen-konnola-8342aa1b9/" target="_blank" rel="noopener noreferrer" className={styles.icon} aria-label="LinkedIn">
                    <div className={styles.layer}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span className={styles.linkedinSVG}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </span>
                    </div>
                    <div className={styles.text}>Connect on LinkedIn</div>
                  </a>
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statNumber}>3+</div>
                  <div className={styles.statLabel}>Major Projects</div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statNumber}>12+</div>
                  <div className={styles.statLabel}>Techs & Tools</div>
                </div>
              </div>
            </div>

            <div className={styles.skillsContainer}>
              <h3 className={styles.skillsTitle}>Technical Expertise</h3>

              <div className={styles.skillCategory}>
                <div className={styles.categoryTitle}>Frontend</div>
                <div className={styles.skillsTags}>
                  <span className={styles.skillTag}>HTML5</span>
                  <span className={styles.skillTag}>CSS3</span>
                  <span className={styles.skillTag}>JavaScript (ES6+)</span>
                  <span className={styles.skillTag}>React.js</span>
                  <span className={styles.skillTag}>Next.js</span>
                  <span className={styles.skillTag}>Responsive Design</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <div className={styles.categoryTitle}>Backend & Database</div>
                <div className={styles.skillsTags}>
                  <span className={styles.skillTag}>Node.js</span>
                  <span className={styles.skillTag}>Express.js</span>
                  <span className={styles.skillTag}>REST APIs</span>
                  <span className={styles.skillTag}>JSON Databases</span>
                  <span className={styles.skillTag}>Lowdb</span>
                </div>
              </div>

              <div className={styles.skillCategory}>
                <div className={styles.categoryTitle}>Workflow & Deploy</div>
                <div className={styles.skillsTags}>
                  <span className={styles.skillTag}>Git & GitHub</span>
                  <span className={styles.skillTag}>npm / Node Package Manager</span>
                  <span className={styles.skillTag}>Vercel hosting</span>
                  <span className={styles.skillTag}>Chrome DevTools</span>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative armor — ambient right side depth element */}
          <Image
            src="/armor.png"
            alt=""
            aria-hidden="true"
            width={360}
            height={440}
            className={styles.aboutArmorDecor}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`${styles.section} ${styles.projectsSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Featured <span className={styles.titleAccent}>Projects</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            A showcase of digital products I've engineered end-to-end, combining front-end clarity with back-end functionality.
          </p>

          <div className={styles.projectsGrid}>
            {projects.map((project) => {
              const glowColorMap = {
                "ktuprephub": "gold",
                "mandhi-website": "orange",
                "ktu-canteen": "red",
                "linkedin-undo": "gold"
              };
              const glowColor = glowColorMap[project.id] || "gold";

              return (
                <GlowCard
                  key={project.id}
                  className={styles.projectCard}
                  glowColor={glowColor}
                  customSize={true}
                >

                  <div className={styles.projectIcon}>{project.icon || "💻"}</div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags && project.tags.map((tag) => (
                      <span key={tag} className={styles.projectTag}>{tag}</span>
                    ))}
                  </div>
                  {project.status ? (
                    <span className={styles.projectLinkDisabled}>
                      {project.status}
                      <span className={styles.buildingDot}></span>
                    </span>
                  ) : (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                      Visit Project
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.container}>

          {/* Unified header: torii gate accent + heading + subtitle */}
          <div className={styles.contactSectionHeader}>
            <Image
              src="/torii.png"
              alt=""
              aria-hidden="true"
              width={260}
              height={200}
              className={styles.toriiImage}
            />
            <h2 className={styles.sectionTitle}>
              Let's <span className={styles.titleAccent}>Work Together</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Have an idea or a project in mind? Reach out to me and let's turn your vision into code.
            </p>
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactInfoTitle}>Get in Touch</h3>
              <p className={styles.contactInfoText}>
                I'm currently open to freelance opportunities, contract roles, and collaboration projects. Feel free to contact me directly.
              </p>

              <ul className={styles.infoList}>
                <li className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoDetails}>
                    <label>Email Address</label>
                    <p>hashirkonnola2006@gmail.com</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className={styles.infoDetails}>
                    <label>Location</label>
                    <p>Malappuram, Kerala, India</p>
                  </div>
                </li>
                <li className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div className={styles.infoDetails}>
                    <label>Role</label>
                    <p>Freelance Full-Stack Developer</p>
                  </div>
                </li>
              </ul>
              {/* Gold katana ambient decoration */}
              <Image
                src="/katana_gold.png"
                alt=""
                aria-hidden="true"
                width={340}
                height={120}
                className={styles.contactKatanaDecor}
              />
            </div>

            <div className={styles.contactFormCard}>
              <form onSubmit={handleFormSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder=" "
                  />
                  <label htmlFor="name" className={styles.userLabel}>Full Name</label>
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder=" "
                  />
                  <label htmlFor="email" className={styles.userLabel}>Email Address</label>
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder=" "
                  />
                  <label htmlFor="subject" className={styles.userLabel}>Subject</label>
                </div>
                <div className={styles.inputGroup}>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message" className={styles.userLabel}>Message</label>
                </div>

                <button type="submit" disabled={formStatus.loading} className={styles.submitBtn}>
                  {formStatus.loading ? (
                    <>
                      <div className={styles.spinner}></div>
                      Sending Message...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {formStatus.success && (
                  <div className={`${styles.formFeedback} ${styles.successFeedback}`}>
                    {formStatus.success}
                  </div>
                )}
                {formStatus.error && (
                  <div className={`${styles.formFeedback} ${styles.errorFeedback}`}>
                    {formStatus.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Column 1: Info and Connect stacked vertically */}
            <div className={styles.footerLeftContent}>
              <div className={styles.footerInfoCol}>
                <div className={styles.footerLogoContainer}>
                  <Image
                    src="/logo.png"
                    alt="Hashir Muhiyudheen K Logo"
                    width={38}
                    height={38}
                    className={styles.footerProfileImage}
                  />
                  <span className={styles.footerSignature}>Hashir Muhiyudheen K</span>
                </div>
                <p className={styles.footerTagline}>
                  Doesn't write code — negotiates with AI until something deploys.
                </p>
              </div>

              <div className={styles.footerLinksCol}>
                <h4 className={styles.footerColTitle}>Connect</h4>
                <ul className={styles.footerLinksList}>
                  <li>
                    <a href="https://www.linkedin.com/in/hashir-muhiyudheen-konnola-8342aa1b9/" target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Large Katana Graphic aligned to the right margin */}
            <div className={styles.footerKatanaCol}>
              <Image
                src="/katana.png"
                alt="Katana Banner"
                width={960}
                height={320}
                className={styles.katanaBannerImage}
                priority
              />
            </div>
          </div>

          <div className={styles.footerDivider}></div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} Hashir Muhiyudheen K. All rights reserved.</p>

            {/* Back to Top */}
            <a href="#home" className={styles.backToTop} aria-label="Back to top">
              <span>Back to top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
