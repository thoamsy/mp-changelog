import { useLayoutEffect, useCallback, useRef } from 'react';

const canFocus = element => {
  if (!element) return true;
  const tabindex = element.getAttribute('tabindex');
  return tabindex !== null && +tabindex >= 0;
};

const focusElement = element => {
  if (!canFocus(element)) {
    console.error(
      '当前 element 不支持 focus，请添加 tabIndex，或者使用满足条件的标签'
    );
    return;
  }
  element.focus();
};

export default function useVimShortcut(containerRef, listLength) {
  const selectedIndex = useRef(-1);
  const lastKey = useRef(null);

  const onKeyDownHandler = useCallback(
    e => {
      const key = e.key.toLowerCase();
      let index = selectedIndex.current;
      switch (key) {
        case 'tab': {
          e.preventDefault();
          break;
        }
        case 'arrowdown':
        case 'j': {
          if (index < listLength - 1) selectedIndex.current = ++index;
          focusElement(containerRef.children[index]);
          break;
        }
        case 'arrowup':
        case 'k': {
          if (index < 1) return;
          selectedIndex.current = --index;
          focusElement(containerRef.children[index]);
          if (!index) {
            document.body.scrollIntoView();
          }
          break;
        }
        case 'g': {
          if (e.shiftKey) {
            selectedIndex.current = index = listLength - 1;
          } else if (
            e.key === lastKey.current.key &&
            e.metaKey === lastKey.current.metaKey
          ) {
            selectedIndex.current = index = 0;
          }
          focusElement(containerRef.children[index]);
          break;
        }
        default:
          break;
      }
      lastKey.current = e;
    },
    [containerRef, listLength]
  );

  useLayoutEffect(() => {
    if (!containerRef) {
      return;
    }
    console.log(containerRef);
    window.addEventListener('keydown', onKeyDownHandler);
    return () => window.removeEventListener('keydown', onKeyDownHandler);
  }, [containerRef, onKeyDownHandler]);
}
