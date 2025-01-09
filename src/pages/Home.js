import Header from "../components/Header.js";
import ContentArea from "../components/ContentArea.js";
import AuthButton from "../components/AuthButton.js";

// CSS Styles
import "../components/styles/home.css";

export default function Home() {
  return (
    <>
      <div className="justify-center">
        {/* Header for App */}
        <Header />
      </div>
      <div className="flex justify-center items-center">
        <AuthButton />
      </div>
      {/* Navigation Bar */}
      <div className="justify-center h-content overflow-y-hidden">
        {/* Content Area */}
        <ContentArea />
      </div>
    </>
  );
}
