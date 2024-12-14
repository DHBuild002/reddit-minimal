import { React } from "react";
import { Link } from "react-router-dom";
import "../components/styles/settings.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../state/themeSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const themeClass = useSelector((state) => state.theme.themeClass);

  return (
    <>
      <div className="p-4">
        <p>Account Settings</p>
        <div className="ui-mode w-max p-5">
          <h3 className="text-base flex-nowrap p-0">Dark/Light Switcher</h3>
          <ul className="switch-menu">
            <li className={themeClass} onClick={() => dispatch(toggleTheme())}>
              <Link to="/settings"></Link>
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
