import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import PageContainer from "../components/PageContainer";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import PageContent from "../components/PageContent";
import Calendar from "../components/Calendar";
import HabitsContainer from "../components/HabitsContainer";
import HistoryHabit from "../components/HistoryHabit";
import NavBar from "../components/NavBar";
import errorHandler from "../utils/errorHandler";

export default function Historico() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(null);
  const [dateHabits, setDateHabits] = useState([]);

  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .get("habits/history/daily", config)
      .then((response) => {
        console.log(response);
        setHistory(response.data);
      })
      .catch(errorHandler);
  }, []);

  function getHabitsByDate(date) {
    const dateString = dayjs(date).format("DD/MM/YYYY");
    const dateRecord = history.find((record) => record.day === dateString);
    if (dateRecord === undefined) return [];
    return dateRecord.habits;
  }

  function tileClassName({ date }) {
    const habits = getHabitsByDate(date);
    if (habits.length === 0) return "";
    if (habits.every((habit) => habit.done)) return "done";
    return "not-done";
  }

  function onClickDay(date) {
    const habits = getHabitsByDate(date);
    setDateHabits(habits);
  }

  function getHistoryHabits() {
    if (date === null) {
      return <p>Selecione uma data para ver seu histórico de hábitos</p>;
    }

    if (dateHabits.length === 0) {
      return <p>Parece que não houveram hábitos planejados para esta data</p>;
    }

    return dateHabits.map((habit) => (
      <HistoryHabit key={habit.id} habit={habit} />
    ));
  }

  return (
    <PageContainer>
      <Header />
      <PageContent>
        <Content>
          <ContentHeader>
            <h2>Histórico</h2>
          </ContentHeader>
          <Calendar
            tileClassName={tileClassName}
            onClickDay={onClickDay}
            onChange={setDate}
            value={date}
          />
          <HabitsContainer>{getHistoryHabits()}</HabitsContainer>
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
    font-size: 1.8rem;
    text-align: center;
    color: ${(props) => props.theme.font};
  }
`;

const ContentHeader = styled.header`
  & h2 {
    color: ${(props) => props.theme.main};
    font-size: 2.2rem;
    font-weight: 400;
  }
`;
