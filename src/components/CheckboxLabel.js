import styled from "styled-components";

const CheckboxLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid ${(props) => props.theme.formBorder};
  border-radius: 5px;
  color: ${(props) => props.theme.formBorder};
  font-size: 2rem;
  text-transform: uppercase;
  user-select: none;

  input[type="checkbox"]:checked + & {
    background-color: ${(props) => props.theme.formBorder};
    color: ${(props) => props.theme.foreground};
  }
`;

export default CheckboxLabel;
