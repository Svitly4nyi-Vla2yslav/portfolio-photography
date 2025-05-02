import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Loading from '../../assets/video/logo_animated_hq.webm';
import {
  CollectionContainer,
  CollectionHeader,
  CollectionGrid,
  CollectionBlock,
  TextBlock,
  CollectionTitle,
  CollectionWrapper,
  CollectionText,
  CollectionDescription,
  CollectionTextWrapper,
  CollectionImageWrapper,
  ImageBlock,
  Folder,
} from './CollectionComponent.styled';

export interface CollectionData {
  id: number;
  work_id: string;
  collection_name: string;
  year: string;
  tags: string[];
  synopsis: string;
  description: string;
  folder: string;
  [key: string]: any;
  // Main media (can be image or video)
  image_name: string;
  image_name1?: string;
  image_name2?: string;
  image_name3?: string;
  image_name4?: string;
  image_name5?: string;
  image_name6?: string;
  image_name7?: string;
  image_name8?: string;
  image_name9?: string;
  image_name41?: string;

  // Titles for media
  image_name_title?: string;
  image_name1_title?: string;
  image_name2_title?: string;
  image_name3_title?: string;
  image_name4_title?: string;
  image_name5_title?: string;
  image_name6_title?: string;
  image_name7_title?: string;
  image_name8_title?: string;
  image_name9_title?: string;
  image_name41_title?: string;

  // Additional content fields
  title1?: string;
  title11?: string;

  // Optional work title from related table
  work_title?: string;
}

