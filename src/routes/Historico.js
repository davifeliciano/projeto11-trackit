import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import PageContainer from "../components/PageContainer";
import Header from "../components/Header";
import PageContent from "../components/PageContent";
import NavBar from "../components/NavBar";

export default function Historico() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <PageContainer>
      <Header />
      <PageContent>
        <Content>
          <ContentHeader>
            <h2>Histórico</h2>
          </ContentHeader>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </Content>
      </PageContent>
      <NavBar />
    </PageContainer>
  );
}

const Content = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & p {
    color: ${(props) => props.theme.font};
    font-size: 1.8rem;
  }
`;

const ContentHeader = styled.header`
  & h2 {
    color: ${(props) => props.theme.main};
    font-size: 2.2rem;
    font-weight: 400;
  }
`;
