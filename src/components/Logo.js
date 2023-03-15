import styled from "styled-components";
import logo from "../assets/logo.svg";

const Logo = styled.img`
  width: auto;
  height: 18rem;
  user-select: none;
  -webkit-user-drag: none;
`;

Logo.defaultProps = { src: logo };

export default Logo;
