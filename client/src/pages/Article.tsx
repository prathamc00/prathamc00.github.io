/*
 * Design reminder: Terminal Editorial — long-form reading should feel like a documented field note:
 * generous measure, ruled metadata, Signal Lime only for operational cues, and zero visual clutter.
 */
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRoute } from "wouter";
import ragVsOkf from "@/content/rag-vs-okf.md?raw";

const githubUrl = "https://github.com/prathamc00";
const linkedinUrl = "https://www.linkedin.com/in/prathmesh-chavan-055556378/";

const articles = {
  "rag-vs-okf": {
    category: "AI ARCHITECTURE & KNOWLEDGE SYSTEMS",
    title: "RAG vs OKF: Rethinking Knowledge Retrieval and Representation for AI Systems",
    dek: "Why choosing between Retrieval-Augmented Generation and Open Knowledge Format is not a zero-sum game—and how hybrid architectures unlock production AI agents.",
    date: "AUG 12, 2026",
    read: "06 MIN READ",
    tags: ["RAG", "OKF", "AI Agents", "Knowledge Representation", "LLM Architecture"],
    body: ragVsOkf,
  },
};

export default function Article() {
  const [, params] = useRoute("/writing/:slug");
  const article = articles[params?.slug as keyof typeof articles];

  if (!article) {
    return (
      <main className="article-not-found">
        <a className="wordmark" href="/"><span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span><span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span></a>
        <p>ARTICLE / NOT FOUND</p>
        <h1>This note has not been published yet.</h1>
        <a className="button button-primary" href="/#notes">Back to writing <ArrowLeft size={16} /></a>
      </main>
    );
  }

  return (
    <div className="article-page">
      <header className="article-header">
        <a className="wordmark" href="/" aria-label="Prathmesh home"><span className="mark-frame"><img src="/logo.svg" alt="Prathmesh logo" /></span><span>prathmesh<span className="wordmark-dot">.</span><span className="wordmark-cursor" aria-hidden="true" /></span></a>
        <a className="article-back" href="/#notes"><ArrowLeft size={15} /> Back to field log</a>
      </header>

      <aside className="article-field-index" aria-label="Article field log">
        <span className="article-field-title">NOTE / 001</span>
        <span className="article-field-state">DOC / PUBLISHED</span>
        <span><b>00</b> BRIEF</span>
        <span><b>01</b> RETRIEVAL</span>
        <span><b>02</b> REPRESENTATION</span>
        <span><b>03</b> ROUTING</span>
        <span><b>04</b> TAKE</span>
      </aside>

      <main className="article-main">
        <div className="article-rail" aria-hidden="true"><span>FIELD NOTE</span><i /><span>04 / WRITING</span></div>
        <article className="article-content">
          <p className="article-category"><span className="live-dot" /> {article.category}</p>
          <h1>{article.title}</h1>
          <p className="article-dek">{article.dek}</p>
          <div className="article-meta">
            <div className="article-author"><span>PR</span><b>Written by Prathmesh</b></div>
            <span>{article.date}</span>
            <span>{article.read}</span>
          </div>
          <div className="article-evidence"><span>FORMAT / MARKDOWN</span><span>TOPIC / KNOWLEDGE ROUTING</span><span><i /> STATUS / PUBLISHED</span></div>
          <div className="article-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="article-rule" />
          <div className="article-markdown"><ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown></div>
          <div className="article-close"><span>END OF NOTE / 001</span><p>More system notes will follow as the build loop earns them.</p><a className="button button-secondary" href="/#notes">Back to writing <ArrowLeft size={15} /></a></div>
        </article>
      </main>

      <footer className="article-footer">
        <span>PRATHMESH / AI ENGINEER / BENGALURU</span>
        <div><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="mailto:prathmeshc002@gmail.com"><Mail size={15} /> Email</a></div>
        <a href="/" aria-label="Return to portfolio"><ArrowUpRight size={18} /></a>
      </footer>
    </div>
  );
}
