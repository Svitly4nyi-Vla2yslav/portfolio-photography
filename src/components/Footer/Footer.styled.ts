import styled from 'styled-components';

export const FooterContainer = styled.footer<{ $isScrolled: boolean }>`
 background: ${({ $isScrolled }) =>
    $isScrolled ? 'transparent' : 'rgba(28, 28, 28, 0.7)'};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.4)'};
text-align: center;
  background: transparent;
color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
width: 100%;
margin: 0 auto;
position: fixed;
bottom: 0; 
z-index: 10;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}

   &:hover,
  &:focus,
  &.active {
   background-color: rgba(28, 28, 28, 0.9);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease-in-out;
  }
`;

export const Border = styled.p`
  padding: 0px auto 50px auto;
  width: 90%;
  height: 1px; /* Збільшуємо висоту для еліпса */
  margin: 0 auto;
  background: radial-gradient(
      ellipse 118.85px 58.06px at 50% 50%,
      rgb(252, 252, 252) 0%,
      rgba(58, 55, 55, 0.42) 80%
    );
`;

export const FooterWrapp = styled.div`
     display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 2% 4%;
    height: 100%;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: 744px){

    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;

}

@media screen and (min-width: 1440px){

width: 90%;
}
`;


export const CopyrightContainer = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 10px;

    @media screen and (min-width: 744px){

flex-direction: column;
    align-items: flex-start;
}

@media screen and (min-width: 1440px){


}
`;

export const TextCopyright = styled.p`
font-family: var(--second-family);
font-weight: 400;
font-size: 11px;
letter-spacing: -0.02em;
color: #808080;

@media screen and (min-width: 744px){
font-family: var(--second-family);
font-weight: 400;
font-size: 13px;
letter-spacing: -0.02em;
color: #808080;
}

@media screen and (min-width: 1440px){
font-size: 16px;

}
`;

export const TitelCopyright = styled.h4`
font-family: var(--font-family);
font-weight: 600;
font-size: 14px;
line-height: 162%;
color: #fff;
@media screen and (min-width: 744px){
font-size: 18px;

}

@media screen and (min-width: 1440px){
font-size: 24px;

}
`;

// ! ---------------------------------------

export const EmailContainer = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 10px;

    @media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;



export const EmailLink = styled.a`
font-family: var(--font-family);
font-weight: 600;
font-size: 14px;
line-height: 162%;
color: #fff;
@media screen and (min-width: 744px){
font-size: 18px;

}

@media screen and (min-width: 1440px){
font-size: 24px;

}
`;

// !--------------------------------------------

export const SocialContainer = styled.div`
display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    gap: 10px;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const SocialLinkWrapper = styled.div`
display: flex;
 gap: 3%;

 @media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){
flex-direction: column;
    align-items: flex-start;


}
`;

export const SocialLink = styled.a`
font-family: var(--font-family);
font-weight: 400;
font-size: 11px;
line-height: 162%;
color: #fff;
@media screen and (min-width: 744px){
font-size: 16px;

}

@media screen and (min-width: 1440px){
    
}
`;