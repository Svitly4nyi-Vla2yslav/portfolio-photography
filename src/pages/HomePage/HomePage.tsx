import { useState } from 'react';
import {
  HomeContainer,
  HomeTitel,
  HomeWrapperDetails,
} from './HomePage.styled';
import Preloader from '../../components/Preloader/Preloader';
// import Partners from '../../components/SlidePartners/Partners';
import React from 'react';
import { NavItem, StyledNavLink } from '../../components/Header/Header.styled';
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
          <HomeWrapperDetails data-aos="zoom-out-down">
            {/* <NavItem>
              <StyledNavLink to="/home">WELCOME</StyledNavLink>
            </NavItem> */}
            <NavItem>
              <StyledNavLink to="/work">WORK</StyledNavLink>
            </NavItem>{' '}
            <NavItem>
              <StyledNavLink to="/photo">PHOTOGRAPHY</StyledNavLink>
            </NavItem>{' '}
            <NavItem>
              <StyledNavLink to="/info">INFO</StyledNavLink>
            </NavItem>{' '}
            <NavItem>
              <StyledNavLink to="/contact">CONTACTS</StyledNavLink>
            </NavItem>{' '}
            <NavItem>
              <StyledNavLink to="/about">ABOUT ME</StyledNavLink>
            </NavItem>
          </HomeWrapperDetails>
        </HomeTitel>

        {/* <VideoBackground /> */}
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
        {isLoaded && <></>}
      </HomeContainer>
    </>
  );
};

export default Home;
