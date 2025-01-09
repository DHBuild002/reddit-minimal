import { React } from "react";
import { Link } from "react-router-dom";
import "../components/styles/settings.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectThemeMode } from "../state/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const themeClass = useSelector((state) => state.theme.themeClass);
  const mode = useSelector(selectThemeMode);

  return (
    <>
      <div className="p-4">
        <p>Account Settings</p>
        <div className="p-5">
          <h3 className="text-base p-0">Dark/Light Switcher</h3>
          <ul className="switch-menu">
            <li className={themeClass} onClick={() => dispatch(toggleTheme())}>
              <span
                className={`material-icons ${
                  mode === "light" ? "icon-light" : "icon-dark"
                }`}
              ></span>
              <span className="ml-2">
                Switch to {mode === "light" ? "Dark" : "Light"} Mode
              </span>
            </li>
          </ul>
        </div>

        <h4>
          <Link to="/">Back</Link>
        </h4>
      </div>
    </>
  );
}
