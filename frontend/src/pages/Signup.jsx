// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';
// import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Name must be at least 3 characters"),
//   emailId: z.string().email("Invalid Email address"),
//   password: z.string().min(8, "Password must be at least 8 characters")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(signupSchema) });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(registerUser(data));
//   };

//   return (
//     <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-20">
      
//       {/* Local Ambient Glows (Specific to Auth Card) */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      
//       {/* Main Glass Card */}
//       <div className="w-full max-w-md glass-card rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
        
//         {/* Top Decorative Gradient */}
//         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80"></div>

//         <div className="p-8 md:p-10">
          
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 mb-5 shadow-lg shadow-purple-500/10 group">
//               <Sparkles className="w-7 h-7 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
//             </div>
//             <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h2>
//             <p className="text-slate-400 text-sm">Join the elite community of developers.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
//             {/* First Name */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <User className={`h-5 w-5 transition-colors duration-300 ${errors.firstName ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-purple-400'}`} />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all ${errors.firstName ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
//                   {...register('firstName')}
//                 />
//               </div>
//               {errors.firstName && <span className="text-rose-400 text-xs ml-1 font-medium">{errors.firstName.message}</span>}
//             </div>

//             {/* Email */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Mail className={`h-5 w-5 transition-colors duration-300 ${errors.emailId ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-purple-400'}`} />
//                 </div>
//                 <input
//                   type="email"
//                   placeholder="name@example.com"
//                   className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all ${errors.emailId ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
//                   {...register('emailId')}
//                 />
//               </div>
//               {errors.emailId && <span className="text-rose-400 text-xs ml-1 font-medium">{errors.emailId.message}</span>}
//             </div>

//             {/* Password */}
//             <div className="space-y-1.5">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Lock className={`h-5 w-5 transition-colors duration-300 ${errors.password ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-purple-400'}`} />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`w-full bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all ${errors.password ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-purple-400 transition-colors"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {errors.password && <span className="text-rose-400 text-xs ml-1 font-medium">{errors.password.message}</span>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-900/20 hover:shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
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
//                     <span>Creating Account...</span>
//                   </>
//                 ) : (
//                   <>
//                     Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                   </>
//                 )}
//               </span>
//             </button>
//           </form>

//           {/* Footer */}
//           <div className="mt-8 text-center pt-6 border-t border-white/5">
//             <p className="text-slate-400 text-sm">
//               Already have an account?{' '}
//               <NavLink to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors hover:underline decoration-purple-500/30 underline-offset-4">
//                 Log in
//               </NavLink>
//             </p>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { registerUser } from '../authSlice';
// import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

// const signupSchema = z.object({
//   firstName: z.string().min(3, "Name must be at least 3 characters"),
//   emailId: z.string().email("Invalid Email address"),
//   password: z.string().min(8, "Password must be at least 8 characters")
// });

// function Signup() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading } = useSelector((state) => state.auth);

//   const { register, handleSubmit, formState: { errors } } = useForm({ 
//     resolver: zodResolver(signupSchema) 
//   });

//   useEffect(() => {
//     if (isAuthenticated) { navigate('/'); }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => { dispatch(registerUser(data)); };

//   return (
//     <div className="min-h-screen lg:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-20">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      
//       <div className="w-full max-w-md glass-card rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
//         <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80"></div>

//         {/* Reduced padding on mobile (p-6) */}
//         <div className="p-6 md:p-10">
//           <div className="text-center mb-6 md:mb-8">
//             <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 mb-4 md:mb-5">
//               <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
//             </div>
//             <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1 md:mb-2">Create Account</h2>
//             <p className="text-slate-400 text-xs md:text-sm">Join the elite community of developers.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
//             <div className="space-y-1">
//               <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <User className={`h-4 w-4 md:h-5 md:w-5 ${errors.firstName ? 'text-rose-400' : 'text-slate-500'}`} />
//                 </div>
//                 <input type="text" placeholder="John Doe" className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-4 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.firstName ? 'border-rose-500/50' : ''}`} {...register('firstName')} />
//               </div>
//               {errors.firstName && <span className="text-rose-400 text-[10px] ml-1">{errors.firstName.message}</span>}
//             </div>

//             <div className="space-y-1">
//               <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Mail className={`h-4 w-4 md:h-5 md:w-5 ${errors.emailId ? 'text-rose-400' : 'text-slate-500'}`} />
//                 </div>
//                 <input type="email" placeholder="name@example.com" className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-4 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.emailId ? 'border-rose-500/50' : ''}`} {...register('emailId')} />
//               </div>
//               {errors.emailId && <span className="text-rose-400 text-[10px] ml-1">{errors.emailId.message}</span>}
//             </div>

