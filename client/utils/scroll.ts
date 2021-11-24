export function scrollToMiddle(scrollingElementId: string) {
  const scrollingElement = document.getElementById(scrollingElementId)
  if (!scrollingElement)
    return console.error(`element with id: "${scrollingElementId}" not found`)
  const viewportWidth = window.innerWidth
  const fullWidth = scrollingElement.scrollWidth
  const midpoint = (fullWidth - viewportWidth) / 2
  scrollingElement.scrollTo(midpoint, 0)
}
