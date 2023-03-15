import styled from "styled-components";

const SubmitButton = styled.button`
  width: 100%;
  height: 4.5rem;
  color: ${(props) => props.theme.foreground};
  background-color: ${(props) => props.theme.secondary};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.foreground};
  font-size: 2rem;
  transition: background-color 200ms ease;

  &:active {
    background-color: ${(props) => props.theme.main};
    transition: background-color 200ms ease;
  }

  &:disabled {
    background-color: ${(props) => props.theme.buttonDisabledBackground};
  }

  & svg {
    margin: auto;
  }
`;

export default SubmitButton;
