import styled, { keyframes } from "styled-components";

const loadingAnimation = keyframes`
  to {
    left: 0;
  }
`;

const HabitLoader = styled.div`
  height: 104px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    width: 200%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -100%;
    z-index: -1;
    background-image: linear-gradient(
      45deg,
      ${(props) => props.theme.selectedDay},
      ${(props) => props.theme.font}
    );

    animation-name: ${loadingAnimation};
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-direction: alternate;
  }
`;

export default HabitLoader;
