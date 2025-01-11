import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header.js";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import "./App.css";
import { redditLogin, getAccessToken } from "./app/auth";
import { setUserInfo, logout } from "./state/authSlice";
import { selectThemeMode } from "./state/themeSlice";

function App() {
  const mode = useSelector(selectThemeMode);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.href.split("#")[0]);
    }
  }, []);
  return (
    <div className="iphone-frame">
      <div className="iphone-screen">
        <Router>
          <div className="sticky justify-center items-center">
            {/* Header for App */}
            <Header />
          </div>
          <div className="m-0 w-full">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
          <Navbar />
        </Router>
      </div>
    </div>
  );
}

export default App;
