import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
import ContentArea from "../components/ContentArea.js";
import FastTravel from "../components/FastTravel.js";
import Interactor from "../components/Interactor.js";

export default function Home() {
  return (
    <>
      <div className="justify-center mx-auto">
        {/* Header for App */}
        <Header />
      </div>
      {/* Navigation Bar */}
      <div className="justify-center">
        {/* Interactor */}
        <Interactor />
        {/* Content Area */}
        <ContentArea />
        {/* FastTravel */}
        <FastTravel />
      </div>
      <Navbar />
    </>
  );
}
