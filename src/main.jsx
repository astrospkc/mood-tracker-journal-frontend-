import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { UserProvider } from "./context/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";
import { JournalProvider } from "./context/JournalContext.jsx";
import { RefProvider } from "./context/RefProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ChakraProvider>
        <JournalProvider>
          <ModalProvider>
            <RefProvider>
              <App className="yusei-magic-regular" />
            </RefProvider>
          </ModalProvider>
        </JournalProvider>
      </ChakraProvider>
    </UserProvider>
  </StrictMode>
);
