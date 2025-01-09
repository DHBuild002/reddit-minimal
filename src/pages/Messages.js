import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <>
      <div className="p-3">
        <p>Unread Messages | Friends</p>

        <div className="p-0 bg-white">
          <ul className="p-3">
            <li>User message go here...</li>
          </ul>
        </div>

        <h4>
          <Link to="/">Back</Link>
        </h4>
      </div>
    </>
  );
}
