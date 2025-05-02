import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ImageDescription,
  VideoPreview,
  // WorkSpannImage,
  WorkItemContainer,
  PreviewLayer,
  OriginalLayer
} from '../../pages/Work/Work.styled';
import Loading from '../../assets/video/logo_animated_hq.webm';
import { WorkItemData } from '../../pages/Work/Work';

const WorkItemComponent: React.FC<{ work: WorkItemData }> = ({ work }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const { folder, image_name, title, preview_url } = work;
  const src = `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${image_name}`;
  const isVideo = image_name.toLowerCase().endsWith('.mp4');

  const getPreviewUrl = () => {
    if (!preview_url) return src;
    return preview_url.startsWith('http') 
      ? preview_url 
      : `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${preview_url}`;
  };

  const previewSrc = getPreviewUrl();

  useEffect(() => {
    // Завантажуємо прев'ю
    const img = new Image();
    img.src = previewSrc;
    img.onload = () => {
      setIsLoading(false);
      
      // Попередньо завантажуємо оригінал
      if (!isVideo) {
        const originalImg = new Image();
        originalImg.src = src;
        originalImg.onload = () => setIsOriginalLoaded(true);
        originalImg.onerror = () => console.error('Failed to preload original image:', src);
      }
    };
    img.onerror = () => {
      console.error('Failed to load preview image:', previewSrc);
      setIsLoading(false);
    };
  }, [previewSrc, src, isVideo]);

  useEffect(() => {
    if (isHovered && isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    } else if (!isHovered && isVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered, isVideo]);

  const handleClick = () => {
    navigate(`/collections/${work.id}`);
  };

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000'
      }}>
        <video
          src={Loading}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '150px', height: '150px' }}
        />
      </div>
    );
  }

  return (
    <WorkItemContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="work-item"
    >
      {/* Базовий шар - прев'ю */}
      <PreviewLayer $isVisible={!isHovered} $imageUrl={previewSrc}>
        <img
          src={previewSrc}
          alt="preview"
          loading="eager"
        />
      </PreviewLayer>

      {/* Шар для зображень (показується при наведенні) */}
      {!isVideo && (
        <OriginalLayer $isVisible={isHovered && isOriginalLoaded}>
          <img
            src={src}
            alt="original"
            loading={isOriginalLoaded ? 'eager' : 'lazy'}
          />
        </OriginalLayer>
      )}

      {/* Шар для відео (показується при наведенні) */}
      {isVideo && isHovered && (
        <VideoPreview $isVisible={isHovered} $imageUrl={previewSrc}>
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            preload="auto"
            playsInline
            disablePictureInPicture
          />
        </VideoPreview>
      )}

      {/* Заголовок (завжди присутній, але з анімацією) */}
      <ImageDescription $isVisible={isHovered}>
        {title}
      </ImageDescription>
    </WorkItemContainer>
  );
};

export default WorkItemComponent;