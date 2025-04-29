import React, { useState, useRef, useEffect } from 'react';
import {
  ImageDescription,
  VideoPreview,
  WorkSpannImage,
} from '../../pages/Work/Work.styled';
import Modal from '../Modal/Modal';
import { WorkItemData } from '../../pages/Work/Work';
import Loading from '../../assets/video/logo_animated_hq.webm'; // Заміни на правильний шлях до анімованого логотипу
//         console.error('Помилка при отриманні цитат:', error.message);
interface WorkItemComponentProps {
  work: WorkItemData;
}

const WorkItemComponent: React.FC<WorkItemComponentProps> = ({ work }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setVideoLoaded] = useState(false);

  const { folder, image_name, title, preview_url } = work;
  const src = `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${image_name}`;
  const isVideo = image_name.toLowerCase().endsWith('.mp4');

  // Формуємо правильний URL для прев'ю
  const getPreviewUrl = () => {
    if (!preview_url) return src;
    // Якщо preview_url вже містить повний шлях
    if (preview_url.startsWith('http')) return preview_url;
    // Якщо preview_url - це лише ім'я файлу
    return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${preview_url}`;
  };
  const [currentPreviewSrc, setCurrentPreviewSrc] = useState(getPreviewUrl());
  const previewSrc = getPreviewUrl();

  useEffect(() => {
    const isPreviewVideo = currentPreviewSrc.toLowerCase().endsWith('.mp4');

    if (isPreviewVideo) {
      // якщо прев'ю — відео, то просто відключити лоадінг
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = currentPreviewSrc;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      console.error('Failed to load preview image:', currentPreviewSrc);
      setIsLoading(false);
      setCurrentPreviewSrc(src);
    };
  }, [currentPreviewSrc, src]);

  useEffect(() => {
    if (isHovered && isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error('Play error:', e));
    }
  }, [isHovered, isVideo]);

  const handleHover = () => {
    setIsHovered(true);
    if (isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.error('Play error:', e));
    }
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    setIsModalOpen(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const handleLoadedMetadata = () => {
    setVideoLoaded(true);
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <video
          src={Loading}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'contain',
          }}
        />
      </div>
    );
  }

  const handleTouchEndDelayed = () => {
    setTimeout(() => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 500);
  };

  return (
    <>
      <div
        onTouchStart={handleHover}
        onTouchEnd={handleTouchEndDelayed}
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
        {!isHovered ? (
          // Показуємо прев'ю-зображення, коли немає ховера
          <WorkSpannImage
            onTouchStart={handleHover}
            onTouchEnd={handleTouchEndDelayed}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onFocus={handleHover}
            onBlur={handleLeave}
            onClick={handleClick}
            $imageUrl={previewSrc}
          >
            <img
              src={currentPreviewSrc}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="eager"
            />
            <ImageDescription>{title}</ImageDescription>
          </WorkSpannImage>
        ) : isVideo ? (
          // Показуємо відео при ховері
          <VideoPreview
            onTouchStart={handleHover}
            onTouchEnd={handleTouchEndDelayed}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onFocus={handleHover}
            onBlur={handleLeave}
            onClick={handleClick}
            $imageUrl={previewSrc}
          >
            <video
              ref={videoRef}
              src={src}
              muted
              loop
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onLoadedMetadata={handleLoadedMetadata}
              preload="auto"
              playsInline
              disablePictureInPicture
            />
            <ImageDescription>{title}</ImageDescription>
          </VideoPreview>
        ) : (
          // Показуємо оригінальне зображення при ховері
          <WorkSpannImage $imageUrl={src}>
            <img
              src={src}
              alt="original"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="eager"
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
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '40px',
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
                muted
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                playsInline
              />
            ) : (
              <img
                src={src}
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
