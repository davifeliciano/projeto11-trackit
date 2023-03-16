import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import FormContainer from "../components/FormContainer";
import Form from "../components/Form";
import Logo from "../components/Logo";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });

  function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("auth/sign-up", form)
      .then((response) => {
        navigate("/");
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
      <Form onSubmit={submitHandler}>
        <Input
          required
          type="email"
          name="email"
          placeholder="email"
          disabled={isLoading}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          data-test="email-input"
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="senha"
          disabled={isLoading}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          data-test="password-input"
        />
        <Input
          required
          type="text"
          name="name"
          placeholder="nome"
          disabled={isLoading}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          data-test="user-name-input"
        />
        <Input
          required
          type="url"
          name="image"
          placeholder="url da imagem"
          disabled={isLoading}
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          data-test="user-image-input"
        />
        <SubmitButton type="submit" disabled={isLoading} data-test="signup-btn">
          {isLoading ? <ThreeDots height="45" color="white" /> : "Cadastrar"}
        </SubmitButton>
      </Form>
      <Link to="/" data-test="login-link">
        Já tem uma conta? Faça login!
      </Link>
    </FormContainer>
  );
}
