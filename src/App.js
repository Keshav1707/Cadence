import Home from "./pages/Home";
import Editorpage from "./pages/Editorpage";
import Login from "./pages/Login";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{ success: { theme: { primary: "#4aed88" } } }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomID" element={<Editorpage />}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
