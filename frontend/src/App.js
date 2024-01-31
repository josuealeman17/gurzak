import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Form from "./pages/Form";
import './index.css'

function App() {
  return (
    <div className="App">

  
      <Form />
      <Home />

      {/*       <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Form />} />
          </Routes>
        </div>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
