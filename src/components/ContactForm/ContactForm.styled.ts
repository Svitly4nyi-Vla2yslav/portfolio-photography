import styled from 'styled-components'
// Стилізовані компоненти
export const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 46px;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const Input = styled.input`
font-family: var(--third-family);
font-weight: 600;
font-size: 16px;
color: #4d4d4d;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  padding: 13px 20px;
  background: #0c0c0c;
  border: none;
`

export const Textarea = styled.textarea`
font-family: var(--third-family);
font-weight: 600;
font-size: 16px;
color: #4d4d4d;
  width: 100%;
  padding: 20px;
  margin: 5px 0;
  border: none;
  height: 100px;
  background: #0d0d0d;
`;

export const Button = styled.button`
 width: 100%;
  padding: 10px 20px;
background: #fff;
font-family: var(--third-family);
font-weight: 600;
font-size: 16px;
color: #000;
border: none;
  cursor: pointer;

   &:hover {
    color: #808080;
    background: #0d0d0d;
  }
`

export const Error = styled.p`
  color: red;
`

export const Success = styled.p`
  color: green;
`