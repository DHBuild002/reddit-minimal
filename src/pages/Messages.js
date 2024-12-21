import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <>
      <div className="p-4">
        <p>Unread Messages | Friends</p>

        <div className="p-10 bg-white shadow-md">
          <ul>
            {Messages.map()}
            <li></li>
          </ul>
        </div>

        <h4>
          <Link to="/">Back</Link>
        </h4>
      </div>
    </>
  );
}
