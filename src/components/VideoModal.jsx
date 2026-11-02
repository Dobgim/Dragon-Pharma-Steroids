import React from 'react';

export default function VideoModal({ isOpen, onClose, videoId = '9341cn0KokE' }) {
  if (!isOpen) return null;

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="video-modal-close"
          onClick={onClose}
          type="button"
          aria-label="Close video"
        >
          &times;
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
