import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
]

export default function Nav() {
  const { pathname } = useLocation()

  return (
    <header className="nav">
      <NavLink to="/" className="nav__brand">
        ZOO<span>.dev</span>
      </NavLink>

      <nav className="nav__links">
        {links.map(({ to, label }) => {
          const active = to === '/' ? pathname === '/' : pathname.startsWith(to)
          return (
            <NavLink key={to} to={to} className="nav__link" data-active={active}>
              {label}
              {active && (
                <motion.span
                  layoutId="nav-underline"
                  className="nav__underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}
