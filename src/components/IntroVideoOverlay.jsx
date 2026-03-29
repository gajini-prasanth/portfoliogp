import { useEffect, useRef, useState } from 'react';

function IntroVideoOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Ignore autoplay restrictions and keep controls visible.
      });
    }
  }, []);

  const closeIntro = () => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setIsVisible(false);
    }, 380);
  };

  if (!isVisible) return null;

  return (
    <div className={isClosing ? 'intro-overlay intro-overlay-closing' : 'intro-overlay'}>
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted
        playsInline
        onEnded={closeIntro}
      >
        <source src="/INTRO.mp4" type="video/mp4" />
        Your browser does not support the intro video.
      </video>

      <div className="intro-overlay-content">
        <button type="button" className="intro-skip-btn" onClick={closeIntro}>
          Skip Intro
        </button>
      </div>
    </div>
  );
}

export default IntroVideoOverlay;
