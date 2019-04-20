import { useCallback, useEffect, useRef } from 'react';

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

const injectedClassName = '__CAN_FOCUS_ELEMENT__';
const focusElement = element => {
  if (!canFocus(element)) {
    console.error(
      `当前 element 不支持 focus，请在合适的 element 上使用 “getFocusElementProps()”`,
    );
    return;
  }
  element.focus();
};

export default function useVimShortcut(
  containerRef,
  { listLength, onEnter, autoFocus },
) {
  const selectedIndex = useRef(-1);
  const lastKeyDown = useRef({ key: '' });
  const children = useRef([]);

  useEffect(() => {
    autoFocus && containerRef.current.focus();
    children.current = containerRef.current.querySelectorAll(
      '.' + injectedClassName,
    );
  }, [autoFocus, containerRef, listLength]);

  const moveDown = useCallback(() => {
    let index = selectedIndex.current;
    if (index < listLength - 1) {
      selectedIndex.current = ++index;
    } else {
      return false;
    }
    focusElement(children.current[index]);
    return true;
  }, [listLength]);

  const moveUp = () => {
    let index = selectedIndex.current;
    if (index < 1) return false;
    selectedIndex.current = --index;
    focusElement(children.current[index]);
    if (!index) {
      document.body.scrollIntoView();
    }
    return true;
  };

  const onKeyDownHandler = useCallback(
    e => {
      const key = e.key.toLowerCase();
      let index = selectedIndex.current;
      switch (key) {
        case 'tab': {
          const stillInContainer = e.shiftKey ? moveUp() : moveDown();
          if (stillInContainer) {
            e.preventDefault();
          } else {
            selectedIndex.current = e.shiftKey ? -1 : listLength;
          }
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
          if (e.shiftKey) {
            selectedIndex.current = index = listLength - 1;
          } else if (
            e.key === lastKeyDown.current.key &&
            e.metaKey === lastKeyDown.current.metaKey
          ) {
            selectedIndex.current = index = 0;
          } else {
            break;
          }
          focusElement(children.current[index]);
          break;
        }

        default:
          break;
      }
      lastKeyDown.current = e;
    },
    [listLength, moveDown],
  );

  const getFocusElementProps = useCallback(
    ({ onKeyDown, className = '', ...props } = {}) => {
      return {
        ...props,
        role: 'listitem',
        className: `${className} ${injectedClassName}`,
        tabIndex: 0,
        'aria-current': selectedIndex.index,
        onKeyDown: event => {
          switch (event.key) {
            case 'Enter': {
              if (!event.metaKey || event.shiftKey) {
                onKeyDown && onKeyDown(event);
                onEnter && onEnter(selectedIndex.current);
              }
              break;
            }
            default:
              break;
          }
        },
      };
    },
    [onEnter],
  );

  const getContainerProps = useCallback(
    props => {
      return {
        ...props,
        onKeyDown: onKeyDownHandler,
        role: 'list',
        tabIndex: autoFocus ? 0 : -1,
      };
    },
    [onKeyDownHandler, autoFocus],
  );

  return {
    getContainerProps,
    getFocusElementProps,
  };
}
