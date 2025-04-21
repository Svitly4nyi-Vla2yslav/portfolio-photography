import { useState } from 'react';
import {
  HomeContainer,
  HomeTitel,
  HomeWrapperDetails,
  SpanTitel,
} from './HomePage.styled';
import Preloader from '../../components/Preloader/Preloader';
// import Partners from '../../components/SlidePartners/Partners';
import React from 'react';
import { Trans } from 'react-i18next';
// import VideoBackground from '../../components/VideoBackground/VideoBackground';

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <HomeContainer>
        <HomeTitel>
          <Trans
            i18nKey="home_title"
            components={{ highlight1: <SpanTitel /> }}
          />
          <HomeWrapperDetails data-aos="zoom-out-down">
          </HomeWrapperDetails>{' '}
        </HomeTitel>

        {/* <VideoBackground /> */}
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
        {isLoaded && (
          <>
          </>
        )}
      </HomeContainer>
      {/* <Partners /> */}
    </>
  );
};

export default Home;
