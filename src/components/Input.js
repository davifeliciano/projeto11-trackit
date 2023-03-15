import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  height: 4.5rem;
  padding-inline: 1rem;
  background-color: ${(props) => props.theme.formBackground};
  border: 1px solid ${(props) => props.theme.formBorder};
  border-radius: 5px;
  color: ${(props) => props.theme.font};
  font-size: 2rem;

  &:focus {
    outline: 1px solid ${(props) => props.theme.formBorder};
  }

  &:disabled {
    color: ${(props) => props.theme.formDisabledFont};
    background-color: ${(props) => props.theme.formDisabledBackground};
  }

  &::placeholder {
    color: ${(props) => props.theme.formPlaceholder};
  }
`;

export default Input;
