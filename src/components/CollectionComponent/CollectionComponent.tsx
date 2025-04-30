import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Loading from '../../assets/video/logo_animated_hq.webm';
import {
  CollectionContainer,
  CollectionHeader,
  CollectionImage,
  CollectionGrid,
  CollectionBlock,
  TextBlock,
  CollectionTitle,
  CollectionWrapper,
  CollectionText,
  CollectionDescription,
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
  title1?: string;
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

  const getImageUrl = (imageName: string) => {
    return `https://qcrjljxbutsvgveiozjd.supabase.co/storage/v1/object/public/work-images/${collection.folder}/${imageName}`;
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
          collection.image_name5,
          collection.image_name6,
          collection.image_name7,
          collection.image_name8,
          collection.image_name9,
        ].filter(Boolean);

        await Promise.all(
          imagesToLoad.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = getImageUrl(url as string);
              img.onload = resolve;
              img.onerror = reject;
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
          <CollectionTitle style={{width: "60%"}}>{collection.tags.join(" ")}</CollectionTitle>
        </CollectionWrapper>

        <CollectionWrapper>
          <CollectionText>Synopsis</CollectionText>{' '}
          <CollectionDescription>{collection.synopsis}</CollectionDescription>
        </CollectionWrapper>
      </CollectionHeader>

      <CollectionImage
        src={getImageUrl(collection.image_name)}
        alt={collection.collection_name}
        onClick={() => openModal(collection.image_name)}
      />

      <p>{collection.description}</p>

      <CollectionGrid>
        {[
          collection.image_name1,
          collection.image_name2,
          collection.image_name3,
        ].map(
          (img, index) =>
            img && (
              <img
                key={index}
                src={getImageUrl(img)}
                alt={`${collection.collection_name} ${index + 1}`}
                onClick={() => openModal(img)}
              />
            )
        )}
      </CollectionGrid>

      {collection.image_name4 && collection.title1 && (
        <CollectionBlock>
          <img
            src={getImageUrl(collection.image_name4)}
            alt={collection.title1}
            onClick={() => openModal(collection.image_name4 as string)}
          />
          <TextBlock>
            <h3>{collection.title1}</h3>
            <p>Additional description text here...</p>
          </TextBlock>
        </CollectionBlock>
      )}

      <CollectionGrid cols={5}>
        {[5, 6, 7, 8, 9].map(num => {
          const img = collection[
            `image_name${num}` as keyof CollectionData
          ] as string;
          return (
            img && (
              <img
                key={num}
                src={getImageUrl(img)}
                alt={`${collection.collection_name} ${num}`}
                onClick={() => openModal(img)}
              />
            )
          );
        })}
      </CollectionGrid>

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
            />
          </div>
        </Modal>
      )}
    </CollectionContainer>
  );
};

export default CollectionComponent;
