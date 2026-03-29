import { useEffect, useState } from 'react';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return undefined;

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);

      const interactiveNode = event.target.closest(
        'a, button, input, textarea, select, [role="button"]'
      );
      setIsHovering(Boolean(interactiveNode));
    };

    const handleDown = () => setIsActive(true);
    const handleUp = () => setIsActive(false);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const ringClass = [
    'cursor-ring',
    isVisible ? 'cursor-visible' : '',
    isActive ? 'cursor-active' : '',
    isHovering ? 'cursor-hover' : ''
  ]
    .filter(Boolean)
    .join(' ');

  const dotClass = [
    'cursor-dot',
    isVisible ? 'cursor-visible' : '',
    isActive ? 'cursor-active' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className={ringClass} style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      <div className={dotClass} style={{ left: `${position.x}px`, top: `${position.y}px` }} />
    </>
  );
}

export default CustomCursor;
