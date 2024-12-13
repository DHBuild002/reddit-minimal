import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="p-4">
      <p>Account Settings</p>
      <h4>
        <Link to="/">Back</Link>
      </h4>
    </div>
  );
}
