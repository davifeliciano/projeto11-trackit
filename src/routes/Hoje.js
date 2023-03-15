import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TodayContext from "../contexts/TodayContext";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";
import PageContent from "../components/PageContent";

export default function Hoje({ setToday }) {
  const user = useContext(UserContext);
  const today = useContext(TodayContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .get("habits/today", config)
      .then((response) => {
        console.log(response);
        setToday(response.data);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });
  }, []);

  function getProgressInPercent() {
    const progress = today.filter((habit) => habit.done).length / today.length;
    return parseInt(100 * progress);
  }

  return (
    <PageContainer>
      <Header />
      <PageContent>
        <Content>
          <ContentHeader today={today}>
            <h2>{dayjs().format("dddd, DD/MM")}</h2>
            {
              <span>
                {today.length === 0 || today.every((habit) => !habit.done)
                  ? "Nenhum hábito concluído ainda"
                  : `${getProgressInPercent()}% dos hábitos concluídos`}
              </span>
            }
          </ContentHeader>
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
`;

const ContentHeader = styled.header`
  & h2 {
    color: ${(props) => props.theme.main};
    font-size: 2.2rem;
  }

  & span {
    color: ${(props) =>
      props.today.length === 0 || props.today.every((habit) => !habit.done)
        ? props.theme.secondaryForeground
        : props.theme.done};
    font-size: 1.8rem;
  }
`;