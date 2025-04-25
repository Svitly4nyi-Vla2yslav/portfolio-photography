import React from 'react';
import { ImageDescription, VideoPreview, WorkImage, WorkItem, WorkSpannImage } from '../../pages/Work/Work.styled';
import { WorkItemData } from '../../pages/Work/Work';

interface WorkItemComponentProps {
    work: WorkItemData;
  }
  
  const WorkItemComponent: React.FC<WorkItemComponentProps> = ({ work }) => {
    const getImageUrl = (folder: string, imageName: string) => {
      return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${folder}/${imageName}`;
    };
  
    const isVideo = work.image_name.endsWith('.mp4') || work.image_name.endsWith('.mov'); // Перевірка на відео
  
    return (
      <WorkItem key={work.id}>
        <WorkSpannImage imageUrl={getImageUrl(work.folder, work.image_name)}>
          {isVideo ? (
            <VideoPreview>
              <iframe
                src={`https://player.vimeo.com/video/${work.image_name}`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            </VideoPreview>
          ) : (
            <WorkImage
              src={getImageUrl(work.folder, work.image_name)}
              alt={work.title}
            />
          )}
          <ImageDescription>{work.title}</ImageDescription>
        </WorkSpannImage>
      </WorkItem>
    );
  };

export default WorkItemComponent;
