let owner = null

export const setActiveRoute = (pathname) => {
  owner = pathname
}

export const claimActiveRoute = () => {
  const mine = owner
  return () => mine === owner
}
