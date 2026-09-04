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
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Phone,
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

const githubUrl = "https://github.com/prathamc00";
const linkedinUrl = "https://www.linkedin.com/in/prathmesh-chavan/";
const resumeUrl = "/Prathmesh-Chavan-Resume.pdf";
const phone = "+91 9108118381";
const email = "prathmeshc002@gmail.com";
const formspreeEndpoint = "https://formspree.io/f/xrpgzagy";

const stackSignals = [
  { icon: Sparkles, label: "LLM & GenAI", detail: "Layer streaming, KV cache, RAG, AI agents, MCP, and inference systems." },
  { icon: Cpu, label: "Systems & CUDA", detail: "GPU computing, memory optimization, async layer offloading, and concurrency." },
  { icon: Code2, label: "AI & ML", detail: "PyTorch, TensorFlow, Scikit-learn, OpenCV, computer vision, and NLP." },
  { icon: Terminal, label: "Backend & APIs", detail: "FastAPI, Flask, REST services, Celery async queues, Redis, and webhooks." },
  { icon: ShieldCheck, label: "Security & Cloud", detail: "OAuth 2.0, RS256 JWT, AES-256, Docker, GitHub Actions, Linux, AWS, and GCP." },
];

const projects = [
  {
    slug: "streamllm",
    number: "01",
    type: "LLM INFERENCE / SYSTEMS",
    title: "StreamLLM Inference Engine",
    statusText: "live on PyPI",
    tagline: "Dynamic transformer layer streaming between RAM/SSD & GPU VRAM",
    description:
      "An open-source inference system enabling 14B–70B parameter LLMs to run on 4GB–8GB consumer GPUs via dynamic transformer layer streaming, asynchronous prefetching, and double-buffered layer execution.",
    stack: ["Python", "PyTorch", "CUDA", "Transformers", "Systems Programming", "PyPI"],
    metric: "4–8 GB",
    metricLabel: "min GPU VRAM (70B models)",
    accent: "lime",
    repoUrl: "https://github.com/prathamc00/streamLLM",
    pypiUrl: "https://pypi.org/project/streamllm/",
    pipInstall: "pip install streamllm",
    benchmark: {
      standard: "~140 GB",
      streamllm: "~6.8 GB",
      savings: "95% less VRAM",
    },
    highlights: [
      "Overlapped compute & PCIe transfers via dedicated CUDA streams",
      "Static 2-slot GPU scratchpad allocator (128 MB VRAM footprint)",
      "Pinned host memory + CUDA event synchronization",
      "Deterministic KV-cache memory budgeting preventing OOM",
      "Up to 1.28x lower latency on NVIDIA RTX 3050 Laptop GPU",
    ],
  },
  {
    slug: "deepfake",
    number: "02",
    type: "AI / ML FORENSICS",
    title: "Deepfake Detection Web App",
    statusText: "verified",
    tagline: "Multi-domain manipulated media classification pipeline",
    description:
      "Deep learning classification pipelines for manipulated image and video detection, achieving 92%+ validation accuracy on datasets containing 100k+ samples.",
    stack: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "FastAPI", "Docker", "Celery", "Redis"],
    metric: "92%+",
    metricLabel: "validation accuracy (100k+ samples)",
    accent: "lime",
    repoUrl: "https://github.com/prathamc00/deepFake",
    highlights: [
      "92%+ validation accuracy on 100k+ evaluation images",
      "Spatial CNN + 2D FFT frequency magnitude spectrum analysis",
      "Asynchronous multi-frame video extraction via Celery & Redis",
      "Dockerized container pipeline for reproducible evaluation",
    ],
  },
  {
    slug: "facial-recognition",
    number: "03",
    type: "COMPUTER VISION",
    title: "Facial Recognition & Anti-Spoofing",
    statusText: "active",
    tagline: "25 FPS edge inference stream with liveness verification",
    description:
      "A real-time face recognition and anti-spoofing pipeline using MobileNetV2 embeddings, OpenCV, eye-blink liveness checks, and SQLite attendance logging.",
    stack: ["Python", "OpenCV", "TensorFlow", "MobileNetV2", "SQLite", "Scikit-learn"],
    metric: "25 FPS",
    metricLabel: "edge inference throughput",
    accent: "slate",
    repoUrl: "https://github.com/prathamc00/Facial-recognition-system-",
    highlights: [
      "25 FPS real-time edge inference stream on local hardware",
      "Eye Aspect Ratio (EAR) blink liveness check blocks 2D photo spoofing",
      "MobileNetV2 feature embeddings with cosine similarity matching",
      "Automated sub-millisecond SQLite attendance audit logging",
    ],
  },
  {
    slug: "inbox-alert",
    number: "04",
    type: "AUTOMATION & AI",
    title: "InBox-AleRt Priority Engine",
    statusText: "active",
    tagline: "Event-driven email intelligence with instant WhatsApp alerts",
    description:
      "An AI-powered email intelligence platform with 0–100 two-stage scoring combining rule-based heuristics with LLM classification, Gmail/Outlook webhooks, and WhatsApp alerts.",
    stack: ["Python", "FastAPI", "Next.js", "Redis", "Celery", "Docker", "LLMs", "OAuth 2.0"],
    metric: "0—100",
    metricLabel: "two-stage priority scoring",
    accent: "slate",
    repoUrl: "https://github.com/prathamc00/InBox-AleRt",
    highlights: [
      "Two-stage scoring combining deterministic rules with LLM semantic reasoning",
      "Gmail Pub/Sub & Microsoft Graph webhooks with Celery & Redis",
      "Instant WhatsApp alert dispatch with contextual summaries (<2.5s latency)",
      "OAuth 2.0, RS256 JWT auth, and AES-256 encrypted token persistence",
    ],
  },
];

