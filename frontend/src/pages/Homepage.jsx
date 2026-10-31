// import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';
// import { 
//   LogOut, Code2, Zap, Activity, Filter, CheckCircle2, Play, Search, ArrowRight,
//   User as UserIcon, ShieldAlert, Flame, Calendar, Hash, BarChart3, Sparkles,
//   Bell, ChevronDown, Settings, CreditCard
// } from 'lucide-react';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     status: 'all' 
//   });

//   // Time-based greeting
//   const hour = new Date().getHours();
//   const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

//   // OPTIMIZATION 1: Throttled scroll handler with RAF
//   const scrollRef = useRef(false);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollRef.current) return;
//       scrollRef.current = true;

//       rafRef.current = requestAnimationFrame(() => {
//         const scrolled = window.scrollY > 10;
//         setIsScrolled(scrolled);
//         scrollRef.current = false;
//       });
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [probRes, solvedRes] = await Promise.all([
//           axiosClient.get('/problem/getAllProblem'),
//           user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
//         ]);
//         setProblems(probRes.data);
//         setSolvedProblems(solvedRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleLogout = useCallback(() => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   }, [dispatch]);

//   // OPTIMIZATION 2: Memoized filtering
//   const filteredProblems = useMemo(() => {
//     return problems.filter(problem => {
//       const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//       const tagMatch = activeCategory === 'all' || problem.tags === activeCategory;
      
//       const isSolved = solvedProblems.some(sp => sp._id === problem._id);
//       const statusMatch = filters.status === 'all' || 
//                         (filters.status === 'solved' ? isSolved : !isSolved);
      
//       const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      
//       return difficultyMatch && tagMatch && statusMatch && searchMatch;
//     });
//   }, [problems, solvedProblems, filters, activeCategory, searchTerm]);

//   const progressPercentage = useMemo(() => {
//     return problems.length > 0 
//       ? Math.round((solvedProblems.length / problems.length) * 100) 
//       : 0;
//   }, [problems.length, solvedProblems.length]);

//   // OPTIMIZATION 3: Memoize solved problem lookup for better performance
//   const solvedProblemIds = useMemo(() => {
//     return new Set(solvedProblems.map(sp => sp._id));
//   }, [solvedProblems]);

//   const categories = useMemo(() => [
//     { id: 'all', label: 'All Topics' },
//     { id: 'array', label: 'Arrays' },
//     { id: 'dp', label: 'Dynamic Programming' },
//     { id: 'graph', label: 'Graphs' },
//     { id: 'linkedList', label: 'Linked Lists' },
//     { id: 'tree', label: 'Trees' },
//     { id: 'string', label: 'Strings' }
//   ], []);

//   // OPTIMIZATION 4: Debounced search input
//   const searchTimeoutRef = useRef(null);
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value;
//     if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     searchTimeoutRef.current = setTimeout(() => {
//       setSearchTerm(value);
//     }, 150);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      
//       {/* OPTIMIZATION 5: Static backgrounds with will-change removed, using transform-gpu */}
//       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] opacity-70"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px] opacity-70"></div>
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
//       </div>

//       {/* Navbar - OPTIMIZATION 6: Simplified transition */}
//       <nav 
//         className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
//           isScrolled 
//             ? 'bg-[#020617]/90 backdrop-blur-xl border-white/5 shadow-2xl shadow-black/50' 
//             : 'bg-transparent border-transparent'
//         }`}
//       >
//         <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
//           {/* Left: Logo */}
//           <div className="flex items-center gap-8">
//             <NavLink to="/" className="flex items-center gap-3 group">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//                 <div className="relative w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-lg flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors duration-200">
//                   <Code2 className="w-5 h-5 text-cyan-400" />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-lg font-bold tracking-tight text-white leading-none">
//                   CodeArena
//                 </span>
//                 <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-500 font-bold mt-0.5">
//                   Premium
//                 </span>
//               </div>
//             </NavLink>

//             {/* Center: Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-1">
//                   {['Explore', 'Problems', 'Contest', 'Discuss', 'Messages'].map((item) => ( // Added 'Messages'
//                 <NavLink 
//                     key={item}
//                     to={item === 'Messages' ? '/chat' : '/'} // Add navigation logic
//                          className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                           item === 'Messages' && isActive // Optional: highlight if on chat page
//                               ? 'text-white bg-white/5' 
//                               : 'text-slate-400 hover:text-white hover:bg-white/5'}`} >{item}
//     </NavLink>
//   ))}
// </div>
//           </div>

//           {/* Right: Actions */}
//           <div className="flex items-center gap-4">
//             {/* Search Trigger */}
//             <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-slate-900/50 text-slate-400 text-xs hover:border-white/20 transition-colors duration-150 group">
//               <Search className="w-3.5 h-3.5 group-hover:text-cyan-400 transition-colors duration-150" />
//               <span>Search</span>
//               <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-slate-500">⌘K</span>
//             </button>

//             {/* Streak */}
//             <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full group cursor-pointer hover:bg-orange-500/20 transition-colors duration-150">
//               <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
//               <span className="text-xs font-bold text-orange-400 group-hover:text-orange-300">12</span>
//             </div>

//             {/* Notification */}
//             <button className="relative p-2 text-slate-400 hover:text-white transition-colors duration-150 rounded-full hover:bg-white/5">
//               <Bell className="w-5 h-5" />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]"></span>
//             </button>

//             {/* User Profile */}
//             <div className="dropdown dropdown-end">
//               <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors duration-150 group">
//                 <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-150">
//                   {user?.firstName?.charAt(0).toUpperCase()}
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors duration-150" />
//               </button>
              
//               <ul className="mt-4 p-2 shadow-2xl shadow-black/50 menu menu-sm dropdown-content bg-[#0B1121] border border-white/10 rounded-2xl w-64 z-[100]">
//                 <li className="px-2 py-3 mb-2 border-b border-white/5">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
//                       {user?.firstName?.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-bold text-white text-sm">{user?.firstName}</span>
//                       <span className="text-xs text-slate-400 truncate w-32">{user?.emailId}</span>
//                     </div>
//                   </div>
//                 </li>
//                 <li><NavLink to="/profile" className="flex gap-3 text-slate-300 hover:text-white"><UserIcon className="w-4 h-4" /> Profile</NavLink></li>
//                 <li><NavLink to="/subscription" className="flex gap-3 text-slate-300 hover:text-white"><CreditCard className="w-4 h-4" /> Subscription</NavLink></li>
//                 <li><NavLink to="/settings" className="flex gap-3 text-slate-300 hover:text-white"><Settings className="w-4 h-4" /> Settings</NavLink></li>
//                 {user?.role === 'admin' && (
//                   <li><NavLink to="/admin" className="flex gap-3 text-purple-400 hover:bg-purple-500/10"><ShieldAlert className="w-4 h-4" /> Admin Console</NavLink></li>
//                 )}
//                 <div className="h-px bg-white/5 my-1"></div>
//                 <li><button onClick={handleLogout} className="flex gap-3 text-red-400 hover:bg-red-500/10"><LogOut className="w-4 h-4" /> Sign Out</button></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Dashboard */}
//       <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl relative z-10">
        
//         {/* Welcome Section */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//               {greeting}, {user?.firstName}
//             </h1>
//             <p className="text-slate-400 flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
//               You've solved <span className="text-white font-bold">{solvedProblems.length}</span> problems.
//             </p>
//           </div>
          
//           {/* Quick Stats */}
//           <div className="flex gap-3 p-1.5 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-xl shadow-xl">
//              <div className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-150 text-center cursor-pointer min-w-[80px]">
//                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Rank</p>
//                <p className="text-sm font-bold text-white">#12,403</p>
//              </div>
//              <div className="w-px bg-white/5 my-1"></div>
//              <div className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-150 text-center cursor-pointer min-w-[80px]">
//                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Points</p>
//                <p className="text-sm font-bold text-cyan-400">850</p>
//              </div>
//           </div>
//         </div>

//         {/* Featured & Stats Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
//           {/* Daily Challenge */}
//           <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/20 p-8 flex flex-col justify-between min-h-[240px] shadow-2xl shadow-indigo-900/10 transition-all duration-200 hover:border-indigo-500/30">
//             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
//               <Zap className="w-48 h-48 text-indigo-400 rotate-12" />
//             </div>

//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 mb-4 shadow-lg shadow-indigo-500/10">
//                 <Sparkles className="w-3 h-3" /> Daily Challenge
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 max-w-lg leading-tight">
//                 Find the Longest Substring Without Repeating Characters
//               </h2>
//               <div className="flex items-center gap-3 mb-8">
//                 <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Medium</span>
//                 <span className="text-slate-400 text-sm font-medium">Strings & Arrays</span>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-wrap items-center gap-4">
//               <button className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-50 transition-all duration-150 active:scale-95 flex items-center gap-2 shadow-xl shadow-indigo-500/20">
//                 <Play className="w-4 h-4 fill-current" /> Solve Challenge
//               </button>
//               <div className="flex items-center gap-2 text-sm text-indigo-200/70 font-medium px-4 py-2 rounded-xl bg-indigo-900/20 border border-indigo-500/10">
//                 <span>+15 Points</span>
//                 <span className="w-px h-3 bg-indigo-500/30"></span>
//                 <span>Expires in 14h</span>
//               </div>
//             </div>
//           </div>

//           {/* Progress Card - OPTIMIZATION 7: Simplified SVG */}
//           <div className="glass-card rounded-3xl p-8 border border-white/5 bg-slate-900/60 flex flex-col justify-center relative overflow-hidden">
//             <div className="flex items-center justify-between mb-8 relative z-10">
//                <h3 className="font-bold text-white flex items-center gap-2 text-lg">
//                  <Activity className="w-5 h-5 text-emerald-400" /> Your Progress
//                </h3>
//                <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">Top 15%</span>
//             </div>
            
//             <div className="relative w-40 h-40 mx-auto mb-8 z-10">
//                <svg className="w-full h-full -rotate-90 transform transition-transform duration-300 hover:scale-105">
//                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
//                  <circle 
//                    cx="80" cy="80" r="70" 
//                    stroke="currentColor" strokeWidth="10" 
//                    fill="transparent" 
//                    strokeDasharray={440}
//                    strokeDashoffset={440 - (440 * progressPercentage) / 100}
//                    className="text-emerald-500 transition-all duration-700 ease-out"
//                    strokeLinecap="round"
//                  />
//                </svg>
//                <div className="absolute inset-0 flex flex-col items-center justify-center">
//                  <span className="text-4xl font-bold text-white tracking-tight">{progressPercentage}%</span>
//                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Completed</span>
//                </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 text-center relative z-10">
//               <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
//                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total</p>
//                 <p className="text-xl font-bold text-white">{problems.length}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/10">
//                 <p className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-wider mb-1">Solved</p>
//                 <p className="text-xl font-bold text-emerald-400">{solvedProblems.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
          
//           {/* Filters Sidebar */}
//           <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
//              <div className="relative group">
//                 <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative bg-slate-900 border border-white/10 rounded-xl flex items-center overflow-hidden transition-colors duration-200 group-focus-within:border-cyan-500/50">
//                   <Search className="w-4 h-4 text-slate-500 ml-4" />
//                   <input 
//                     type="text" 
//                     placeholder="Search problems..." 
//                     className="w-full bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-500 py-3.5 px-3"
//                     defaultValue={searchTerm}
//                     onChange={handleSearchChange}
//                   />
//                 </div>
//              </div>

//              <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/60 shadow-xl">
//                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
//                   <Filter className="w-3.5 h-3.5" /> Filters
//                 </h3>
                
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <label className="text-xs font-bold text-slate-300 uppercase tracking-wide ml-1">Status</label>
//                     <div className="flex flex-col gap-1">
//                       {['all', 'solved', 'unsolved'].map(status => (
//                         <button
//                           key={status}
//                           onClick={() => setFilters({...filters, status})}
//                           className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
//                             filters.status === status 
//                             ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium' 
//                             : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
//                           }`}
//                         >
//                           <span className="capitalize">{status}</span>
//                           {filters.status === status && <CheckCircle2 className="w-3.5 h-3.5" />}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="w-full h-px bg-white/5"></div>

//                   <div className="space-y-3">
//                     <label className="text-xs font-bold text-slate-300 uppercase tracking-wide ml-1">Difficulty</label>
//                     <div className="flex flex-col gap-1">
//                        {['all', 'easy', 'medium', 'hard'].map(diff => (
//                          <button
//                            key={diff}
//                            onClick={() => setFilters({...filters, difficulty: diff})}
//                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
//                              filters.difficulty === diff 
//                              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium' 
//                              : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
//                            }`}
//                          >
//                            <span className="capitalize">{diff}</span>
//                            {filters.difficulty === diff && <CheckCircle2 className="w-3.5 h-3.5" />}
//                          </button>
//                        ))}
//                     </div>
//                   </div>
//                 </div>
//              </div>
//           </aside>

//           {/* Problem Feed - OPTIMIZATION 8: Virtualization-ready structure */}
//           <main className="flex-1 min-w-0">
            
//             <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar mask-gradient">
//               {categories.map(cat => (
//                 <button
//                   key={cat.id}
//                   onClick={() => setActiveCategory(cat.id)}
//                   className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
//                     activeCategory === cat.id 
//                     ? 'bg-white text-slate-900 border-white shadow-lg shadow-white/20 scale-105' 
//                     : 'bg-slate-900/50 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
//                   }`}
//                 >
//                   {cat.label}
//                 </button>
//               ))}
//             </div>

//             <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden min-h-[500px] shadow-2xl">
              
//               <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-slate-950/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
//                 <div className="col-span-1 text-center">Status</div>
//                 <div className="col-span-6 md:col-span-5">Problem</div>
//                 <div className="col-span-2 hidden md:block">Difficulty</div>
//                 <div className="col-span-2 hidden md:block">Acceptance</div>
//                 <div className="col-span-5 md:col-span-2 text-right">Action</div>
//               </div>

//               {/* OPTIMIZATION 9: Removed staggered animations, simplified rendering */}
//               <div className="divide-y divide-white/5">
//                 {filteredProblems.length > 0 ? (
//                   filteredProblems.map((problem) => {
//                     const isSolved = solvedProblemIds.has(problem._id);
                    
//                     return (
//                       <ProblemRow 
//                         key={problem._id}
//                         problem={problem}
//                         isSolved={isSolved}
//                       />
//                     );
//                   })
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-24 text-center">
//                     <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 border border-white/5 rotate-3 hover:rotate-6 transition-transform duration-200 shadow-2xl">
//                       <BarChart3 className="w-8 h-8 text-slate-600" />
//                     </div>
//                     <h3 className="text-xl font-bold text-white mb-2">No problems found</h3>
//                     <p className="text-slate-400 max-w-xs mx-auto mb-6">We couldn't find any problems matching your current filters.</p>
//                     <button 
//                       onClick={() => {
//                         setFilters({ difficulty: 'all', status: 'all' });
//                         setActiveCategory('all');
//                         setSearchTerm('');
//                       }}
//                       className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors duration-150 shadow-lg shadow-cyan-500/20"
//                     >
//                       Clear Filters
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// // OPTIMIZATION 10: Memoized problem row component
// const ProblemRow = React.memo(({ problem, isSolved }) => {
//   return (
//     <div className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors duration-150 relative">
//       <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-150 origin-left"></div>

//       <div className="col-span-1 flex justify-center">
//         {isSolved ? (
//           <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
//             <CheckCircle2 className="w-4 h-4 text-green-500" />
//           </div>
//         ) : (
//           <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:border-slate-500 transition-colors duration-150">
//             <Hash className="w-3 h-3 text-slate-500" />
//           </div>
//         )}
//       </div>

//       <div className="col-span-6 md:col-span-5">
//         <NavLink 
//           to={`/problem/${problem._id}`}
//           className="text-base font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors duration-150 line-clamp-1"
//         >
//           {problem.title}
//         </NavLink>
//         <div className="flex items-center gap-2 mt-1 md:hidden">
//           <DifficultyBadge level={problem.difficulty} />
//         </div>
//       </div>

//       <div className="col-span-2 hidden md:block">
//         <DifficultyBadge level={problem.difficulty} />
//       </div>

//       <div className="col-span-2 hidden md:block">
//         <div className="flex items-center gap-3">
//           <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
//             <div className="h-full bg-slate-500" style={{ width: '68%' }}></div>
//           </div>
//           <span className="text-xs text-slate-400 font-mono">68%</span>
//         </div>
//       </div>

//       <div className="col-span-5 md:col-span-2 flex justify-end">
//         <NavLink 
//           to={`/problem/${problem._id}`}
//           className="px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-400 text-sm font-medium transition-all duration-150 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 flex items-center gap-2"
//         >
//           Solve <ArrowRight className="w-3.5 h-3.5" />
//         </NavLink>
//       </div>
//     </div>
//   );
// });

// ProblemRow.displayName = 'ProblemRow';

// // OPTIMIZATION 11: Memoized DifficultyBadge
// const DifficultyBadge = React.memo(({ level }) => {
//   const styles = {
//     easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 shadow-[0_0_10px_rgba(52,211,153,0.1)]',
//     medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]',
//     hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20 shadow-[0_0_10px_rgba(251,113,133,0.1)]',
//     default: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
//   };

//   const key = level?.toLowerCase() || 'default';
  
//   return (
//     <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${styles[key]}`}>
//       {level ? level.charAt(0).toUpperCase() + level.slice(1) : 'Unknown'}
//     </span>
//   );
// });

// DifficultyBadge.displayName = 'DifficultyBadge';

// export default Homepage;


// import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
// import { NavLink } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';
// import { 
//   LogOut, Code2, Zap, Activity, Filter, CheckCircle2, Play, Search, ArrowRight,
//   ShieldAlert, Flame, Hash, BarChart3, Sparkles,
//   Bell, ChevronDown, Swords, Clock, Target
// } from 'lucide-react';

// const MOTIVATIONAL_QUOTES = [
//   "God won’t write your code, but He’ll give you the strength to keep going.",
//   "Your time will come—just make sure you’re ready when it does.",
//   "God helps those who actually code, not those who just plan.",
//    "Late nights, bugs, failures—this is how your time is built.",
//   "You don’t learn to code by watching—you learn by building.",
//   "Every bug you fix makes you a better developer.",
//   "The best programmers are not born—they debug their way there.",
//   "Consistency in coding beats talent every single time.",
//   "Your future self is built by the code you write today.",
//   "Don’t fear errors—they are proof you are trying.",
//   "Small commits today create big systems tomorrow."
 
// ];

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [filters, setFilters] = useState({ difficulty: 'all', status: 'all' });
  
//   // New States for requested features
//   const [quoteIndex, setQuoteIndex] = useState(0);
//   const [displayedQuote, setDisplayedQuote] = useState('');
//   const [sessionSeconds, setSessionSeconds] = useState(0);

//   const hour = new Date().getHours();
//   const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

//   // --- TYPING EFFECT LOGIC ---
//   useEffect(() => {
//     let i = 0;
//     const fullText = MOTIVATIONAL_QUOTES[quoteIndex];
//     setDisplayedQuote('');
    
//     const typingInterval = setInterval(() => {
//       setDisplayedQuote(fullText.slice(0, i + 1));
//       i++;
//       if (i >= fullText.length) clearInterval(typingInterval);
//     }, 50);

//     const switchTimeout = setTimeout(() => {
//       setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
//     }, 7000);

//     return () => {
//       clearInterval(typingInterval);
//       clearTimeout(switchTimeout);
//     };
//   }, [quoteIndex]);

//   // --- SESSION TRACKER LOGIC ---
//   useEffect(() => {
//     const timer = setInterval(() => setSessionSeconds(s => s + 1), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatSessionTime = (s) => {
//     const mins = Math.floor(s / 60);
//     const secs = s % 60;
//     return `${mins}m ${secs}s`;
//   };

//   // --- ORIGINAL OPTIMIZATIONS PRESERVED ---
//   const scrollRef = useRef(false);
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (scrollRef.current) return;
//       scrollRef.current = true;
//       rafRef.current = requestAnimationFrame(() => {
//         setIsScrolled(window.scrollY > 10);
//         scrollRef.current = false;
//       });
//     };
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [probRes, solvedRes] = await Promise.all([
//           axiosClient.get('/problem/getAllProblem'),
//           user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
//         ]);
//         setProblems(probRes.data);
//         setSolvedProblems(solvedRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleLogout = useCallback(() => {
//     dispatch(logoutUser());
//     setSolvedProblems([]);
//   }, [dispatch]);

//   const solvedProblemIds = useMemo(() => new Set(solvedProblems.map(sp => sp._id)), [solvedProblems]);

//   const filteredProblems = useMemo(() => {
//     return problems.filter(problem => {
//       const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//       const tagMatch = activeCategory === 'all' || problem.tags === activeCategory;
//       const isSolved = solvedProblemIds.has(problem._id);
//       const statusMatch = filters.status === 'all' || (filters.status === 'solved' ? isSolved : !isSolved);
//       const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
//       return difficultyMatch && tagMatch && statusMatch && searchMatch;
//     });
//   }, [problems, solvedProblemIds, filters, activeCategory, searchTerm]);

//   const progressPercentage = useMemo(() => {
//     return problems.length > 0 ? Math.round((solvedProblems.length / problems.length) * 100) : 0;
//   }, [problems.length, solvedProblems.length]);

//   const categories = useMemo(() => [
//     { id: 'all', label: 'All Topics' },
//     { id: 'array', label: 'Arrays' },
//     { id: 'dp', label: 'Dynamic Programming' },
//     { id: 'graph', label: 'Graphs' },
//     { id: 'linkedList', label: 'Linked Lists' },
//     { id: 'tree', label: 'Trees' },
//     { id: 'string', label: 'Strings' },
//     { id: 'math', label: 'Math' },
//     { id: 'logic', label: 'Logic' }

//   ], []);

//   const searchTimeoutRef = useRef(null);
//   const handleSearchChange = useCallback((e) => {
//     const value = e.target.value;
//     if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
//     searchTimeoutRef.current = setTimeout(() => setSearchTerm(value), 150);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      
//       {/* Background Gradients */}
//       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px] opacity-70"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px] opacity-70"></div>
//       </div>

//       {/* Navbar */}
//       <nav className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${isScrolled ? 'bg-[#020617]/90 backdrop-blur-xl border-white/5 shadow-2xl' : 'bg-transparent border-transparent'}`}>
//         <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
//           <div className="flex items-center gap-8">
//             <NavLink to="/" className="flex items-center gap-3 group">
//               <div className="relative w-9 h-9 bg-slate-800 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
//                 <Code2 className="w-5 h-5 text-cyan-400" />
//               </div>
//               <span className="text-lg font-bold text-white hidden sm:block tracking-tight">CodeArena</span>
//             </NavLink>

//             {/* Cleaned Nav Links */}
//             <div className="hidden md:flex items-center gap-1">
//               <NavLink to="/chat" className={({ isActive }) => `px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
//                 Messages
//               </NavLink>
//               <div className="px-4 py-2 rounded-full text-sm font-medium text-slate-500 flex items-center gap-2 cursor-default">
//                 <Swords className="w-4 h-4" /> Battle <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-1.5 py-0.5 rounded border border-cyan-500/20 font-bold">SOON</span>
//               </div>
//             </div>
//           </div>

//           {/* Unique Navbar Centerpiece (Utilizing space) */}
//           <div className="hidden lg:flex items-center gap-6 px-6 py-1.5 bg-slate-900/50 border border-white/5 rounded-full">
//             <div className="flex items-center gap-2">
//               <Clock className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
//               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Session: <span className="text-white font-mono">{formatSessionTime(sessionSeconds)}</span></span>
//             </div>
//             <div className="w-px h-3 bg-white/10"></div>
//             <div className="flex items-center gap-2">
//               <Target className="w-3.5 h-3.5 text-emerald-500" />
//               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solved: <span className="text-white">{solvedProblems.length}</span></span>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="dropdown dropdown-end">
//               <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
//                 <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-cyan-500/20">
//                   {user?.firstName?.charAt(0).toUpperCase()}
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
//               </button>
              
//               <ul className="mt-4 p-2 shadow-2xl menu menu-sm dropdown-content bg-[#0B1121] border border-white/10 rounded-2xl w-64 z-[100]">
//                 <li className="px-2 py-3 mb-2 border-b border-white/5">
//                   <div className="flex flex-col">
//                     <span className="font-bold text-white text-sm">{user?.firstName}</span>
//                     <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-tight mt-1 italic">Subscription: Coming Soon</span>
//                   </div>
//                 </li>
//                 {user?.role === 'admin' && (
//                   <li><NavLink to="/admin" className="flex gap-3 text-purple-400 hover:bg-purple-500/10 py-2"><ShieldAlert className="w-4 h-4" /> Admin Console</NavLink></li>
//                 )}
//                 <div className="h-px bg-white/5 my-1"></div>
//                 <li><button onClick={handleLogout} className="flex gap-3 text-red-400 hover:bg-red-500/10 py-2"><LogOut className="w-4 h-4" /> Sign Out</button></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="container mx-auto px-4 md:px-6 py-8 max-w-7xl relative z-10">
        
//         {/* Welcome Section */}
//         <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{greeting}, {user?.firstName}</h1>
//             <p className="text-slate-400 flex items-center gap-2 text-sm italic">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//               Keep sharpening your skills.
//             </p>
//         </div>

//         {/* Hero Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
//           {/* HERO CARD (Restored original Indigo/Purple styling) */}
//           <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/20 p-8 flex flex-col justify-between min-h-[260px] shadow-2xl transition-all hover:border-indigo-500/30">
//             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 transition-opacity">
//               <Zap className="w-48 h-48 text-indigo-400 rotate-12" />
//             </div>

//             <div className="relative z-10">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30 mb-4 uppercase tracking-[0.2em]">
//                 <Sparkles className="w-3 h-3" /> Daily Motivation
//               </div>
//               <div className="h-24">
//                 <h2 className="text-xl md:text-3xl font-bold text-white mb-3 max-w-lg leading-tight font-mono italic">
//                   "{displayedQuote}"
//                   <span className="w-2 h-6 bg-cyan-500 inline-block ml-1 animate-pulse align-middle"></span>
//                 </h2>
//               </div>
//             </div>

//             <div className="relative z-10 flex flex-wrap items-center gap-4">
//               <button 
//                 onClick={() => {
//                   const nextProb = problems.find(p => !solvedProblemIds.has(p._id));
//                   if(nextProb) window.location.href = `/problem/${nextProb._id}`;
//                 }}
//                 className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-indigo-50 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-indigo-500/20"
//               >
//                 <Play className="w-4 h-4 fill-current" /> Continue Practice
//               </button>
//             </div>
//           </div>

//           {/* Progress Card (Original Styling) */}
//           <div className="glass-card rounded-3xl p-8 border border-white/5 bg-slate-900/60 flex flex-col justify-center relative overflow-hidden">
//             <div className="flex items-center justify-between mb-8 relative z-10">
//                <h3 className="font-bold text-white flex items-center gap-2 text-lg">
//                  <Activity className="w-5 h-5 text-emerald-400" /> Mastery
//                </h3>
//                <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest">Top 15%</span>
//             </div>
            
//             <div className="relative w-40 h-40 mx-auto mb-8 z-10">
//                <svg className="w-full h-full -rotate-90">
//                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-800" />
//                  <circle 
//                    cx="80" cy="80" r="70" 
//                    stroke="currentColor" strokeWidth="10" 
//                    fill="transparent" 
//                    strokeDasharray={440}
//                    strokeDashoffset={440 - (440 * progressPercentage) / 100}
//                    className="text-emerald-500 transition-all duration-1000 ease-out"
//                    strokeLinecap="round"
//                  />
//                </svg>
//                <div className="absolute inset-0 flex flex-col items-center justify-center">
//                  <span className="text-4xl font-bold text-white tracking-tight">{progressPercentage}%</span>
//                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-1">Completed</span>
//                </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 text-center relative z-10">
//               <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5 text-center">
//                 <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">Total</p>
//                 <p className="text-xl font-bold text-white">{problems.length}</p>
//               </div>
//               <div className="p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/10 text-center">
//                 <p className="text-[9px] text-emerald-500/70 font-bold uppercase mb-1">Solved</p>
//                 <p className="text-xl font-bold text-emerald-400">{solvedProblems.length}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="flex flex-col lg:flex-row gap-8 items-start">
//           <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
//              <div className="relative group">
//                 <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
//                 <div className="relative bg-slate-900 border border-white/10 rounded-xl flex items-center overflow-hidden focus-within:border-cyan-500/50 transition-colors">
//                   <Search className="w-4 h-4 text-slate-500 ml-4" />
//                   <input 
//                     type="text" 
//                     placeholder="Search challenges..." 
//                     className="w-full bg-transparent border-none focus:ring-0 text-sm text-white py-3.5 px-3"
//                     defaultValue={searchTerm}
//                     onChange={handleSearchChange}
//                   />
//                 </div>
//              </div>

//              <div className="glass-card rounded-2xl p-5 border border-white/5 bg-slate-900/60 shadow-xl">
//                 <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
//                   <Filter className="w-3.5 h-3.5" /> Filters
//                 </h3>
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <label className="text-[10px] font-bold text-slate-300 uppercase ml-1">Status</label>
//                     <div className="flex flex-col gap-1">
//                       {['all', 'solved', 'unsolved'].map(status => (
//                         <button key={status} onClick={() => setFilters({...filters, status})} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${filters.status === status ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
//                           <span className="capitalize">{status}</span>
//                           {filters.status === status && <CheckCircle2 className="w-3.5 h-3.5" />}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="h-px bg-white/5"></div>
//                   <div className="space-y-3">
//                     <label className="text-[10px] font-bold text-slate-300 uppercase ml-1">Difficulty</label>
//                     <div className="flex flex-col gap-1">
//                        {['all', 'easy', 'medium', 'hard'].map(diff => (
//                          <button key={diff} onClick={() => setFilters({...filters, difficulty: diff})} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${filters.difficulty === diff ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
//                            <span className="capitalize">{diff}</span>
//                            {filters.difficulty === diff && <CheckCircle2 className="w-3.5 h-3.5" />}
//                          </button>
//                        ))}
//                     </div>
//                   </div>
//                 </div>
//              </div>
//           </aside>

//           <main className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
//               {categories.map(cat => (
//                 <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${activeCategory === cat.id ? 'bg-white text-slate-900 border-white shadow-lg' : 'bg-slate-900/50 text-slate-400 border-white/10 hover:text-white'}`}>
//                   {cat.label}
//                 </button>
//               ))}
//             </div>

//             <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden min-h-[500px] shadow-2xl">
//               <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
//                 <div className="col-span-1 text-center">Status</div>
//                 <div className="col-span-6 md:col-span-5">Problem</div>
//                 <div className="col-span-2 hidden md:block">Difficulty</div>
//                 <div className="col-span-2 hidden md:block">Acceptance</div>
//                 <div className="col-span-5 md:col-span-2 text-right">Action</div>
//               </div>

//               <div className="divide-y divide-white/5">
//                 {filteredProblems.length > 0 ? (
//                   filteredProblems.map((problem) => (
//                     <ProblemRow key={problem._id} problem={problem} isSolved={solvedProblemIds.has(problem._id)} />
//                   ))
//                 ) : (
//                   <div className="flex flex-col items-center justify-center py-24 text-center opacity-50">
//                     <BarChart3 className="w-12 h-12 mb-4" />
//                     <h3 className="text-xl font-bold text-white mb-2">No problems found</h3>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// // RESTORED: Your original Row and Badge Components
// const ProblemRow = React.memo(({ problem, isSolved }) => {
//   return (
//     <div className="group grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors duration-150 relative">
//       <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-left"></div>
//       <div className="col-span-1 flex justify-center">
//         {isSolved ? (
//           <CheckCircle2 className="w-5 h-5 text-green-500" />
//         ) : (
//           <Hash className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400" />
//         )}
//       </div>
//       <div className="col-span-6 md:col-span-5">
//         <NavLink to={`/problem/${problem._id}`} className="text-base font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
//           {problem.title}
//         </NavLink>
//         <div className="md:hidden mt-1"><DifficultyBadge level={problem.difficulty} /></div>
//       </div>
//       <div className="col-span-2 hidden md:block"><DifficultyBadge level={problem.difficulty} /></div>
//       <div className="col-span-2 hidden md:block">
//         <div className="flex items-center gap-2">
//           <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
//              <div className="h-full bg-slate-600" style={{ width: '68%' }}></div>
//           </div>
//           <span className="text-[10px] text-slate-500">68%</span>
//         </div>
//       </div>
//       <div className="col-span-5 md:col-span-2 flex justify-end">
//         <NavLink to={`/problem/${problem._id}`} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-400 text-sm font-medium transition-all flex items-center gap-2">
//           Solve <ArrowRight className="w-3.5 h-3.5" />
//         </NavLink>
//       </div>
//     </div>
//   );
// });

// const DifficultyBadge = React.memo(({ level }) => {
//   const styles = {
//     easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
//     medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
//     hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
//     default: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
//   };
//   const key = level?.toLowerCase() || 'default';
//   return (
//     <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${styles[key]}`}>
//       {level || 'Unknown'}
//     </span>
//   );
// });

// export default Homepage;


import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { NavLink,useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { 
  LogOut, Code2, Zap, Activity, Filter, CheckCircle2, Play, Search, ArrowRight,
  ShieldAlert, Flame, Hash, BarChart3, Sparkles,
  Bell, ChevronDown, Swords, Clock, Target, MessagesSquare
} from 'lucide-react';

const MOTIVATIONAL_QUOTES = [
  "God won’t write your code, but He’ll give you the strength to keep going.",
  "Your time will come—just make sure you’re ready when it does.",
  "God helps those who actually code, not those who just plan.",
  "Late nights, bugs, failures—this is how your time is built.",
  "You don’t learn to code by watching—you learn by building.",
  "Every bug you fix makes you a better developer.",
  "The best programmers are not born—they debug their way there.",
  "Consistency in coding beats talent every single time.",
  "Your future self is built by the code you write today.",
  "Don’t fear errors—they are proof you are trying.",
  "Small commits today create big systems tomorrow."
];

function Homepage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [filters, setFilters] = useState({ difficulty: 'all', status: 'all' });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // --- LOGIC PRESERVED ---
  useEffect(() => {
    let i = 0;
    const fullText = MOTIVATIONAL_QUOTES[quoteIndex];
    setDisplayedQuote('');
    const typingInterval = setInterval(() => {
      setDisplayedQuote(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(typingInterval);
    }, 50);
    const switchTimeout = setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 7000);
    return () => { clearInterval(typingInterval); clearTimeout(switchTimeout); };
  }, [quoteIndex]);

  useEffect(() => {
    const timer = setInterval(() => setSessionSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}m ${secs}s`;
  };

  const scrollRef = useRef(false);
  const rafRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) return;
      scrollRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        scrollRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [probRes, solvedRes] = await Promise.all([
          axiosClient.get('/problem/getAllProblem'),
          user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
        ]);
        setProblems(probRes.data);
        setSolvedProblems(solvedRes.data);
      } catch (error) { console.error('Error fetching data:', error); }
    };
    fetchData();
  }, [user]);

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  }, [dispatch]);

  const solvedProblemIds = useMemo(() => new Set(solvedProblems.map(sp => sp._id)), [solvedProblems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
      const tagMatch = activeCategory === 'all' || problem.tags === activeCategory;
      const isSolved = solvedProblemIds.has(problem._id);
      const statusMatch = filters.status === 'all' || (filters.status === 'solved' ? isSolved : !isSolved);
      const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      return difficultyMatch && tagMatch && statusMatch && searchMatch;
    });
  }, [problems, solvedProblemIds, filters, activeCategory, searchTerm]);

  const progressPercentage = useMemo(() => {
    return problems.length > 0 ? Math.round((solvedProblems.length / problems.length) * 100) : 0;
  }, [problems.length, solvedProblems.length]);

  const categories = useMemo(() => [
    { id: 'all', label: 'All Topics' },
    { id: 'array', label: 'Arrays' },
    { id: 'dp', label: 'DP' },
    { id: 'graph', label: 'Graphs' },
    { id: 'linkedList', label: 'Links' },
    { id: 'tree', label: 'Trees' },
    { id: 'string', label: 'Strings' },
    { id: 'math', label: 'Math' },
    { id: 'logic', label: 'Logic' }
  ], []);

  const searchTimeoutRef = useRef(null);
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setSearchTerm(value), 150);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[40%] bg-cyan-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-[#020617]/95 backdrop-blur-md border-white/5 py-2' : 'bg-transparent border-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 lg:gap-8">
            <NavLink to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-slate-800 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                <Code2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
              </div>
              <span className="text-base md:text-lg font-bold text-white tracking-tight">CodeArena</span>
            </NavLink>

            {/* Mobile Nav Icons / Desktop Links */}
            <div className="flex items-center gap-1 md:gap-2">
              <NavLink to="/chat" className={({ isActive }) => `p-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                <MessagesSquare className="w-4 h-4" />
                <span className="hidden md:inline">Messages</span>
              </NavLink>
              <div className="p-2 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-medium text-slate-500 flex items-center gap-2">
                <Swords className="w-4 h-4" /> 
                <span className="hidden md:inline">Battle</span>
                <span className="text-[8px] bg-cyan-500/10 text-cyan-500 px-1 py-0.5 rounded border border-cyan-500/20 font-bold">SOON</span>
              </div>
            </div>
          </div>

          {/* Stats - Compact on mobile */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-6 px-4 py-1.5 bg-slate-900/50 border border-white/5 rounded-full">
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-3 h-3 text-cyan-500 animate-pulse" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider"><span className="hidden lg:inline">Session:</span> <span className="text-white font-mono">{formatSessionTime(sessionSeconds)}</span></span>
            </div>
            <div className="w-px h-3 bg-white/10"></div>
            <div className="flex items-center gap-2 shrink-0">
              <Target className="w-3 h-3 text-emerald-500" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider"><span className="hidden lg:inline">Solved:</span> <span className="text-white">{solvedProblems.length}</span></span>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <div className="dropdown dropdown-end">
              <button className="flex items-center gap-1.5 p-1 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[10px] md:text-xs font-bold">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              <ul className="mt-4 p-2 shadow-2xl menu menu-sm dropdown-content bg-[#0B1121] border border-white/10 rounded-xl w-56 z-[100]">
                <li className="px-3 py-3 border-b border-white/5">
                    <span className="font-bold text-white text-xs">{user?.firstName}</span>
                </li>
                {user?.role === 'admin' && (
                  <li><NavLink to="/admin" className="flex gap-3 text-purple-400"><ShieldAlert className="w-4 h-4" /> Admin</NavLink></li>
                )}
                <li><button onClick={handleLogout} className="flex gap-3 text-red-400"><LogOut className="w-4 h-4" /> Sign Out</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        
        {/* Welcome */}
        <div className="mb-6 md:mb-8 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">{greeting}, {user?.firstName}</h1>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 text-xs italic">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Keep sharpening your skills.
            </p>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          
          {/* Motivation Card */}
          {/* <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/20 p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
            <Zap className="absolute -top-4 -right-4 w-32 h-32 md:w-48 md:h-48 text-indigo-400 opacity-10 rotate-12 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-bold border border-indigo-500/30 mb-4 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Motivation
              </div>
              <div className="min-h-[80px]">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight font-mono italic">
                  "{displayedQuote}"
                  <span className="w-1.5 h-5 bg-cyan-500 inline-block ml-1 animate-pulse align-middle"></span>
                </h2>
              </div>
            </div>
            <button onClick={() => {
                const nextProb = problems.find(p => !solvedProblemIds.has(p._id));
                // if(nextProb) window.location.href = `/problem/${nextProb._id}`;
                 if (nextProb) {
      // Use navigate() with backticks and _id
                  navigate(`/problem/${nextProb._id}`);
    } else if (problems.length > 0) {
      // If all are solved, maybe just go to the first one?
                navigate(`/problem/${problems[0]._id}`);
    }
              }} className="relative z-10 w-fit px-5 py-2.5 bg-white text-slate-950 text-xs md:text-sm font-bold rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-2">
              <Play className="w-3.5 h-3.5 fill-current" /> Start Practice
            </button>
          </div> */}
              <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 border border-indigo-500/20 p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
  <Zap className="absolute -top-4 -right-4 w-32 h-32 md:w-48 md:h-48 text-indigo-400 opacity-10 rotate-12 group-hover:opacity-20 transition-opacity" />
  
  <div className="relative z-10">
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[9px] font-bold border border-indigo-500/30 mb-4 uppercase tracking-widest">
      <Sparkles className="w-3 h-3" /> Motivation
    </div>
    <div className="min-h-[80px]">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white leading-tight font-mono italic">
        "{displayedQuote}"
        <span className="w-1.5 h-5 bg-cyan-500 inline-block ml-1 animate-pulse align-middle"></span>
      </h2>
    </div>
  </div>

  {/* UI FIX: The Inset Action Panel */}
  <div className="relative z-10 mt-6 bg-slate-950/40 backdrop-blur-sm border border-white/5 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="flex-1 min-w-0">
      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] block mb-1">
        Next Challenge
      </span>
      {/* Keeping your exact logic here for the display */}
      <h3 className="text-sm md:text-lg font-bold text-white truncate">
        {problems.find(p => !solvedProblemIds.has(p._id))?.title || "All Challenges Completed!"}
      </h3>
    </div>

    <button 
      onClick={() => {
        // Keeping your exact logic here for the navigation
        const nextProb = problems.find(p => !solvedProblemIds.has(p._id));
        if (nextProb) {
          navigate(`/problem/${nextProb._id}`);
        } else if (problems.length > 0) {
          navigate(`/problem/${problems[0]._id}`);
        }
      }} 
      className="w-full md:w-auto px-6 py-2.5 bg-white text-slate-950 text-xs md:text-sm font-bold rounded-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg"
    >
      <Play className="w-3.5 h-3.5 fill-current" /> Start Practice
    </button>
  </div>
</div>

          {/* Progress Card */}
          <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5 bg-slate-900/60 flex flex-col justify-center items-center text-center">
             <div className="flex items-center justify-between w-full mb-6">
                <h3 className="font-bold text-white flex items-center gap-2 text-sm md:text-base"><Activity className="w-4 h-4 text-emerald-400" /> Mastery</h3>
                <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 tracking-tighter">ELITE</span>
             </div>
             <div className="relative w-32 h-32 md:w-36 md:h-36 mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="283" strokeDashoffset={283 - (283 * progressPercentage) / 100}
                    className="text-emerald-500 transition-all duration-1000" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-white">{progressPercentage}%</span>
                  <span className="text-[8px] text-slate-500 uppercase font-bold">Done</span>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-2 rounded-lg bg-slate-800/50 border border-white/5">
                   <p className="text-[8px] text-slate-500 font-bold uppercase">Total</p>
                   <p className="text-sm font-bold text-white">{problems.length}</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-900/10 border border-emerald-500/10">
                   <p className="text-[8px] text-emerald-500/70 font-bold uppercase">Solved</p>
                   <p className="text-sm font-bold text-emerald-400">{solvedProblems.length}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Search & Categories Bar - Optimized for Mobile Scroll */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Find a challenge..." className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-cyan-500/50 outline-none transition-all" defaultValue={searchTerm} onChange={handleSearchChange} />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat.id ? 'bg-white text-slate-900 border-white shadow-lg' : 'bg-slate-900/50 text-slate-400 border-white/10 hover:text-white'}`}>
                  {cat.label}
                </button>
              ))}
            </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Sidebar - Collapsible on Mobile or simply top-stacked */}
          <aside className="w-full lg:w-56 flex-shrink-0 grid grid-cols-2 lg:grid-cols-1 gap-3">
             <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-3">By Status</label>
                <div className="flex flex-col gap-1.5">
                    {['all', 'solved', 'unsolved'].map(s => (
                        <button key={s} onClick={() => setFilters({...filters, status: s})} className={`text-left px-3 py-1.5 rounded-lg text-xs capitalize ${filters.status === s ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-white/5'}`}>{s}</button>
                    ))}
                </div>
             </div>
             <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mb-3">By Level</label>
                <div className="flex flex-col gap-1.5">
                    {['all', 'easy', 'medium', 'hard'].map(d => (
                        <button key={d} onClick={() => setFilters({...filters, difficulty: d})} className={`text-left px-3 py-1.5 rounded-lg text-xs capitalize ${filters.difficulty === d ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'text-slate-400 hover:bg-white/5'}`}>{d}</button>
                    ))}
                </div>
             </div>
          </aside>

          {/* Problem List */}
          <main className="flex-1 w-full min-w-0">
            <div className="bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-5">Problem</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2 text-center">Acceptance</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              <div className="divide-y divide-white/5">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem) => (
                    <ProblemRow key={problem._id} problem={problem} isSolved={solvedProblemIds.has(problem._id)} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <BarChart3 className="w-10 h-10 mb-3" />
                    <p className="text-sm font-bold">No challenges found</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const ProblemRow = React.memo(({ problem, isSolved }) => {
  return (
    <div className="group flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 px-4 md:px-6 py-4 items-start md:items-center hover:bg-white/[0.02] transition-colors relative">
      <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-left"></div>
      
      {/* Status & Title Row (Mobile) */}
      <div className="flex items-center gap-3 w-full md:contents">
          <div className="md:col-span-1 flex justify-center shrink-0">
            {isSolved ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500" /> : <Hash className="w-3.5 h-3.5 text-slate-600" />}
          </div>
          
          <div className="flex-1 md:col-span-5 min-w-0">
            <NavLink to={`/problem/${problem._id}`} className="text-sm md:text-base font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {problem.title}
            </NavLink>
            {/* Meta Info for Mobile Only */}
            <div className="flex items-center gap-3 mt-1 md:hidden">
                <DifficultyBadge level={problem.difficulty} />
                <span className="text-[10px] text-slate-500">Acc: 68%</span>
            </div>
          </div>
      </div>

      {/* Desktop Specific Columns */}
      <div className="hidden md:block md:col-span-2">
        <DifficultyBadge level={problem.difficulty} />
      </div>
      
      <div className="hidden md:block md:col-span-2">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-10 h-1 bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-slate-600" style={{ width: '68%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500">68%</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full md:col-span-2 flex justify-end mt-2 md:mt-0">
        <NavLink to={`/problem/${problem._id}`} className="w-full md:w-auto px-4 py-2 rounded-lg bg-white/5 md:bg-transparent border border-white/5 md:border-none hover:bg-cyan-500/10 hover:text-cyan-400 text-slate-400 text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2">
          Solve <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </div>
  );
});

const DifficultyBadge = React.memo(({ level }) => {
  const styles = {
    easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    default: 'text-slate-400 bg-slate-400/10 border-slate-400/20'
  };
  const key = level?.toLowerCase() || 'default';
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${styles[key]}`}>
      {level || 'Unknown'}
    </span>
  );
});

export default Homepage;
