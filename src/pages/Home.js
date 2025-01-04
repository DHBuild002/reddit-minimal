import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
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
      <div className="auth-btn-container">
        <AuthButton />
      </div>
      {/* Navigation Bar */}
      <div className="justify-center">
        {/* Content Area */}
        <ContentArea />
      </div>
      {/* FastTravel */}
      <Navbar />
    </>
  );
}
