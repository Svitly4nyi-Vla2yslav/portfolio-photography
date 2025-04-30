import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ImageDescription,
  VideoPreview,
  WorkSpannImage,
} from '../../pages/Work/Work.styled';
import Loading from '../../assets/video/logo_animated_hq.webm';
import { WorkItemData } from '../../pages/Work/Work';

const WorkItemComponent: React.FC<{ work: WorkItemData }> = ({ work }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
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
    const img = new Image();
    img.src = previewSrc;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      console.error('Failed to load preview image:', previewSrc);
      setIsLoading(false);
    };
  }, [previewSrc]);

  useEffect(() => {
    if (isHovered && isVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  }, [isHovered, isVideo]);

  const handleClick = () => {
    console.log('Navigating to collection with id:', work.id);
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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className="work-item"
      style={{
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      {!isHovered ? (
        <WorkSpannImage
          $imageUrl={previewSrc}
        >
          <img
            src={previewSrc}
            alt="preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="eager"
          />
          <ImageDescription>{title}</ImageDescription>
        </WorkSpannImage>
      ) : isVideo ? (
        <VideoPreview
          $imageUrl={previewSrc}
        >
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            preload="auto"
            playsInline
            disablePictureInPicture
          />
          <ImageDescription>{title}</ImageDescription>
        </VideoPreview>
      ) : (
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
  );
};

export default WorkItemComponent;