//             <div className="space-y-1">
//               <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
//                   <Lock className={`h-4 w-4 md:h-5 md:w-5 ${errors.password ? 'text-rose-400' : 'text-slate-500'}`} />
//                 </div>
//                 <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-12 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.password ? 'border-rose-500/50' : ''}`} {...register('password')} />
//                 <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
//                 </button>
//               </div>
//               {errors.password && <span className="text-rose-400 text-[10px] ml-1">{errors.password.message}</span>}
//             </div>

//             <button type="submit" disabled={loading} className="group relative w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm md:text-base shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 mt-2">
//               <span className="relative flex items-center justify-center gap-2">
//                 {loading ? "Creating..." : "Sign Up"} <ArrowRight className="w-4 h-4" />
//               </span>
//             </button>
//           </form>

//           <div className="mt-6 text-center pt-4 border-t border-white/5">
//             <p className="text-slate-400 text-xs md:text-sm">
//               Already have an account?{' '}
//               <NavLink to="/login" className="text-purple-400 font-bold hover:underline">Log in</NavLink>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Signup;

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { registerUser, clearAuthError } from '../authSlice'; // Added clearAuthError
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, AlertCircle } from 'lucide-react'; // Added AlertCircle

const signupSchema = z.object({
  firstName: z.string().min(3, "Name must be at least 3 characters"),
  emailId: z.string().email("Invalid Email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(""); // Local state for backend message
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Extract error from Redux
  const { isAuthenticated, loading, error: reduxError } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({ 
    resolver: zodResolver(signupSchema) 
  });

  // Clear errors when the component first loads
  useEffect(() => {
    dispatch(clearAuthError());
    setLocalError("");
  }, [dispatch]);

  // Sync Redux error to local state
  useEffect(() => {
    if (reduxError==="This email is already registered. Please login instead."||reduxError==="Internal Server Error"  || reduxError==="Something went wrong") {
      setLocalError(reduxError);
    }
  }, [reduxError]);

  useEffect(() => {
    if (isAuthenticated) { navigate('/'); }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => { 
    setLocalError(""); // Reset error on new submit
    dispatch(registerUser(data)); 
  };

  // Clear error when user types
  const handleInputChange = () => {
    if (localError) setLocalError("");
  };

  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 relative z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      
      <div className="w-full max-w-md glass-card rounded-2xl relative overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80"></div>

        <div className="p-6 md:p-10">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 mb-4 md:mb-5">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1 md:mb-2">Create Account</h2>
            <p className="text-slate-400 text-xs md:text-sm">Join the elite community of developers.</p>
          </div>

          {/* BACKEND ERROR MESSAGE BOX */}
          {localError && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
              <p className="text-rose-400 text-xs font-medium">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className={`h-4 w-4 md:h-5 md:w-5 ${errors.firstName ? 'text-rose-400' : 'text-slate-500'}`} />
                </div>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-4 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.firstName ? 'border-rose-500/50' : ''}`} 
                  {...register('firstName', { onChange: handleInputChange })} 
                />
              </div>
              {errors.firstName && <span className="text-rose-400 text-[10px] ml-1">{errors.firstName.message}</span>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className={`h-4 w-4 md:h-5 md:w-5 ${errors.emailId ? 'text-rose-400' : 'text-slate-500'}`} />
                </div>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-4 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.emailId ? 'border-rose-500/50' : ''}`} 
                  {...register('emailId', { onChange: handleInputChange })} 
                />
              </div>
              {errors.emailId && <span className="text-rose-400 text-[10px] ml-1">{errors.emailId.message}</span>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 md:h-5 md:w-5 ${errors.password ? 'text-rose-400' : 'text-slate-500'}`} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={`w-full bg-slate-950/50 border border-white/10 text-white text-sm pl-10 md:pl-11 pr-12 py-2.5 md:py-3 rounded-xl focus:outline-none focus:border-purple-500/50 transition-all ${errors.password ? 'border-rose-500/50' : ''}`} 
                  {...register('password', { onChange: handleInputChange })} 
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
                </button>
              </div>
              {errors.password && <span className="text-rose-400 text-[10px] ml-1">{errors.password.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="group relative w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm md:text-base shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              <span className="relative flex items-center justify-center gap-2">
                {loading ? "Creating..." : "Sign Up"} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-white/5">
            <p className="text-slate-400 text-xs md:text-sm">
              Already have an account?{' '}
              <NavLink to="/login" className="text-purple-400 font-bold hover:underline">Log in</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