const CollectionComponent: React.FC<{
  collection: CollectionData;
  collections: CollectionData[];
}> = ({ collection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({
    url: '',
    type: 'image', // 'image' or 'video'
    altText: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [failedMedia, setFailedMedia] = useState<Set<string>>(new Set());
  const topRef = React.useRef<HTMLDivElement>(null);

  const getMediaUrl = (mediaName: string) => {
    return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${collection.folder}/${mediaName}`;
  };

  const handleMediaError = (mediaName: string) => {
    setFailedMedia(prev => new Set(prev).add(mediaName));
  };

  const isMediaFailed = (mediaName: string) => {
    return failedMedia.has(mediaName);
  };

  const getMediaType = (mediaName: string): 'image' | 'video' => {
    const videoExtensions = ['.mp4', '.webm', '.mov'];
    return videoExtensions.some(ext => mediaName.toLowerCase().endsWith(ext)) 
      ? 'video' 
      : 'image';
  };

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setIsLoading(true);
        setFailedMedia(new Set());

        const mediaToLoad = [
          collection.image_name,
          collection.image_name1,
          collection.image_name2,
          collection.image_name3,
          collection.image_name4,
          collection.image_name41,
          collection.image_name5,
          collection.image_name6,
          collection.image_name7,
          collection.image_name8,
          collection.image_name9,
        ].filter(Boolean) as string[];

        await Promise.all(
          mediaToLoad.map(mediaName => {
            return new Promise<void>(resolve => {
              const mediaType = getMediaType(mediaName);
              if (mediaType === 'image') {
                const img = new Image();
                img.src = getMediaUrl(mediaName);
                img.onload = () => resolve();
                img.onerror = () => {
                  handleMediaError(mediaName);
                  resolve();
                };
              } else {
                // For videos, we can't preload the same way, so we just resolve
                resolve();
              }
            });
          })
        );

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading media:', error);
        setIsLoading(false);
      }
    };

    loadMedia();
  }, [collection.id]);

  const openModal = (mediaName: string, mediaKey: string, altText: string) => {
    if (isMediaFailed(mediaName)) return;

    const descriptionKey = `${mediaKey}_title` as keyof CollectionData;
    const mediaType = getMediaType(mediaName);
    
    setCurrentMedia({
      url: getMediaUrl(mediaName),
      type: mediaType,
      altText: altText,
      description: collection[descriptionKey] || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderMedia = (
    mediaName: string | undefined,
    mediaKey: string,
    altText: string,
    index: number,
    styles = {}
  ) => {
    if (!mediaName || isMediaFailed(mediaName)) return null;

    const mediaType = getMediaType(mediaName);
    const mediaUrl = getMediaUrl(mediaName);

    return (
      <div className="image-container" key={`${mediaName}-${index}`}>
        {mediaType === 'image' ? (
          <img
            src={mediaUrl}
            alt={altText}
            onClick={() => openModal(mediaName, mediaKey, altText)}
            onError={() => handleMediaError(mediaName)}
            style={styles}
          />
        ) : (
          <video
            src={mediaUrl}
            controls
            onClick={() => openModal(mediaName, mediaKey, altText)}
            style={styles}
          />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000',
        }}
      >
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
    <CollectionContainer ref={topRef}>
      <Folder>{collection.folder}</Folder>
      <CollectionHeader>
        <CollectionWrapper>
          <CollectionText>Collection</CollectionText>
          <CollectionTitle>{collection.collection_name}</CollectionTitle>
        </CollectionWrapper>
        <CollectionWrapper>
          <CollectionText>Year</CollectionText>
          <CollectionTitle>{collection.year}</CollectionTitle>
        </CollectionWrapper>

        <CollectionWrapper>
          <CollectionText>Tags</CollectionText>{' '}
          <CollectionTitle style={{ width: '60%' }}>
            {collection.tags.join(' ')}
          </CollectionTitle>
        </CollectionWrapper>

        <CollectionWrapper>
          <CollectionText>Synopsis</CollectionText>{' '}
          <CollectionDescription>{collection.synopsis}</CollectionDescription>
        </CollectionWrapper>
      </CollectionHeader>

      {renderMedia(
        collection.image_name,
        'image_name',
        collection.collection_name,
        0
      )}
      <CollectionTextWrapper>
        <CollectionText>Description</CollectionText>
        <CollectionDescription>{collection.description}</CollectionDescription>
      </CollectionTextWrapper>

      <CollectionGrid
        $itemsCount={
          [
            collection.image_name1,
            collection.image_name2,
            collection.image_name3,
          ].filter(media => media && !isMediaFailed(media)).length
        }
      >
        {[
          collection.image_name1,
          collection.image_name2,
          collection.image_name3,
        ]
          .filter(media => media && !isMediaFailed(media))
          .map((media, index) =>
            renderMedia(
              media,
              `image_name${index + 1}`,
              `${collection.collection_name} ${index + 1}`,
              index + 1
            )
          )}
      </CollectionGrid>
      {collection.image_name4 &&
        collection.title1 &&
        !isMediaFailed(collection.image_name4) && (
          <CollectionBlock>
            <ImageBlock>
              {renderMedia(
                collection.image_name4,
                'image_name4',
                collection.title1 || '',
                4
              )}
            </ImageBlock>
            <TextBlock>
              <h3>{collection.title1}</h3>
            </TextBlock>
          </CollectionBlock>
        )}

      {collection.image_name41 &&
        collection.title11 &&
        !isMediaFailed(collection.image_name41) && (
          <CollectionBlock>
            {collection.title11 && (
              <TextBlock>
                <h3>{collection.title11}</h3>
              </TextBlock>
            )}
            <ImageBlock>
              {renderMedia(
                collection.image_name41,
                'image_name41',
                collection.title11 || '',
                41
              )}
            </ImageBlock>
          </CollectionBlock>
        )}
      <CollectionImageWrapper>
        {[5, 6, 7, 8, 9].map(num => {
          const media = collection[`image_name${num}` as keyof CollectionData] as
            | string
            | undefined;
          return media
            ? renderMedia(
                media,
                `image_name${num}`,
                `${collection.collection_name} ${num}`,
                num
              )
            : null;
        })}
      </CollectionImageWrapper>
      {isModalOpen && (
        <Modal onClose={closeModal} preventScroll={true}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
            
            {currentMedia.type === 'image' ? (
              <img
                src={currentMedia.url}
                alt={currentMedia.altText}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  marginBottom: '20px',
                }}
              />
            ) : (
              <video
                src={currentMedia.url}
                controls
                autoPlay
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  marginBottom: '20px',
                }}
              />
            )}

            <div
              style={{
                color: '#fff',
                textAlign: 'center',
                padding: '0 20px',
                maxWidth: '800px',
              }}
            >
              {currentMedia.description && (
                <p style={{ marginBottom: '20px' }}>
                  {currentMedia.description}
                </p>
              )}
              {collection.work_title && (
                <h3 style={{ marginTop: 0 }}>{collection.work_title}</h3>
              )}
            </div>
          </div>
        </Modal>
      )}
    </CollectionContainer>
  );
};

export default CollectionComponent;