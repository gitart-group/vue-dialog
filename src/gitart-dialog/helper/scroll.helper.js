import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import helper from './index';

/**
 *
 * @param {boolean} hideScroll
 */
const disableScroll = (hideScroll = false) => {
  if (hideScroll) {
    const scrollWidth = helper.windowScrollbarWidth();
    disableBodyScroll(document.body);
    if (scrollWidth > 0) {
      document.body.style.paddingRight = scrollWidth + 'px';
    }
  } else {
    disableBodyScroll(document.body);
  }
};

const enableScroll = () => {
  enableBodyScroll(document.body);
  document.body.style.paddingRight = 0;
};

export default {
  disableScroll,
  enableScroll,
};
