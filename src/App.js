import { useState } from "react";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

export default function App() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function checkAuthentication(data) {
    if (data.email === "user@example.com" && data.password === "1Password") {
      setIsAuthenticated(true);
      console.log("Authentication Successful!!!");
      alert("Login Successful");
    } else {
      setIsAuthenticated(false);
      console.log("Authentication Failed!!!");
      alert("Login failed");
    }
  }

  console.log(isAuthenticated);

  return (
    <>
      {
        isAuthenticated === false
          ? <Login 
              formData={formData}
              setFormData={setFormData}
              checkAuthentication={checkAuthentication}
            />
          : <MainPage />
      }
    </> 
  )
}