const skillGroups = [
  {
    name: "LLM / GenAI & Systems",
    icon: Sparkles,
    detail: "Inference engines, layer streaming, KV cache, agentic workflows, and CUDA.",
    items: [
      ["LLM Inference / Layer Streaming", 94],
      ["Transformers / Architecture", 92],
      ["CUDA / GPU Optimization", 86],
      ["RAG / Embeddings / MCP", 90],
      ["AI Agents & Agentic Workflows", 88],
    ],
  },
  {
    name: "AI & Machine Learning",
    icon: ScanFace,
    detail: "Deep learning models, computer vision, forensics, and validation pipelines.",
    items: [
      ["PyTorch / TensorFlow", 90],
      ["Scikit-learn / Pipelines", 88],
      ["Computer Vision / OpenCV", 86],
      ["Deep Learning / NLP", 85],
    ],
  },
  {
    name: "Backend & Concurrency",
    icon: Terminal,
    detail: "High-throughput asynchronous APIs, queues, caching, and persistence.",
    items: [
      ["FastAPI / REST APIs", 92],
      ["Async Processing (Celery)", 86],
      ["Redis / Message Brokers", 85],
      ["Flask & Microservices", 82],
    ],
  },
  {
    name: "Databases & DevOps",
    icon: Cloud,
    detail: "Production infrastructure, containerization, security, and cloud platforms.",
    items: [
      ["Docker / Containerization", 86],
      ["PostgreSQL / MySQL / SQLite", 84],
      ["Security (OAuth, RS256, AES)", 86],
      ["Linux / GitHub Actions CI/CD", 82],
    ],
  },
];

