import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast.success("Login Successful!");
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
    } 

    else {
      setIsAuthenticated(false);
      console.log("Authentication Failed!!!");
      toast.error("Login failed!!!");
    }
  }

  function handleLogOut() {
    setIsAuthenticated(false);
    localStorage.clear();
    console.log("Logged Out");
  }

  console.log("Local Storage", localStorage);

  console.log(isAuthenticated);

  return (
    <>
      {
        isAuthenticated === false && localStorage.length === 0
          ? <Login 
              formData={formData}
              setFormData={setFormData}
              checkAuthentication={checkAuthentication}
            />
          : (
              <MainPage 
                toast={toast}
                ToastContainer={ToastContainer}
                handleLogOut={handleLogOut}
              />
            )
      }

      <ToastContainer />
    </> 
  )
}
