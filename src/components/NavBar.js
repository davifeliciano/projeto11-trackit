import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import TodayContext from "../contexts/TodayContext";

function navLinkClassName({ isActive }) {
  return isActive ? "active" : "";
}

export default function NavBar() {
  const today = useContext(TodayContext);
  const progressBarStyles = {
    pathColor: "white",
    trailColor: "transparent",
    textColor: "white",
    textSize: "1.8rem",
    backgroundColor: "transparent",
  };

  return (
    <NavBarContainer data-test="menu">
      <NavBarLinkContainer>
        <NavBarLink
          className={navLinkClassName}
          to="/habitos"
          data-test="habit-link"
        >
          Hábitos
        </NavBarLink>
      </NavBarLinkContainer>
      <ProgressBarLink
        className={navLinkClassName}
        to="/hoje"
        data-test="today-link"
      >
        <CircularProgressbar
          value={today.filter((habit) => habit.done).length}
          maxValue={today.length || 1}
          text="Hoje"
          background={true}
          backgroundPadding={6}
          styles={buildStyles(progressBarStyles)}
        />
      </ProgressBarLink>
      <NavBarLinkContainer>
        <NavBarLink
          className={navLinkClassName}
          to="/historico"
          data-test="history-link"
        >
          Histórico
        </NavBarLink>
      </NavBarLinkContainer>
    </NavBarContainer>
  );
}

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding-inline: 1.8rem;
  height: 7rem;
  background-color: ${(props) => props.theme.foreground};

  && a {
    color: ${(props) => props.theme.secondary};
    font-size: 1.8rem;
  }
`;

const NavBarLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 10rem;
`;

const NavBarLink = styled(NavLink)`
  padding-inline: 1rem;
  border-radius: 1rem;

  &&.active {
    background-color: ${(props) => props.theme.main};
    color: ${(props) => props.theme.foreground};
  }
`;

const ProgressBarLink = styled(NavLink)`
  display: block;
  width: 9rem;
  height: 9rem;
  border-radius: 9rem;
  background-color: ${(props) => props.theme.secondary};
  transform: translateY(-2rem);

  &.active {
    background-color: ${(props) => props.theme.main};
  }
`;
