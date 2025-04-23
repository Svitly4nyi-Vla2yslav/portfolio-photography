import React, { useEffect, useState } from 'react';
import {
  FooterContainer,
  FooterItemText,
  FooterItemTitel,
  FooterLink,
  FooterList,
  FooterText,
} from './Footer.styled';

import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 3000 });
    AOS.refresh();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FooterContainer $isScrolled={isScrolled}>
      {' '}
      {/* Changed to $isScrolled */}
      <FooterList>
        {/* Removed the outer Link since Logo already has a Link */}
        <FooterLink to="/" style={{ padding: 0 }}>
          {/* <img src={LogoIcon} alt="Logo" /> */}
        </FooterLink>
        <FooterItemText> </FooterItemText>
        <FooterItemText>
          {/* <Trans
          
            components={{ company_name: <SpanTitel /> }}
          /> */}
        </FooterItemText>
      </FooterList>
      <FooterList>
        <FooterItemTitel>usefulLinks</FooterItemTitel>
      </FooterList>
      <FooterText>footer copyright</FooterText>
    </FooterContainer>
  );
};

export default Footer;
