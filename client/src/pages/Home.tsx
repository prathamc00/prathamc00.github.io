/*
 * Design reminder: Terminal Editorial — evidence-led sections, mono metadata rails,
 * Signal Lime accents, asymmetry over centered marketing layouts, and restrained motion.
 */
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Cloud,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  ScanFace,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import SignalField from "@/components/SignalField";
import { DeepfakeVisual, FacialVisual, InboxVisual } from "@/components/ProjectVisuals";

const githubUrl = "https://github.com/prathamc00";
const linkedinUrl = "https://www.linkedin.com/in/prathmesh-chavan-055556378/";
const resumeUrl = "/manus-storage/Prathmesh-Chavan-Resume_98a7eb0d.pdf";
const formspreeEndpoint = "https://formspree.io/f/xrpgzagy";

const stackSignals = [
  { icon: Code2, label: "Python", detail: "Primary language for ML models, API development, tooling, and automation." },
  { icon: Sparkles, label: "LLMs", detail: "Prompt-driven workflows, code review, intelligent scoring, and AI agents." },
  { icon: ScanFace, label: "Computer vision", detail: "Detection, face recognition, liveness checks, and video-stream analysis." },
  { icon: Database, label: "APIs & data", detail: "FastAPI, Flask, REST endpoints, queues, webhooks, and persistence." },
  { icon: ShieldCheck, label: "Secure systems", detail: "Authentication, encrypted data flows, OAuth, JWTs, and security-aware products." },
];

const projects = [
  {
    number: "01",
    type: "AI / ML ENGINEERING",
    title: "Deepfake Detection Web App",
    description:
      "A full-stack detector for AI-generated images and video, using PyTorch ensemble models, Celery queues, Redis, FastAPI, and Docker.",
    stack: ["React", "FastAPI", "PyTorch", "OpenCV", "Docker", "Redis"],
    metric: "92%",
    metricLabel: "detection accuracy",
    image: "/images/deepfake-neural.jpg",
    accent: "lime",
  },
  {
    number: "02",
    type: "COMPUTER VISION",
    title: "Facial Recognition & Anti-Spoofing",
    description:
      "A real-time face recognition stream using MobileNetV2, OpenCV, eye-blink liveness checks, and SQLite attendance logging.",
    stack: ["Python", "OpenCV", "TensorFlow", "MobileNetV2", "SQLite"],
    metric: "25 FPS",
    metricLabel: "edge stream",
    image: "",
    accent: "slate",
  },
  {
    number: "03",
    type: "AUTOMATION & AI",
    title: "InBox-AleRt Engine",
    description:
      "A high-priority email notification system with 0–100 two-stage AI scoring, Gmail and Outlook webhooks, FastAPI, Celery, and WhatsApp alerts.",
    stack: ["FastAPI", "Next.js", "Python", "Redis", "Celery", "Docker"],
    metric: "0—100",
    metricLabel: "priority scoring",
    image: "/images/inbox-alert.jpg",
    accent: "slate",
  },
];

const skillGroups = [
  {
    name: "Languages",
    icon: Braces,
    detail: "The foundations I use to turn model ideas into shipped workflows.",
    items: [
      ["Python", 92],
      ["SQL", 72],
    ],
  },
  {
    name: "AI / ML",
    icon: ScanFace,
    detail: "Computer vision, neural systems, NLP, and model evaluation for real inputs.",
    items: [
      ["Deep learning", 90],
      ["TensorFlow / PyTorch", 86],
      ["OpenCV", 82],
      ["NLP / Transformers", 82],
    ],
  },
  {
    name: "Backend & APIs",
    icon: Terminal,
    detail: "The service layer where inference, queues, auth, and product behavior meet.",
    items: [
      ["FastAPI", 88],
      ["Flask / REST", 82],
      ["Async processing", 78],
    ],
  },
  {
    name: "Product systems",
    icon: Cloud,
    detail: "The delivery layer: frontend surfaces, deployment, automation, and operational tooling.",
    items: [
      ["Docker", 84],
      ["GitHub Actions", 76],
      ["React / JavaScript", 78],
      ["Linux", 80],
    ],
  },
];

const notes = [
  {
    category: "AI SYSTEMS / 2026.08.12",
    title: "RAG vs OKF: Rethinking Knowledge Retrieval and Representation for AI Systems",
    excerpt: "Where retrieval-augmented generation and Open Knowledge Format differ, when each wins, and why hybrid routing matters for AI agents.",
    read: "06 min read",
    href: "https://prathmeshai.vercel.app/blog-rag-vs-okf.html",
  },
];

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <i />
      <span>{children}</span>
    </div>
  );
}

