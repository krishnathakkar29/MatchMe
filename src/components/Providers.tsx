import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Providers({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) {
  return (
    <HeroUIProvider>
      {children}
      <ToastContainer hideProgressBar position="bottom-right" />
    </HeroUIProvider>
  );
}

export default Providers;
