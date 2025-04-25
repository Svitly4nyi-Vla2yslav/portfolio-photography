import styled from "styled-components";

export const WorkContainer = styled.div`

display: flex;
    flex-direction: column;
margin: 0 auto;
margin-top: 70px;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const WorkTitelContainer = styled.div`
margin: 0 auto;
margin-top: 30px;
margin-bottom: 50px;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const WorkTitel = styled.h1`
font-family: var(--font-family);
font-weight: 600;
font-size: 28px;
line-height: 162%;
color: #fff;
text-align: center;
@media screen and (min-width: 744px){
font-size: 48px;

}

@media screen and (min-width: 1440px){


}
`;

export const WorkFilterWrapp = styled.div`
margin: 0 auto;
    display: flex;
    gap: 8%;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const WorkTextFilter = styled.a`
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 13px;
  line-height: 162%;
  color: #fff;

  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    color: #808080;
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background-color: #808080;
    transition: width 0.3s ease-in-out;
  }

  &.active {
    color: #808080;
    &::after {
      width: 100%;
    }
  }

  &:hover::after {
    width: 100%;
  }

  @media screen and (min-width: 744px) {
    font-size: 16px;
  }

  @media screen and (min-width: 1440px) {
    // Можна додавати додаткові стилі для великих екранів
  }
`;

export const WorkPhotoWrapp = styled.div`

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;
export const WorkItem = styled.div`
// height: 200px;
width: 100%;
@media screen and (min-width: 744px){
// height: 400px
position: relative;

}

@media screen and (min-width: 1440px){


}
`;

export const WorkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const ImageDescription = styled.p`
font-family: var(--font-family);
font-weight: 600;
font-size: 12px;
color: #fff;
  position: absolute;
  bottom: 20px;
  left: 20px;
  opacity: 0;  // Приховуємо опис за замовчуванням
  transition: opacity 0.3s ease-in-out;
@media screen and (min-width: 744px){
font-size: 22px;

z-index: 1;
}

@media screen and (min-width: 1440px){


}
`;

export const WorkSpannImage = styled.span<{ imageUrl: string }>`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: 100%;
   transition: all 0.6s ease-in-out;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // height: 40%;
    pointer-events: none;
    transition: all 0.6s ease-in-out;
    background-size: cover;
    background-position: center;
    z-index: 1;  // Встановлюємо вищий рівень для градієнта
  }

  &:hover::after {
   background: linear-gradient(0deg, rgba(16, 16, 16, 1.7) 0%, rgba(16, 16, 16, 0) 100%);
               
    background-size: fit;
    background-position: center;
    height: 47%;
    overflow: hidden;
   
  }

  &:hover ${ImageDescription} {
    opacity: 1;  // Покажемо опис при наведенні
     z-index: 2;
  }

  @media screen and (min-width: 744px) {
  
  }

  @media screen and (min-width: 1440px) {
  
  }
`;



export const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: hidden;

  & iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const WorkDescriptionWrapp = styled.div`
height: 200px;
width: 100%;
margin: 0 auto;
margin-top: 50px;
margin-bottom: 50px;
max-width: 70%;
@media screen and (min-width: 744px){
height: 400px;

}

@media screen and (min-width: 1440px){


}
`;

export const WorkDescription = styled.h3`
font-family: var(--font-family);
font-weight: 600;
font-size: 18px;
text-align: center;
color: #fff;

@media screen and (min-width: 744px){

font-size: 32px;
}

@media screen and (min-width: 1440px){


}
`;

export const WorkTextDescription = styled.p`
font-family: var(--second-family);
font-weight: 400;
font-size: 12px;
text-align: center;
color: #808080;
@media screen and (min-width: 744px){
font-size: 16px;

}

@media screen and (min-width: 1440px){


}
`;

export const NotFoundWraperr = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
margin: 0 auto;
height: 420px;
// padding: 46px 280px;
height: 200px;
width: 100%;
@media screen and (min-width: 744px){
height: 400px;

}

@media screen and (min-width: 1440px){
// padding: 146px 880px;

}
`;

export const NotFoundText = styled.p`
font-family: var(--third-family);
font-weight: 600;
font-size: 24px;
color: #404040;
    text-align: center;
    line-height: 162%;
@media screen and (min-width: 744px){

font-size: 42px;
}

@media screen and (min-width: 1440px){
font-size: 64px;

}
`;