function ProjectVisual({ number }: { number: string }) {
  if (number === "01") return <DeepfakeVisual />;
  if (number === "02") return <FacialVisual />;
  if (number === "03") return <InboxVisual />;
  return null;
}

function ProjectCard({ project, lead = false }: { project: (typeof projects)[number]; lead?: boolean }) {
  return (
    <article className={`project-card ${lead ? "project-card-lead" : ""}`} data-reveal>
      <div className={`project-media ${project.image ? "" : "project-media-graph"}`} style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}>
        <div className="project-media-top">
          <span className="mono-chip">{project.number} / {project.type}</span>
          <span className="project-ping" aria-label="Project status: documented"><span /> documented</span>
        </div>
        <div className="project-media-bottom">
          <span className="metric-value">{project.metric}</span>
          <span className="metric-label">{project.metricLabel}</span>
        </div>
      </div>
      <div className="project-body">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <div className="project-foot">
          <div className="tag-row">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="project-links">
            <a href="#contact" title="Request access to the live demo">Live demo <ArrowUpRight size={14} /></a>
            <a href={githubUrl} target="_blank" rel="noreferrer">Repo <Github size={14} /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("_subject", "New portfolio enquiry for Prathmesh");
    setFormState("sending");
    setFormError("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.errors?.[0]?.message || "The message could not be sent. Please try again or email me directly.";
        throw new Error(message);
      }

      form.reset();
      setFormState("success");
      toast.success("Message sent — I’ll get back to you soon.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "The message could not be sent. Please email me directly.";
      setFormError(message);
      setFormState("error");
      toast.error("Message not sent. Please try again or use the direct email link.");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("prathmeshc002@gmail.com");
      toast.success("Email copied to clipboard.");
    } catch {
      toast.info("Email: prathmeshc002@gmail.com");
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Prathmesh home">
          <span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span>
          <span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span>
        </a>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}><span>01</span>Work</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}><span>02</span>Experience</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}><span>03</span>Toolkit</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}><span>04</span>Notes</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}><span>06</span>Contact</a>
        </nav>
        <div className="header-actions">
          <span className="availability"><span /> Open to focused builds</span>
          <a className="github-link" href={githubUrl} target="_blank" rel="noreferrer" aria-label="Open Prathmesh's GitHub profile"><Github size={17} /></a>
          <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <nav className="field-index" aria-label="Field log index">
        <span className="field-index-title">FIELD LOG</span>
        <span className="field-index-state">SYS / ONLINE</span>
        <a href="#top" className="is-current"><span>00</span>Signal</a>
        <a href="#work"><span>01</span>Work</a>
        <a href="#experience"><span>02</span>Experience</a>
        <a href="#skills"><span>03</span>Toolkit</a>
        <a href="#notes"><span>04</span>Notes</a>
        <a href="#open-source"><span>05</span>Source</a>
        <a href="#contact"><span>06</span>Contact</a>
      </nav>

      <main id="top">
        <section className="hero-section">
          <div className="hero-texture" aria-hidden="true" />
          <SignalField />
          <div className="hero-grid">
            <aside className="hero-rail">
              <span className="rail-line" />
              <span>AI DEVELOPER</span>
              <span className="rail-vertical">BENGALURU / 2026</span>
            </aside>
            <div className="hero-copy">
              <p className="eyebrow"><span className="live-dot" /> Available for selective work</p>
              <h1>intelligence<br /><em>with a point of</em> view<span className="lime">.</span></h1>
              <p className="hero-deck">I’m Prathmesh — an AI engineer building useful systems across <strong>deep learning</strong>, <strong>computer vision</strong>, <strong>NLP</strong>, and full-stack products.</p>
              <div className="hero-ctas">
                <a className="button button-primary" href="#work">Explore the work <ArrowDownRight size={16} /></a>
                <a className="text-link" href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a>
              </div>
            </div>
            <div className="hero-console" aria-label="Profile snapshot">
              <div className="console-head"><span>PROFILE / 001</span><span>ONLINE</span></div>
              <div className="console-avatar"><span className="avatar-letter">p</span><span className="avatar-cursor" /></div>
              <div className="console-name">Prathmesh Chavan</div>
              <div className="console-role">AI / ML · Backend · Product systems</div>
              <div className="console-rule" />
              <div className="console-stats">
                <div><b>09<sup>+</sup></b><span>public repos</span></div>
                <div><b>92%</b><span>deepfake detection</span></div>
                <div><b>25</b><span>FPS face recognition</span></div>
              </div>
              <div className="console-signal"><Activity size={14} /><span>signal stable</span><span className="signal-bars"><i /><i /><i /><i /><i /></span></div>
            </div>
          </div>
          <div className="hero-footerline"><span>PYTHON / PYTORCH / FASTAPI / REACT / DOCKER</span><span>SCROLL TO INSPECT <ChevronRight size={14} /></span></div>
        </section>

        <section className="stack-strip" aria-label="Technology stack">
          <span className="stack-intro">CURRENTLY WORKING ACROSS</span>
          <div className="stack-items">
            {stackSignals.map(({ icon: Icon, label, detail }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild><span className="stack-signal" tabIndex={0}><Icon size={15} /> {label}</span></TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10} className="skill-tooltip"><b>{label}</b><span>{detail}</span></TooltipContent>
              </Tooltip>
            ))}
          </div>
        </section>

        <section className="section-wrap work-section" id="work">
          <div className="section-topline">
            <SectionLabel index="01" children="SELECTED WORK" />
            <span className="section-note">From model behavior to deployed product systems.</span>
          </div>
          <div className="section-heading-row">
            <h2>Proof of <em>practice.</em></h2>
            <p>From media forensics and edge vision to real-time notification workflows, these builds are where the theory gets its edges.</p>
          </div>
          <div className="project-grid">
            <ProjectCard project={projects[0]} lead />
            <ProjectCard project={projects[1]} />
            <ProjectCard project={projects[2]} />
          </div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <div className="section-topline">
            <SectionLabel index="02" children="EXPERIENCE" />
            <span className="section-note">Learning by shipping systems with real constraints.</span>
          </div>
          <div className="experience-layout">
            <div className="experience-intro" data-reveal><h2>Built in the<br /><em>real world.</em></h2><p>My internships placed the work close to product needs: responsive flows, model inference, APIs, authentication, and the small operational details that keep systems useful.</p><div className="experience-proof"><b>02</b><span>internships</span><i /><b>2022—26</b><span>B.Tech / AI & ML</span></div></div>
            <div className="experience-list">
              <article className="experience-item" data-reveal><div className="experience-meta"><span>01 / WEB DEVELOPMENT</span><span>JAN 2026 — APR 2026</span></div><div className="experience-main"><div><h3>Web Development Intern</h3><p>Crismatech Automation · Bengaluru</p></div><p>Built a full-stack student e-learning portal with course browsing, enrollment, progress tracking, and backend workflows for student data, content, and authentication.</p><div className="tag-row"><span>Full-stack</span><span>REST APIs</span><span>Authentication</span></div></div></article>
              <article className="experience-item" data-reveal><div className="experience-meta"><span>02 / AI & ML ENGINEERING</span><span>AUG 2025 — DEC 2025</span></div><div className="experience-main"><div><h3>AI/ML Intern</h3><p>Zetpeak · Bengaluru</p></div><p>Built production ML models and AI-powered REST APIs, designed LLM automation workflows, and worked with frontend teams to integrate React modules while improving inference through caching.</p><div className="tag-row"><span>TensorFlow</span><span>FastAPI</span><span>Flask</span><span>LLMs</span></div></div></article>
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <div className="section-topline">
              <SectionLabel index="03" children="TOOLKIT" />
            <span className="section-note">Measured by what the build can carry.</span>
          </div>
          <div className="skills-layout">
            <div className="skills-intro">
              <h2>The stack<br /><em>behind the signal.</em></h2>
              <p>My strongest work lives at the seam between model behavior and product behavior: the APIs, interfaces, queues, and decisions that make intelligence dependable.</p>
              <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">Inspect the source <ArrowUpRight size={14} /></a>
            </div>
            <div className="skills-matrix">
              {skillGroups.map(({ name, icon: Icon, detail, items }) => (
                <div className="skill-group" key={name} data-reveal>
                  <Tooltip>
                    <TooltipTrigger asChild><div className="skill-group-head" tabIndex={0}><Icon size={16} /><span>{name}</span><span className="skill-index">0{skillGroups.findIndex((group) => group.name === name) + 1}</span></div></TooltipTrigger>
                    <TooltipContent side="top" sideOffset={10} className="skill-tooltip"><b>{name}</b><span>{detail}</span></TooltipContent>
                  </Tooltip>
                  {items.map(([label, value]) => (
                    <div className="skill-row" key={label}>
                      <div className="skill-label"><span>{label}</span><span>{value}%</span></div>
                      <div className="skill-track"><div className="skill-fill" style={{ width: `${value}%` }} /></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="notes-section" id="notes">
          <div className="section-wrap">
            <div className="section-topline">
              <SectionLabel index="04" children="WRITING / NOTES" />
              <span className="section-note">Observations from the build loop.</span>
            </div>
            <div className="notes-heading"><h2>Thinking in <em>systems.</em></h2><p>Technical writing is how I slow the work down enough to see what it’s teaching me.</p></div>
            <div className="notes-list">
              {notes.map((note, index) => (
                <a className="note-row" href="/writing/rag-vs-okf" key={note.title} data-reveal>
                  <span className="note-number">0{index + 1}</span>
                  <span className="note-category">{note.category}</span>
                  <span className="note-title">{note.title}</span>
                  <span className="note-excerpt">{note.excerpt}</span>
                  <span className="note-read">{note.read} <ArrowUpRight size={14} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap open-source-section" id="open-source">
          <div className="open-source-mark" data-reveal><Github size={52} strokeWidth={1.2} /></div>
          <div className="open-source-copy" data-reveal>
            <SectionLabel index="05" children="OPEN SOURCE" />
            <h2>Build it.<br /><em>Share the method.</em></h2>
            <p>Repositories, notebooks, and small tools are the public layer of the work. The aim is simple: leave behind enough context for someone else to pick up the thread.</p>
            <a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer">View GitHub <Github size={16} /></a>
          </div>
          <div className="open-source-list" data-reveal>
            <div><span>01</span><div><b>9+ public repositories</b><small>Python · PyTorch · React</small></div><ArrowUpRight size={16} /></div>
            <div><span>02</span><div><b>AI Code Reviewer Engine</b><small>Static analysis + GPT-4 security audit</small></div><ArrowUpRight size={16} /></div>
            <div><span>03</span><div><b>Currently learning</b><small>GenAI · MLOps · advanced computer vision</small></div><ArrowUpRight size={16} /></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-grid">
            <div className="contact-copy" data-reveal>
              <SectionLabel index="06" children="CONTACT" />
              <h2>Have a hard<br /><em>problem?</em></h2>
              <p>Tell me what you’re trying to make more useful. I’m most interested in work where the model is only the beginning.</p>
              <div className="contact-status"><span className="live-dot" /> DIRECT DISPATCH / BENGALURU, INDIA</div>
              <button className="email-copy" onClick={copyEmail}><Mail size={16} /> prathmeshc002@gmail.com <Copy size={14} /></button>
              <div className="contact-socials"><a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></div>
            </div>
            <form className="contact-form" action={formspreeEndpoint} method="POST" onSubmit={handleSubmit} data-reveal>
              <div className="form-row"><label><span>01 / NAME</span><input required disabled={formState === "sending"} name="name" placeholder="Your name" /></label><label><span>02 / EMAIL</span><input required disabled={formState === "sending"} type="email" name="email" placeholder="you@company.com" /></label></div>
              <label><span>03 / WHAT ARE WE SOLVING?</span><textarea required disabled={formState === "sending"} name="message" rows={5} placeholder="A sentence or two is enough to start." /></label>
              <div className="form-submit"><span className={`form-status ${formState === "error" ? "is-error" : ""}`}>{formState === "success" ? <><Check size={14} /> Message sent</> : formState === "sending" ? <><Activity className="form-sending-icon" size={14} /> Routing your note…</> : formState === "error" ? formError : "Replies usually come with context."}</span><button className="button button-primary" disabled={formState === "sending"} type="submit"><Send size={15} /> {formState === "sending" ? "Sending" : "Send note"}</button></div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><a className="wordmark footer-wordmark" href="#top"><span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span><span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span></a><span className="footer-caption">AI developer / Bengaluru, India</span></div>
        <a className="resume-link" href={resumeUrl} download="Prathmesh-Chavan-Resume.pdf"><Download size={15} /> Download résumé</a>
        <span className="footer-copyright">© {new Date().getFullYear()} / built with intent</span>
      </footer>
    </div>
  );
}
