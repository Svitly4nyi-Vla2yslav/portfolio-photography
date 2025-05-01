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
} from './CollectionComponent.styled';

interface CollectionData {
  id: number;
  collection_name: string;
  year: string;
  tags: string[];
  synopsis: string;
  description: string;
  image_name: string;
  image_name1?: string;
  image_name2?: string;
  image_name3?: string;
  image_name4?: string;
  image_name41?: string;
  title1?: string;
  title11?: string;
  image_name5?: string;
  image_name6?: string;
  image_name7?: string;
  image_name8?: string;
  image_name9?: string;
  folder: string;
}

const CollectionComponent: React.FC<{ collection: CollectionData }> = ({
  collection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const getImageUrl = (imageName: string) => {
    return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${collection.folder}/${imageName}`;
  };

  const handleImageError = (imageName: string) => {
    setFailedImages(prev => new Set(prev).add(imageName));
  };

  const isImageFailed = (imageName: string) => {
    return failedImages.has(imageName);
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        const imagesToLoad = [
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
          imagesToLoad.map(url => {
            return new Promise<void>(resolve => {
              const img = new Image();
              img.src = getImageUrl(url);
              img.onload = () => resolve();
              img.onerror = () => {
                handleImageError(url);
                resolve();
              };
            });
          })
        );

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [collection]);

  const openModal = (imageName: string) => {
    if (isImageFailed(imageName)) return;
    setCurrentImage(getImageUrl(imageName));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const renderImage = (
    imageName: string | undefined,
    alt: string,
    index: number,
    styles = {}
  ) => {
    if (!imageName || isImageFailed(imageName)) return null;

    return (
      <div className="image-container" key={`${imageName}-${index}`}>
        <img
          src={getImageUrl(imageName)}
          alt={alt}
          onClick={() => openModal(imageName)}
          onError={() => handleImageError(imageName)}
          style={styles}
        />
      </div>
    );
  };

  return (
    <CollectionContainer>
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

      {renderImage(collection.image_name, collection.collection_name, 0)}
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
          ].filter(img => img && !isImageFailed(img)).length
        }
      >
        {[
          collection.image_name1,
          collection.image_name2,
          collection.image_name3,
        ]
          .filter(img => img && !isImageFailed(img)) // Фільтруємо неіснуючі/помилкові зображення
          .map((img, index) =>
            renderImage(
              img,
              `${collection.collection_name} ${index + 1}`,
              index + 1
            )
          )}
      </CollectionGrid>
      {collection.image_name4 &&
        collection.title1 &&
        !isImageFailed(collection.image_name4) && (
          <CollectionBlock>
            <ImageBlock>
              {renderImage(collection.image_name4, collection.title1, 4)}
            </ImageBlock>
            <TextBlock>
              <h3>{collection.title1}</h3>
            </TextBlock>
          </CollectionBlock>
        )}

      {collection.image_name41 &&
        collection.title11 &&
        !isImageFailed(collection.image_name41) && (
          <CollectionBlock>
            {collection.title11 && (
              <TextBlock>
                <h3>{collection.title11}</h3>
              </TextBlock>
            )}
            <ImageBlock>
              {renderImage(collection.image_name41, collection.title11, 41)}
            </ImageBlock>
          </CollectionBlock>
        )}
      <CollectionImageWrapper>
        {[5, 6, 7, 8, 9].map(num => {
          const img = collection[`image_name${num}` as keyof CollectionData] as
            | string
            | undefined;
          return img
            ? renderImage(img, `${collection.collection_name} ${num}`, num)
            : null;
        })}
      </CollectionImageWrapper>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div
            style={{
              position: 'relative',
              width: '90%',
              height: '90%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
                fontSize: '40px',
                cursor: 'pointer',
                color: '#999',
                zIndex: 100,
              }}
            >
              ✖
            </button>
            <img
              src={currentImage}
              alt="Full view"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              onError={() => {
                closeModal();
                handleImageError(currentImage.split('/').pop() || '');
              }}
            />
          </div>
        </Modal>
      )}
    </CollectionContainer>
  );
};

export default CollectionComponent;
