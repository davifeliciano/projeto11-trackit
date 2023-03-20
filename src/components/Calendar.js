import styled from "styled-components";
import ReactCalendar from "react-calendar";

export default function Calendar({
  tileClassName,
  onClickDay,
  onChange,
  value,
}) {
  return (
    <CalendarContainer data-test="calendar">
      <StyledCalendar
        tileClassName={tileClassName}
        onClickDay={onClickDay}
        onChange={onChange}
        value={value}
      />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  align-self: center;
`;

const StyledCalendar = styled(ReactCalendar)`
  && {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.foreground};
    font-family: "Lexend Deca", sans-serif;
    font-size: 1.8rem;
  }

  && button.react-calendar__tile {
    padding: 5px;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-clip: content-box;
    background-color: transparent;
    user-select: none;
    position: relative;
  }

  && button.react-calendar__tile:hover {
    background-color: ${(props) => props.theme.selectedDay};
  }

  && button.react-calendar__tile--now {
    border: 2px solid ${(props) => props.theme.main};
    background-color: transparent;
  }

  && button.react-calendar__tile.done {
    background-color: ${(props) => props.theme.done};
  }

  && button.react-calendar__tile.not-done {
    background-color: ${(props) => props.theme.notDone};
  }

  && button.react-calendar__tile:is(.done, .not-done):hover {
    filter: brightness(0.8);
  }

  && button.react-calendar__tile.react-calendar__tile--active {
    color: white;
    z-index: 1;
  }

  && button.react-calendar__tile.react-calendar__tile--active::before {
    content: "";
    width: 2.5rem;
    aspect-ratio: 1 / 1;
    border-radius: 100%;
    background-color: ${(props) => props.theme.main};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  && button.react-calendar__month-view__days__day--weekend {
    color: inherit;
  }

  && button.react-calendar__month-view__days__day--neighboringMonth {
    color: ${(props) => props.theme.font};
  }
`;
