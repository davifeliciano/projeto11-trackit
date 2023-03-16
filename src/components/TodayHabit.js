import axios from "axios";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function TodayHabit({ habit, setIsUpdated }) {
  const user = useContext(UserContext);

  function toggleDone() {
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .post(
        `habits/${habit.id}/${habit.done ? "uncheck" : "check"}`,
        {},
        config
      )
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
    <Container data-test="today-habit-container">
      <Content>
        <h3 data-test="today-habit-name">{habit.name}</h3>
        <p data-test="today-habit-sequence">
          Sequência atual:{" "}
          <Detail done={habit.done}>
            {`${habit.currentSequence} dia${
              habit.currentSequence !== 1 ? "s" : ""
            }`}
          </Detail>
        </p>
        <p data-test="today-habit-record">
          Seu recorde:{" "}
          <Detail done={habit.currentSequence === habit.highestSequence}>
            {`${habit.highestSequence} dia${
              habit.highestSequence !== 1 ? "s" : ""
            }`}
          </Detail>
        </p>
      </Content>
      <CheckmarkButton
        done={habit.done}
        onClick={toggleDone}
        data-test="today-habit-check-btn"
      >
        <BsCheck />
      </CheckmarkButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 1.8rem;
  gap: 2rem;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 5px;
  color: ${(props) => props.theme.font};
`;

const Content = styled.div`
  flex-grow: 1;

  & h3 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 400;
  }

  & p {
    font-size: 1.3rem;
    line-height: 1.5rem;
  }
`;

const Detail = styled.span`
  color: ${(props) => (props.done ? props.theme.done : props.theme.font)};
`;

const CheckmarkButton = styled.button`
  width: 7rem;
  height: 7rem;
  padding: 0;
  border: 1px solid
    ${(props) => (props.done ? props.theme.done : props.theme.checkmarkBorder)};
  border-radius: 5px;
  background-color: ${(props) =>
    props.done ? props.theme.done : props.theme.checkmark};

  & svg {
    fill: ${(props) => props.theme.foreground};
    width: 100%;
    height: 100%;
  }
`;
