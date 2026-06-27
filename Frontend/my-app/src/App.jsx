import { useEffect } from "react";
import Home from "./HOME/Home";

function App() {
  useEffect(() => {
    // Silently ping the backend on load so it wakes up from Render cold start
    // before the user makes their first real request.
    fetch(`${import.meta.env.VITE_BACKEND_API}/health`).catch(() => {});
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
