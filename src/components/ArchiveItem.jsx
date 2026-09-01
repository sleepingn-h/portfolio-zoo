import { Link } from 'react-router-dom';

import { archiveNo, typeLabel } from '../data/projects';
import ProjectShot from './ProjectShot';

const hostOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export default function ArchiveItem({ project }) {
  const { slug, title, year, type, site, featured, tags, thumb, cover } = project;
  const dest = featured ? 'case' : site ? 'site' : 'none';

  const body = (
    <>
      <ProjectShot project={project} className='archive-item__shot'>
        {!(thumb ?? cover) && (
          <span className='archive-item__no' aria-hidden='true'>
            {archiveNo(slug)}
          </span>
        )}
      </ProjectShot>

      <div className='archive-item__body'>
        <span className='archive-item__type'>{typeLabel(type)}</span>

        <div className='archive-item__head'>
          <h4 className='archive-item__title'>{title}</h4>
          <span className='archive-item__year'>{year}</span>
        </div>

        {tags?.length > 0 && (
          <ul className='archive-item__tags'>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        <p className='archive-item__go' data-dest={dest}>
          {dest === 'case' && (
            <>
              <span>Case Study</span>
              <span className='archive-item__cue' aria-hidden='true'>
                →
              </span>
            </>
          )}
          {dest === 'site' && (
            <>
              <span className='archive-item__host'>{hostOf(site)}</span>
              <span className='archive-item__cue' aria-hidden='true'>
                ↗
              </span>
            </>
          )}
          {dest === 'none' && <span>공개 링크 없음</span>}
        </p>
      </div>
    </>
  );

  return (
    <li className='archive-item' data-type={type}>
      {featured ? (
        <Link to={`/projects/${slug}`} className='archive-item__link'>
          {body}
        </Link>
      ) : site ? (
        <a href={site} className='archive-item__link' target='_blank' rel='noopener noreferrer'>
          {body}
          <span className='sr-only'>새 탭에서 열기</span>
        </a>
      ) : (
        <div className='archive-item__link' data-static='true'>
          {body}
        </div>
      )}
    </li>
  );
}
