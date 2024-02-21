import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalForm from "./pages/GoalForm";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-goal" element={<GoalForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
