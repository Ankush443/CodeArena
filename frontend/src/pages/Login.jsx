// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { loginUser } from "../authSlice";
// import { Mail, Lock, Eye, EyeOff, Terminal, ArrowRight } from 'lucide-react';

// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email address"),
//   password: z.string().min(8, "Password must be at least 8 characters")
// });

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-20">
      
//       {/* Local Ambient Glows (Cyan/Blue Theme) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

//       {/* Main Glass Card */}
//       <div className="w-full max-w-md glass-card rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
        
//         {/* Top Decorative Gradient */}
//         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80"></div>

//         <div className="p-8 md:p-10">
          
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 mb-5 shadow-lg shadow-cyan-500/10 group">
//               <Terminal className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
//             </div>
//             <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
//             <p className="text-slate-400 text-sm">Enter your credentials to access the terminal.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
//             {/* Email Field */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Mail className={`h-5 w-5 transition-colors duration-300 ${errors.emailId ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`} />
//                 </div>
//                 <input
//                   type="email"
//                   placeholder="name@example.com"
//                   className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all ${errors.emailId ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
//                   {...register('emailId')}
//                 />
//               </div>
//               {errors.emailId && (
//                 <span className="text-rose-400 text-xs flex items-center gap-1 ml-1 font-medium">
//                   • {errors.emailId.message}
//                 </span>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Lock className={`h-5 w-5 transition-colors duration-300 ${errors.password ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`} />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all ${errors.password ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-cyan-400 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-rose-400 text-xs flex items-center gap-1 ml-1 font-medium">
//                   • {errors.password.message}
//                 </span>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-900/20 hover:shadow-cyan-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
//             >
//               {/* Button Shine Effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              
//               <span className="relative flex items-center justify-center gap-2">
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Authenticating...</span>
//                   </>
//                 ) : (
//                   <>
//                     Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </span>
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-8 text-center pt-6 border-t border-white/5">
//             <p className="text-slate-400 text-sm">
//               Don't have an account?{' '}
//               <NavLink to="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors hover:underline decoration-cyan-500/30 underline-offset-4">
//                 Create one now
//               </NavLink>
//             </p>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser,clearAuthError } from "../authSlice";
import { Mail, Lock, Eye, EyeOff, Terminal, ArrowRight, AlertCircle } from 'lucide-react'; // Added AlertCircle

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(""); // Local state for backend message
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Extract error from Redux, but we rename it to reduxError
  const { isAuthenticated, loading, error: reduxError } = useSelector((state) => state.auth);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  
useEffect(() => {
    dispatch(clearAuthError());
    setLocalError(""); // Also clear local state
  }, [dispatch]);
  // 1. Sync Redux error to local state (Filter out 'Not authenticated')
  useEffect(() => {
    if (reduxError==="Internal Server Error" || reduxError==="Something went wrong" || reduxError==="Invalid credentials") {
      setLocalError(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    setLocalError(""); // Reset error on new submit
    dispatch(loginUser(data));
  };

  // 2. Clear error when user types
  const handleInputChange = () => {
    if (localError) setLocalError("");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-20">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>

      <div className="w-full max-w-md glass-card rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80"></div>

        <div className="p-8 md:p-10">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 mb-5 shadow-lg shadow-cyan-500/10 group">
              <Terminal className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access the terminal.</p>
          </div>

          {/* BACKEND ERROR MESSAGE */}
          {localError && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
              <p className="text-rose-400 text-xs font-medium">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors duration-300 ${errors.emailId ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all ${errors.emailId ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
                  {...register('emailId', { onChange: handleInputChange })} // Added onChange
                />
              </div>
              {errors.emailId && (
                <span className="text-rose-400 text-xs flex items-center gap-1 ml-1 font-medium">
                  • {errors.emailId.message}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-300 ${errors.password ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-cyan-400'}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all ${errors.password ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
                  {...register('password', { onChange: handleInputChange })} // Added onChange
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-cyan-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <span className="text-rose-400 text-xs flex items-center gap-1 ml-1 font-medium">
                  • {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold shadow-lg shadow-cyan-900/20 hover:shadow-cyan-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-white/5">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <NavLink to="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors hover:underline decoration-cyan-500/30 underline-offset-4">
                Create one now
              </NavLink>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
