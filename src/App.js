import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import AddAnn from "./components/AddAnn";
import AddTh from "./components/AddTh";
import Transfers from "./components/Transfers";
import TransferDetails from "./components/TransferDetails";
import CreateTrans from "./components/CreateTrans";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";

function AppLayout({ children }) {
  return (
    <div className="flex flex-row border bg-gray-700 rounded-xl m-4 font-display">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes WITHOUT sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes WITH sidebar */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/add-announcement"
          element={
            <AppLayout>
              <AddAnn />
            </AppLayout>
          }
        />
        <Route
          path="/add-thanksgiving"
          element={
            <AppLayout>
              <AddTh />
            </AppLayout>
          }
        />
        <Route
          path="/transfer/:id"
          element={
            <AppLayout>
              <TransferDetails />
            </AppLayout>
          }
        />
        <Route
          path="/create-transfer"
          element={
            <AppLayout>
              <CreateTrans />
            </AppLayout>
          }
        />
        <Route
          path="/all-transfers"
          element={
            <AppLayout>
              <Transfers />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
