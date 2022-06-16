import "./App.css";
import Soal from "./components/Soal/Soal";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";
import Login from "./components/Login/Login";
import Token from "./components/Token/Token";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="">
      <Routes>
        <Route index path="/" element={<Soal />} />
        <Route path="login" element={<Login />} />
        <Route path="token" element={<Token />} />
        <Route path="hasil-ujian">
          <Route index path=":mapel" element={<Result />} />
        </Route>
        <Route path="/dashboard/:id">
          <Route index path="/dashboard/:id/bank-soal" element={<Sidebar />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
