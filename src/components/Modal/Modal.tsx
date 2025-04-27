import React from 'react';
import styled from 'styled-components';


export const ModalWrapper = styled.div`
max-width: 100%;
    max-height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.17);
    padding: 10px;
    border-radius: 8px;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;
interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <ModalWrapper
        onClick={(e) => e.stopPropagation()}
      
      >
        {children}
      </ModalWrapper>
    </div>
  );
};

export default Modal;
