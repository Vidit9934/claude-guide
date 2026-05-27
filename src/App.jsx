import { useEffect, useRef, useState } from 'react'
import styles from './App.module.css'

/* ── Scroll-reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Animated progress bar ── */
function ProgressBar({ pct, color, delay = 0 }) {
  const ref = useRef(null)
  const [filled, setFilled] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setFilled(true); io.disconnect() } }, { threshold: 0.5 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={styles.barTrack}>
      <div
        className={styles.barFill}
        style={{
          width: filled ? `${pct}%` : '0%',
          background: color,
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

/* ── Data ── */
const curricula = [
  { num: '01', title: 'Claude 101', desc: 'Fundamental architectures, model parameters, and basic token optimization.' },
  { num: '02', title: 'Building with Claude API', desc: 'Managing stateful endpoints, system prompt structures, and high-performance streaming.' },
  { num: '03', title: 'Claude Code in Action', desc: 'Terminal prompt integration, automated execution tools, and pipeline optimization.' },
  { num: '04', title: 'Intro to Model Context Protocol', desc: 'Building basic unified schemas for data exchange between host clients and external resources.' },
  { num: '05', title: 'MCP: Advanced Topics', desc: 'Secure enterprise data federation, protocol debugging, and custom transport-layer configurations.' },
  { num: '06', title: 'Introduction to Agent Skill', desc: 'Developing deterministic fallback loops, behavioral boundaries, and dynamic tool selection criteria.' },
]

const domains = [
  { id: 'D1', title: 'Agentic Architecture & Orchestration', desc: 'Designing multi-step workflow states, loops, and self-correcting graphs.', accent: 'var(--blue)' },
  { id: 'D2', title: 'Tool Design & MCP Integration', desc: 'Constructing standard machine-executable schemas and custom tool servers.', accent: 'var(--pink)' },
  { id: 'D3', title: 'Claude Code Configuration & Workflows', desc: 'Optimizing developer velocity via operational loop workflows.', accent: 'var(--green)' },
  { id: 'D4', title: 'Prompt Engineering & Structured Output', desc: 'Advanced XML formatting, systematic system prompt controls, and reliable JSON definitions.', accent: 'var(--purple)' },
  { id: 'D5', title: 'Context Management & Reliability', desc: 'Context pre-filling, caching controls, and reliable failover mechanics.', accent: 'var(--red)' },
]

const results = [
  { id: 'D1', label: 'Agentic Architecture & Orchestration', score: '9/9', pct: 100, pts: '+278pts', color: 'var(--blue)' },
  { id: 'D2', label: 'Tool Design & MCP Integration', score: '5/6', pct: 83, pts: '+150pts', color: 'var(--pink)' },
  { id: 'D3', label: 'Claude Code Configuration & Workflows', score: '7/7', pct: 100, pts: '+280pts', color: 'var(--green)' },
  { id: 'D4', label: 'Prompt Engineering & Structured Output', score: '2/2', pct: 100, pts: '+280pts', color: 'var(--purple)' },
  { id: 'D5', label: 'Context Management & Reliability', score: '4/4', pct: 100, pts: '+150pts', color: 'var(--red)' },
]

/* ── Nav dots ── */
const sections = ['hero','intro','curricula','registry','domains','strategy','results']

export default function App() {
  useReveal()
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  return (
    <div className={styles.root}>
      {/* Ambient background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Sticky nav dots */}
      <nav className={styles.navDots}>
        {sections.map(id => (
          <a key={id} href={`#${id}`} className={`${styles.dot} ${active === id ? styles.dotActive : ''}`} title={id} />
        ))}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>Foundations Certification Exam Guide</div>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine1}>Claude</span>
            <span className={styles.heroTitleLine2}>Certified</span>
            <span className={styles.heroTitleLine3}>Architect</span>
          </h1>
          <div className={styles.heroMeta}>
            <span className={styles.heroMetaLine}>Prepared by</span>
            <span className={styles.heroAuthor}>Vidit Vaibhav</span>
          </div>
          <div className={styles.heroScroll}>
            <span>Scroll to explore</span>
            <div className={styles.scrollLine} />
          </div>
        </div>
        <div className={styles.heroDeco}>
          <div className={styles.decoRing1} />
          <div className={styles.decoRing2} />
          <div className={styles.decoGrid} />
        </div>
      </section>

      {/* ── INTRO ── */}
      <section id="intro" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>01 — Introduction & Overview</div>
          <h2 className={`${styles.sectionTitle} reveal`}>What This Certification Validates</h2>
          <div className={`${styles.introCard} reveal`}>
            <div className={styles.introQuote}>"</div>
            <p className={styles.introText}>
              The Claude Certified Architect — Foundations certification validates an engineer's comprehension of{' '}
              <strong>core LLM mechanics</strong>, <strong>agentic workflows</strong>,{' '}
              <strong>complex infrastructure design</strong>, and{' '}
              <strong>multi-tool orchestration</strong> using Anthropic's Claude models.
            </p>
            <p className={styles.introSub}>
              This document details the mandatory paths, blueprints, and critical empirical observations required for certification.
            </p>
          </div>
        </div>
      </section>

      {/* ── CURRICULA ── */}
      <section id="curricula" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>02 — Core Preparation Curricula</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Primary Operational Tracks</h2>
          <p className={`${styles.sectionSub} reveal`}>Candidates should ensure full mastery over all six tracks before attempting the exam.</p>
          <div className={styles.curriculaGrid}>
            {curricula.map((c, i) => (
              <div key={c.num} className={`${styles.curriculaCard} reveal`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className={styles.curriculaNum}>{c.num}</div>
                <div className={styles.curriculaContent}>
                  <h3 className={styles.curriculaTitle}>{c.title}</h3>
                  <p className={styles.curriculaDesc}>{c.desc}</p>
                </div>
                <div className={styles.curriculaArrow}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REGISTRY ── */}
      <section id="registry" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>03 — Evaluation & Framework Repositories</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Practice Examination Registry</h2>
          <div className={`${styles.registryCard} reveal`}>
            <div className={styles.registryIcon}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </div>
            <div className={styles.registryContent}>
              <p className={styles.registryLabel}>Complete multi-domain simulation papers are accessible at:</p>
              <a href="https://claudecertificationguide.com/mock-exam/" target="_blank" rel="noreferrer" className={styles.registryLink}>
                claudecertificationguide.com/mock-exam/
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOMAINS ── */}
      <section id="domains" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>04 — Exam Domains & Point Vectors</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Five Execution Domains</h2>
          <p className={`${styles.sectionSub} reveal`}>The formal examination blueprint measures technical capabilities across five explicit domains.</p>
          <div className={styles.domainsGrid}>
            {domains.map((d, i) => (
              <div key={d.id} className={`${styles.domainCard} reveal`} style={{ transitionDelay: `${i * 80}ms`, '--accent': d.accent }}>
                <div className={styles.domainId} style={{ color: d.accent }}>{d.id}</div>
                <h3 className={styles.domainTitle}>{d.title}</h3>
                <p className={styles.domainDesc}>{d.desc}</p>
                <div className={styles.domainBar} style={{ background: d.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGY ── */}
      <section id="strategy" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>05 — Heuristic Strategy & Technical Performance</div>
          <h2 className={`${styles.sectionTitle} reveal`}>The Longest-Answer Heuristic</h2>
          <div className={`${styles.strategyCard} reveal`}>
            <p className={styles.strategyText}>
              During empirical testing runs under mock examination constraints, a consistent structural pattern was noticed regarding response options. In highly nuanced architectural questions, the{' '}
              <em>longest</em> and <em>second longest</em> options frequently represent the correct answers due to the exhaustive technical definitions required to construct valid solutions.
            </p>
            <div className={styles.strategyCallout}>
              <div className={styles.strategyCalloutIcon}>★</div>
              <blockquote className={styles.strategyQuote}>
                "This is what I achieved by only clicking the longest answers in mock exams."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.sectionLabel} reveal`}>06 — Exam Results</div>
          <h2 className={`${styles.sectionTitle} reveal`}>Mock Examination Performance</h2>
          <div className={`${styles.resultsOuter} reveal`}>
            {/* Dark exam results card — mirrors the screenshot */}
            <div className={styles.resultsCard}>
              <div className={styles.resultsHeader}>
                <span className={styles.resultsHeaderLabel}>Exam Results</span>
                <span className={styles.resultsPassed}>PASSED</span>
              </div>

              <div className={styles.resultsScore}>
                <span className={styles.resultsScoreMain}>970</span>
                <span className={styles.resultsScoreSep}>/</span>
                <span className={styles.resultsScoreTotal}>1000</span>
              </div>

              <div className={styles.resultsPassInfo}>
                27 of 28 correct <span className={styles.resultsPct}>(96%)</span>
                <span className={styles.resultsDot}>·</span>
                Pass mark: 720
              </div>

              <div className={styles.resultsDivider} />

              <div className={styles.resultsBreakdownLabel}>Domain Breakdown</div>
              <div className={styles.resultsBreakdown}>
                {results.map((r, i) => (
                  <div key={r.id} className={styles.resultRow}>
                    <div className={styles.resultRowTop}>
                      <div className={styles.resultDotColor} style={{ background: r.color }} />
                      <span className={styles.resultDomainId} style={{ color: r.color }}>{r.id}</span>
                      <span className={styles.resultDomainLabel}>{r.label}</span>
                      <span className={styles.resultScore}>{r.score} ({r.pct}%)</span>
                      <span className={styles.resultPts}>{r.pts}</span>
                    </div>
                    <ProgressBar pct={r.pct} color={r.color} delay={i * 120} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerBrand}>Claude Certified Architect</span>
          <span className={styles.footerSep}>—</span>
          <span className={styles.footerCredit}>Prepared by Vidit Vaibhav</span>
        </div>
      </footer>
    </div>
  )
}
