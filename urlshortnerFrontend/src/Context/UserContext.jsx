import { createContext, useContext, useState } from "react";
import RegisterPage from "../pages/Register";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

//login function
const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    return { error: "Login failed" };
  }
};

//register function
const registerUser = async (email, password) => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(
      "http://localhost:8000/api/v1/users/register",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    return { error: "Registration failed" };
  }
};

export const UserProvider = (props) => {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isUserLoggedIn, setisUserLoggedIn, loginUser, registerUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
