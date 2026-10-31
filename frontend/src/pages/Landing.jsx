// import { NavLink } from 'react-router';
// import { 
//   Code2, 
//   Terminal, 
//   Cpu, 
//   Globe, 
//   ChevronRight, 
//   Zap,
//   MousePointer2,
//   Trophy,
//   Lightbulb,
//   ArrowRight
// } from 'lucide-react';

// function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden relative">
      
//       {/* --- Background Ambience --- */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000"></div>
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
//       </div>

//       {/* --- Public Navbar --- */}
//       <nav className="relative z-50 w-full pt-6 px-6 container mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="relative">
//             <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
//             <div className="relative w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
//               <Code2 className="w-5 h-5 text-cyan-400" />
//             </div>
//           </div>
//           <span className="text-xl font-bold tracking-tight text-white">
//             LeetCode <span className="text-cyan-500">Pro</span>
//           </span>
//         </div>

//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
//           <a href="#" className="hover:text-white transition-colors">Problemset</a>
//           <a href="#" className="hover:text-white transition-colors">Contests</a>
//           <a href="#" className="hover:text-white transition-colors">Community</a>
//         </div>

//         <div className="flex items-center gap-4">
//           <NavLink to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
//             Sign In
//           </NavLink>
//           <NavLink 
//             to="/signup" 
//             className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
//           >
//             Register
//           </NavLink>
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <main className="relative z-10 container mx-auto px-6 pt-20 lg:pt-32 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           {/* Left: Text Content */}
//           <div className="space-y-8 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
//               <Zap className="w-3 h-3 fill-current" />
//               <span>Version 2.0 Live</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
//               Sharpen Your <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
//                 Coding Skills
//               </span>
//             </h1>
            
//             <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
//               Embark on a journey of coding excellence. Immerse yourself in a series of stimulating challenges known as "problems," crafted by a vibrant community of elite developers.
//             </p>

//             <div className="flex flex-wrap items-center gap-4">
//               <NavLink 
//                 to="/signup" 
//                 className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all flex items-center gap-2"
//               >
//                 Start Coding <ArrowRight className="w-5 h-5" />
//               </NavLink>
              
//               <div className="flex items-center gap-4 px-6 py-4 rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm">
//                 <div className="flex -space-x-3">
//                   {[1,2,3,4].map(i => (
//                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-700 flex items-center justify-center text-[10px] text-white font-bold">
//                        {i === 4 ? '+2k' : ''}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-xs">
//                   <span className="block text-white font-bold">2,000+ Online</span>
//                   <span className="text-slate-500">Solving right now</span>
//                 </div>
//               </div>
//             </div>

//             {/* Language Badges */}
//             <div className="pt-8 flex items-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
//               {['Python', 'JavaScript', 'C++', 'Java', 'Go'].map(lang => (
//                 <div key={lang} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
//                   {lang}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: The Code Effect (Visual) */}
//           <div className="relative perspective-1000 hidden lg:block">
//             {/* Glows behind code */}
//             <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse"></div>
//             <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse delay-700"></div>

//             {/* Main Code Window */}
//             <div className="relative z-10 rounded-2xl bg-[#0B1121]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
//               {/* Window Header */}
//               <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                 </div>
//                 <div className="text-[10px] font-mono text-slate-500">solution.py</div>
//               </div>

//               {/* Code Content */}
//               <div className="p-6 font-mono text-sm leading-relaxed overflow-hidden">
//                 <div className="flex">
//                   <div className="text-slate-600 text-right pr-4 select-none border-r border-white/5 mr-4">
//                     1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
//                   </div>
//                   <div>
//                     <span className="text-purple-400">def</span> <span className="text-blue-400">even_fibonacci_sum</span>(limit):<br/>
//                     &nbsp;&nbsp;<span className="text-slate-400"># Initialize variables</span><br/>
//                     &nbsp;&nbsp;a, b = <span className="text-orange-400">1</span>, <span className="text-orange-400">2</span><br/>
//                     &nbsp;&nbsp;even_sum = <span className="text-orange-400">0</span><br/><br/>
//                     &nbsp;&nbsp;<span className="text-purple-400">while</span> b &lt;= limit:<br/>
//                     &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> b % <span className="text-orange-400">2</span> == <span className="text-orange-400">0</span>:<br/>
//                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;even_sum += b<br/>
//                     &nbsp;&nbsp;&nbsp;&nbsp;a, b = b, a + b<br/><br/>
//                     &nbsp;&nbsp;<span className="text-purple-400">return</span> even_sum
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Overlay Card */}
//             <div className="absolute -bottom-12 -right-12 z-20 w-72 rounded-xl bg-[#0F172A]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/30 p-4 animate-float">
//                <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
//                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                  <span className="text-xs font-bold text-slate-300">Test Results</span>
//                </div>
//                <div className="space-y-2 font-mono text-xs">
//                  <div className="flex justify-between text-slate-400">
//                    <span>Input:</span>
//                    <span className="text-white">limit = 100</span>
//                  </div>
//                  <div className="flex justify-between text-slate-400">
//                    <span>Output:</span>
//                    <span className="text-emerald-400 font-bold">44</span>
//                  </div>
//                  <div className="mt-2 pt-2 border-t border-white/5 text-emerald-500 flex items-center gap-1">
//                    <Zap className="w-3 h-3 fill-current" />
//                    <span>Runtime: 0ms (100%)</span>
//                  </div>
//                </div>
//             </div>
//           </div>
//         </div>

//         {/* --- Scroll Indicator --- */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
//           <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
//           <MousePointer2 className="w-5 h-5 text-slate-400" />
//         </div>
//       </main>

