import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from '../providers/SmoothScrollProvider'
import { ScrollTrigger } from '../lib/gsap'
import { setExitScroll } from '../lib/exitScroll'
import { setActiveRoute } from '../lib/activeRoute'

export default function ScrollReset() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    setActiveRoute(pathname)

    setExitScroll(lenis?.animatedScroll ?? window.scrollY)

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)

    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname, lenis])

  return null
}
