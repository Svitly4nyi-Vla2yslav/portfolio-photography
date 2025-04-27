import React, { useState, useRef, useEffect } from 'react';
import {
  ImageDescription,
  VideoPreview,
  WorkSpannImage,
} from '../../pages/Work/Work.styled';
import Modal from '../Modal/Modal';
import { WorkItemData } from '../../pages/Work/Work';
import { fetchWithCache } from '../../utils/cacheUtils';

interface WorkItemComponentProps {
  work: WorkItemData;
}

const WorkItemComponent: React.FC<WorkItemComponentProps> = ({ work }) => {
  // const [, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

 
  const { folder, image_name, title } = work;
  const src = `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${image_name}`;
  const isVideo = image_name.toLowerCase().endsWith('.mp4');

  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      try {
        const cachedUrl = await fetchWithCache(src);
        setMediaSrc(cachedUrl);
      } catch (error) {
        console.error('Error loading media:', error);
        setMediaSrc(src); // Fallback to original source
      } finally {
        setIsLoading(false);
      }
    };

    loadMedia();
  }, [src]);

  const handleHover = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.play();
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 2;
    }
  };

  const handleClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
    }
  };

  if (isLoading) {
    return (
      <div style={{ width: '100%', height: '100%', background: '#f0f0f0' }} />
    );
  }

  return (
    <>
      <div
        onTouchStart={handleHover}
        onTouchEnd={handleLeave}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        onFocus={handleHover}
        onBlur={handleLeave}
        onClick={handleClick}
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {isVideo ? (
          <VideoPreview 
          className={isHovered ? 'hover' : ''}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleHover}
          onTouchEnd={handleLeave}
          $imageUrl={mediaSrc || src}>
            <video
              ref={videoRef}
              src={mediaSrc || src}
              muted
              loop
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onLoadedMetadata={handleLoadedMetadata}
              preload="metadata"
            />
            <ImageDescription>{title}</ImageDescription>
          </VideoPreview>
        ) : (
          <WorkSpannImage
          className={isHovered ? 'hover' : ''}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleHover}
          onTouchEnd={handleLeave}
          $imageUrl={mediaSrc || src}
          >
            <img
              src={mediaSrc || src}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
            <ImageDescription>{title}</ImageDescription>
          </WorkSpannImage>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div
            style={{
              position: 'relative',
              width: '90%',
              height: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '30px',
                cursor: 'pointer',
                color: '#999',
                zIndex: 100,
              }}
            >
              ✖
            </button>

            {isVideo ? (
              <video
                src={src}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <img
                src={mediaSrc || src}
                alt="Full View"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            )}
            <p
              style={{
                fontFamily: 'var(--second-family)',
                fontWeight: 400,
                fontSize: '18px',
                letterSpacing: '-0.02em',
                color: '#808080',
                textAlign: 'center',
                padding: '10px',
              }}
            >
              {title}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WorkItemComponent;

