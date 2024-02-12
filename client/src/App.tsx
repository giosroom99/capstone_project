import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import NavigationBar from "./components/base/nav";
import ChatComponent from "./components/chat/chatComponent";
import AuthForm from "./components/auth/authForm";

function App() {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  if (userId) {
    return (
      <>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<AuthForm />} />
            <Route path="/chat" element={<ChatComponent />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="*" element={<AuthForm />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
