import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
    <div className="flex h-screen overflow-y-auto md:w-full sm:w-full sm:items-center sm:justify-center items-center">
      <div className="flex flex-col h-4/5 justify-center items-center hover:overflow mr-0 pb-0 rounded-lg shadow-lg border border-slate-400 relative">
        <Router>
          <div className="max-w-screen-sm w-full flex-grow">
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
