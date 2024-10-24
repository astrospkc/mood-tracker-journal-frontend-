import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Homepage from "./components/Homepage";
import JournalPage from "./components/JournalPage";
import WeekPage from "./components/WeekPage";
import { ModalProvider } from "./context/ModalProvider";
import WeekDay from "./components/WeekDay";
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";
import { userContext, UserProvider } from "./context/UserContext";
import { useContext } from "react";

function App() {
  const { isAuthenticated } = useContext(userContext);
  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <>
      <div className="w-screen h-screen bg-yellow-300">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            {isAuthenticated ? (
              <>
                <Route path="/journals" element={<JournalPage />} />
                <Route path="/journals/week" element={<WeekPage />} />
                <Route path="/journals/week/weekday" element={<WeekDay />} />
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
