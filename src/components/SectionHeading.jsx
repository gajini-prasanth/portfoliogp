function SectionHeading({ kicker, title, description }) {
  return (
    <div className="section-heading fade-in" data-reveal>
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
