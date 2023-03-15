import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const user = useContext(UserContext);
  return (
    <HeaderContainer>
      <h1>Trackit</h1>
      {user ? (
        <img src={user.image} alt={`Imagem de Perfil de ${user.name}`} />
      ) : null}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1.8rem;
  height: 7rem;
  background-color: ${(props) => props.theme.main};
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.15));

  & h1 {
    font-family: "Playball", cursive;
    font-size: 4rem;
    font-weight: 400;
    color: white;
  }

  & img {
    height: 5rem;
    width: 5rem;
    object-fit: cover;
    border-radius: 5rem;
    user-select: none;
    -webkit-user-drag: none;
  }
`;
