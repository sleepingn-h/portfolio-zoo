import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  selector,
  y = 40,
  delay = 0,
  stagger = 0.08,
  start = 'top 85%',
}) {
  const scope = useRef(null)

  useGSAP(
    () => {
      const targets = selector ? gsap.utils.toArray(selector, scope.current) : [scope.current]
      if (!targets.length) return

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.9,
        delay,
        stagger: selector ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start, once: true },
      })
    },
    { scope }
  )

  return (
    <Tag ref={scope} className={className}>
      {children}
    </Tag>
  )
}
