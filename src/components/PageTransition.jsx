import { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { ScrollTrigger } from '../lib/gsap'
import { getExitScroll } from '../lib/exitScroll'

const COVER = { duration: 1.4, ease: [0.77, 0, 0.175, 1] }
const FADE = { duration: 0.6, ease: [0.22, 1, 0.36, 1] }

function buildVariants(vh) {
  return {
    cover: {
      initial: { y: vh, opacity: 1 },
      animate: { y: 0, opacity: 1, transition: COVER },
      exit: { y: -vh * 0.1, opacity: 0.5, pointerEvents: 'none', transition: COVER },
    },
    fade: {
      initial: { opacity: 0, y: 28 },
      animate: { opacity: 1, y: 0, transition: FADE },
      exit: { opacity: 0, y: -12, pointerEvents: 'none', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
    },
  }
}

export default function PageTransition({ children, variant, className = '', onEntered, ...rest }) {
  const isPresent = useIsPresent()
  const reduced = useReducedMotion()
  const ref = useRef(null)

  const picked = variant ?? 'cover'
  const mode = picked === 'cover' && reduced ? 'fade' : picked
  const vh = typeof window === 'undefined' ? 0 : window.innerHeight
  const v = buildVariants(vh)[mode] ?? buildVariants(vh).fade

  useEffect(() => {
    if (!isPresent || !onEntered) return
    const ms = (mode === 'cover' ? COVER.duration : FADE.duration) * 1000
    const id = setTimeout(onEntered, ms)
    return () => clearTimeout(id)
  }, [isPresent, mode, onEntered])

  useLayoutEffect(() => {
    if (mode !== 'cover' || isPresent || !ref.current) return
    ref.current.style.top = `${-getExitScroll()}px`
  }, [mode, isPresent])

  return (
    <motion.section
      ref={ref}
      {...rest}
      className={`page ${mode === 'cover' ? 'page--cover' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
      style={{ zIndex: isPresent ? 2 : 1 }}
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      onAnimationComplete={() => {
        if (isPresent) ScrollTrigger.refresh()
      }}
    >
      {children}
    </motion.section>
  )
}
