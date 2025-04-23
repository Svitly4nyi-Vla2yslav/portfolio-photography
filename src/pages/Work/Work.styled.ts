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
@media screen and (min-width: 744px){
font-size: 16px;

}

@media screen and (min-width: 1440px){


}
`;

export const WorkPhotoWrapp = styled.div`

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;
export const WorkItem = styled.div`
height: 200px;
width: 100%;
@media screen and (min-width: 744px){
height: 400px

}

@media screen and (min-width: 1440px){


}
`;

export const WorkImage = styled.img`

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const WorkSpannImage = styled.span`

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
@media screen and (min-width: 744px){
font-size: 22px;

}

@media screen and (min-width: 1440px){


}
`;


export const WorkDescriptionWrapp = styled.div`
height: 200px;
width: 100%;
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