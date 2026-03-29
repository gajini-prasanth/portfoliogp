import SectionHeading from '../components/SectionHeading';

const linkedInProfile = 'https://www.linkedin.com/in/gajini-prasanth-8285ba2a3/';
const linkedInPosts =
  'https://www.linkedin.com/in/gajini-prasanth-8285ba2a3/recent-activity/all/';
const linkedInMessage = 'https://www.linkedin.com/messaging/compose/';

function ContactPage() {
  return (
    <section className="container section-block">
      <SectionHeading
        kicker="Contact"
        title="Let us build something useful"
        description="Open to internships, collaborations, and technical discussions."
      />

      <div className="contact-layout" data-reveal>
        <article className="feature-card" data-reveal>
          <h3>Email</h3>
          <a href="mailto:gajiniprasanth291@gmail.com">gajiniprasanth291@gmail.com</a>
          <p>Best for project inquiries and professional opportunities.</p>
        </article>

        <article className="feature-card" data-reveal style={{ '--reveal-delay': '100ms' }}>
          <h3>LinkedIn</h3>
          <div className="contact-links">
            <a href={linkedInProfile} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
            <a href={linkedInPosts} target="_blank" rel="noopener noreferrer">
              View Posts
            </a>
            <a href={linkedInMessage} target="_blank" rel="noopener noreferrer">
              Contact Me on LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <p>Explore my LinkedIn activity, recent posts, and contact me directly there.</p>
        </article>
      </div>
    </section>
  );
}

export default ContactPage;
