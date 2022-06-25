import "./App.css";
import Soal from "./components/Soal/Ujian";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";
import Login from "./components/Login/Login";
import Token from "./components/Token/Token";
import Sidebar from "./components/Sidebar/Sidebar";
import BankSoal from "./components/Dashboard/BankSoal/BankSoal";
import Bank from "./components/Dashboard/BankSoal/Bank/Bank";
import CreateSoal from "./components/Dashboard/CreateSoal/CreateSoal";
import AddSoal from "./components/Dashboard/CreateSoal/AddSoal/Add";
import CreateUjian from "./components/Dashboard/CreateUjian/CreateUjian";
import ReportUjian from "./components/Dashboard/ReportUjian/ReportUjian";
import ResultTable from "./components/Dashboard/ReportUjian/ResultTable/Result";

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
        <Route path="/guru" element={<Sidebar />}>
          <Route path="bank-soal" element={<BankSoal />} />
          <Route path="bank-soal/:mata-pelajaran" element={<Bank />} />
          <Route path="create-soal" element={<CreateSoal />} />
          <Route path="create-soal/:mata-pelajaran" element={<AddSoal />} />
          <Route path="create-ujian" element={<CreateUjian />} />
          <Route path="report-ujian" element={<ReportUjian />} />
          <Route
            path="report-ujian/:mata-pelajaran"
            element={<ResultTable />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