//       {/* --- Feature Grid Section --- */}
//       <section className="relative z-10 container mx-auto px-6 py-24 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-white mb-4">Explore LeetCode Pro</h2>
//           <p className="text-slate-400 max-w-xl mx-auto">Everything you need to take your coding skills to the next level.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FeatureCard 
//             icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
//             title="Pickup new techniques"
//             description="Master advanced algorithms with our curated study plans and expert-written solutions."
//             gradient="from-yellow-500/10 to-orange-500/10"
//             border="group-hover:border-yellow-500/30"
//           />
//           <FeatureCard 
//             icon={<Terminal className="w-6 h-6 text-purple-400" />}
//             title="Learn new languages"
//             description="Practice in 14+ popular programming languages including Python, Java, C++, and Go."
//             gradient="from-purple-500/10 to-pink-500/10"
//             border="group-hover:border-purple-500/30"
//           />
//           <FeatureCard 
//             icon={<Trophy className="w-6 h-6 text-cyan-400" />}
//             title="Compete with peers"
//             description="Join weekly contests and climb the global leaderboard to showcase your skills."
//             gradient="from-cyan-500/10 to-blue-500/10"
//             border="group-hover:border-cyan-500/30"
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// // Helper Component for Feature Cards
// function FeatureCard({ icon, title, description, gradient, border }) {
//   return (
//     <div className={`group relative p-8 rounded-2xl bg-slate-900/40 border border-white/5 ${border} transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-900/60`}>
//       <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500`}></div>
//       <div className="relative z-10">
//         <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
//           {icon}
//         </div>
//         <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
//         <p className="text-slate-400 text-sm leading-relaxed">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router'; // Ensure react-router-dom is installed
// import { 
//   Code2, 
//   Terminal, 
//   Zap,
//   MousePointer2,
//   Trophy,
//   Lightbulb,
//   ArrowRight
// } from 'lucide-react';

// // --- 1. DYNAMIC CODE DATABASE ---
// const SNIPPETS = [
//   {
//     lang: 'python',
//     file: 'two_sum.py',
//     lines: [
//       { text: "def ", color: "text-purple-400" }, { text: "two_sum", color: "text-blue-400" }, { text: "(nums, target):", color: "text-slate-300" },
//       { text: "\n    lookup = {}", color: "text-slate-300" },
//       { text: "\n    for i, n in enumerate(nums):", color: "text-slate-300" },
//       { text: "\n        diff = target - n", color: "text-slate-300" },
//       { text: "\n        if diff in lookup:", color: "text-slate-300" },
//       { text: "\n            return [lookup[diff], i]", color: "text-purple-400" },
//       { text: "\n        lookup[n] = i", color: "text-slate-300" }
//     ],
//     output: "Success: [0, 1] found",
//     hasError: false
//   },
//   {
//     lang: 'javascript',
//     file: 'api_handler.js',
//     lines: [
//       { text: "const ", color: "text-purple-400" }, { text: "getData ", color: "text-blue-400" }, { text: "= async () => {", color: "text-slate-300" },
//       { text: "\n  try {", color: "text-purple-400" },
//       { text: "\n    const res = await api.get();", color: "text-slate-300" },
//       { text: "\n    console.log(data); ", color: "text-red-400" }, // TRIGGER ERROR
//       { text: "\n  } catch (e) { return null; }", color: "text-slate-300" },
//       { text: "\n}", color: "text-slate-300" }
//     ],
//     output: "ReferenceError: data is not defined",
//     hasError: true,
//     errorLineIndex: 5,
//     fix: "console.log(res.data);"
//   },
//   {
//     lang: 'cpp',
//     file: 'search.cpp',
//     lines: [
//       { text: "int ", color: "text-purple-400" }, { text: "binarySearch", color: "text-blue-400" }, { text: "(int arr[], int x) {", color: "text-slate-300" },
//       { text: "\n  int l = 0, r = n - 1;", color: "text-slate-300" },
//       { text: "\n  while (l <= r) {", color: "text-purple-400" },
//       { text: "\n    int m = l + (r - l) / 2;", color: "text-slate-300" },
//       { text: "\n    if (arr[m] == x) return m;", color: "text-purple-400" },
//       { text: "\n  }\n  return -1;", color: "text-purple-400" }
//     ],
//     output: "Binary search compiled. Target: 4",
//     hasError: false
//   },
//   {
//     lang: 'go',
//     file: 'worker.go',
//     lines: [
//       { text: "func ", color: "text-purple-400" }, { text: "process", color: "text-blue-400" }, { text: "(ch chan int) {", color: "text-slate-300" },
//       { text: "\n    val := <-ch", color: "text-cyan-400" },
//       { text: "\n    fmt.Printf(\"Got: %d\", val)", color: "text-slate-300" },
//       { text: "\n}", color: "text-slate-300" }
//     ],
//     output: "Got: 42",
//     hasError: false
//   }
// ];

// function LandingPage() {
//   const [snippetIdx, setSnippetIdx] = useState(0);
//   const [charProgress, setCharProgress] = useState(0);
//   const [status, setStatus] = useState('typing'); // typing, error, fixed
  
//   const current = SNIPPETS[snippetIdx];
//   const fullText = current.lines.map(l => l.text).join("");

//   // Logic for Typing and Errors
//   useEffect(() => {
//     let timer;
//     if (status === 'typing') {
//       if (charProgress < fullText.length) {
//         timer = setTimeout(() => setCharProgress(p => p + 1), 20);
//       } else {
//         if (current.hasError) {
//           setStatus('error');
//           setTimeout(() => setStatus('fixed'), 1500); 
//         } else {
//           setStatus('idle');
//         }
//         // Move to next snippet
//         setTimeout(() => {
//           setSnippetIdx(prev => (prev + 1) % SNIPPETS.length);
//           setCharProgress(0);
//           setStatus('typing');
//         }, 4000);
//       }
//     }
//     return () => clearTimeout(timer);
//   }, [charProgress, status, snippetIdx]);

//   const renderCode = () => {
//     let currentTotal = 0;
//     return current.lines.map((line, i) => {
//       const visibleChars = Math.max(0, Math.min(line.text.length, charProgress - currentTotal));
//       currentTotal += line.text.length;
      
//       // If we fixed the error, swap the specific line text
//       let displayText = line.text.slice(0, visibleChars);
//       if (status === 'fixed' && current.hasError && i === current.errorLineIndex) {
//         displayText = current.fix;
//       }

//       return <span key={i} className={line.color}>{displayText}</span>;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative scroll-auto">
      
//       {/* Background Ambience */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
//       </div>

