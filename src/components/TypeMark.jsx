const PATHS = {
  public: (
    <>
      <path d='M3 9.5 12 4.5l9 5' />
      <path d='M5.5 9.5V18M10 9.5V18M14 9.5V18M18.5 9.5V18' />
      <path d='M3.5 18h17' />
    </>
  ),
  university: (
    <>
      <path d='M12 4.5 2.8 8.6 12 12.7l9.2-4.1L12 4.5Z' />
      <path d='M6.8 10.6V15c0 1.4 2.3 2.6 5.2 2.6s5.2-1.2 5.2-2.6v-4.4' />
      <path d='M21.2 8.6v4.6' />
    </>
  ),
  education: (
    <>
      <path d='M12 7c-1.6-1.3-3.6-1.9-6.4-1.9-.8 0-1.4.05-1.9.15v12.6c.5-.1 1.1-.15 1.9-.15 2.8 0 4.8.6 6.4 1.9' />
      <path d='M12 7c1.6-1.3 3.6-1.9 6.4-1.9.8 0 1.4.05 1.9.15v12.6c-.5-.1-1.1-.15-1.9-.15-2.8 0-4.8.6-6.4 1.9' />
      <path d='M12 7v12.6' />
    </>
  ),
  company: (
    <>
      <path d='M4.5 19V5.6c0-.6.4-1 1-1h7c.6 0 1 .4 1 1V19' />
      <path d='M13.5 10.6h5c.6 0 1 .4 1 1V19' />
      <path d='M3.5 19h17' />
      <path d='M7.3 8.4h3M7.3 12h3M7.3 15.6h3M16.4 14h.6M16.4 16.6h.6' />
    </>
  ),
  personal: (
    <>
      <path d='m8.8 8.2-4.6 3.9 4.6 3.9' />
      <path d='m15.2 8.2 4.6 3.9-4.6 3.9' />
      <path d='M13.3 5.6 10.7 18.6' />
    </>
  ),
};

export default function TypeMark({ type, className = '' }) {
  const paths = PATHS[type] ?? PATHS.company;

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
