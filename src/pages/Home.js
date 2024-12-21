import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
import ContentArea from "../components/ContentArea.js";

export default function Home() {
  return (
    <>
      <div className="justify-center">
        {/* Header for App */}
        <Header />
      </div>
      {/* Navigation Bar */}
      <div className="justify-center">
        {/* Interactor */}
        {/* Content Area */}
        <ContentArea />
        {/* FastTravel */}
      </div>
      <Navbar />
    </>
  );
}