//       {/* --- Navbar --- */}
//       <nav className="relative z-50 w-full pt-6 px-6 container mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="relative w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
//             <Code2 className="w-5 h-5 text-cyan-400" />
//           </div>
//           <span className="text-xl font-bold tracking-tight text-white">
//             Code <span className="text-cyan-500">Arena</span>
//           </span>
//         </div>

//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
//           <a href="#" className="hover:text-white transition-colors">Problemset</a>
//           <a href="#" className="hover:text-white transition-colors">Contests</a>
//           <a href="#" className="hover:text-white transition-colors">Community</a>
//         </div>

//         <div className="flex items-center gap-4">
//           <NavLink to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
//             Sign In
//           </NavLink>
//           <NavLink to="/signup" className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-lg transition-all hover:scale-105">
//             Register
//           </NavLink>
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <main className="relative z-10 container mx-auto px-6 pt-20 lg:pt-32 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           {/* Left Text */}
//           <div className="space-y-8 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
//               <Zap className="w-3 h-3 fill-current" />
//               <span>Version 2.0 Live</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
//               Sharpen Your <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
//                 Coding Skills
//               </span>
//             </h1>
            
//             <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
//               Embark on a journey of coding excellence. Immerse yourself in a series of stimulating challenges known as "problems," crafted by a vibrant community.
//             </p>

//             <div className="flex flex-wrap items-center gap-4">
//               <NavLink to="/signup" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2">
//                 Start Coding <ArrowRight className="w-5 h-5" />
//               </NavLink>
//             </div>
//           </div>

//           {/* Right: Dynamic Code Panel (THE UPDATED PART) */}
//           <div className="relative perspective-1000 hidden lg:block">
//             <div className={`relative z-10 rounded-2xl bg-[#0B1121]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl ${status === 'error' ? 'animate-shake border-red-500/50' : 'border-white/10'}`}>
              
//               {/* Editor Header */}
//               <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-red-500/20 border border-red-500/50'}`}></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                 </div>
//                 <div className="text-[10px] font-mono text-slate-500">{current.file}</div>
//               </div>

//               {/* Code Area */}
//               <div className="p-6 font-mono text-sm leading-relaxed min-h-[260px] flex">
//                 <div className="text-slate-600 text-right pr-4 select-none border-r border-white/5 mr-4 opacity-50">
//                   {Array.from({length: 9}).map((_, i) => <div key={i}>{i+1}</div>)}
//                 </div>
//                 <div className="whitespace-pre flex-1 relative">
//                   {renderCode()}
//                   <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
//                 </div>
//               </div>

//               {/* Terminal Area */}
//               <div className={`p-4 border-t border-white/5 font-mono text-xs transition-colors duration-500 ${status === 'error' ? 'bg-red-500/10' : 'bg-black/20'}`}>
//                 <div className="flex items-center gap-2 mb-1 text-slate-500">
//                   <Terminal className="w-3 h-3" />
//                   <span>Output</span>
//                 </div>
//                 <div className={status === 'error' ? 'text-red-400' : 'text-emerald-400'}>
//                    {charProgress >= fullText.length ? `> ${current.output}` : '> ...'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce cursor-pointer">
//           <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
//           <MousePointer2 className="w-5 h-5 text-slate-400" />
//         </div>
//       </main>

//       {/* --- Feature Grid --- */}
//       <section className="relative z-10 container mx-auto px-6 py-24 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-white mb-4">Explore LeetCode Pro</h2>
//           <p className="text-slate-400 max-w-xl mx-auto">Everything you need to take your coding skills to the next level.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FeatureCard 
//             icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
//             title="Pickup new techniques"
//             description="Master advanced algorithms with our curated study plans and expert-written solutions."
//           />
//           <FeatureCard 
//             icon={<Terminal className="w-6 h-6 text-purple-400" />}
//             title="Learn new languages"
//             description="Practice in 14+ popular programming languages including Python, Java, C++, and Go."
//           />
//           <FeatureCard 
//             icon={<Trophy className="w-6 h-6 text-cyan-400" />}
//             title="Compete with peers"
//             description="Join weekly contests and climb the global leaderboard to showcase your skills."
//           />
//         </div>
//       </section>

//       {/* Global CSS for the Shake */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           25% { transform: translateX(-6px) rotate(-1deg); }
//           75% { transform: translateX(6px) rotate(1deg); }
//         }
//         .animate-shake {
//           animation: shake 0.2s ease-in-out infinite;
//         }
//       `}} />
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="group relative p-8 rounded-2xl bg-slate-900/40 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60">
//       <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
//       <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
//     </div>
//   );
// }

// export default LandingPage;



// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router'; 
// import { 
//   Code2, 
//   Terminal, 
//   Zap,
//   MousePointer2,
//   Trophy,
//   Lightbulb,
//   ArrowRight,
//   Github,
//   Heart,
//   ChevronRight
// } from 'lucide-react';

