import { Link } from "react-router-dom";
import "../components/styles/settings.css";

export default function Settings() {
  return (
    <div className="p-4">
      <p>Account Settings</p>
      <div className="ui-mode w-max p-5">
        <h3 className="text-base flex-nowrap p-0">Dark/Light Switcher</h3>
        <ul className="switch-menu">
          <li className="list-item">
            <Link to="/settings"></Link>
          </li>

          <li className="list-item">
            <Link to="/settings"></Link>
          </li>
        </ul>
      </div>

      <h4>
        <Link to="/">Back</Link>
      </h4>
    </div>
  );
}
