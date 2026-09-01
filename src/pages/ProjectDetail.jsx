import { Link, useParams } from 'react-router-dom';

import { caseStudies, getProject, typeLabel } from '../data/projects';
import PageTransition from '../components/PageTransition';
import ProjectShot from '../components/ProjectShot';
import TypeMark from '../components/TypeMark';
import StudyMark from '../components/StudyMark';
import { asset } from '../lib/asset';

const no2 = (n) => String(n).padStart(2, '0');

function Section({ no, id, title, children }) {
  return (
    <section className='study' aria-labelledby={id}>
      <div className='study__head'>
        <h2 className='study__title' id={id}>
          <span className='study__label'>{no2(no)}</span>
          {title}
        </h2>
      </div>
      <div className='study__body'>{children}</div>
    </section>
  );
}

function Points({ items }) {
  return (
    <ul className='study__points'>
      {items.map((item) => (
        <li key={item}>
          <p>{item}</p>
        </li>
      ))}
    </ul>
  );
}

function Cards({ items, variant }) {
  return (
    <ol className={['study__cards', variant && `study__cards--${variant}`].filter(Boolean).join(' ')}>
      {items.map((item) => (
        <li key={item.title} className='study__card'>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Screens({ items, type }) {
  return (
    <ul className='screens'>
      {items.map((screen) => (
        <li key={screen.title}>
          <figure className='screens__item'>
            <div className='screens__shot' data-empty={screen.src ? undefined : 'true'}>
              {screen.src ? (
                <img
                  src={asset(screen.src)}
                  alt=''
                  loading='lazy'
                  decoding='async'
                  style={screen.position ? { objectPosition: screen.position } : undefined}
                />
              ) : (
                <TypeMark type={type} className='screens__mark' />
              )}
            </div>
            <figcaption>
              <h3>{screen.title}</h3>
              {screen.text && <p>{screen.text}</p>}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project?.featured || !project.study) {
    return (
      <PageTransition className='detail detail--empty'>
        <h1>{project ? '아카이브에만 있는 프로젝트입니다.' : '찾을 수 없는 프로젝트입니다.'}</h1>
        {project && (
          <p>{project.title} 은(는) Projects 페이지의 Archive 에서 확인할 수 있습니다.</p>
        )}
        <Link to='/projects' className='btn btn--primary'>
          목록으로
        </Link>
      </PageTransition>
    );
  }

  const { study } = project;
  const index = caseStudies.findIndex((p) => p.slug === slug);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  const sections = [
    study.context && {
      id: 'study-context',
      title: 'Context',
      body: <Points items={study.context} />,
    },
    study.problem && {
      id: 'study-problem',
      title: 'Problem',
      body: <Points items={study.problem} />,
    },
    study.approach && {
      id: 'study-approach',
      title: 'Approach',
      body: <Cards items={study.approach} />,
    },
    study.implementation && {
      id: 'study-implementation',
      title: 'Implementation',
      body: <Cards items={study.implementation} variant='fill' />,
    },
    study.screens && {
      id: 'study-screens',
      title: 'Screens',
      body: <Screens items={study.screens} type={project.type} />,
    },
    study.beforeAfter && {
      id: 'study-before-after',
      title: 'Before / After',
      body: (
        <div className='study__compare' style={{ '--rows': study.beforeAfter.length }}>
          <div className='study__compare-col' data-side='before'>
            <p className='study__compare-badge'>Before</p>
            {study.beforeAfter.map((row) => (
              <div className='study__compare-cell' key={row.label}>
                <h3>{row.label}</h3>
                <p>{row.before}</p>
              </div>
            ))}
          </div>

          <span className='study__compare-arrow' aria-hidden='true'>
            →
          </span>

          <div className='study__compare-col' data-side='after'>
            <p className='study__compare-badge'>After</p>
            {study.beforeAfter.map((row) => (
              <div className='study__compare-cell' key={row.label}>
                <h3>{row.label}</h3>
                <p>{row.after}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    study.result && {
      id: 'study-result',
      title: 'Result',
      body: (
        <ul className='study__result'>
          {study.result.map((item) => (
            <li key={item.label}>
              <span className='study__result-mark'>
                <StudyMark name={item.icon} />
              </span>
              <strong>{item.value}</strong>
              <span className='study__result-label'>{item.label}</span>
            </li>
          ))}
        </ul>
      ),
    },
    study.learned && {
      id: 'study-learned',
      title: 'What I Learned',
      body: (
        <ul className='learned'>
          {study.learned.map((item) => (
            <li key={item.title} className='learned__card'>
              <p className='learned__head'>
                <span className='learned__mark'>
                  <StudyMark name={item.icon} />
                </span>
                <strong>{item.title}</strong>
              </p>
              <p className='learned__text'>{item.text}</p>
            </li>
          ))}
        </ul>
      ),
    },
  ].filter(Boolean);

  return (
    <PageTransition className='detail' data-type={project.type}>
      <nav className='detail__crumb' aria-label='현재 위치'>
        <Link to='/'>Home</Link>
        <span aria-hidden='true'>/</span>
        <Link to='/projects'>Projects</Link>
        <span aria-hidden='true'>/</span>
        <span aria-current='page'>Case Study</span>
      </nav>

      <header className='detail__hero'>
        <div className='detail__heading'>
          <p className='detail__label'>Case Study {no2(index + 1)}</p>
          <h1 className='detail__title'>{project.title}</h1>
          <p className='detail__tagline'>{project.tagline}</p>

          <ul className='detail__chips'>
            <li>
              <TypeMark type={project.type} className='detail__chip-mark' />
              {typeLabel(project.type)}
            </li>
            <li>{project.period ?? project.year}</li>
            <li>{project.role}</li>
          </ul>
        </div>

        <ProjectShot project={project} variant='cover' priority className='detail__cover' />
      </header>

      <div className='detail__stack'>
        <p className='detail__stack-label'>Stack</p>
        <ul className='detail__stack-list'>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {sections.map((section, i) => (
        <Section key={section.id} no={i + 1} id={section.id} title={section.title}>
          {section.body}
        </Section>
      ))}

      <nav className='detail__nav' aria-label='케이스 스터디 이동'>
        <Link to={`/projects/${prev.slug}`} className='detail__nav-link' data-dir='prev'>
          <span>← 이전</span>
          <strong>{prev.title}</strong>
        </Link>
        <Link to='/projects' className='btn'>
          목록으로
        </Link>
        <Link to={`/projects/${next.slug}`} className='detail__nav-link' data-dir='next'>
          <span>다음 →</span>
          <strong>{next.title}</strong>
        </Link>
      </nav>
    </PageTransition>
  );
}
