import React, { useLayoutEffect, useCallback, useRef } from 'react';

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
          console.log(containerRef.children[index]);
          containerRef.children[index].focus();
          break;
        }
        case 'arrowup':
        case 'k': {
          if (index < 1) return;
          selectedIndex.current = --index;
          containerRef.children[index].focus();
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
          containerRef.children[index].focus();
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
