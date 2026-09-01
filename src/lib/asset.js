const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export function asset(path) {
  if (!path || !path.startsWith('/')) return path
  return BASE + path
}
