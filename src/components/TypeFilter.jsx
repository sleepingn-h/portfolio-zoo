import { useRef } from 'react'
import { PROJECT_TYPES } from '../data/projects'

export default function TypeFilter({ value, onChange, counts, panelId }) {
  const tabs = [{ key: 'all', label: 'All' }, ...PROJECT_TYPES]
  const refs = useRef([])

  const move = (from, step) => {
    const next = (from + step + tabs.length) % tabs.length
    refs.current[next]?.focus()
    onChange(tabs[next].key)
  }

  const onKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        move(index, 1)
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        move(index, -1)
        break
      case 'Home':
        event.preventDefault()
        move(-1, 1)
        break
      case 'End':
        event.preventDefault()
        move(0, -1)
        break
      default:
        break
    }
  }

  return (
    <div className="type-filter" role="tablist" aria-label="프로젝트 유형">
      {tabs.map((tab, index) => {
        const selected = tab.key === value
        return (
          <button
            key={tab.key}
            id={`filter-tab-${tab.key}`}
            ref={(el) => {
              refs.current[index] = el
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className="type-filter__tab"
            data-type={tab.key === 'all' ? undefined : tab.key}
            onClick={() => onChange(tab.key)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
            <span className="type-filter__count">{counts[tab.key] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
