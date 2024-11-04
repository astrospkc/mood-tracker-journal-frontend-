import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage from "./components/Homepage";
import JournalPage from "./components/JournalPage";
import WeekPage from "./components/WeekPage";

import WeekDay from "./components/WeekDay";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";

import { useContext } from "react";
import { UserContext } from "./context/UserContext";

import WeekAnalysis from "./components/WeekAnalysis";

function App() {
  const { isAuthenticated } = useContext(UserContext);
  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <>
      <div className="w-screen h-screen bg-yellow-300 overflow-y-scroll">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {isAuthenticated ? (
              <>
                <Route path="/journals" element={<JournalPage />} />
                <Route path="/journals/week/:id" element={<WeekPage />} />
                <Route path="/journals/week/:id/day" element={<WeekDay />} />
                <Route path="/weeklyAnalysis" element={<WeekAnalysis />} />
                {/* <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<Signin />} /> */}
              </>
            ) : (
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<Signin />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
