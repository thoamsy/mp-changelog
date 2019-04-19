import { useEffect, useCallback, useRef } from 'react';

const tagsCanFocus = [
  'a[href]',
  'area[href]',
  'input',
  'select',
  'textarea',
  'button'
];
const canFocusElementSelector = `a[href]:not([tabindex='-1']),
  area[href]:not([tabindex='-1']),
  input:not([disabled]):not([tabindex='-1']),
  select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),
  iframe:not([tabindex='-1']),
  [tabindex]:not([tabindex='-1']),
  [contentEditable=true]:not([tabindex='-1'])`;

const canFocus = element => {
  if (!element) return true;
  if (element.matches(canFocusElementSelector)) {
    return true;
  }
  const tabindex = element.getAttribute('tabindex');
  return tabindex !== null && +tabindex >= 0;
};

const focusElement = element => {
  if (!canFocus(element)) {
    console.error(
      `当前 element 不支持 focus，请添加 tabIndex，或者使用满足条件的标签: ${tagsCanFocus}`
    );
    return;
  }
  element.focus();
};

export default function useVimShortcut(containerRef, { listLength, selector }) {
  const selectedIndex = useRef(-1);
  const lastKeyDown = useRef({ key: '' });
  const children = useRef([]);

  useEffect(() => {
    children.current = selector
      ? containerRef.current.querySelectorAll(selector)
      : containerRef.current.children;
  }, [containerRef, listLength, selector]);

  const moveDown = useCallback(() => {
    let index = selectedIndex.current;
    if (index < listLength - 1) selectedIndex.current = ++index;
    focusElement(children.current[index]);
  }, [listLength]);

  const moveUp = () => {
    let index = selectedIndex.current;
    if (index < 1) return;
    selectedIndex.current = --index;
    focusElement(children.current[index]);
    if (!index) {
      document.body.scrollIntoView();
    }
  };

  const onKeyDownHandler = useCallback(
    e => {
      const key = e.key.toLowerCase();
      switch (key) {
        case 'tab': {
          if (e.shiftKey) {
            moveUp();
          } else {
            moveDown();
          }
          e.preventDefault();
          break;
        }
        case 'arrowdown':
        case 'j': {
          moveDown();
          break;
        }
        case 'arrowup':
        case 'k': {
          moveUp();
          break;
        }
        case 'g': {
          let index = selectedIndex.current;
          if (e.shiftKey) {
            selectedIndex.current = index = listLength - 1;
          } else if (
            e.key === lastKeyDown.current.key &&
            e.metaKey === lastKeyDown.current.metaKey
          ) {
            selectedIndex.current = index = 0;
          }
          focusElement(children.current[index]);
          break;
        }
        default:
          break;
      }
      lastKeyDown.current = e;
    },
    [listLength, moveDown]
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    window.addEventListener('keydown', onKeyDownHandler);
    return () => window.removeEventListener('keydown', onKeyDownHandler);
  }, [containerRef, onKeyDownHandler, selector]);
}
