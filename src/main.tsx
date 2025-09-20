import "modern-normalize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import ModalFormPage from "./ModalFormPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* app 대신 여기서 생성 */}
    <Toaster
      position={"top-center"}
      toastOptions={{
        className: "sellkit_toast",
        style: {
          color: "#fff",
          fontWeight: "500",
          fontSize: "14px",
          borderRadius: "0.6rem",
          boxShadow: "0rem 1rem 10rem 0rem rgba(0, 0, 0, 0.1)",
          background: "rgba(34, 34, 34, 0.8)",
          lineHeight: "18px",
          padding: "1rem 1.5rem",
          whiteSpace: "nowrap",
          textAlign: "center",
          alignItems: "center",
          gap: "10px",
        },
      }}
    />
    <ModalFormPage />
  </StrictMode>,
);
