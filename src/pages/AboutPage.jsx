import SectionHeading from '../components/SectionHeading';

const timeline = [
  {
    role: 'Mobile Automation Intern',
    org: 'PRAM Educate IT Software LLP',
    kind: 'Internship',
    time: 'Dec 2025 to Feb 2026',
    duration: '3 months',
    location: 'Remote'
  },
  {
    role: 'Java Programmer',
    org: 'EdiGlobe',
    kind: 'Internship',
    time: 'Oct 2025 to Dec 2025',
    duration: '3 months',
    location: 'Remote',
    detail: 'Worked on Java development and WordPress implementations.'
  },
  {
    role: 'Graphic Designer',
    org: 'YHills',
    kind: 'Internship',
    time: 'Jul 2025 to Aug 2025',
    duration: '2 months',
    location: 'Remote',
    detail:
      'Designed and delivered creative graphics for digital platforms, applying PHP and WordPress to enhance layouts. Collaborated on real-time projects with a focus on visual clarity, user-friendly design, testing processes, and media integration.'
  },
  {
    role: 'Data Science Intern',
    org: 'Nexus Info',
    kind: 'Internship',
    time: 'Dec 2023 to Mar 2024',
    duration: '4 months',
    location: 'Coimbatore, Tamil Nadu, India · Remote'
  }
];

const certifications = [
  {
    title: "Certificate of Participation in Students' Research Conclave 3.0",
    issuer: 'Unstop',
    issued: 'Jan 2026',
    credentialId: 'e7645d47-2405-4519-9545-dafee273c6ca'
  },
  {
    title: 'Learning Selenium: Structure, Scale, Run, and Optimize Automated Tests',
    issuer: 'LinkedIn',
    issued: 'Dec 2025',
    skills: ['Selenium']
  },
  {
    title: 'Test Automation with Selenium WebDriver for Java',
    issuer: 'LinkedIn',
    issued: 'Dec 2025',
    skills: ['Java', 'Selenium WebDriver']
  },
  {
    title: 'The JDBC API and Localization',
    issuer: 'Skillsoft',
    issued: 'Nov 2025',
    credentialId: '167146623',
    skills: ['Java Database Connectivity (JDBC)']
  },
  {
    title: 'Certificate of Participation in Code For Bharat Season 2 Hackathon',
    issuer: 'Unstop',
    issued: 'Oct 2025',
    credentialId: '9918f8e3-8c47-4b95-9919-d48788b1c576'
  },
  {
    title: 'CRUD Operations in MongoDB',
    issuer: 'MongoDB',
    issued: 'Sep 2025',
    credentialId: 'MDB0sktwrkmbv'
  },
  {
    title: "From Relational Model (SQL) to MongoDB's Document Model",
    issuer: 'MongoDB',
    issued: 'Sep 2025'
  },
  {
    title: 'Docker Foundations Professional Certificate',
    issuer: 'Docker, Inc',
    issued: 'Sep 2025',
    skills: ['Docker Products', 'Containerization']
  },
  {
    title: 'Code For Bharat Season 2',
    issuer: 'United Latino Students Association',
    issued: 'Jun 2025',
    credentialId: '13c33435-ab25-45e4-9f9f-a2fc837fec67'
  },
  {
    title: 'HackerRank',
    issuer: 'HackerRank',
    issued: 'Jun 2025',
    credentialId: '48BEC0A17C6C',
    skills: ['Java']
  },
  {
    title: 'AWS Certified Machine Learning - Specialty (MLS-C01) Cert Prep',
    issuer: 'LinkedIn',
    issued: 'Jun 2025',
    skills: ['Amazon Web Services (AWS)', 'Machine Learning']
  },
  {
    title: 'Managing Your Professional Network',
    issuer: 'LinkedIn',
    issued: 'Jun 2025',
    skills: ['Professional Networking']
  },
  {
    title: 'ChatGPT Search: Conversational, Real-Time Research',
    issuer: 'LinkedIn',
    issued: 'Jun 2025',
    skills: ['AI Productivity', 'ChatGPT']
  },
  {
    title: 'Mastering Non-Verbal Communications with Confidence',
    issuer: 'LinkedIn',
    issued: 'Apr 2025',
    skills: ['Interpersonal Communication', 'Body Language']
  },
  {
    title: 'Tips for Writing Business Emails',
    issuer: 'LinkedIn',
    issued: 'Apr 2025',
    skills: ['Email Etiquette', 'Business Communications']
  }
];

function AboutPage() {
  return (
    <section className="container section-block">
      <SectionHeading
        kicker="About"
        title="A builder who blends logic and design"
        description="I enjoy turning complex ideas into simple products, with equal focus on quality code and user clarity."
      />

      <div className="about-grid" data-reveal>
        <article className="feature-card" data-reveal>
          <h3>Education</h3>
          <p>B.E. Computer Science and Engineering, expected graduation in 2027.</p>
        </article>
        <article className="feature-card" data-reveal style={{ '--reveal-delay': '80ms' }}>
          <h3>Recognition</h3>
          <p>Winner at Aidea Innovation Event 2025 for the Safe Drive 360 concept.</p>
        </article>
      </div>

      <div className="section-block">
        <SectionHeading
          kicker="Experience"
          title="Professional Experience"
          description="Internship roles across automation, Java development, design, and data science."
        />

        <div className="timeline-wrap" data-reveal>
        {timeline.map((item) => (
          <article className="timeline-card" key={`${item.role}-${item.org}`} data-reveal>
            <p className="timeline-time">{item.time}</p>
            <h3>{item.role}</h3>
            <p className="timeline-org">{item.org}</p>
            <p className="timeline-meta">
              {item.kind} · {item.duration} · {item.location}
            </p>
            {item.detail ? <p>{item.detail}</p> : null}
          </article>
        ))}
        </div>
      </div>

      <div className="section-block">
        <SectionHeading
          kicker="Credentials"
          title="Certifications"
          description="Professional courses, participation certificates, and technical learning milestones."
        />

        <div className="certifications-wrap" data-reveal>
          {certifications.map((cert) => (
            <article className="cert-card" key={`${cert.title}-${cert.issued}`} data-reveal>
              <p className="cert-issued">Issued {cert.issued}</p>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              {cert.credentialId ? (
                <p className="cert-id">Credential ID: {cert.credentialId}</p>
              ) : null}
              {cert.skills?.length ? (
                <div className="cert-skills">
                  {cert.skills.map((skill) => (
                    <span className="cert-skill-chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="cert-action">Show credential</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
