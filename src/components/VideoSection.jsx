import React, { useState } from 'react';
import VideoModal from './VideoModal';

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="video-section-start section-space" id="video">
        <div className="container">
          <div className="video-wrapper p-relative">
            <div className="video-content">
              <h3 className="title">Know The digi Bank</h3>
            </div>
            <div className="video-thumb-inner">
              <div
                className="video-thumb"
                style={{
                  backgroundImage: `url('/assets/global/images/xpspOSoJaTqw1YvwglJd.jpg')`,
                }}
              ></div>
              <button
                className="play-btn popup-video animate-play border-0"
                onClick={() => setModalOpen(true)}
                type="button"
                aria-label="Play video"
              >
                <span>
                  <i className="fa-solid fa-play"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} videoId="9341cn0KokE" />
    </>
  );
}
