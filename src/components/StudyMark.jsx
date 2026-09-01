const PATHS = {
  check: (
    <>
      <circle cx='12' cy='12' r='8.4' />
      <path d='m8.4 12.2 2.6 2.6 4.6-5.2' />
    </>
  ),
  settings: (
    <>
      <path d='M3.6 8.4h9.2M17.4 8.4h3' />
      <path d='M3.6 15.6h3M11.2 15.6h9.2' />
      <circle cx='15.1' cy='8.4' r='2.2' />
      <circle cx='8.9' cy='15.6' r='2.2' />
    </>
  ),
  refresh: (
    <>
      <path d='M19.4 11.1a7.5 7.5 0 0 0-12.9-4.3' />
      <path d='M4.6 12.9a7.5 7.5 0 0 0 12.9 4.3' />
      <path d='M6.6 3.3v3.7h3.7M17.4 20.7V17h-3.7' />
    </>
  ),
  rocket: (
    <>
      <path d='M12 3.6c2.5 1.9 4 4.8 4 8 0 1.5-.3 2.9-.9 4.2H8.9A10.4 10.4 0 0 1 8 11.6c0-3.2 1.5-6.1 4-8Z' />
      <circle cx='12' cy='10.2' r='1.6' />
      <path d='m8.9 15.8-2.2 3 3-.7M15.1 15.8l2.2 3-3-.7' />
    </>
  ),
  idea: (
    <>
      <path d='M12 3.6a5.4 5.4 0 0 0-3.1 9.8c.5.35.8.92.8 1.5h4.6c0-.58.3-1.15.8-1.5A5.4 5.4 0 0 0 12 3.6Z' />
      <path d='M10.2 17.6h3.6' />
      <path d='M10.8 20.2h2.4' />
    </>
  ),
  priority: (
    <>
      <path d='M4.2 6.6h15.6' />
      <path d='M4.2 12h10.4' />
      <path d='M4.2 17.4h5.6' />
    </>
  ),
  team: (
    <>
      <circle cx='9.2' cy='8.6' r='3.1' />
      <path d='M3.4 19.4c0-2.9 2.6-4.8 5.8-4.8s5.8 1.9 5.8 4.8' />
      <path d='M16.4 6.2a3.1 3.1 0 0 1 0 5.6' />
      <path d='M17.6 15.1c1.9.7 3 2.2 3 4.3' />
    </>
  ),
  user: (
    <>
      <circle cx='12' cy='8.2' r='3.4' />
      <path d='M5.2 19.6c0-3.2 3-5.3 6.8-5.3s6.8 2.1 6.8 5.3' />
    </>
  ),
  access: (
    <>
      <circle cx='12' cy='4.9' r='1.6' />
      <path d='M4.8 8.7c2.3.9 4.7 1.3 7.2 1.3s4.9-.4 7.2-1.3' />
      <path d='M12 10v4.2' />
      <path d='m12 14.2-2.9 5.3M12 14.2l2.9 5.3' />
    </>
  ),
  layers: (
    <>
      <path d='M12 3.8 3.6 8.3 12 12.8l8.4-4.5L12 3.8Z' />
      <path d='m3.6 13.3 8.4 4.5 8.4-4.5' />
    </>
  ),
};

export default function StudyMark({ name, className = '' }) {
  const paths = PATHS[name] ?? PATHS.check;

  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      {paths}
    </svg>
  );
}
