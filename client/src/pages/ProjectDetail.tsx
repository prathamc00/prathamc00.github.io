/*
 * Design: Terminal Editorial Project Dossier
 * Detailed technical case studies matching the field log aesthetic:
 * Monospace specifications, architecture diagrams, benchmark comparisons, and source links.
 */
import { useState } from "react";
import { useRoute } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Terminal,
} from "lucide-react";
import { toast } from "sonner";

const githubProfileUrl = "https://github.com/prathamc00";
const linkedinUrl = "https://www.linkedin.com/in/prathmesh-chavan/";

interface ProjectDoc {
  slug: string;
  number: string;
  type: string;
  title: string;
  tagline: string;
  repoUrl: string;
  pypiUrl?: string;
  pipInstall?: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  overview: string;
  keyPoints: string[];
  benchmarks?: Array<{ label: string; value: string; sub: string }>;
  codeSnippet?: { language: string; title: string; code: string };
  architecture: Array<{ phase: string; title: string; detail: string }>;
}

const projectDocs: Record<string, ProjectDoc> = {
  streamllm: {
    slug: "streamllm",
    number: "01",
    type: "LLM INFERENCE / SYSTEMS PROGRAMMING",
    title: "StreamLLM Inference Engine",
    tagline:
      "Running 14B–70B parameter models on consumer GPUs with 4GB–8GB VRAM without distributed clusters via dynamic layer streaming.",
    repoUrl: "https://github.com/prathamc00/streamLLM",
    pypiUrl: "https://pypi.org/project/streamllm/",
    pipInstall: "pip install streamllm",
    metric: "4–8 GB",
    metricLabel: "min GPU VRAM for 70B models",
    stack: ["Python", "PyTorch", "CUDA", "Transformers", "Systems Programming", "PyPI"],
    overview:
      "Large language models (14B, 32B, and 70B) typically require tens to hundreds of gigabytes of expensive GPU VRAM to execute inference. StreamLLM fundamentally re-engineers this paradigm: instead of loading the entire parameter weights into GPU memory, StreamLLM dynamically streams transformer layers between host system RAM/SSD and GPU VRAM on-demand. By overlapping compute with PCIe data transfers through dedicated CUDA streams and double buffering, StreamLLM achieves low-latency inference on consumer laptop and desktop GPUs with as little as 128 MB scratchpad VRAM.",
    keyPoints: [
      "Built an LLM inference system that dynamically streams transformer layers between system RAM/disk and GPU VRAM, enabling larger models to run on consumer GPUs with limited VRAM.",
      "Implemented asynchronous layer prefetching, double buffering, and overlapping compute with PCIe data transfers using dedicated CUDA streams.",
      "Designed a static GPU scratchpad allocator with two reusable VRAM slots, eliminating dynamic memory reallocation overhead during inference passes.",
      "Implemented pinned host memory and CUDA event synchronization for non-blocking host-to-device transfers.",
      "Developed deterministic KV-cache memory budgeting to support expanding context lengths while preventing GPU out-of-memory (OOM) failures.",
      "Benchmarked inference pipelines on an NVIDIA RTX 3050 Laptop GPU and achieved up to 1.28x lower latency with asynchronous prefetching while maintaining a 128 MB GPU scratchpad.",
    ],
    benchmarks: [
      { label: "Standard 70B VRAM", value: "~140 GB", sub: "Distributed cluster required" },
      { label: "StreamLLM Min VRAM", value: "6.8 GB", sub: "Consumer GPU compatible" },
      { label: "VRAM Reduction", value: "95%", sub: "Dynamic layer streaming" },
      { label: "Scratchpad Allocation", value: "128 MB", sub: "Static 2-slot double buffer" },
      { label: "Prefetch Latency Gain", value: "1.28x", sub: "Overlapped PCIe compute" },
    ],
    codeSnippet: {
      language: "python",
      title: "Quickstart Inference via Python SDK",
      code: `from streamllm import AutoModel

# Load any model preset or HuggingFace repo ID
model = AutoModel.from_pretrained("qwen-14b")

# Tokenize prompt
tokens = model.tokenizer("Explain transformer layer streaming:", return_tensors="pt")

# Generate with overlapped CUDA prefetching
output = model.generate(tokens["input_ids"], max_new_tokens=60)
print(model.tokenizer.decode(output.sequences[0]))`,
    },
    architecture: [
      {
        phase: "STAGE 01",
        title: "Layer Weights Offloading & Disk/RAM Caching",
        detail:
          "Model weights are partitioned into individual transformer layer tensors stored in pinned host system memory or high-speed NVMe storage, indexed by a lightweight metadata dispatch table.",
      },
      {
        phase: "STAGE 02",
        title: "Dedicated CUDA Stream & Asynchronous Prefetching",
        detail:
          "While layer N computes forward pass kernels on the default CUDA stream, layer N+1 is simultaneously streamed over the PCIe bus via a secondary copy stream with zero CPU execution stalls.",
      },
      {
        phase: "STAGE 03",
        title: "Static Dual-Slot VRAM Scratchpad",
        detail:
          "A fixed two-slot memory buffer in VRAM swaps roles ping-pong style. Memory fragmentation is completely eliminated, enabling predictable execution under tight VRAM envelopes.",
      },
      {
        phase: "STAGE 04",
        title: "Deterministic KV-Cache Budgeting",
        detail:
          "Attention key/value states are managed with sliding-window eviction and quantization budgeting to maintain coherence across extended conversations without blowing up memory.",
      },
    ],
  },
  deepfake: {
    slug: "deepfake",
    number: "02",
    type: "AI / ML FORENSICS & COMPUTER VISION",
    title: "Deepfake Detection Web App",
    tagline:
      "Deep learning classification pipelines for manipulated image and video detection, achieving 92%+ validation accuracy on 100k+ samples.",
    repoUrl: "https://github.com/prathamc00/deepFake",
    metric: "92%+",
    metricLabel: "validation accuracy (100k+ samples)",
    stack: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "FastAPI", "Docker", "Celery", "Redis"],
    overview:
      "Synthetic media generation and diffusion-based tampering present acute challenges for digital authentication. This project implements a comprehensive deep learning detection pipeline designed to uncover manipulated face and video artifacts. Combining spatial convolutional networks with frequency-domain Fourier transform analysis, the system identifies subtle blending boundaries, frequency spectrum abnormalities, and facial landmark inconsistencies that human eyes cannot perceive.",
    keyPoints: [
      "Developed deep learning classification pipelines for manipulated image and video detection, achieving 92%+ validation accuracy on datasets containing 100k+ samples.",
      "Combined computer vision preprocessing with deep learning models to identify visual manipulation patterns across varied media formats.",
      "Built model evaluation and validation pipelines to analyze performance across different classes, compression rates, and media conditions.",
      "Implemented an asynchronous Celery and Redis worker queue to handle multi-frame video extraction and model inference without blocking client connections.",
      "Packaged the entire training and inference pipeline into containerized Docker images for reproducible evaluation and production deployment.",
    ],
    benchmarks: [
      { label: "Validation Accuracy", value: "92.4%", sub: "On 100k+ evaluation images" },
      { label: "Dataset Size", value: "100k+", sub: "Balanced authentic vs. synthetic" },
      { label: "Processing Mode", value: "Async", sub: "Celery workers + Redis queue" },
      { label: "Architecture", value: "Ensemble", sub: "Spatial CNN + FFT Frequency" },
    ],
    codeSnippet: {
      language: "python",
      title: "Inference & Frequency Artifact Analysis",
      code: `import cv2
import numpy as np
import torch

def extract_frequency_artifacts(face_crop: np.ndarray) -> np.ndarray:
    """Compute 2D FFT magnitude spectrum to reveal synthesis artifacts."""
    gray = cv2.cvtColor(face_crop, cv2.COLOR_BGR2GRAY)
    f_transform = np.fft.fft2(gray)
    f_shift = np.fft.fftshift(f_transform)
    magnitude_spectrum = 20 * np.log(np.abs(f_shift) + 1e-9)
    return magnitude_spectrum

# Classification pipeline returns confidence and forensic telemetry
result = detector.evaluate(video_frames, threshold=0.85)`,
    },
    architecture: [
      {
        phase: "STAGE 01",
        title: "Frame Extraction & Facial Landmark Isolation",
        detail:
          "Input video streams are unpacked into sequence frames; face regions are isolated with OpenCV and aligned via 68-point facial landmark geometry.",
      },
      {
        phase: "STAGE 02",
        title: "Dual-Domain Artifact Extraction",
        detail:
          "Each face crop is passed through spatial convolutional feature extractors and 2D Fast Fourier Transform (FFT) filters to highlight synthesis boundaries and blending artifacts.",
      },
      {
        phase: "STAGE 03",
        title: "Ensemble Confidence Scoring",
        detail:
          "Deep learning classifiers generate calibrated probability distributions over temporal frame batches, mitigating single-frame false positives.",
      },
      {
        phase: "STAGE 04",
        title: "Asynchronous Webhook & API Dispatch",
        detail:
          "FastAPI endpoints return immediate job IDs while Celery workers process video streams and deliver detailed forensic heatmaps upon completion.",
      },
    ],
  },
  "facial-recognition": {
    slug: "facial-recognition",
    number: "03",
    type: "COMPUTER VISION & EDGE INFERENCE",
    title: "Facial Recognition & Anti-Spoofing",
    tagline:
      "Real-time face recognition and liveness verification running edge inference at 25 FPS with MobileNetV2.",
    repoUrl: "https://github.com/prathamc00/Facial-recognition-system-",
    metric: "25 FPS",
    metricLabel: "edge inference throughput",
    stack: ["Python", "OpenCV", "TensorFlow", "MobileNetV2", "SQLite", "Scikit-learn"],
    overview:
      "Biometric security systems often struggle with spoofing vulnerabilities (such as printed photograph or smartphone screen replay attacks) and heavy computational demands. This project builds a real-time face verification and attendance logging pipeline that achieves 25 FPS edge inference throughput using lightweight MobileNetV2 embeddings paired with an eye-blink liveness verification algorithm.",
    keyPoints: [
      "Designed and deployed a real-time facial recognition pipeline using MobileNetV2 embeddings, OpenCV, and cosine similarity metric scoring.",
      "Implemented an eye-blink liveness verification check analyzing eye aspect ratio (EAR) dynamics over sliding temporal windows to prevent 2D photo spoofing.",
      "Optimized model inference pipeline to maintain a steady 25 FPS video stream on resource-constrained local hardware.",
      "Integrated automated SQLite persistence for real-time user identification, timestamped attendance logging, and verification history.",
      "Designed an intuitive terminal HUD and desktop GUI displaying real-time bounding box telemetry, verification confidence, and liveness states.",
    ],
    benchmarks: [
      { label: "Edge Throughput", value: "25 FPS", sub: "Live webcam stream" },
      { label: "Backbone Model", value: "MobileNetV2", sub: "Quantized lightweight feature extractor" },
      { label: "Anti-Spoofing Method", value: "Eye-Blink EAR", sub: "Temporal liveness ratio tracking" },
      { label: "Database Persistence", value: "SQLite", sub: "Sub-millisecond verification log" },
    ],
    codeSnippet: {
      language: "python",
      title: "Eye Aspect Ratio (EAR) Liveness Check",
      code: `def eye_aspect_ratio(eye_landmarks):
    # Vertical landmark Euclidean distances
    A = np.linalg.norm(eye_landmarks[1] - eye_landmarks[5])
    B = np.linalg.norm(eye_landmarks[2] - eye_landmarks[4])
    # Horizontal landmark Euclidean distance
    C = np.linalg.norm(eye_landmarks[0] - eye_landmarks[3])
    # EAR ratio
    return (A + B) / (2.0 * C)

# Verify natural blink cycle before granting authentication
if ear < EYE_AR_THRESH:
    blink_counter += 1`,
    },
    architecture: [
      {
        phase: "STAGE 01",
        title: "Real-time Stream Ingestion & Haar / DNN Face Detection",
        detail:
          "Video frames captured from edge cameras are downscaled and normalized; candidate face bounding boxes are extracted in real time.",
      },
      {
        phase: "STAGE 02",
        title: "Facial Landmark Estimation & Liveness Check",
        detail:
          "Eye coordinates are tracked frame-by-frame; continuous Eye Aspect Ratio calculations verify genuine biological blink dynamics before processing identity.",
      },
      {
        phase: "STAGE 03",
        title: "MobileNetV2 Vector Embedding & Cosine Matching",
        detail:
          "The verified face is passed through a MobileNetV2 feature extractor. Vector embeddings are compared against enrolled gallery vectors via cosine similarity thresholds.",
      },
      {
        phase: "STAGE 04",
        title: "SQLite Event Audit Logging",
        detail:
          "Authentication outcomes, confidence values, timestamps, and liveness audit flags are logged atomically to SQLite for access management records.",
      },
    ],
  },
  "inbox-alert": {
    slug: "inbox-alert",
    number: "04",
    type: "AUTOMATION & EVENT-DRIVEN AI",
    title: "InBox-AleRt Priority Engine",
    tagline:
      "AI-powered email intelligence platform that classifies high-priority emails and delivers real-time WhatsApp alerts.",
    repoUrl: "https://github.com/prathamc00/InBox-AleRt",
    metric: "0—100",
    metricLabel: "two-stage priority scoring",
    stack: ["Python", "FastAPI", "Next.js", "Redis", "Celery", "Docker", "LLMs", "OAuth 2.0"],
    overview:
      "Critical communications are frequently lost beneath promotional clutter and newsletters. InBox-AleRt is an event-driven email intelligence service that ingests real-time email webhooks, applies a two-stage evaluation combining deterministic heuristic rules with LLM semantic reasoning to produce a calibrated priority score (0–100), and dispatches instant push notifications directly to WhatsApp for urgent items.",
    keyPoints: [
      "Built an AI-powered email intelligence platform that classifies high-priority emails and delivers real-time WhatsApp alerts.",
      "Designed a two-stage email scoring pipeline combining rule-based filtering with LLM-based classification to generate priority scores from 0–100.",
      "Integrated Gmail Pub/Sub and Microsoft Graph webhooks with asynchronous Celery workers and Redis for event-driven email processing.",
      "Implemented OAuth 2.0, RS256 JWT authentication, and AES-256 encryption for secure multi-account email processing.",
      "Engineered an automated WhatsApp message dispatch service that summarizes urgent email context and suggested actions within seconds of receipt.",
    ],
    benchmarks: [
      { label: "Scoring Range", value: "0—100", sub: "Calibrated priority score" },
      { label: "Alert Channel", value: "WhatsApp", sub: "Instant webhook dispatch" },
      { label: "Processing Latency", value: "< 2.5s", sub: "From webhook receipt to alert" },
      { label: "Security Architecture", value: "AES-256", sub: "Encrypted token store & RS256 JWT" },
    ],
    codeSnippet: {
      language: "python",
      title: "Two-Stage Priority Scoring Engine",
      code: `async def evaluate_email_priority(email_payload: EmailPayload) -> PriorityResult:
    # Stage 1: Deterministic heuristic filters (VIP domains, deadlines, financial tags)
    rule_score = apply_rule_heuristics(email_payload)
    if rule_score.is_terminal:
        return rule_score

    # Stage 2: LLM semantic evaluation for context and actionability
    llm_assessment = await llm_scorer.evaluate(
        subject=email_payload.subject,
        body_snippet=email_payload.clean_body[:1000],
        sender=email_payload.sender
    )
    return combine_scores(rule_score, llm_assessment)`,
    },
    architecture: [
      {
        phase: "STAGE 01",
        title: "Webhook Ingestion & Pub/Sub Subscriptions",
        detail:
          "Inbound email notifications from Google Cloud Pub/Sub and Microsoft Graph are received by FastAPI endpoints and immediately queued to Redis.",
      },
      {
        phase: "STAGE 02",
        title: "Stage 1 Rule-Based Heuristic Filter",
        detail:
          "Fast static heuristics screen out newsletters, spam, and routine receipts, identifying high-risk keywords, senders, and deadlines instantly.",
      },
      {
        phase: "STAGE 03",
        title: "Stage 2 LLM Semantic Scoring",
        detail:
          "Ambiguous or high-potential emails are evaluated by an LLM prompt engine that extracts sender intent, urgency, action items, and generates a score from 0 to 100.",
      },
      {
        phase: "STAGE 04",
        title: "Real-time WhatsApp Dispatch & Dashboard Sync",
        detail:
          "Scores exceeding configured user thresholds trigger an automated WhatsApp message containing a concise summary and direct action buttons.",
      },
    ],
  },
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const project = projectDocs[params?.slug as keyof typeof projectDocs];
  const [copiedPip, setCopiedPip] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) {
    return (
      <main className="article-not-found">
        <a className="wordmark" href="/">
          <span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span>
          <span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span>
        </a>
        <p>PROJECT / NOT FOUND</p>
        <h1>This project case study does not exist.</h1>
        <a className="button button-primary" href="/#work">
          Back to selected work <ArrowLeft size={16} />
        </a>
      </main>
    );
  }

  const handleCopyPip = () => {
    if (!project.pipInstall) return;
    navigator.clipboard.writeText(project.pipInstall);
    setCopiedPip(true);
    toast.success(`Copied "${project.pipInstall}" to clipboard`);
    setTimeout(() => setCopiedPip(false), 2200);
  };

  const handleCopyCode = () => {
    if (!project.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet.code);
    setCopiedCode(true);
    toast.success("Code snippet copied to clipboard");
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <div className="article-page project-detail-page">
      <header className="article-header">
        <a className="wordmark" href="/" aria-label="Prathmesh home">
          <span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span>
          <span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span>
        </a>
        <a className="article-back" href="/#work">
          <ArrowLeft size={15} /> Back to selected work
        </a>
      </header>

      <aside className="article-field-index" aria-label="Project field log rail">
        <span className="article-field-title">SPEC / {project.number}</span>
        <span className="article-field-state">STATUS / ACTIVE</span>
        <span><b>00</b> OVERVIEW</span>
        <span><b>01</b> ARCHITECTURE</span>
        <span><b>02</b> METRICS</span>
        <span><b>03</b> REPO</span>
      </aside>

      <main className="article-main project-detail-main">
        <div className="article-rail" aria-hidden="true">
          <span>PROJECT SPEC</span>
          <i />
          <span>{project.number} / WORK</span>
        </div>

        <article className="article-content project-detail-content">
          <div className="spec-top-nav">
            <span className="mono-chip">{project.number} / {project.type}</span>
            <div className="spec-top-actions">
              {project.pypiUrl && (
                <a href={project.pypiUrl} target="_blank" rel="noreferrer" className="spec-badge-link">
                  PyPI Package <ExternalLink size={12} />
                </a>
              )}
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="spec-badge-link spec-badge-primary">
                GitHub Repo <Github size={13} />
              </a>
            </div>
          </div>

          <h1 className="project-detail-title">{project.title}</h1>
          <p className="project-detail-tagline">{project.tagline}</p>

          <div className="spec-metric-rail">
            <div className="spec-metric-card">
              <span className="spec-metric-value">{project.metric}</span>
              <span className="spec-metric-label">{project.metricLabel}</span>
            </div>
            {project.pipInstall && (
              <button
                className="pip-chip spec-pip-chip"
                onClick={handleCopyPip}
                type="button"
                title="Click to copy install command"
              >
                <Terminal size={12} />
                <code>{project.pipInstall}</code>
                {copiedPip ? <Check size={12} className="pip-check" /> : <Copy size={12} />}
              </button>
            )}
          </div>

          <div className="article-evidence">
            <span>REPOSITORY / VERIFIED</span>
            <span>TOPIC / SYSTEMS & ML</span>
            <span><i /> STATUS / PRODUCTION-READY</span>
          </div>

          <div className="article-tags">
            {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
          </div>

          <div className="article-rule" />

          {/* Section: Overview */}
          <section className="spec-section">
            <div className="spec-section-head">
              <span>01 / SYSTEM OVERVIEW</span>
            </div>
            <p className="spec-body-text">{project.overview}</p>
          </section>

          {/* Section: Key Engineering Achievements */}
          <section className="spec-section">
            <div className="spec-section-head">
              <span>02 / KEY IMPLEMENTATION DETAILS</span>
            </div>
            <ul className="spec-bullet-list">
              {project.keyPoints.map((point, index) => (
                <li key={index}>
                  <ChevronRight size={14} className="spec-bullet-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Benchmarks */}
          {project.benchmarks && (
            <section className="spec-section">
              <div className="spec-section-head">
                <span>03 / BENCHMARK & EVALUATION TELEMETRY</span>
              </div>
              <div className="spec-benchmark-grid">
                {project.benchmarks.map((b) => (
                  <div key={b.label} className="spec-benchmark-card">
                    <span className="spec-benchmark-val">{b.value}</span>
                    <span className="spec-benchmark-lbl">{b.label}</span>
                    <small className="spec-benchmark-sub">{b.sub}</small>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Architecture Pipeline */}
          <section className="spec-section">
            <div className="spec-section-head">
              <span>04 / SYSTEM ARCHITECTURE PIPELINE</span>
            </div>
            <div className="spec-arch-pipeline">
              {project.architecture.map((stage) => (
                <div key={stage.phase} className="spec-arch-node">
                  <div className="spec-arch-meta">
                    <span className="spec-arch-phase">{stage.phase}</span>
                    <b>{stage.title}</b>
                  </div>
                  <p>{stage.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Code Snippet */}
          {project.codeSnippet && (
            <section className="spec-section">
              <div className="spec-section-head">
                <span>05 / CODE DEMONSTRATION</span>
              </div>
              <div className="spec-code-box">
                <div className="spec-code-top">
                  <span>{project.codeSnippet.title}</span>
                  <button onClick={handleCopyCode} className="spec-code-copy" title="Copy code">
                    {copiedCode ? <Check size={13} className="text-lime" /> : <Copy size={13} />}
                  </button>
                </div>
                <pre>
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </section>
          )}

          {/* Bottom Actions */}
          <div className="spec-close-box">
            <div>
              <span className="spec-close-tag">INSPECT SOURCE CODE</span>
              <h3>Explore the implementation on GitHub</h3>
              <p>Review the full code repository, commit history, benchmarks, and issue tracker.</p>
            </div>
            <div className="spec-close-buttons">
              <a
                className="button button-primary"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open GitHub Repo <Github size={15} />
              </a>
              <a className="button button-secondary" href="/#work">
                Back to all projects <ArrowLeft size={15} />
              </a>
            </div>
          </div>
        </article>
      </main>

      <footer className="article-footer">
        <span>PRATHMESH CHAVAN / AI ENGINEER / BENGALURU</span>
        <div>
          <a href={githubProfileUrl} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a>
          <a href="mailto:prathmeshc002@gmail.com"><Mail size={15} /> Email</a>
        </div>
        <a href="/" aria-label="Return to portfolio"><ArrowUpRight size={18} /></a>
      </footer>
    </div>
  );
}
