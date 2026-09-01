import { Link } from 'react-router-dom'
import ProjectShot from './ProjectShot'
import { typeLabel } from '../data/projects'

export default function CaseStudyCard({ project, priority = false }) {
  const { slug, title, year, type, tagline } = project

  return (
    <article className="case-card" data-type={type}>
      <Link to={`/projects/${slug}`} className="case-card__link">
        <ProjectShot
          project={project}
          variant="cover"
          priority={priority}
          className="case-card__shot"
        />

        <div className="case-card__body">
          <p className="case-card__meta">
            <span>{year}</span>
            <span aria-hidden="true">·</span>
            <span className="case-card__type">{typeLabel(type)}</span>
          </p>
          <h3 className="case-card__title">{title}</h3>
          <p className="case-card__tagline">{tagline}</p>
          <span className="case-card__cta">
            자세히 보기 <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
