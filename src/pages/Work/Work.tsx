import React from 'react';
import {
  ImageDescription,
  WorkContainer,
  WorkDescription,
  WorkDescriptionWrapp,
  WorkFilterWrapp,
  WorkImage,
  WorkItem,
  WorkPhotoWrapp,
  WorkSpannImage,
  WorkTextDescription,
  WorkTextFilter,
  WorkTitel,
  WorkTitelContainer,
} from './Work.styled';

const Work: React.FC = () => {
  return (
    <div>
      <WorkContainer>
        <WorkTitelContainer>
          <WorkTitel>WORK</WorkTitel>
          <WorkFilterWrapp>
            <WorkTextFilter>ALL</WorkTextFilter>
            <WorkTextFilter>COMMERCIAL</WorkTextFilter>{' '}
            <WorkTextFilter>PERSONAL</WorkTextFilter>
          </WorkFilterWrapp>
        </WorkTitelContainer>
        <WorkPhotoWrapp>
          <WorkItem>
            <WorkSpannImage>
              {' '}
              <WorkImage />
              <ImageDescription></ImageDescription>
            </WorkSpannImage>
          </WorkItem>
          <WorkItem>
            <WorkSpannImage>
              {' '}
              <WorkImage />
              <ImageDescription></ImageDescription>
            </WorkSpannImage>
          </WorkItem>
          <WorkItem>
            <WorkSpannImage>
              {' '}
              <WorkImage />
              <ImageDescription></ImageDescription>
            </WorkSpannImage>
          </WorkItem>
        </WorkPhotoWrapp>
        <WorkDescriptionWrapp>
          <WorkDescription></WorkDescription>
          <WorkTextDescription></WorkTextDescription>
        </WorkDescriptionWrapp>
      </WorkContainer>
    </div>
  );
};

export default Work;
