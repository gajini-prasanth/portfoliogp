import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';

const focusCards = [
  {
    title: 'Backend Architecture',
    copy: 'Java-first systems with clean module boundaries, resilient APIs, and scalable service patterns.'
  },
  {
    title: 'Interface Craft',
    copy: 'Premium web interfaces built for readability, momentum, and conversion-oriented interactions.'
  },
  {
    title: 'Automation + QA',
    copy: 'Testing and workflow automation that improve release confidence and delivery speed.'
  }
];

const metrics = [
  { label: 'Internships Completed', value: '4', note: 'Across Java, mobile automation, data, and design' },
  { label: 'Projects Delivered', value: '10+', note: 'Production-style systems and portfolio builds' },
  { label: 'Core Stack', value: 'Java + React', note: 'Backend depth with modern front-end execution' },
  { label: 'Current Focus', value: 'Automation', note: 'Reliable systems and faster development loops' }
];

const roleLoop = [
  'Java Engineer',
  'React Developer',
  'Automation Builder',
  'UI/UX Focused Coder'
];

const techTicker = [
  'Java',
  'React',
  'Spring Boot',
  'Selenium',
  'MongoDB',
  'Docker',
  'OpenCV',
  'GitHub Actions'
];

function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roleLoop.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const refreshTime = () => {
      setLocalTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    refreshTime();
    const timer = window.setInterval(refreshTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero-shell container" data-reveal>
        <div className="hero-section">
          <div className="hero-copy fade-in" data-reveal>
            <p className="kicker">Portfolio 2026</p>
            <p className="hero-rotating-role">{roleLoop[roleIndex]}</p>
            <h1>
              High-performance software. Sharp design execution. Built to stand out.
            </h1>
            <p>
              I am Gajini Prasanth, a Computer Science engineer crafting modern products with
              Java, React, and automation-first delivery.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-solid">
                Explore Projects
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Hire or Collaborate
              </Link>
            </div>

            <div className="hero-mini-row">
              <span className="live-dot" />
              <p>
                Open for internships, freelance projects, and team collaborations. Local time:{' '}
                {localTime}
              </p>
            </div>
          </div>

          <div className="hero-media rise-up" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <img src="/gp.jpg" alt="Gajini Prasanth" />
            <div className="hero-media-badge">
              <p>Availability</p>
              <h3>Open to Work</h3>
            </div>
          </div>
        </div>

        <div className="metrics-grid stagger-grid">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="metric-card"
              data-reveal
              style={{ '--reveal-delay': '160ms' }}
            >
              <p className="metric-value">{metric.value}</p>
              <h3>{metric.label}</h3>
              <p>{metric.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block" data-reveal>
        <div className="tech-ticker-shell">
          <div className="tech-ticker-track" data-reveal>
            {[...techTicker, ...techTicker].map((item, index) => (
              <span className="tech-pill" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container section-block" data-reveal>
        <SectionHeading
          kicker="Signature"
          title="What I Deliver"
          description="A focused blend of engineering quality, interface precision, and delivery velocity."
        />
        <div className="card-grid stagger-grid">
          {focusCards.map((card) => (
            <article className="feature-card" key={card.title} data-reveal>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block split-panel" data-reveal>
        <div>
          <p className="kicker">Resume + Profile</p>
          <h2>Review my complete professional profile</h2>
          <p>
            Includes certifications, internships, project breakdowns, and core technical strengths.
          </p>
        </div>
        <div className="split-actions">
          <a className="btn btn-solid" href="/resume.pdf" download>
            Download PDF
          </a>
          <a className="btn btn-outline" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      </section>
    </>
  );
}

export default HomePage;
