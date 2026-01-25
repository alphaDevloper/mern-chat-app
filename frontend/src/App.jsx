import React from "react";
import useAuthStore from "./store/useAuthStore";
import Button from "./components/ui/button";
import LoginPage from "./pages/LoginPage";
import { Navigate, Route, Routes } from "react-router";
import SignUpPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const { authUser, isLoading } = useAuthStore();
  console.log("auth user is:", authUser);
  console.log("loading is:", isLoading);
  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" /> */}

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

      {/* <Toaster /> */}
    </div>
  );
}

export default App;
