import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import {useUserContext} from "./Context/UserContext"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"

function App() {
const context = useUserContext();
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={context.isUserLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={
            context.isUserLoggedIn ? <Navigate to="/" /> : <RegisterPage />
          }
        />
      </Routes>

    </div>
  )
}

export default App
