import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Home";
import WelcomePage from "./assets/Welocome";
import Naivbar from "./Components/Naivbar";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
