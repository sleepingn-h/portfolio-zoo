import TypeMark from './TypeMark';
import { asset } from '../lib/asset';

export default function ProjectShot({
  project,
  variant = 'thumb',
  priority = false,
  className = '',
  children,
}) {
  const { thumb, cover, shotPosition, type, period, year } = project;
  const src = variant === 'thumb' ? (thumb ?? cover) : (cover ?? thumb);

  return (
    <div
      className={['shot', `shot--${variant}`, className].filter(Boolean).join(' ')}
      data-empty={src ? undefined : 'true'}
    >
      {src ? (
        <img
          src={asset(src)}
          alt=''
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding='async'
          style={shotPosition ? { objectPosition: shotPosition } : undefined}
        />
      ) : (
        <span className='shot__fallback' aria-hidden='true'>
          <TypeMark type={type} className='shot__mark' />
          <span className='shot__period'>{period ?? year}</span>
        </span>
      )}
      {children}
    </div>
  );
}
