import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./pages/Dashboard";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AdminPage from "./pages/AdminPage";
import UserProjectsPage from "./pages/UserProjectsPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ProposalForm from "./components/ProposalForm";
import ProposalSubmissionPage from "./pages/ProposalSubmissionPage";

const App = () => {
  return (
    <>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Authentication pages */}
          <Route path="" element={<AuthPage />} >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          <Route path="/home" element={<Dashboard />} />
          <Route path="/rsvpconfirm" element={<ProjectDetailsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/createevent" element={<ProposalSubmissionPage />} />
          <Route path="/myevents" element={<UserProjectsPage />} />
          <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
          <Route path="/calendar" element={<ProposalSubmissionPage />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />



    </>
  );
};

export default App;
