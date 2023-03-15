import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";

export default function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={setUser} />,
    },
    {
      path: "cadastro",
      element: <Cadastro />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}
