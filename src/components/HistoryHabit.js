import styled from "styled-components";
import { BsCheck, BsX } from "react-icons/bs";

export default function HistoryHabit({ habit }) {
  return (
    <Container>
      <h3>{habit.name}</h3>
      <StatusIcon done={habit.done}>
        {habit.done ? <BsCheck /> : <BsX />}
      </StatusIcon>
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

  & h3 {
    flex-grow: 1;
    font-size: 2rem;
    font-weight: 400;
  }
`;

const StatusIcon = styled.div`
  min-width: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 5px;
  background-color: ${(props) =>
    props.done ? props.theme.done : props.theme.notDone};

  & svg {
    fill: ${(props) => props.theme.foreground};
    width: 100%;
    height: 100%;
  }
`;
