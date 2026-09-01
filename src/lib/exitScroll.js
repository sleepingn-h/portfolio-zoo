let lastScroll = 0

export const setExitScroll = (y) => {
  lastScroll = y
}

export const getExitScroll = () => lastScroll