// // --- 1. DYNAMIC CODE DATABASE (Logic preserved) ---
// const SNIPPETS = [
//   {
//     lang: 'python',
//     file: 'two_sum.py',
//     lines: [
//       { text: "def ", color: "text-purple-400" }, { text: "two_sum", color: "text-blue-400" }, { text: "(nums, target):", color: "text-slate-300" },
//       { text: "\n    lookup = {}", color: "text-slate-300" },
//       { text: "\n    for i, n in enumerate(nums):", color: "text-slate-300" },
//       { text: "\n        diff = target - n", color: "text-slate-300" },
//       { text: "\n        if diff in lookup:", color: "text-slate-300" },
//       { text: "\n            return [lookup[diff], i]", color: "text-purple-400" },
//       { text: "\n        lookup[n] = i", color: "text-slate-300" }
//     ],
//     output: "Success: [0, 1] found",
//     hasError: false
//   },
//   {
//     lang: 'javascript',
//     file: 'api_handler.js',
//     lines: [
//       { text: "const ", color: "text-purple-400" }, { text: "getData ", color: "text-blue-400" }, { text: "= async () => {", color: "text-slate-300" },
//       { text: "\n  try {", color: "text-purple-400" },
//       { text: "\n    const res = await api.get();", color: "text-slate-300" },
//       { text: "\n    console.log(data); ", color: "text-red-400" }, 
//       { text: "\n  } catch (e) { return null; }", color: "text-slate-300" },
//       { text: "\n}", color: "text-slate-300" }
//     ],
//     output: "ReferenceError: data is not defined",
//     hasError: true,
//     errorLineIndex: 5,
//     fix: "console.log(res.data);"
//   },
//   {
//     lang: 'cpp',
//     file: 'search.cpp',
//     lines: [
//       { text: "int ", color: "text-purple-400" }, { text: "binarySearch", color: "text-blue-400" }, { text: "(int arr[], int x) {", color: "text-slate-300" },
//       { text: "\n  int l = 0, r = n - 1;", color: "text-slate-300" },
//       { text: "\n  while (l <= r) {", color: "text-purple-400" },
//       { text: "\n    int m = l + (r - l) / 2;", color: "text-slate-300" },
//       { text: "\n    if (arr[m] == x) return m;", color: "text-purple-400" },
//       { text: "\n  }\n  return -1;", color: "text-purple-400" }
//     ],
//     output: "Binary search compiled. Target: 4",
//     hasError: false
//   }
// ];

// function LandingPage() {
//   const [snippetIdx, setSnippetIdx] = useState(0);
//   const [charProgress, setCharProgress] = useState(0);
//   const [status, setStatus] = useState('typing'); 
  
//   const current = SNIPPETS[snippetIdx];
//   const fullText = current.lines.map(l => l.text).join("");

//   useEffect(() => {
//     let timer;
//     if (status === 'typing') {
//       if (charProgress < fullText.length) {
//         timer = setTimeout(() => setCharProgress(p => p + 1), 20);
//       } else {
//         if (current.hasError) {
//           setStatus('error');
//           setTimeout(() => setStatus('fixed'), 1500); 
//         } else {
//           setStatus('idle');
//         }
//         setTimeout(() => {
//           setSnippetIdx(prev => (prev + 1) % SNIPPETS.length);
//           setCharProgress(0);
//           setStatus('typing');
//         }, 4000);
//       }
//     }
//     return () => clearTimeout(timer);
//   }, [charProgress, status, snippetIdx, fullText.length, current.hasError]);

//   const renderCode = () => {
//     let currentTotal = 0;
//     return current.lines.map((line, i) => {
//       const visibleChars = Math.max(0, Math.min(line.text.length, charProgress - currentTotal));
//       currentTotal += line.text.length;
      
//       let displayText = line.text.slice(0, visibleChars);
//       if (status === 'fixed' && current.hasError && i === current.errorLineIndex) {
//         displayText = current.fix;
//       }
//       return <span key={i} className={line.color}>{displayText}</span>;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative scroll-auto">
      
//       {/* Background Ambience */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
//         <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
//       </div>

//       {/* --- Navbar --- */}
//       <nav className="relative z-50 w-full pt-6 px-6 container mx-auto flex items-center justify-between">
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="relative w-10 h-10 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
//             <Code2 className="w-5 h-5 text-cyan-400" />
//           </div>
//           <span className="text-xl font-bold tracking-tight text-white">
//             Code<span className="text-cyan-500">Arena</span>
//           </span>
//         </div>

//         {/* Clean Center Ticker */}
//         <div className="hidden lg:flex items-center gap-5 px-5 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
//             <div className="flex items-center gap-2">
//                 <Trophy className="w-3.5 h-3.5 text-amber-500" />
//                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Competitive Programming</span>
//             </div>
//             <div className="h-3 w-px bg-white/10"></div>
//             <div className="flex items-center gap-2">
//                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ready for Interviews</span>
//                 <ChevronRight className="w-3 h-3 text-cyan-500" />
//             </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <NavLink to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
//             Sign In
//           </NavLink>
//           <NavLink to="/signup" className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-lg transition-all hover:scale-105">
//             Register
//           </NavLink>
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <main className="relative z-10 container mx-auto px-6 pt-20 lg:pt-32 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           <div className="space-y-8 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
//               <Zap className="w-3 h-3 fill-current" />
//               <span>Platform v2.0</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
//               Sharpen Your <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
//                 Coding Skills
//               </span>
//             </h1>
            
//             <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
//               Unlock your potential with CodeArena. Solve, compete, and master the world's most challenging algorithms in a professional environment.
//             </p>

//             <div className="flex flex-wrap items-center gap-4">
//               <NavLink to="/signup" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 group">
//                 Start Coding <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </NavLink>
//             </div>
//           </div>

//           <div className="relative perspective-1000 hidden lg:block">
//             <div className={`relative z-10 rounded-2xl bg-[#0B1121]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl ${status === 'error' ? 'animate-shake border-red-500/50' : 'border-white/10'}`}>
//               <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-red-500/20 border border-red-500/50'}`}></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                 </div>
//                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{current.file}</div>
//               </div>

//               <div className="p-6 font-mono text-sm leading-relaxed min-h-[260px] flex">
//                 <div className="text-slate-600 text-right pr-4 select-none border-r border-white/5 mr-4 opacity-50">
//                   {Array.from({length: 9}).map((_, i) => <div key={i}>{i+1}</div>)}
//                 </div>
//                 <div className="whitespace-pre flex-1 relative">
//                   {renderCode()}
//                   <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
//                 </div>
//               </div>

//               <div className={`p-4 border-t border-white/5 font-mono text-xs transition-colors duration-500 ${status === 'error' ? 'bg-red-500/10' : 'bg-black/20'}`}>
//                 <div className="flex items-center gap-2 mb-1 text-slate-500">
//                   <Terminal className="w-3 h-3" />
//                   <span className="uppercase tracking-widest text-[9px]">Environment Output</span>
//                 </div>
//                 <div className={status === 'error' ? 'text-red-400' : 'text-emerald-400'}>
//                     {charProgress >= fullText.length ? `> ${current.output}` : '> Runtime active...'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
//           <MousePointer2 className="w-5 h-5 text-slate-400" />
//         </div>
//       </main>

