import styled from 'styled-components';

export const CollectionContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 5rem;

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){
max-width: 100%;

}
`;

export const CollectionWrapper = styled.div`
display: flex;
gap: 2rem;
flex-direction: column;
width: 50%;
margin-bottom: 3rem;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){
width: 273px;

}
`;

export const CollectionText = styled.p`
font-family: var(--second-family);
font-weight: 400;
font-size: 12px;
letter-spacing: -0.02em;
color: #808080;
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){
font-size: 16px;

}
`;

export const CollectionTitle = styled.h2`
font-family: var(--font-family);
font-weight: 600;
font-size: 18px;
line-height: 162%;
color: #fff;
@media screen and (min-width: 744px){
font-size: 20px;

}

@media screen and (min-width: 1440px){
font-size: 24px;

}
`;


export const CollectionDescription = styled.p`
font-family: var(--font-family);
font-weight: 400;
font-size: 12px;
line-height: 162%;
color: #fff;
@media screen and (min-width: 744px){
font-size: 14px;

}

@media screen and (min-width: 1440px){
font-size: 16px;

}

`;

export const CollectionHeader = styled.div`
display: flex;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    padding: 40px 16px 90px 16px;
    align-items: baseline;
  
 
@media screen and (min-width: 744px){
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: baseline;

}

@media screen and (min-width: 1440px){
display: flex;
        width: 1440px;
        margin: 0 auto;
        flex-direction: row;
        padding: 150px 0px 150px 0px;
        justify-content: space-between;
        align-items: flex-start;

}
`;

export const CollectionImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.01);
  }

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const CollectionGrid = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols || 3}, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
  
  img {
    width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.02);
    }
  }

@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;

export const CollectionBlock = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  
  img {
    width: 50%;
    height: auto;
    cursor: pointer;
  }
  

@media screen and (min-width: 744px){
  flex-direction: column;
    
    img {
      width: 100%;
    }

}

@media screen and (min-width: 1440px){


}
`;

export const TextBlock = styled.div`
  width: 50%;
  
  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    line-height: 1.6;
  }
  
@media screen and (min-width: 744px){


}

@media screen and (min-width: 1440px){


}
`;