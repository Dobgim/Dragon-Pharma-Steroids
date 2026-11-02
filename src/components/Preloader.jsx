import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(false), 500);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="preloader"
      style={{
        opacity: loading ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: loading ? 'auto' : 'none',
      }}
    >
      <div class="sk-three-bounce">
        <div class="sk-child sk-bounce1"></div>
        <div class="sk-child sk-bounce2"></div>
        <div class="sk-child sk-bounce3"></div>
      </div>
    </div>
  );
}
