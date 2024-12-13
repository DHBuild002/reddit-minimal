import Header from "../components/Header.js";
import Navbar from "../components/Navbar.js";
import ContentArea from "../components/ContentArea.js";
import FastTravel from "../components/FastTravel.js";
import Interactor from "../components/Interactor.js";

export default function Home() {
  return (
    <>
      <div className="justify-center mx-auto w-full">
        {/* Header for App */}
        <Header />
        {/* Content Area */}
      </div>
      <div className="justify-center h-full relative shadow-md bg-gray-50 p-4">
        {/* FastTravel */}

        {/* Navigation Bar */}
        <div className="justify-start">
          <ContentArea />
          {/* Interactor */}
          <FastTravel />
        </div>
        <Interactor />
        <Navbar />
      </div>
    </>
  );
}
