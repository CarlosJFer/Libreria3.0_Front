import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// createRoot(document.getElementById("root")).render(<App />);
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </AuthProvider>
);
