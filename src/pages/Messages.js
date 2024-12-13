import { Link } from "react-router-dom";

export default function Messages() {
  return (
    <>
      <div className="p-4">
        <p>Unread Messages | Friends</p>
        <h4>
          <Link to="/">Back</Link>
        </h4>
      </div>
    </>
  );
}
