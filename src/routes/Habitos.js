import axios from "axios";
import styled from "styled-components";
import { BsPlus } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import HabitForm from "../components/HabitForm";
import HabitsContainer from "../components/HabitsContainer";
import NavBar from "../components/NavBar";
import PageContainer from "../components/PageContainer";
import PageContent from "../components/PageContent";
import Habit from "../components/Habit";

export default function Habitos({ setToday }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [displayHabitForm, setDisplayHabitForm] = useState(false);
  const [habitName, setHabitName] = useState("");

  const selectedDaysInitValue = Object.fromEntries(
    [...Array(7).keys()].map((index) => [index, false])
  );

  const [selectedDays, setSelectedDays] = useState(selectedDaysInitValue);
  const [isUpdated, setIsUpdated] = useState(false);
  const [habits, setHabits] = useState([]);

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
      .get("habits", config)
      .then((response) => {
        console.log(response);
        setHabits(response.data);
        setIsUpdated(true);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });
  }, [isUpdated]);

  function handleSubmit(e) {
    e.preventDefault();

    const name = habitName;

    if (name.trim() === "") {
      alert("Insira um nome válido");
      return;
    }

    const days = Object.entries(selectedDays)
      .filter(([index, selected]) => selected)
      .map(([index, selected]) => index);

    if (days.length === 0) {
      alert("Você precisa marcar ao menos um dia da semana");
      return;
    }

    setIsLoading(true);
    const body = { name, days };
    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    axios
      .post("habits", body, config)
      .then((response) => {
        console.log(response);
        setIsLoading(false);
        setDisplayHabitForm(false);
        setHabitName("");
        setSelectedDays(selectedDaysInitValue);
        setIsUpdated(false);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });

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
  }

  function deleteHabit(habitId) {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .delete(`habits/${habitId}`, config)
      .then((response) => {
        console.log(response);
        setIsUpdated(false);
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });
  }

  return (
    <PageContainer>
      <Header />
      <PageContent>
        <Content>
          <ContentHeader>
            <h2>Meus Hábitos</h2>
            <button onClick={() => setDisplayHabitForm(true)}>
              <BsPlus />
            </button>
          </ContentHeader>
          <HabitForm
            isLoading={isLoading}
            displayHabitForm={displayHabitForm}
            setDisplayHabitForm={setDisplayHabitForm}
            habitName={habitName}
            setHabitName={setHabitName}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            handleSubmit={handleSubmit}
          />
          <HabitsContainer>
            {habits.length !== 0 ? (
              habits.map((habit) => (
                <Habit key={habit.id} habit={habit} deleteHabit={deleteHabit} />
              ))
            ) : isUpdated ? (
              <NoHabitMessage>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                para começar a trackear!
              </NoHabitMessage>
            ) : null}
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
  display: flex;
  justify-content: space-between;

  & h2 {
    color: ${(props) => props.theme.main};
    font-size: 2.2rem;
  }

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 3.5rem;
    padding: 0;
    background-color: ${(props) => props.theme.secondary};
    border: none;
    border-radius: 5px;
    color: ${(props) => props.theme.foreground};
    font-size: 2.6rem;
  }
`;

const NoHabitMessage = styled.span`
  color: ${(props) => props.theme.font};
  font-size: 1.8rem;
`;
