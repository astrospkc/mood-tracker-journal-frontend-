import { StrictMode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "./context/ModalProvider";
import { UserProvider } from "./context/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";
import { JournalProvider } from "./context/JournalContext.jsx";
import { RefProvider } from "./context/RefProvider.jsx";
import CardClickedProvider from "./context/CardClickedProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ChakraProvider>
        <JournalProvider>
          <ModalProvider>
            <RefProvider>
              <CardClickedProvider>
                <App className="yusei-magic-regular" />
              </CardClickedProvider>
            </RefProvider>
          </ModalProvider>
        </JournalProvider>
      </ChakraProvider>
    </UserProvider>
  </StrictMode>
);
