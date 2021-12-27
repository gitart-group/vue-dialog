/**
 *
 * @param {string | number | null | undefined} str
 * @param {string} unit
 * @returns {string | undefined}
 */
export const convertToUnit = (str: string | number | null | undefined, unit = 'px'): string | undefined => {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str)) {
    return String(str)
  } else {
    return `${Number(str)}${unit}`
  }
}

export const getZIndex = (el?: Element): number => {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0

  const index = parseInt(window.getComputedStyle(el).getPropertyValue('z-index'))

  if (!index) return getZIndex(el.parentNode as HTMLElement)

  return index
}

export default {
  convertToUnit,
  getZIndex,
}