//       {/* --- Feature Grid --- */}
//       <section className="relative z-10 container mx-auto px-6 py-24 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-white mb-4  tracking-wider">
//             CodeArena Pro
//           </h2>
//           <p className="text-slate-400 max-w-xl mx-auto">Master advanced techniques and build your career in software engineering.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FeatureCard 
//             icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
//             title="Master Techniques"
//             description="Deep dive into data structures and complexity analysis with guided learning paths."
//           />
//           <FeatureCard 
//             icon={<Terminal className="w-6 h-6 text-purple-400" />}
//             title="Multi-Language Support"
//             description="Practice in Python, Java, C++, Go, and more with our optimized online IDE."
//           />
//           <FeatureCard 
//             icon={<Trophy className="w-6 h-6 text-cyan-400" />}
//             title="Global Leaderboards"
//             description="Measure your progress against developers worldwide in our weekly arena contests."
//           />
//         </div>
//       </section>

//       {/* --- Footer --- */}
//       <footer className="relative z-10 border-t border-white/5 py-12 bg-black/10 backdrop-blur-md">
//         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="flex items-center gap-2">
//                 <Code2 className="w-5 h-5 text-cyan-500" />
//                 <span className="text-sm font-bold text-white uppercase tracking-tighter">Code<span className="text-cyan-500">Arena</span></span>
//             </div>
            
//             <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
//                 Created with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by 
//                 <span className="text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer font-bold underline decoration-cyan-500/30 underline-offset-4 decoration-2">Sambhav Gupta</span>
//             </div>

//             <div className="flex items-center gap-4 text-slate-500">
//                 <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
//                 <span className="text-[10px]  tracking-widest font-mono">© 2026 CodeArena</span>
//             </div>
//         </div>
//       </footer>

//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           25% { transform: translateX(-6px); }
//           75% { transform: translateX(6px); }
//         }
//         .animate-shake {
//           animation: shake 0.2s ease-in-out infinite;
//         }
//         .perspective-1000 {
//           perspective: 1000px;
//         }
//       `}} />
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="group relative p-8 rounded-2xl bg-slate-900/40 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60">
//       <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
//       <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
//     </div>
//   );
// }

// export default LandingPage;


// import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router'; 
// import { 
//   Code2, 
//   Terminal, 
//   Zap,
//   MousePointer2,
//   Trophy,
//   Lightbulb,
//   ArrowRight,
//   Github,
//   Heart,
//   Swords,
//   Sparkles
// } from 'lucide-react';

// // --- 1. DYNAMIC CODE DATABASE (Logic Preserved) ---
// const SNIPPETS = [
//   {
//     lang: 'python',
//     file: 'two_sum.py',
//     lines: [
//       { text: "def ", color: "text-purple-400" }, { text: "two_sum", color: "text-blue-400" }, { text: "(nums, target):", color: "text-slate-300" },
//       { text: "\n    lookup = {}", color: "text-slate-300" },
//       { text: "\n    for i, n in enumerate(nums):", color: "text-slate-300" },
//       { text: "\n        diff = target - n", color: "text-slate-300" },
//       { text: "\n        if diff in lookup:", color: "text-slate-300" },
//       { text: "\n            return [lookup[diff], i]", color: "text-purple-400" },
//       { text: "\n        lookup[n] = i", color: "text-slate-300" }
//     ],
//     output: "Success: [0, 1] found",
//     hasError: false
//   },
//   {
//     lang: 'javascript',
//     file: 'api_handler.js',
//     lines: [
//       { text: "const ", color: "text-purple-400" }, { text: "getData ", color: "text-blue-400" }, { text: "= async () => {", color: "text-slate-300" },
//       { text: "\n  try {", color: "text-purple-400" },
//       { text: "\n    const res = await api.get();", color: "text-slate-300" },
//       { text: "\n    console.log(data); ", color: "text-red-400" }, 
//       { text: "\n  } catch (e) { return null; }", color: "text-slate-300" },
//       { text: "\n}", color: "text-slate-300" }
//     ],
//     output: "ReferenceError: data is not defined",
//     hasError: true,
//     errorLineIndex: 5,
//     fix: "console.log(res.data);"
//   },
//   {
//     lang: 'cpp',
//     file: 'search.cpp',
//     lines: [
//       { text: "int ", color: "text-purple-400" }, { text: "binarySearch", color: "text-blue-400" }, { text: "(int arr[], int x) {", color: "text-slate-300" },
//       { text: "\n  int l = 0, r = n - 1;", color: "text-slate-300" },
//       { text: "\n  while (l <= r) {", color: "text-purple-400" },
//       { text: "\n    int m = l + (r - l) / 2;", color: "text-slate-300" },
//       { text: "\n    if (arr[m] == x) return m;", color: "text-purple-400" },
//       { text: "\n  }\n  return -1;", color: "text-purple-400" }
//     ],
//     output: "Binary search compiled. Target: 4",
//     hasError: false
//   }
// ];

// function LandingPage() {
//   const [snippetIdx, setSnippetIdx] = useState(0);
//   const [charProgress, setCharProgress] = useState(0);
//   const [status, setStatus] = useState('typing'); 
  
//   const current = SNIPPETS[snippetIdx];
//   const fullText = current.lines.map(l => l.text).join("");

//   // Logic for Typing and Errors (Preserved)
//   useEffect(() => {
//     let timer;
//     if (status === 'typing') {
//       if (charProgress < fullText.length) {
//         timer = setTimeout(() => setCharProgress(p => p + 1), 20);
//       } else {
//         if (current.hasError) {
//           setStatus('error');
//           setTimeout(() => setStatus('fixed'), 1500); 
//         } else {
//           setStatus('idle');
//         }
//         setTimeout(() => {
//           setSnippetIdx(prev => (prev + 1) % SNIPPETS.length);
//           setCharProgress(0);
//           setStatus('typing');
//         }, 4000);
//       }
//     }
//     return () => clearTimeout(timer);
//   }, [charProgress, status, snippetIdx, fullText.length, current.hasError]);

