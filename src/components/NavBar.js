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
  const progressBarStyles = {
    pathColor: "white",
    trailColor: "transparent",
    textColor: "white",
    textSize: "1.8rem",
    backgroundColor: "transparent",
  };
  const today = useContext(TodayContext);

  return (
    <NavBarContainer>
      <NavBarLink className={navLinkClassName} to="/habitos">
        Hábitos
      </NavBarLink>
      <ProgressBarLink className={navLinkClassName} to="/hoje">
        <CircularProgressbar
          value={today.filter((habit) => habit.done).length}
          maxValue={today.length || 1}
          text="Hoje"
          background={true}
          backgroundPadding={6}
          styles={buildStyles(progressBarStyles)}
        />
      </ProgressBarLink>
      <NavBarLink className={navLinkClassName} to="/historico">
        Histórico
      </NavBarLink>
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
