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
  // const mode = useSelector(selectThemeMode);
  // const dispatch = useDispatch();
  // const { username, accessToken } = useSelector((state) => state.auth);
  // const urlParams = new URLSearchParams(window.location.search);
  // const code = urlParams.get("code");

  // // Auth User account
  // useEffect(() => {
  //   if (code) {
  //     dispatch(
  //       getAccessToken(code).then((action) => {
  //         if (getAccessToken.fulfilled.match(action)) {
  //           fetch("https://oauth.reddit.com/api/v1/me", {
  //             headers: {
  //               Authorization: `Bearer ${action.payload.access_token}`,
  //             },
  //           })
  //             .then((res) => res.json())
  //             .then((data) => dispatch(setUserInfo(data.name)));
  //         }
  //       })
  //     );
  //     window.history.pushState({}, document.title, "/"); //Clear URL
  //   }
  // }, [code, dispatch]);

  // // Update Dark/Light mode
  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", mode);
  // }, [mode]);
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.href.split("#")[0]);
    }
  }, []);
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col h-4/5 hover:overflow w-1/2 mr-0 pb-0 rounded-lg shadow-lg border border-slate-400 relative">
        <Router>
          <div className="flex-grow">
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
