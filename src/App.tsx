import "./App.css";
import UserForm from "./components/others/UserForm";
import ChartDashboard from "./pages/ChartDashboard";
import HomePage from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-chart-dashboard" element={<ChartDashboard />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
