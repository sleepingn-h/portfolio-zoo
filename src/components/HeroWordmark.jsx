const STROKE = 21
const GAP = 31
const INK_TOP = 39.44
const INK_BOTTOM = 114.81

const GLYPHS = {
  D: {
    w: 67.249,
    d: 'M0.436 40V114.062H26.833C49.777 114.225 67.153 100.593 67.249 76.305 66.925 52.347 48.263 39.867 28.676 39.751H0Z',
  },
  E: {
    w: 48.478,
    d: 'M0 39.848V113.952H48.478M0.61 76.088H42.294M0.102 39.95H47.04',
  },
  F: {
    w: 47.04,
    d: 'M0 39.848V113.952M0.61 76.088H42.294M0.102 39.95H47.04',
  },
  L: {
    w: 45.244,
    d: 'M0 40.073V114.279H45.244',
  },
  N: {
    w: 57.5,
    d: 'M0 114.1V39.9L57.5 114.1V39.9',
  },
  O: {
    w: 76.18,
    d: 'M37.65 39.494C-12.259 39.289 -13.226 114.569 38.844 114.808 86.234 115.214 91.344 40.441 37.726 39.439Z',
  },
  P: {
    w: 55.29,
    d: 'M0 114.641V39.689H28.463C37.768 39.475 54.444 45.034 55.29 64.974 54.508 81.5 39.243 88.118 29.617 88.268H1.13',
  },
  R: {
    w: 54.308,
    d: 'M0 113.498V39.487H28.955C41.534 39.975 52.846 48.458 53.72 63.963 53.918 79.077 44.36 84.83 34.804 87.95H0.185M34.902 88.048 54.308 114.571',
  },
  T: {
    w: 48.5,
    d: 'M0 39.9H48.5M24.25 39.9V114.1',
  },
  V: {
    w: 60.232,
    d: 'M0 39.976 26.366 113.918 60.232 40.117',
  },
}

const measure = (word) =>
  [...word].reduce((sum, ch, i) => sum + GLYPHS[ch].w + (i ? GAP : 0), 0)

const VIEW_W = Math.max(measure('FRONTEND'), measure('DEVELOPER')) + STROKE
const VIEW_Y = INK_TOP - STROKE / 2
const VIEW_H = INK_BOTTOM - INK_TOP + STROKE

export default function HeroWordmark({ label, colorFrom = 0 }) {
  const word = label.toUpperCase()
  const id = `hero-word-${label.toLowerCase()}`
  let x = 0

  return (
    <svg
      className='hero__word'
      viewBox={`${-STROKE / 2} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
      role='img'
      aria-labelledby={id}
      focusable='false'
    >
      <title id={id}>{label}</title>
      {[...word].map((ch, i) => {
        const glyph = GLYPHS[ch]
        const dx = x
        x += glyph.w + GAP
        return (
          <path
            key={`${ch}-${i}`}
            d={glyph.d}
            transform={`translate(${dx} 0)`}
            stroke={`var(--c${((colorFrom + i) % 5) + 1})`}
            strokeWidth={STROKE}
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
        )
      })}
    </svg>
  )
}
