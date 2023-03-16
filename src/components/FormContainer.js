import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-block: 8rem;

  && a {
    color: ${(props) => props.theme.secondary};
    font-size: 1.4rem;
    text-decoration: underline;
  }
`;

export default FormContainer;
