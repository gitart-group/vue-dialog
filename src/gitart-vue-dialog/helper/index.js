const windowScrollbarWidth = () => {
  const container = document.createElement('div');
  container.style.visibility = 'hidden';
  container.style.overflow = 'scroll';
  container.style.msOverflowStyle = 'scrollbar';
  const inner = document.createElement('div');

  container.appendChild(inner);
  document.body.appendChild(container);

  const scrollbarWidth = container.offsetWidth - inner.offsetWidth;
  container.parentNode.removeChild(container);

  return scrollbarWidth;
};

const windowWidthWithoutScrollbar = () => {
  const windowWidth = window.outerWidth;
  const scrollbarWidth = windowScrollbarWidth();

  return windowWidth - scrollbarWidth;
};

/**
 *
 * @param {string | number | null | undefined} str
 * @param {string} unit
 * @returns {string | undefined}
 */
const convertToUnit = (str, unit = 'px') => {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
};

export const getZIndex = el => {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;

  const index = +window.getComputedStyle(el).getPropertyValue('z-index');

  if (!index) return getZIndex(el.parentNode);
  return index;
};

export default {
  windowScrollbarWidth,
  windowWidthWithoutScrollbar,
  convertToUnit,
  getZIndex,
};
