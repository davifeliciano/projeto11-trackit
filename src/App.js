import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TodayContext from "./contexts/TodayContext";
import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import Hoje from "./routes/Hoje";
import Habitos from "./routes/Habitos";
import Historico from "./routes/Historico";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [today, setToday] = useState([]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setUser={setUser} />,
    },
    {
      path: "cadastro",
      element: <Cadastro />,
    },
    {
      path: "hoje",
      element: <Hoje setToday={setToday} />,
    },
    {
      path: "habitos",
      element: <Habitos setToday={setToday} />,
    },
    {
      path: "historico",
      element: <Historico />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <TodayContext.Provider value={today}>
            <RouterProvider router={router} />
          </TodayContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}