//   const renderCode = () => {
//     let currentTotal = 0;
//     return current.lines.map((line, i) => {
//       const visibleChars = Math.max(0, Math.min(line.text.length, charProgress - currentTotal));
//       currentTotal += line.text.length;
      
//       let displayText = line.text.slice(0, visibleChars);
//       if (status === 'fixed' && current.hasError && i === current.errorLineIndex) {
//         displayText = current.fix;
//       }
//       return <span key={i} className={line.color}>{displayText}</span>;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative scroll-auto">
      
//       {/* Background Ambience */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
//         <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
//       </div>

//       {/* --- Navbar --- */}
//       <nav className="relative z-50 w-full pt-6 px-6 container mx-auto flex items-center justify-between">
//         {/* Left: Branding */}
//         <div className="flex items-center gap-2 group cursor-pointer">
//           <div className="relative w-10 h-10 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
//             <Code2 className="w-5 h-5 text-cyan-400" />
//           </div>
//           <span className="text-xl font-bold tracking-tight text-white ">
//             Code<span className="text-cyan-500">Arena</span>
//           </span>
//         </div>

//         {/* Center: Classy Ticker */}
//         <div className="hidden lg:flex items-center gap-5 px-6 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md group hover:border-cyan-500/30 transition-all duration-300">
//             <div className="flex items-center gap-2">
//                 <Zap className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
//                 <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300 group-hover:text-white transition-colors">
//                     Ready for exciting code
//                 </span>
//             </div>
            
//             <div className="h-3 w-px bg-white/10"></div>
            
//             <div className="flex items-center gap-2">
//     <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
//         Make Coding Fun
//     </span>
//     {/* Swapped ≡ for a pulsing sparkle symbol */}
//     <span className="text-cyan-500 font-black text-lg animate-pulse drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
//         ✦
//     </span>
// </div>
            
//             <div className="h-3 w-px bg-white/10"></div>

//             <div className="flex items-center gap-2">
//                 <Swords className="w-3.5 h-3.5 text-rose-500 group-hover:rotate-12 transition-transform" />
//                 <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">
//                     Enter the Battles
//                 </span>
//             </div>
//         </div>

//         {/* Right: User Actions */}
//         <div className="flex items-center gap-4">
//           <NavLink to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
//             Sign In
//           </NavLink>
//           <NavLink to="/signup" className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-lg transition-all hover:scale-105">
//             Register
//           </NavLink>
//         </div>
//       </nav>

//       {/* --- Hero Section --- */}
//       <main className="relative z-10 container mx-auto px-6 pt-20 lg:pt-32 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           {/* Left Text */}
//           <div className="space-y-8 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
//               <Zap className="w-3 h-3 fill-current" />
//               <span>Platform v2.0 Live</span>
//             </div>
            
//             <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
//               Sharpen Your <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
//                 Coding Skills
//               </span>
//             </h1>
            
//             <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
//               Unlock your potential with <span className="text-white font-semibold ">CodeArena</span>. Solve, compete, and master the world's most challenging algorithms.
//             </p>

//             <div className="flex flex-wrap items-center gap-4">
//               <NavLink to="/signup" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2 group">
//                 Start Coding <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </NavLink>
//             </div>
//           </div>

//           {/* Right: Dynamic Code Panel */}
//           <div className="relative perspective-1000 hidden lg:block">
//             <div className={`relative z-10 rounded-2xl bg-[#0B1121]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl ${status === 'error' ? 'animate-shake border-red-500/50' : 'border-white/10'}`}>
              
//               <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-3 h-3 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-red-500/20 border border-red-500/50'}`}></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
//                 </div>
//                 <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{current.file}</div>
//               </div>

//               <div className="p-6 font-mono text-sm leading-relaxed min-h-[260px] flex">
//                 <div className="text-slate-600 text-right pr-4 select-none border-r border-white/5 mr-4 opacity-50">
//                   {Array.from({length: 9}).map((_, i) => <div key={i}>{i+1}</div>)}
//                 </div>
//                 <div className="whitespace-pre flex-1 relative">
//                   {renderCode()}
//                   <span className="inline-block w-2 h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
//                 </div>
//               </div>

//               <div className={`p-4 border-t border-white/5 font-mono text-xs transition-colors duration-500 ${status === 'error' ? 'bg-red-500/10' : 'bg-black/20'}`}>
//                 <div className="flex items-center gap-2 mb-1 text-slate-500">
//                   <Terminal className="w-3 h-3" />
//                   <span className="uppercase tracking-widest text-[9px]">Environment Output</span>
//                 </div>
//                 <div className={status === 'error' ? 'text-red-400' : 'text-emerald-400'}>
//                     {charProgress >= fullText.length ? `> ${current.output}` : '> Initializing runtime...'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
//           <MousePointer2 className="w-5 h-5 text-slate-400" />
//         </div>
//       </main>

//       {/* --- Feature Grid --- */}
//       <section className="relative z-10 container mx-auto px-6 py-24 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-bold text-white mb-4  tracking-wider">
//             Code<span className="text-cyan-500">Arena</span>
//           </h2>
//           <p className="text-slate-400 max-w-xl mx-auto">Master advanced techniques and build your career in software engineering.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <FeatureCard 
//             icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
//             title="Master Techniques"
//             description="Deep dive into data structures and complexity analysis with guided learning paths."
//           />
//           <FeatureCard 
//             icon={<Terminal className="w-6 h-6 text-purple-400" />}
//             title="Multi-Language Support"
//             description="Practice in Python, Java, C++, Go, and more with our optimized online IDE."
//           />
//           <FeatureCard 
//             icon={<Trophy className="w-6 h-6 text-cyan-400" />}
//             title="Global Leaderboards"
//             description="Measure your progress against developers worldwide in our weekly arena contests."
//           />
//         </div>
//       </section>

//       {/* --- Footer --- */}
//       <footer className="relative z-10 border-t border-white/5 py-12 bg-black/10 backdrop-blur-md">
//         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
//             <div className="flex items-center gap-2">
//                 <Code2 className="w-5 h-5 text-cyan-500" />
//                 <span className="text-sm font-bold text-white uppercase tracking-tighter">Code<span className="text-cyan-500">Arena</span></span>
//             </div>
            
