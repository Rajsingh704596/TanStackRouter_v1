import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import router from "./router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

//! Tanstack Router provide routing like-
// File Based Routing
// Dynamic Routing
// Nested Routing
// Data Loading
// Search Params
// Path Params
// Code Spliting
// Not Found Errors
