import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  AddAnn,
  Announcements,
  Sidebar,
  Dashboard,
  Home,
  Thanksgivings,
  AddTh,
  Transfers,
  TransferDetails,
  CreateTrans,
  Login,
  SignUp,
  EmailVerify,
  ForgotPassword,
  ResetPassword,
  VerifyEmail
} from "./components";


function AppLayout({ children }) {
  return (
    <div className="flex flex-row border bg-gray-700 rounded-xl m-4 font-poppins">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-100 min-h-screen overflow-y-auto">
      <Router>
        <Routes>
          {/* Routes WITHOUT sidebar */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail email=" " />} />
          <Route path="/verify-email/:email" element={<VerifyEmail />} />
          <Route path="/email/verify" element={<EmailVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password/reset/" element={<ResetPassword />} />


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
            path="/announcements"
            element={
              <AppLayout>
                <Announcements/>
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
            path="/thanksgivings"
            element={
              <AppLayout>
                <Thanksgivings />
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
    </div>
  );
}

export default App;
