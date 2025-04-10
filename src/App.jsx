import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import "./App.css";

import JournalPage from "./components/JournalPage";
import WeekPage from "./components/WeekPage";
import WeekDay from "./components/WeekDay";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";
import WeekAnalysis from "./components/WeekAnalysis";

import { UserContext } from "./context/UserContext";

import Mispage from "./components/Mispage";
import Siderbar from "./components/Siderbar";

function App() {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="relative w-full h-screen flex flex-col">
        <div
          style={{
            backgroundImage: 'url("/images/crushedpaper4.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat, repeat",
            // backgroundColor: "rgb(34, 34, 34)",
            backgroundColor: "black",
            backgroundBlendMode: "luminosity",

            opacity: 0.7, // control background image opacity here
            zIndex: 0,
          }}
          className="absolute inset-0"
        ></div>
        <div className="w-full relative z-10 flex-col min-h-screen overflow-y-scroll flex bg-gradient-to-r  from-black ">
          {/* Persistent Sidebar */}

          {/* <div>
          <Mispage />
        </div> */}

          <div className="flex flex-col w-full h-screen">
            {/* <div className="flex justify-start fixed md:static  bg-black md:bg-transparent z-10  "></div> */}
            <Siderbar />

            {/* Main Content */}
            <div className="flex">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Mispage />} />
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
                    <Route
                      path="/journals/week/:id/day"
                      element={<WeekDay />}
                    />
                    <Route path="/weeklyAnalysis" element={<WeekAnalysis />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
