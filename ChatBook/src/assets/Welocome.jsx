import { useNavigate } from "react-router-dom";
import Naivbar from "../Components/Naivbar";
export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Naivbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl text-center relative">
          {/* Profile Image */}
          <img
            src="https://companion.scaler.com/_next/static/media/Biglogo.ed5972f5.svg"
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto -mt-16 sm:-mt-20 object-cover "
          />

          {/* Welcome Message */}
          <p className="text-gray-500 mt-4 text-lg sm:text-xl md:text-2xl font-sans">
            Hello! Nice to see you here! By pressing the "Start chat" button,
            you agree to have your personal data processed as described in our
            <a href="#" className="text-blue-500">
              {" "}
              Privacy Policy
            </a>
            .
          </p>

          {/* Start Chat Button */}
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 text-white px-6 py-3 sm:py-4 rounded-lg mt-6 w-full hover:bg-blue-700 text-lg sm:text-2xl font-sans"
          >
            Start chat
          </button>
        </div>
      </div>
    </>
  );
}
