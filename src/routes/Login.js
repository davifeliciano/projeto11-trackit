import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user !== null) navigate("/hoje");
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const body = { email, password };

    axios
      .post("auth/login", body)
      .then((response) => {
        const user = response.data;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/hoje");
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = `Erro ${error.response.status} : ${error.response.statusText} : ${error.response.data.message}`;
        setIsLoading(false);
        alert(`Algo deu errado! Por favor, tente novamente\n\n${errorMessage}`);
      });
  }

  return (
    <FormContainer>
      <Logo />
      <Form onSubmit={handleSubmit}>
        <Input
          required
          type="email"
          name="email"
          placeholder="email"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="senha"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <ThreeDots height="45" color="white" /> : "Entrar"}
        </SubmitButton>
      </Form>
      <Link to="/cadastro">Não tem uma conta? Cadastre-se!</Link>
    </FormContainer>
  );
}