//             <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
//                 Created with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by 
//                 <span className="text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer font-bold underline decoration-cyan-500/30 underline-offset-4 decoration-2">Sambhav Gupta</span>
//             </div>

//             <div className="flex items-center gap-4 text-slate-500">
//                 <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
//                 <span className="text-[10px] uppercase tracking-widest font-mono">© 2026 CodeArena</span>
//             </div>
//         </div>
//       </footer>

//       {/* Global CSS */}
//       <style dangerouslySetInnerHTML={{ __html: `
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           25% { transform: translateX(-6px); }
//           75% { transform: translateX(6px); }
//         }
//         .animate-shake {
//           animation: shake 0.2s ease-in-out infinite;
//         }
//         .perspective-1000 {
//           perspective: 1000px;
//         }
//       `}} />
//     </div>
//   );
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="group relative p-8 rounded-2xl bg-slate-900/40 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60">
//       <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
//         {icon}
//       </div>
//       <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
//       <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
//     </div>
//   );
// }

// export default LandingPage;


import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router'; 
import { 
  Code2, 
  Terminal, 
  Zap,
  MousePointer2,
  Trophy,
  Lightbulb,
  ArrowRight,
  Github,
  Heart,
  Swords,
  Sparkles,
  MessagesSquare,
  StickyNote,
  Bot,
  ShieldCheck,
  Cpu,
   Settings, 
  Smartphone, 
  PlayCircle, 
  Trash2, 
  BarChart3 
} from 'lucide-react';

// --- 1. DYNAMIC CODE DATABASE (Logic Preserved) ---
const SNIPPETS = [
  {
    lang: 'python',
    file: 'two_sum.py',
    lines: [
      { text: "def ", color: "text-purple-400" }, { text: "two_sum", color: "text-blue-400" }, { text: "(nums, target):", color: "text-slate-300" },
      { text: "\n    lookup = {}", color: "text-slate-300" },
      { text: "\n    for i, n in enumerate(nums):", color: "text-slate-300" },
      { text: "\n        diff = target - n", color: "text-slate-300" },
      { text: "\n        if diff in lookup:", color: "text-slate-300" },
      { text: "\n            return [lookup[diff], i]", color: "text-purple-400" },
      { text: "\n        lookup[n] = i", color: "text-slate-300" }
    ],
    output: "Success: [0, 1] found",
    hasError: false
  },
  {
    lang: 'javascript',
    file: 'api_handler.js',
    lines: [
      { text: "const ", color: "text-purple-400" }, { text: "getData ", color: "text-blue-400" }, { text: "= async () => {", color: "text-slate-300" },
      { text: "\n  try {", color: "text-purple-400" },
      { text: "\n    const res = await api.get();", color: "text-slate-300" },
      { text: "\n    console.log(data); ", color: "text-red-400" }, 
      { text: "\n  } catch (e) { return null; }", color: "text-slate-300" },
      { text: "\n}", color: "text-slate-300" }
    ],
    output: "ReferenceError: data is not defined",
    hasError: true,
    errorLineIndex: 5,
    fix: "console.log(res.data);"
  },
  {
    lang: 'cpp',
    file: 'search.cpp',
    lines: [
      { text: "int ", color: "text-purple-400" }, { text: "binarySearch", color: "text-blue-400" }, { text: "(int arr[], int x) {", color: "text-slate-300" },
      { text: "\n  int l = 0, r = n - 1;", color: "text-slate-300" },
      { text: "\n  while (l <= r) {", color: "text-purple-400" },
      { text: "\n    int m = l + (r - l) / 2;", color: "text-slate-300" },
      { text: "\n    if (arr[m] == x) return m;", color: "text-purple-400" },
      { text: "\n  }\n  return -1;", color: "text-purple-400" }
    ],
    output: "Binary search compiled. Target: 4",
    hasError: false
  }
];

