import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import NavigationBar from "./components/base/nav";
import ChatComponent from "./components/chat/chatComponent";
import AuthForm from "./components/auth/authForm";

function App() {
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
}

export default App;
