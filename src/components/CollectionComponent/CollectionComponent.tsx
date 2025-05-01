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
  // Main images
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

  // Titles for images
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
  const [currentImage, setCurrentImage] = useState({
    url: '',
    altText: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const topRef = React.useRef<HTMLDivElement>(null);

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
        setIsLoading(true); // Додайте це, щоб показувати завантаження при зміні колекції
        setFailedImages(new Set()); // Скидаємо помилкові зображення для нової колекції

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
  }, [collection.id]); // Змініть залежності на весь об'єкт колекції

  // Функція для блокування скролу

  const openModal = (imageName: string, imageKey: string, altText: string) => {
    if (isImageFailed(imageName)) return;

    const descriptionKey = `${imageKey}_title` as keyof CollectionData;
    setCurrentImage({
      url: getImageUrl(imageName),
      altText: altText,
      description: collection[descriptionKey] || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    return () => {
      // На випадок розмонтування компонента
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
    };
  }, []);

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
    imageKey: string, // Ключ для пошуку опису (наприклад, "image_name1")
    altText: string, // Альтернативний текст
    index: number,
    styles = {}
  ) => {
    if (!imageName || isImageFailed(imageName)) return null;

    return (
      <div className="image-container" key={`${imageName}-${index}`}>
        <img
          src={getImageUrl(imageName)}
          alt={altText}
          onClick={() => openModal(imageName, imageKey, altText)}
          onError={() => handleImageError(imageName)}
          style={styles}
        />
      </div>
    );
  };

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

      {renderImage(
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
              `image_name${index + 1}`, // Ключ для пошуку опису
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
              {renderImage(
                collection.image_name4,
                'image_name4', // Ключ
                collection.title1 || '', // Alt текст
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
        !isImageFailed(collection.image_name41) && (
          <CollectionBlock>
            {collection.title11 && (
              <TextBlock>
                <h3>{collection.title11}</h3>
              </TextBlock>
            )}
            <ImageBlock>
              {renderImage(
                collection.image_name41,
                'image_name41', // Ключ
                collection.title11 || '', // Alt текст
                41
              )}
            </ImageBlock>
          </CollectionBlock>
        )}
      <CollectionImageWrapper>
        {[5, 6, 7, 8, 9].map(num => {
          const img = collection[`image_name${num}` as keyof CollectionData] as
            | string
            | undefined;
          return img
            ? renderImage(
                img,
                `image_name${num}`, // Ключ
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
            <img
              src={currentImage.url}
              alt={currentImage.altText}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
                marginBottom: '20px',
              }}
            />

            <div
              style={{
                color: '#fff',
                textAlign: 'center',
                padding: '0 20px',
                maxWidth: '800px',
              }}
            >
              {currentImage.description && (
                <p style={{ marginBottom: '20px' }}>
                  {currentImage.description}
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
