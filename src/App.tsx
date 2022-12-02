import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Display from "./components/Display";
const App: React.FC = () => {
  return (
    <main className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Display" element={<Display />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

export default App;
