import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const HomeContainer = styled.div`
max-width: 1440px;
    margin: 0 auto;
    height: 100vh;
    background: #000;
    display: flex
;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;

export const HomeWrapperDetails = styled.div`
 display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
     gap: 44px;
`;


export const HomeTitel = styled.div`
display: flex;


   
`;

export const SpanTitel = styled.span`

`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover,
    &.active {
      color: #808080;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  color: #fff;
  transition: all 0.3s ease-in-out;
  position: relative;
  padding-left: 30px; /* місце для стрілки */

  &::before {
    content: '➔'; 
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) translateX(-10px); /* трохи зліва */
    color: #808080;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    font-size: 26px;
  }

  &:hover {
    color: #808080;
    transform: scale(1.1);
  }

  &:hover::before {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }

  &.active {
    color: #808080;
  }
`;
