import {BrowserRouter, Route, Routes} from "react-router-dom"

import './App.css';
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" name="Home" element={<Layout/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