const notes = [
  {
    category: "AI SYSTEMS / 2026.08.12",
    title: "RAG vs OKF: Rethinking Knowledge Retrieval and Representation for AI Systems",
    excerpt: "Where retrieval-augmented generation and Open Knowledge Format differ, when each wins, and why hybrid routing matters for AI agents.",
    read: "06 min read",
    href: "/writing/rag-vs-okf",
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

function ProjectCard({ project, lead = false }: { project: (typeof projects)[number]; lead?: boolean }) {
  const [copiedPip, setCopiedPip] = useState(false);

  const handleCopyPip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!project.pipInstall) return;
    navigator.clipboard.writeText(project.pipInstall);
    setCopiedPip(true);
    toast.success(`Copied "${project.pipInstall}" to clipboard`);
    setTimeout(() => setCopiedPip(false), 2200);
  };

  return (
    <article className={`project-card ${lead ? "project-card-lead" : ""}`} data-reveal>
      {/* Terminal System Header (No image thumbnails) */}
      <div className="project-terminal-head">
        <div className="project-head-rail">
          <span className="mono-chip">{project.number} / {project.type}</span>
          <span className="project-ping" aria-label={`Project status: ${project.statusText}`}>
            <span /> {project.statusText}
          </span>
        </div>

        <div className="project-telemetry-hero">
          <div>
            <span className="metric-value">{project.metric}</span>
            <span className="metric-label">{project.metricLabel}</span>
          </div>
          {project.pipInstall && (
            <button
              className="pip-chip"
              onClick={handleCopyPip}
              type="button"
              title="Click to copy install command"
              aria-label="Copy pip install command"
            >
              <Terminal size={11} />
              <code>{project.pipInstall}</code>
              {copiedPip ? <Check size={11} className="pip-check" /> : <Copy size={11} />}
            </button>
          )}
        </div>
      </div>

      <div className="project-body">
        <div>
          <h3>{project.title}</h3>
          <p className="project-tagline">{project.tagline}</p>
          <p className="project-desc">{project.description}</p>

          {project.benchmark && (
            <div className="vram-telemetry">
              <span className="vram-tag">70B LLM INFERENCE BENCHMARK</span>
              <div className="vram-cols">
                <div className="vram-stat standard">
                  <span className="vram-label">Standard VRAM</span>
                  <span className="vram-num">{project.benchmark.standard}</span>
                </div>
                <span className="vram-arrow">➔</span>
                <div className="vram-stat streamllm">
                  <span className="vram-label">StreamLLM Min VRAM</span>
                  <span className="vram-num">{project.benchmark.streamllm}</span>
                </div>
                <span className="vram-saving">{project.benchmark.savings}</span>
              </div>
            </div>
          )}

          <div className="project-highlights">
            {project.highlights.map((item, idx) => (
              <span key={idx} className="highlight-pill">
                <span className="highlight-dot" /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="project-foot">
          <div className="tag-row">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="project-links">
            <a href={`/projects/${project.slug}`} className="doc-link">
              Case study & docs <ArrowUpRight size={14} />
            </a>
            {project.pypiUrl && (
              <a href={project.pypiUrl} target="_blank" rel="noreferrer" className="pypi-link">
                PyPI <ExternalLink size={13} />
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Repo <Github size={14} />
            </a>
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
      toast.error("Message not sent. Please try again or use direct email.");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard.");
    } catch {
      toast.info(`Email: ${email}`);
    }
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      toast.success("Phone number copied to clipboard.");
    } catch {
      toast.info(`Phone: ${phone}`);
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
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
          <a href="#work" onClick={() => setMenuOpen(false)}><span>01</span>Projects</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}><span>02</span>Experience</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}><span>03</span>Toolkit</a>
          <a href="#education" onClick={() => setMenuOpen(false)}><span>04</span>Education</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}><span>05</span>Notes</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}><span>06</span>Contact</a>
        </nav>
        <div className="header-actions">
          <span className="availability"><span /> Open to AI/ML builds</span>
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
        <a href="#work"><span>01</span>Projects</a>
        <a href="#experience"><span>02</span>Experience</a>
        <a href="#skills"><span>03</span>Toolkit</a>
        <a href="#education"><span>04</span>Education</a>
        <a href="#notes"><span>05</span>Notes</a>
        <a href="#open-source"><span>06</span>Source</a>
        <a href="#contact"><span>07</span>Contact</a>
      </nav>

      <main id="top">
        <section className="hero-section">
          <div className="hero-texture" aria-hidden="true" />
          <SignalField />
          <div className="hero-grid">
            <aside className="hero-rail">
              <span className="rail-line" />
              <span>AI/ML ENGINEER</span>
              <span className="rail-vertical">BENGALURU / 2026</span>
            </aside>
            <div className="hero-copy">
              <p className="eyebrow"><span className="live-dot" /> Available for AI/ML & LLM infrastructure</p>
              <h1>intelligence<br /><em>with a point of</em> view<span className="lime">.</span></h1>
              <p className="hero-deck">
                I’m Prathmesh — an AI/ML Engineer focused on <strong>LLM applications</strong>, <strong>inference systems</strong>, and <strong>backend engineering</strong>. Experienced in building machine learning pipelines, AI-powered APIs, asynchronous systems, and production applications using <strong>Python</strong>, <strong>PyTorch</strong>, <strong>CUDA</strong>, <strong>FastAPI</strong>, and <strong>Docker</strong>.
              </p>
              <div className="hero-ctas">
                <a className="button button-primary" href="#work">Explore projects <ArrowDownRight size={16} /></a>
                <a className="text-link" href={linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={14} /></a>
                <a className="text-link" href={resumeUrl} download="Prathmesh-Chavan-Resume.pdf">Resume PDF <Download size={14} /></a>
              </div>
            </div>
            <div className="hero-console" aria-label="Profile snapshot">
              <div className="console-head"><span>PROFILE / 001</span><span>ONLINE</span></div>
              <div className="console-avatar"><span className="avatar-letter">p</span><span className="avatar-cursor" /></div>
              <div className="console-name">Prathmesh Chavan</div>
              <div className="console-role">AI/ML · LLM Inference · Systems</div>
              <div className="console-rule" />
              <div className="console-stats">
                <div><b>4–8 GB</b><span>70B LLM VRAM</span></div>
                <div><b>92%<sup>+</sup></b><span>deepfake accuracy</span></div>
                <div><b>25</b><span>FPS edge vision</span></div>
              </div>
              <div className="console-signal"><Activity size={14} /><span>signal stable</span><span className="signal-bars"><i /><i /><i /><i /><i /></span></div>
            </div>
          </div>
          <div className="hero-footerline"><span>PYTHON / PYTORCH / CUDA / FASTAPI / DOCKER</span><span>SCROLL TO INSPECT <ChevronRight size={14} /></span></div>
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

        {/* Section 01: Selected Work (No images — pure terminal system cards) */}
        <section className="section-wrap work-section" id="work">
          <div className="section-topline">
            <SectionLabel index="01" children="SELECTED PROJECTS" />
            <span className="section-note">Inference systems, forensics, edge vision, and automation.</span>
          </div>
          <div className="section-heading-row">
            <h2>Proof of <em>practice.</em></h2>
            <p>From transformer layer streaming and media forensics to edge computer vision and real-time notification pipelines, these builds are where the theory gets its edges.</p>
          </div>
          <div className="project-grid">
            <ProjectCard project={projects[0]} lead />
            <div className="project-subgrid">
              <ProjectCard project={projects[1]} />
              <ProjectCard project={projects[2]} />
              <ProjectCard project={projects[3]} />
            </div>
          </div>
        </section>

        {/* Section 02: Experience */}
        <section className="section-wrap experience-section" id="experience">
          <div className="section-topline">
            <SectionLabel index="02" children="EXPERIENCE" />
            <span className="section-note">Engineering production systems with real constraints.</span>
          </div>
          <div className="experience-layout">
            <div className="experience-intro" data-reveal>
              <h2>Built in the<br /><em>real world.</em></h2>
              <p>My internship experience focused on real-world engineering constraints: full-stack platforms, high-throughput model inference APIs, caching optimizations, and seamless service delivery.</p>
              <div className="experience-proof">
                <b>02</b><span>internships</span>
                <i />
                <b>2022—26</b><span>B.Tech / AI & ML</span>
              </div>
            </div>
            <div className="experience-list">
              <article className="experience-item" data-reveal>
                <div className="experience-meta">
                  <span>01 / WEB DEVELOPMENT INTERN</span>
                  <span>JAN 2026 — APR 2026</span>
                </div>
                <div className="experience-main">
                  <div>
                    <h3>Crismatech Automation</h3>
                    <p>Bengaluru, Karnataka</p>
                  </div>
                  <div className="experience-bullets">
                    <p>• Built a full-stack student e-learning platform from the ground up, covering course discovery, enrollment, authentication, and student progress tracking.</p>
                    <p>• Developed responsive frontend components and integrated REST APIs for student, course, and enrollment workflows.</p>
                    <p>• Designed backend data flows for managing student profiles, course content, enrollment state, and learning progress.</p>
                    <p>• Improved cross-device usability by implementing responsive layouts for desktop and mobile clients.</p>
                  </div>
                  <div className="tag-row">
                    <span>Full-stack</span>
                    <span>REST APIs</span>
                    <span>Authentication</span>
                    <span>Responsive Layouts</span>
                  </div>
                </div>
              </article>

              <article className="experience-item" data-reveal>
                <div className="experience-meta">
                  <span>02 / AI/ML INTERN</span>
                  <span>AUG 2025 — DEC 2025</span>
                </div>
                <div className="experience-main">
                  <div>
                    <h3>Zetpeak</h3>
                    <p>Bengaluru, Karnataka</p>
                  </div>
                  <div className="experience-bullets">
                    <p>• Built and optimized machine learning solutions using Python, Scikit-learn, TensorFlow, and data preprocessing pipelines for real-world use cases.</p>
                    <p>• Developed AI-powered REST services with FastAPI and Flask and integrated inference APIs into web applications.</p>
                    <p>• Worked with large language models, prompt engineering, and AI automation workflows to develop intelligent application features.</p>
                    <p>• Collaborated with frontend developers to integrate AI inference services into React-based applications.</p>
                    <p>• Improved inference efficiency through preprocessing optimization, caching, and streamlined model execution workflows.</p>
                  </div>
                  <div className="tag-row">
                    <span>Python</span>
                    <span>TensorFlow</span>
                    <span>FastAPI</span>
                    <span>Flask</span>
                    <span>LLMs</span>
                    <span>Caching</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Section 03: Toolkit */}
        <section className="section-wrap skills-section" id="skills">
          <div className="section-topline">
            <SectionLabel index="03" children="TOOLKIT & SKILLS" />
            <span className="section-note">Technical foundations measured by execution.</span>
          </div>
          <div className="skills-layout">
            <div className="skills-intro">
              <h2>The stack<br /><em>behind the signal.</em></h2>
              <p>My strongest work lives at the seam between model behavior and product execution: CUDA acceleration, layer streaming, asynchronous queues, and resilient API architectures.</p>
              <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">Inspect all repositories <ArrowUpRight size={14} /></a>
            </div>
            <div className="skills-matrix">
              {skillGroups.map(({ name, icon: Icon, detail, items }) => (
                <div className="skill-group" key={name} data-reveal>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="skill-group-head" tabIndex={0}>
                        <Icon size={16} />
                        <span>{name}</span>
                        <span className="skill-index">0{skillGroups.findIndex((group) => group.name === name) + 1}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={10} className="skill-tooltip">
                      <b>{name}</b>
                      <span>{detail}</span>
                    </TooltipContent>
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

        {/* Section 04: Education */}
        <section className="section-wrap education-section" id="education">
          <div className="section-topline">
            <SectionLabel index="04" children="EDUCATION" />
            <span className="section-note">Academic foundations in artificial intelligence & machine learning.</span>
          </div>
          <div className="education-layout">
            <div className="education-intro" data-reveal>
              <h2>Academic<br /><em>grounding.</em></h2>
              <p>Rigorous study in algorithms, deep learning, mathematical optimization, and distributed systems, supplemented by hands-on engineering projects.</p>
            </div>
            <div className="education-card" data-reveal>
              <div className="education-card-top">
                <span className="mono-chip">2022 — 2026 // UNDERGRADUATE</span>
                <span className="education-state"><span className="live-dot" /> IN PROGRESS</span>
              </div>
              <h3>Bachelor of Technology (B.Tech)</h3>
              <p className="education-major">Artificial Intelligence and Machine Learning</p>
              <p className="education-school">Garden City University · Bengaluru, Karnataka</p>
              <div className="tag-row">
                <span>Machine Learning</span>
                <span>Deep Learning</span>
                <span>Data Structures & Algorithms</span>
                <span>Computer Vision</span>
                <span>Operating Systems</span>
                <span>Distributed Computing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Notes */}
        <section className="notes-section" id="notes">
          <div className="section-wrap">
            <div className="section-topline">
              <SectionLabel index="05" children="WRITING / NOTES" />
              <span className="section-note">Observations from the build loop.</span>
            </div>
            <div className="notes-heading">
              <h2>Thinking in <em>systems.</em></h2>
              <p>Technical writing is how I slow the work down enough to analyze tradeoffs, failure modes, and architectural implications.</p>
            </div>
            <div className="notes-list">
              {notes.map((note, index) => (
                <a className="note-row" href={note.href} key={note.title} data-reveal>
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

        {/* Section 06: Open Source */}
        <section className="section-wrap open-source-section" id="open-source">
          <div className="open-source-mark" data-reveal><Github size={52} strokeWidth={1.2} /></div>
          <div className="open-source-copy" data-reveal>
            <SectionLabel index="06" children="OPEN SOURCE" />
            <h2>Build it.<br /><em>Share the method.</em></h2>
            <p>Repositories, packages, and technical specifications are the public layer of the work. I build in the open to advance practical AI systems engineering.</p>
            <a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer">View GitHub Profile <Github size={16} /></a>
          </div>
          <div className="open-source-list" data-reveal>
            <a href="https://github.com/prathamc00/streamLLM" target="_blank" rel="noreferrer">
              <span>01</span>
              <div><b>StreamLLM Engine</b><small>Layer streaming inference · PyPI package · CUDA acceleration</small></div>
              <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com/prathamc00/deepFake" target="_blank" rel="noreferrer">
              <span>02</span>
              <div><b>Deepfake Detection</b><small>PyTorch ensemble · FFT analysis · 100k+ evaluation samples</small></div>
              <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com/prathamc00/Facial-recognition-system-" target="_blank" rel="noreferrer">
              <span>03</span>
              <div><b>Facial Recognition & Anti-Spoofing</b><small>25 FPS edge inference · Eye-blink liveness verification · SQLite</small></div>
              <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com/prathamc00/InBox-AleRt" target="_blank" rel="noreferrer">
              <span>04</span>
              <div><b>InBox-AleRt Platform</b><small>Event-driven email scoring · Webhook ingestion · WhatsApp dispatch</small></div>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* Section 07: Contact */}
        <section className="contact-section" id="contact">
          <div className="contact-grid">
            <div className="contact-copy" data-reveal>
              <SectionLabel index="07" children="CONTACT" />
              <h2>Have a hard<br /><em>problem?</em></h2>
              <p>Tell me what you’re trying to make more useful. I’m most interested in work involving LLM inference, machine learning systems, and backend engineering.</p>
              <div className="contact-status"><span className="live-dot" /> DIRECT DISPATCH / BENGALURU, KARNATAKA</div>
              
              <div className="contact-direct-links">
                <button className="email-copy" onClick={copyEmail} title="Click to copy email">
                  <Mail size={16} /> {email} <Copy size={14} />
                </button>
                <button className="phone-copy" onClick={copyPhone} title="Click to copy phone">
                  <Phone size={15} /> {phone} <Copy size={13} />
                </button>
              </div>

              <div className="contact-socials">
                <a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
                <a href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
                <a href={`tel:${phone.replace(/\s+/g, "")}`}><Phone size={15} /> Call</a>
              </div>
            </div>
            <form className="contact-form" action={formspreeEndpoint} method="POST" onSubmit={handleSubmit} data-reveal>
              <div className="form-row">
                <label>
                  <span>01 / NAME</span>
                  <input required disabled={formState === "sending"} name="name" placeholder="Your name" />
                </label>
                <label>
                  <span>02 / EMAIL</span>
                  <input required disabled={formState === "sending"} type="email" name="email" placeholder="you@company.com" />
                </label>
              </div>
              <label>
                <span>03 / WHAT ARE WE SOLVING?</span>
                <textarea required disabled={formState === "sending"} name="message" rows={5} placeholder="Tell me about the problem, timeline, or system you want to build." />
              </label>
              <div className="form-submit">
                <span className={`form-status ${formState === "error" ? "is-error" : ""}`}>
                  {formState === "success" ? <><Check size={14} /> Message sent</> : formState === "sending" ? <><Activity className="form-sending-icon" size={14} /> Routing your note…</> : formState === "error" ? formError : "Replies usually come with context."}
                </span>
                <button className="button button-primary" disabled={formState === "sending"} type="submit">
                  <Send size={15} /> {formState === "sending" ? "Sending" : "Send note"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <a className="wordmark footer-wordmark" href="#top">
            <span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span>
            <span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span>
          </a>
          <span className="footer-caption">AI/ML Engineer / Bengaluru, Karnataka · +91 9108118381</span>
        </div>
        <a className="resume-link" href={resumeUrl} download="Prathmesh-Chavan-Resume.pdf"><Download size={15} /> Download résumé</a>
        <span className="footer-copyright">© {new Date().getFullYear()} / Prathmesh Chavan</span>
      </footer>
    </div>
  );
}
