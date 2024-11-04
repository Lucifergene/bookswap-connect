import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { ProfilePage } from "./components/Profile";
import { Layout } from "./components/Layout";
import { NoPage } from "./components/NoPage";
import { Spinner } from "./components/Spinner";
import { API_SERVER } from "../const";
import ProtectedRoute from "./components/ProtectedRoute";

export const Context = createContext<any>(null);

export type User = {
  id: number;
  name: string;
  email?: string;
  createDate?: string;
};

function App() {
  const [user, setUser] = useState<User>({ id: 0, name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_SERVER}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          const createDate = new Date(data.createDate);
          setUser({
            id: data.userId,
            name:
              data.username.charAt(0).toUpperCase() + data.username.slice(1),
            email: data.email,
            createDate:
              createDate.toLocaleString("default", { month: "long" }) +
              " " +
              createDate.getDate() +
              ", " +
              createDate.getFullYear(),
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // No token found
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Context.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
