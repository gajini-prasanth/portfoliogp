import { useEffect, useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';

const GITHUB_USER = 'gajini-prasanth';

function formatDate(dateText) {
  const date = new Date(dateText);
  if (Number.isNaN(date.getTime())) return 'Unknown update date';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function normalizeRepo(repo) {
  const category = repo.language || 'General';
  const tags = [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 6);

  return {
    id: repo.id,
    name: repo.name,
    category,
    type: repo.fork ? 'Forked Repository' : 'Original Repository',
    summary:
      repo.description ||
      'GitHub project repository. Open it to view implementation details and source code.',
    repoUrl: repo.html_url,
    homepage: repo.homepage,
    tags,
    visibility: repo.private ? 'Private' : 'Public',
    defaultBranch: repo.default_branch,
    openIssues: repo.open_issues_count,
    sizeKb: repo.size,
    updatedAtRaw: repo.updated_at,
    createdAt: formatDate(repo.created_at),
    updatedAt: formatDate(repo.updated_at)
  };
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRepositories() {
      setIsLoading(true);
      setLoadError('');

      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: 'application/vnd.github+json'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API request failed with ${response.status}`);
        }

        const repos = await response.json();
        const normalized = repos
          .filter((repo) => repo && repo.name && repo.html_url)
          .map(normalizeRepo)
          .sort((a, b) => new Date(b.updatedAtRaw) - new Date(a.updatedAtRaw));

        if (isMounted) {
          setProjects(normalized);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError('Unable to load GitHub repositories right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepositories();
    return () => {
      isMounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const categories = [...new Set(projects.map((project) => project.category))].sort();
    return ['All', ...categories];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  useEffect(() => {
    if (!activeProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeProject]);

  return (
    <section className="container section-block">
      <SectionHeading
        kicker="Projects"
        title="GitHub Projects"
        description="Live repository feed from GitHub. This section automatically reflects all available projects."
      />

      <div className="project-filter-row fade-in" data-reveal>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={
              activeFilter === filter
                ? 'project-filter-btn project-filter-btn-active'
                : 'project-filter-btn'
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {isLoading ? <p className="project-status" data-reveal>Loading repositories...</p> : null}
      {loadError ? (
        <div className="project-status project-status-error" data-reveal>
          <p>{loadError}</p>
          <a
            href="https://github.com/gajini-prasanth?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub Repositories
          </a>
        </div>
      ) : null}

      <div className="card-grid stagger-grid" data-reveal>
        {visibleProjects.map((project) => (
          <article key={project.name} className="feature-card project-card-react" data-reveal>
            <p className="project-type">{project.category}</p>
            <h3>{project.name}</h3>
            <p className="project-subtype">{project.type}</p>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <div className="project-actions">
              <button
                type="button"
                className="project-open-btn"
                onClick={() => setActiveProject(project)}
              >
                View Details
              </button>
              <a
                className="project-open-btn"
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub
              </a>
            </div>
          </article>
        ))}
      </div>

      {!isLoading && !loadError && visibleProjects.length === 0 ? (
        <p className="project-status" data-reveal>
          No repositories found for this filter.
        </p>
      ) : null}

      {activeProject ? (
        <div className="case-modal" onClick={() => setActiveProject(null)} role="presentation">
          <article
            className="case-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeProject.name} case study`}
          >
            <button
              type="button"
              className="case-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close case study"
            >
              Close
            </button>

            <p className="project-type">{activeProject.category}</p>
            <h3 className="case-title">{activeProject.name}</h3>
            <p className="project-subtype">{activeProject.type}</p>

            <div className="case-grid">
              <section>
                <h4>Repository Link</h4>
                <p>
                  <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer">
                    {activeProject.repoUrl}
                  </a>
                </p>
              </section>
              <section>
                <h4>Description</h4>
                <p>{activeProject.summary}</p>
              </section>
              <section>
                <h4>Project Metadata</h4>
                <p>
                  Visibility: {activeProject.visibility}
                  <br />
                  Default branch: {activeProject.defaultBranch}
                  <br />
                  Open issues: {activeProject.openIssues}
                  <br />
                  Size: {activeProject.sizeKb} KB
                  <br />
                  Created: {activeProject.createdAt}
                  <br />
                  Last updated: {activeProject.updatedAt}
                </p>
              </section>
            </div>

            <div className="case-stack">
              <h4>Tech Stack and Topics</h4>
              <div className="tag-row">
                {activeProject.tags.map((item) => (
                  <span key={item} className="tag-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {activeProject.homepage ? (
              <div className="case-stack">
                <h4>Live Project Link</h4>
                <p>
                  <a href={activeProject.homepage} target="_blank" rel="noopener noreferrer">
                    {activeProject.homepage}
                  </a>
                </p>
              </div>
            ) : null}
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default ProjectsPage;
