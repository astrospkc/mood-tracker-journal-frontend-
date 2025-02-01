import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "./App.css";

import JournalPage from "./components/JournalPage";
import WeekPage from "./components/WeekPage";
import WeekDay from "./components/WeekDay";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";
import WeekAnalysis from "./components/WeekAnalysis";
import Homepage3 from "./components/Homepage3";
import Siderbar from "./components/Siderbar";
import { UserContext } from "./context/UserContext";
// import Footer from "./components/Footer";
import { BsFillMoonStarsFill } from "react-icons/bs";

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="w-screen  flex-col h-screen bg-slate-900 overflow-y-scroll flex">
        {/* Persistent Sidebar */}
        <div className="flex flex-row items-center text-yellow-400 text-center text-3xl p-5">
          <span className="px-4">LightMind</span>
          <BsFillMoonStarsFill />
        </div>

        <div className="flex overflow-y-hidden">
          <div className="flex justify-start fixed md:static  bg-black md:bg-transparent z-10  ">
            <Siderbar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-scroll">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Homepage3 />} />
              {!isAuthenticated ? (
                <>
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<Signin />} />
                </>
              ) : (
                <>
                  {/* Authenticated Routes */}
                  <Route path="/journals" element={<JournalPage />} />
                  <Route path="/journals/week/:id" element={<WeekPage />} />
                  <Route path="/journals/week/:id/day" element={<WeekDay />} />
                  <Route path="/weeklyAnalysis" element={<WeekAnalysis />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
