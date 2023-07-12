import React, { useEffect, useRef } from 'react';

function ClickAwayListener({ children, onClickAway }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickAway]);

  return <div ref={ref}>{children}</div>;
}

export default ClickAwayListener;