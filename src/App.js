import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddAnn from "./components/AddAnn";
import AddTh from "./components/AddTh";
import Transfers from "./components/Transfers"
import CreateTrans from "./components/CreateTrans";

function App() {
  return (
    <Router>
      <div className="flex flex-row border bg-gray-700 rounded-xl m-4 font-display">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-announcement" element={<AddAnn />} />
            <Route path="/add-thanksgiving" element={<AddTh />} />
            <Route path="/create-transfer" element={<CreateTrans />} />
            <Route path="/all-transfers" element={<Transfers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
