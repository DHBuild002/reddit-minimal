import ContentArea from "../components/ContentArea.js";
import AuthButton from "../components/AuthButton.js";

// CSS Styles
import "../components/styles/home.css";

export default function Home() {
  return (
    <>
      <div className="flex items-center">
        <AuthButton />
      </div>
      {/* Navigation Bar */}
      <div className="max-h-full justify-start">
        {/* Content Area */}
        <ContentArea />
      </div>
    </>
  );
}