function LandingPage() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [charProgress, setCharProgress] = useState(0);
  const [status, setStatus] = useState('typing'); 
  
  const current = SNIPPETS[snippetIdx];
  const fullText = current.lines.map(l => l.text).join("");

  useEffect(() => {
    let timer;
    if (status === 'typing') {
      if (charProgress < fullText.length) {
        timer = setTimeout(() => setCharProgress(p => p + 1), 20);
      } else {
        if (current.hasError) {
          setStatus('error');
          setTimeout(() => setStatus('fixed'), 1500); 
        } else {
          setStatus('idle');
        }
        setTimeout(() => {
          setSnippetIdx(prev => (prev + 1) % SNIPPETS.length);
          setCharProgress(0);
          setStatus('typing');
        }, 4000);
      }
    }
    return () => clearTimeout(timer);
  }, [charProgress, status, snippetIdx, fullText.length, current.hasError]);

  const renderCode = () => {
    let currentTotal = 0;
    return current.lines.map((line, i) => {
      const visibleChars = Math.max(0, Math.min(line.text.length, charProgress - currentTotal));
      currentTotal += line.text.length;
      
      let displayText = line.text.slice(0, visibleChars);
      if (status === 'fixed' && current.hasError && i === current.errorLineIndex) {
        displayText = current.fix;
      }
      return <span key={i} className={line.color}>{displayText}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans overflow-x-hidden relative scroll-auto">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="relative z-50 w-full pt-6 px-4 md:px-6 container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding */}
        <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-10 h-10 bg-slate-800 border border-white/10 rounded-xl flex items-center justify-center shadow-lg group-hover:border-cyan-500/50 transition-colors">
                <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white ">
                Code<span className="text-cyan-500">Arena</span>
            </span>
            </div>
            {/* Mobile Actions Only */}
            <div className="flex md:hidden gap-3">
                 <NavLink to="/signup" className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-xs font-bold shadow-lg">Join</NavLink>
            </div>
        </div>

        {/* Center: Classy Ticker - Now visible on mobile via scroll */}
       <div className="flex items-center gap-2.5 md:gap-5 px-3 md:px-6 py-2 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md group hover:border-cyan-500/30 transition-all duration-300 max-w-[92%] md:max-w-full mx-auto overflow-x-auto no-scrollbar whitespace-nowrap">
    {/* Item 1 */}
    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-cyan-500 animate-pulse" />
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-[0.15em] text-slate-300">
            Ready to Code
        </span>
    </div>
    
    <div className="h-3 w-px bg-white/10 shrink-0"></div>
    
    {/* Item 2 */}
    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-[0.15em] text-slate-400">
            Pure Fun
        </span>
        <span className="text-cyan-500 font-black text-base md:text-lg animate-pulse">✦</span>
    </div>
    
    <div className="h-3 w-px bg-white/10 shrink-0"></div>

    {/* Item 3 */}
    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <Swords className="w-3 h-3 md:w-3.5 md:h-3.5 text-rose-500" />
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider md:tracking-[0.15em] text-slate-300">
            Join Battles
        </span>
    </div>
</div>

        {/* Right: User Actions (Hidden on mobile navbar to save space, but added to mobile hero) */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Sign In</NavLink>
          <NavLink to="/signup" className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-lg transition-all hover:scale-105">Register</NavLink>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10 container mx-auto px-6 pt-12 lg:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
              <Zap className="w-3 h-3 fill-current" />
              <span>Platform v2.0 Live</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
              Sharpen Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Coding Skills
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Unlock your potential with <span className="text-white font-semibold ">CodeArena</span>. Solve, compete, and master the world's most challenging algorithms.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <NavLink to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group">
                Start Coding <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
            </div>
          </div>

          {/* Right: Dynamic Code Panel - Now visible on all screens */}
          <div className="relative perspective-1000 w-full max-w-xl mx-auto lg:max-w-none">
            <div className={`relative z-10 rounded-2xl bg-[#0B1121]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl ${status === 'error' ? 'animate-shake border-red-500/50' : 'border-white/10'}`}>
              
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-red-500/20 border border-red-500/50'}`}></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{current.file}</div>
              </div>

              <div className="p-4 md:p-6 font-mono text-[11px] md:text-sm leading-relaxed min-h-[200px] md:min-h-[260px] flex overflow-x-auto">
                <div className="text-slate-600 text-right pr-3 md:pr-4 select-none border-r border-white/5 mr-3 md:mr-4 opacity-50 shrink-0">
                  {Array.from({length: 8}).map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <div className="whitespace-pre flex-1 relative">
                  {renderCode()}
                  <span className="inline-block w-1.5 h-3.5 md:w-2 md:h-4 bg-cyan-500 ml-1 animate-pulse align-middle"></span>
                </div>
              </div>

              <div className={`p-3 md:p-4 border-t border-white/5 font-mono text-[10px] md:text-xs transition-colors duration-500 ${status === 'error' ? 'bg-red-500/10' : 'bg-black/20'}`}>
                <div className="flex items-center gap-2 mb-1 text-slate-500">
                  <Terminal className="w-3 h-3" />
                  <span className="uppercase tracking-widest text-[8px] md:text-[9px]">Output</span>
                </div>
                <div className={status === 'error' ? 'text-red-400' : 'text-emerald-400'}>
                    {charProgress >= fullText.length ? `> ${current.output}` : '> Initializing...'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-30 animate-bounce">
          <MousePointer2 className="w-5 h-5 text-slate-400" />
        </div>
      </main>

      {/* --- Feature Grid --- */}
      <section className="relative z-10 container mx-auto px-6 py-20 border-t border-white/5 bg-[#020617]/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wider">
            Elite <span className="text-cyan-500">Features</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Tools designed to bridge the gap between hobbyist and professional engineer.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<MessagesSquare className="w-6 h-6 text-cyan-400" />}
            title="Real-time Chat Rooms"
            description="Connect with fellow developers in language-specific lounges or private project rooms."
          />
          <FeatureCard 
            icon={<StickyNote className="w-6 h-6 text-yellow-400" />}
            title="Notes & Scribble Pad"
            description="Draft logic, sketch diagrams, and save code snippets directly inside your coding workspace."
          />
          <FeatureCard 
            icon={<Bot className="w-6 h-6 text-purple-400" />}
            title="AI Code Assistant"
            description="Get instant hints, explain complex functions, or debug errors with our fine-tuned AI mentor."
          />
          <FeatureCard 
            icon={<Swords className="w-6 h-6 text-rose-500" />}
            title="Arena Battles"
            description="Compete 1v1 or in team sprints to solve challenges under pressure for exclusive ranks."
          />
          <FeatureCard 
  icon={<Settings className="w-6 h-6 text-purple-400" />}
  title="Admin Control Panel"
  description="Manage problems, update content, upload videos, and monitor platform activity with full control."
/>

<FeatureCard 
  icon={<Smartphone className="w-6 h-6 text-green-400" />}
  title="Mobile Friendly Coding"
  description="Seamlessly practice and review code on mobile devices with a responsive and optimized interface."
/>

<FeatureCard 
  icon={<Code2 className="w-6 h-6 text-blue-400" />}
  title="Multi-Language Support"
  description="Code in C++, Java, Python, JavaScript and more with built-in compiler support."
/>


<FeatureCard 
  icon={<BarChart3 className="w-6 h-6 text-yellow-400" />}
  title="Performance Tracking"
  description="Analyze your progress with detailed stats, submission history, and accuracy insights."
/>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-black/10 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-cyan-500" />
                    <span className="text-sm font-bold text-white uppercase tracking-tighter">Code<span className="text-cyan-500">Arena</span></span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">EST. 2026 • BUILT FOR SPEED</p>
            </div>
            
            {/* <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                Created with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by 
                <span className="text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer font-bold underline decoration-cyan-500/30 underline-offset-4 decoration-2">Sambhav Gupta</span>
            </div> */}

            <div className="flex items-center gap-4 text-slate-500">
                <Github className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                <span className="text-[10px] uppercase tracking-widest font-mono">© 2026 CodeArena</span>
            </div>
        </div>
      </footer>

      {/* Global CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative p-6 md:p-8 rounded-2xl bg-slate-900/40 border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60 hover:border-cyan-500/20">
      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:bg-slate-800/80 transition-all">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default LandingPage;
