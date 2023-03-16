import styled from "styled-components";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import Input from "./Input";
import CheckboxesContainer from "./CheckboxContainer";
import CheckboxInput from "./CheckboxInput";
import CheckboxLabel from "./CheckboxLabel";
import StyledSubmitButton from "../components/SubmitButton";

export default function HabitForm({
  isLoading,
  displayHabitForm,
  setDisplayHabitForm,
  habitName,
  setHabitName,
  selectedDays,
  setSelectedDays,
  handleSubmit,
}) {
  function Checkbox({ weekday, index }) {
    return (
      <li>
        <CheckboxInput
          type="checkbox"
          id={`checkbox_${weekday}`}
          value={weekday}
          checked={selectedDays[index]}
          disabled={isLoading}
          onChange={() =>
            setSelectedDays({ ...selectedDays, [index]: !selectedDays[index] })
          }
        />
        <CheckboxLabel htmlFor={`checkbox_${weekday}`}>
          {weekday[0]}
        </CheckboxLabel>
      </li>
    );
  }

  return (
    <Form displayHabitForm={displayHabitForm} onSubmit={handleSubmit}>
      <Input
        required
        type="text"
        placeholder="nome do hábito"
        disabled={isLoading}
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <CheckboxesContainer>
        {dayjs.weekdays().map((weekday, index) => (
          <Checkbox key={weekday} weekday={weekday} index={index} />
        ))}
      </CheckboxesContainer>
      <ButtonsContainer>
        <CancelButton
          type="button"
          disabled={isLoading}
          onClick={() => setDisplayHabitForm(false)}
        >
          Cancelar
        </CancelButton>
        <SubmitButton type="submit">
          {isLoading ? <ThreeDots height="10" color="white" /> : "Salvar"}
        </SubmitButton>
      </ButtonsContainer>
    </Form>
  );
}

const Form = styled.form`
  display: ${(props) => (props.displayHabitForm ? "flex" : "none")};
  flex-direction: column;
  padding: 1.8rem;
  background-color: ${(props) => props.theme.foreground};
  border-radius: 5px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  height: 3.5rem;
  margin-top: 3rem;
`;

const CancelButton = styled.button`
  height: 100%;
  padding: 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.secondary};
  font-size: 1.6rem;

  &:disabled {
    opacity: 70%;
  }
`;

const SubmitButton = styled(StyledSubmitButton)`
  height: 100%;
  width: 9rem;
  font-size: 1.6rem;
`;
