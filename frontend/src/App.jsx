// import { Routes, Route, Navigate, useLocation } from "react-router";
// import { useEffect, useLayoutEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAuth } from "./authSlice";

// // Pages & Components
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Homepage from "./pages/Homepage";
// import ProblemPage from "./pages/ProblemPage";
// import CursorTrail from "./components/CursorTrail";
// import LandingPage from "./pages/Landing"; // Ensure you have this created from previous steps
// import ChatPage from "./pages/ChatPage"; // New Page

// // Admin Imports
// import Admin from "./pages/Admin";
// import AdminPanel from "./components/AdminPanel";
// import AdminVideo from "./components/AdminVideo";
// import AdminDelete from "./components/AdminDelete";
// import AdminUpload from "./components/AdminUpload";
// import AdminUpdate from "./components/AdminUpdate";
// import NotesPanel from "./components/NotesPanel";

// // Scroll to top wrapper component
// const ScrollToTop = ({ children }) => {
//   const location = useLocation();
//   useLayoutEffect(() => {
//     document.documentElement.scrollTo(0, 0);
//   }, [location.pathname]);
//   return children;
// };

// function App() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   // Loading Screen (Cyberpunk Style)
//   if (loading) {
//     return (
//       <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
//         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
//         {/* Loading Spinner & Text */}
//         <div className="relative flex flex-col items-center z-10">
//           <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_30px_rgba(6,182,212,0.2)]"></div>
//           <div className="mt-6 flex flex-col items-center gap-1">
//             <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] animate-pulse font-bold">SYSTEM INITIALIZING</p>
//             <div className="flex gap-1 mt-2">
//               <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
//               <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
//               <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans relative overflow-x-hidden">
      
//       {/* --- Global Background Architecture --- */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         {/* Grainy Noise Texture (High-end feel) */}
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
//         {/* Ambient Spotlights (Subtle colors) */}
//         <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-cyan-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
//       </div>
      
//       {/* Interactive Elements */}
//       <CursorTrail />
      
//       {/* Main Content Area */}
//       <div className="relative z-10">
//         <ScrollToTop>
//           <Routes>
//             {/* Public/Auth Routes */}
//             {/* If authenticated show Homepage, else show LandingPage */}
//             <Route path="/" element={isAuthenticated ? <Homepage /> : <LandingPage />} />
            
//             <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
//             <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
//             <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
            
//             {/* Admin Routes (Protected) */}
//             <Route path="/admin">
//               <Route index element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
//               <Route path="create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
//               <Route path="update" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate /> : <Navigate to="/" />} />
//               <Route path="delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
//               <Route path="video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
//               <Route path="upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
//             </Route>
            
//             {/* Problem Routes */}
//             <Route path="/problem/:problemId" element={<ProblemPage />} />
//             <Route path="/problem/:problemId/notes" element={<NotesPanel />} />
            
//             {/* Fallback Route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </ScrollToTop>
//       </div>
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate, useLocation } from "react-router";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";

// Pages & Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import ProblemPage from "./pages/ProblemPage";
import CursorTrail from "./components/CursorTrail";
import LandingPage from "./pages/Landing"; // Ensure you have this created from previous steps
import ChatPage from "./pages/ChatPage"; // New Page

// Admin Imports
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import AdminVideo from "./components/AdminVideo";
import AdminDelete from "./components/AdminDelete";
import AdminUpload from "./components/AdminUpload";
import AdminUpdate from "./components/AdminUpdate";
import NotesPanel from "./components/NotesPanel";

// Scroll to top wrapper component
const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const dispatch = useDispatch();
  const location= useLocation();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Loading Screen (Cyberpunk Style)
  if (loading && location.pathname != "/") {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Loading Spinner & Text */}
        <div className="relative flex flex-col items-center z-10">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin shadow-[0_0_30px_rgba(6,182,212,0.2)]"></div>
          <div className="mt-6 flex flex-col items-center gap-1">
            <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] animate-pulse font-bold">SYSTEM INITIALIZING</p>
            <div className="flex gap-1 mt-2">
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans relative overflow-x-hidden">
      
      {/* --- Global Background Architecture --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grainy Noise Texture (High-end feel) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Ambient Spotlights (Subtle colors) */}
        <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-cyan-500/5 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
      </div>
      
      {/* Interactive Elements */}
      <CursorTrail />
      
      {/* Main Content Area */}
      <div className="relative z-10">
        <ScrollToTop>
          <Routes>
            {/* Public/Auth Routes */}
            {/* If authenticated show Homepage, else show LandingPage */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
            <Route
              path="/home"
              element={
                isAuthenticated ? <Homepage /> : <Navigate to="/" />
              }
            />
            
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
            <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
            
            {/* Admin Routes (Protected) */}
            <Route path="/admin">
              <Route index element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/home" />} />
              <Route path="create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/home" />} />
              <Route path="update" element={isAuthenticated && user?.role === 'admin' ? <AdminUpdate /> : <Navigate to="/home" />} />
              <Route path="delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/home" />} />
              <Route path="video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/home" />} />
              <Route path="upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/home" />} />
            </Route>
            
            {/* Problem Routes */}
          <Route path="/problem/:problemId" element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" />} />
            <Route path="/problem/:problemId/notes" element={isAuthenticated ? <NotesPanel /> : <Navigate to="/login" />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScrollToTop>
      </div>
    </div>
  );
}

export default App;
