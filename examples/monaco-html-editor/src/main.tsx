import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MonacoHTMLEditor } from "./MonacoHTMLEditor.tsx";
import "./useWorker.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MonacoHTMLEditor />
  </StrictMode>
);
