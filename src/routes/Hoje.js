import axios from "axios";
import styled from "styled-components";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TodayContext from "../contexts/TodayContext";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";
import PageContent from "../components/PageContent";
import HabitsContainer from "../components/HabitsContainer";
import TodayHabit from "../components/TodayHabit";

export default function Hoje({ setToday }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const today = useContext(TodayContext);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }

    if (isUpdated === true) {
      return;
    }

    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .get("habits/today", config)
      .then((response) => {
        console.log(response);
        setToday(response.data);
        setIsUpdated(true);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });
  }, [isUpdated]);

  function getDateString() {
    const date = dayjs();
    const weekday = date.format("dddd").split("-").at(0);
    const capitalizedWeekday =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);
    return `${capitalizedWeekday}, ${date.format("DD/MM")}`;
  }

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
            <h2>{getDateString()}</h2>
            {
              <span>
                {today.length === 0 || today.every((habit) => !habit.done)
                  ? "Nenhum hábito concluído ainda"
                  : `${getProgressInPercent()}% dos hábitos concluídos`}
              </span>
            }
          </ContentHeader>
          <HabitsContainer>
            {today.map((habit) => (
              <TodayHabit
                key={habit.id}
                habit={habit}
                setIsUpdated={setIsUpdated}
              />
            ))}
          </HabitsContainer>
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
    font-weight: 400;
  }

  & span {
    color: ${(props) =>
      props.today.length === 0 || props.today.every((habit) => !habit.done)
        ? props.theme.secondaryForeground
        : props.theme.done};
    font-size: 1.8rem;
  }
`;
