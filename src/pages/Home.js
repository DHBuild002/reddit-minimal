import ContentArea from "../components/ContentArea.js";
import AuthButton from "../components/AuthButton.js";

// CSS Styles
import "../components/styles/home.css";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <AuthButton />
      </div>
      {/* Navigation Bar */}
      <div className="z-0 justify-center h-content overflow-y-hidden">
        {/* Content Area */}
        <ContentArea />
      </div>
    </>
  );
}
