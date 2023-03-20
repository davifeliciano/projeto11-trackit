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
import errorHandler from "../utils/errorHandler";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
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
        setIsLoading(false);
        errorHandler(error);
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
          data-test="email-input"
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="senha"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-test="password-input"
        />
        <SubmitButton type="submit" disabled={isLoading} data-test="login-btn">
          {isLoading ? <ThreeDots height="45" color="white" /> : "Entrar"}
        </SubmitButton>
      </Form>
      <Link to="/cadastro" data-test="signup-link">
        Não tem uma conta? Cadastre-se!
      </Link>
    </FormContainer>
  );
}
