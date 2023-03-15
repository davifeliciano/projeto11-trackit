import styled from "styled-components";

const PageContent = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default PageContent;
