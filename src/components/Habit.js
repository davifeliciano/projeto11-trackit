import styled from "styled-components";
import dayjs from "dayjs";
import { BsTrash } from "react-icons/bs";
import CheckboxesContainer from "./CheckboxContainer";
import CheckboxInput from "./CheckboxInput";
import CheckboxLabel from "./CheckboxLabel";

export default function Habit({ habit, deleteHabit }) {
  function Checkbox({ weekday, index }) {
    return (
      <li>
        <CheckboxInput
          type="checkbox"
          id={`checkbox_${habit.id}_${weekday}`}
          value={weekday}
          checked={habit.days.includes(index)}
          disabled={true}
        />
        <CheckboxLabel
          htmlFor={`checkbox_${habit.id}_${weekday}`}
          data-test="habit-day"
        >
          {weekday[0]}
        </CheckboxLabel>
        <DeleteButton
          onClick={() => deleteHabit(habit.id)}
          data-test="habit-delete-btn"
        >
          <BsTrash />
        </DeleteButton>
      </li>
    );
  }

  return (
    <Container data-test="habit-container">
      <h3 data-test="habit-name">{habit.name}</h3>
      <CheckboxesContainer>
        {dayjs.weekdays().map((weekday, index) => (
          <Checkbox key={weekday} weekday={weekday} index={index} />
        ))}
      </CheckboxesContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  padding-right: 5rem;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 5px;
  position: relative;

  & h3 {
    color: ${(props) => props.theme.font};
    font-size: 2rem;
    font-weight: 400;
  }
`;

const DeleteButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  background-color: ${(props) => props.theme.foreground};
  position: absolute;
  top: 1.8rem;
  right: 1.8rem;

  & svg {
    fill: ${(props) => props.theme.font};
    width: 100%;
    height: 100%;
  }
`;
