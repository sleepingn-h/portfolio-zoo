import { Link, useSearchParams } from 'react-router-dom';
import { useLayoutEffect, useMemo } from 'react';

import {
  projects,
  caseStudies,
  archiveMeta,
  PROJECT_TYPES,
  filterByType,
} from '../data/projects';
import PageTransition from '../components/PageTransition';
import CaseStudyCard from '../components/CaseStudyCard';
import ArchiveItem from '../components/ArchiveItem';
import TypeFilter from '../components/TypeFilter';
import { ScrollTrigger } from '../lib/gsap';

const PANEL_ID = 'work-archive-list';

const isValidType = (value) => value === 'all' || PROJECT_TYPES.some((t) => t.key === value);

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('type') ?? 'all';
  const type = isValidType(raw) ? raw : 'all';

  const items = useMemo(() => filterByType(type), [type]);

  const counts = useMemo(() => {
    const acc = { all: projects.length };
    for (const t of PROJECT_TYPES) acc[t.key] = 0;
    for (const p of projects) acc[p.type] += 1;
    return acc;
  }, []);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [type]);

  const handleChange = (next) => {
    setParams(next === 'all' ? {} : { type: next }, { replace: true });
  };

  return (
    <PageTransition className='projects'>
      <header className='page-head'>
        <h1 className='page-head__title'>Projects</h1>
        <p className='page-head__meta'>
          {archiveMeta.from} — {archiveMeta.to} · {archiveMeta.count} projects
        </p>
        <div className='page-head__bar' aria-hidden='true'>
          {PROJECT_TYPES.map((t) => (
            <span key={t.key} data-type={t.key} style={{ flexGrow: counts[t.key] }} />
          ))}
        </div>
      </header>

      <section className='case-studies' aria-labelledby='case-studies-heading'>
        <header className='section-head'>
          <h2 className='section-head__title' id='case-studies-heading'>
            Selected Case Studies
          </h2>
          <p className='section-head__meta'>{caseStudies.length} projects</p>
        </header>

        <div className='case-grid'>
          {caseStudies.map((project, i) => (
            <CaseStudyCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className='archive' aria-labelledby='archive-heading'>
        <header className='section-head'>
          <h2 className='section-head__title' id='archive-heading'>
            Archive
          </h2>
          <p className='section-head__meta'>
            {archiveMeta.from} — {archiveMeta.to}
          </p>
        </header>

        <div className='archive__filter'>
          <TypeFilter value={type} onChange={handleChange} counts={counts} panelId={PANEL_ID} />
        </div>

        <div className='archive__body'>
          <div id={PANEL_ID} role='tabpanel' aria-labelledby={`filter-tab-${type}`} tabIndex={-1}>
            {items.length === 0 ? (
              <p className='archive__empty'>해당 유형의 프로젝트가 아직 없습니다.</p>
            ) : (
              <ul className='archive__grid'>
                {items.map((project) => (
                  <ArchiveItem key={project.slug} project={project} />
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className='archive__note'>
          일부 프로젝트는 실제 화면을 공개할 수 없어 요약 정보만 남겼습니다. 진행 과정은 위의
          Selected Case Studies 에서 볼 수 있습니다.
        </p>
      </section>
    </PageTransition>
  );
}
