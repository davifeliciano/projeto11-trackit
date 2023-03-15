import styled from "styled-components";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import Input from "./Input";
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
        <Label htmlFor={`checkbox_${weekday}`}>{weekday[0]}</Label>
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
      <Checkboxes>
        {dayjs.weekdays().map((weekday, index) => (
          <Checkbox key={weekday} weekday={weekday} index={index} />
        ))}
      </Checkboxes>
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

const Checkboxes = styled.ul`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid ${(props) => props.theme.formBorder};
  border-radius: 5px;
  color: ${(props) => props.theme.formBorder};
  font-size: 2rem;
  text-transform: uppercase;
  user-select: none;

  input[type="checkbox"]:checked + & {
    background-color: ${(props) => props.theme.formBorder};
    color: ${(props) => props.theme.foreground};
  }
`;

const CheckboxInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
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
