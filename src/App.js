import Home from "./components/Home";
import Editorpage from "./components/Editorpage";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editorpage/" element={<Editorpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
