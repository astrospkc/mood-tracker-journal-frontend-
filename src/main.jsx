import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { UserProvider } from "./context/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";
import { JournalProvider } from "./context/JournalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ChakraProvider>
        <JournalProvider>
          <ModalProvider>
            <App className="yusei-magic-regular" />
          </ModalProvider>
        </JournalProvider>
      </ChakraProvider>
    </UserProvider>
  </StrictMode>
);
