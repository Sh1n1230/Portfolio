export const ProjectCard = ({ project }) => (
    <article className="project-card">
        <img src={project.image} alt={project.title} className="project-image" />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-link">
                GitHubで見る
            </a>
        )}
    </article>
)