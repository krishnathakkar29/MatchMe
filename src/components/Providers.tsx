import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <ToastContainer hideProgressBar position="bottom-right" />
    </HeroUIProvider>
  );
}

export default Providers;
