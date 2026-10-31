// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../utils/axiosClient";
// import { Send, Bot, User, Sparkles, Trash2, StopCircle } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';

// function ChatAi({ problem }) {
//     // Unique key for local storage based on problem ID
//     const storageKey = `chat_history_${problem?._id}`;

//     // Initialize state from local storage or default
//     const [messages, setMessages] = useState(() => {
//         const saved = localStorage.getItem(storageKey);
//         return saved ? JSON.parse(saved) : [
//             { role: 'model', parts: [{ text: `Hi! I'm here to help you with "${problem?.title || 'this problem'}". Ask me for a hint, explanation, or help with debugging!` }] }
//         ];
//     });
    
//     const [isLoading, setIsLoading] = useState(false);
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const messagesEndRef = useRef(null);

//     // Save to local storage whenever messages change
//     useEffect(() => {
//         if (problem?._id) {
//             localStorage.setItem(storageKey, JSON.stringify(messages));
//         }
//     }, [messages, problem, storageKey]);

//     // Auto-scroll to bottom
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages, isLoading]);

//     const handleClearChat = () => {
//         const defaultMsg = [{ role: 'model', parts: [{ text: "Chat cleared. How can I help?" }] }];
//         setMessages(defaultMsg);
//         localStorage.setItem(storageKey, JSON.stringify(defaultMsg));
//     };

//     const onSubmit = async (data) => {
//         const userMessage = { role: 'user', parts: [{ text: data.message }] };
//         const newMessages = [...messages, userMessage];
        
//         setMessages(newMessages);
//         reset();
//         setIsLoading(true);

//         try {
//             const response = await axiosClient.post("/ai/chat", {
//                 messages: newMessages,
//                 title: problem.title,
//                 description: problem.description,
//                 testCases: problem.visibleTestCases,
//                 startCode: problem.startCode
//             });

//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts: [{ text: response.data.message }] 
//             }]);
//         } catch (error) {
//             console.error("API Error:", error);
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts: [{ text: "**Error:** I'm having trouble connecting right now. Please try again." }] 
//             }]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col h-full bg-[#0B1121]/50 relative">
            
//             {/* --- Chat Header --- */}
//             <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#020617]/80 backdrop-blur-sm sticky top-0 z-10">
//                 <div className="flex items-center gap-3">
//                     <div className="relative">
//                         <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-20"></div>
//                         <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
//                             <Bot className="w-5 h-5 text-cyan-400" />
//                         </div>
//                     </div>
//                     <div>
//                         <h3 className="font-bold text-sm text-white">AI Copilot</h3>
//                         <p className="text-[10px] text-cyan-400/70 font-mono">ONLINE</p>
//                     </div>
//                 </div>
//                 <button 
//                     onClick={handleClearChat}
//                     className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
//                     title="Clear History"
//                 >
//                     <Trash2 className="w-4 h-4" />
//                 </button>
//             </div>

//             {/* --- Messages Area --- */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
//                 {messages.map((msg, index) => (
//                     <div 
//                         key={index} 
//                         className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
//                     >
//                         {/* Avatar */}
//                         <div className="flex-shrink-0 mt-1">
//                             {msg.role === "user" ? (
//                                 <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center">
//                                     <User className="w-4 h-4 text-slate-300" />
//                                 </div>
//                             ) : (
//                                 <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
//                                     <Sparkles className="w-4 h-4 text-cyan-400" />
//                                 </div>
//                             )}
//                         </div>

//                         {/* Bubble */}
//                         <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
//                             <span className="text-[10px] text-slate-500 mb-1 px-1">
//                                 {msg.role === "user" ? "You" : "Assistant"}
//                             </span>
//                             <div 
//                                 className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
//                                     msg.role === "user" 
//                                         ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm" 
//                                         : "bg-[#1E293B]/80 border border-white/5 text-slate-200 rounded-tl-sm backdrop-blur-sm"
//                                 }`}
//                             >
//                                 {msg.role === "user" ? (
//                                     <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
//                                 ) : (
//                                     <div className="prose prose-invert prose-sm max-w-none prose-p:leading-6 prose-pre:bg-[#020617] prose-pre:border prose-pre:border-white/10 prose-code:text-cyan-300 prose-a:text-blue-400">
//                                         <ReactMarkdown>
//                                             {msg.parts[0].text}
//                                         </ReactMarkdown>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}

//                 {isLoading && (
//                     <div className="flex gap-3">
//                         <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mt-1">
//                             <Bot className="w-4 h-4 text-cyan-400" />
//                         </div>
//                         <div className="bg-[#1E293B]/80 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
//                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
//                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
//                             <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
//                         </div>
//                     </div>
//                 )}
//                 <div ref={messagesEndRef} />
//             </div>

//             {/* --- Input Area --- */}
//             <div className="p-4 bg-[#020617]/80 backdrop-blur-md border-t border-white/5">
//                 <form 
//                     onSubmit={handleSubmit(onSubmit)} 
//                     className="relative flex items-center"
//                 >
//                     <input 
//                         placeholder={isLoading ? "AI is thinking..." : "Type your question..."}
//                         className="w-full bg-[#1E293B]/50 border border-white/10 text-slate-200 placeholder-slate-500 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
//                         {...register("message", { required: true })}
//                         disabled={isLoading}
//                         autoComplete="off"
//                     />
//                     <button 
//                         type="submit" 
//                         disabled={errors.message || isLoading}
//                         className="absolute right-2 p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-0 disabled:scale-75"
//                     >
//                         {isLoading ? <StopCircle className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
//                     </button>
//                 </form>
//                 <div className="text-center mt-2">
//                     <p className="text-[10px] text-slate-600">AI can make mistakes. Review generated code.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChatAi;

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send, Bot, User, Sparkles, Trash2, StopCircle, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // Required to render our custom quote spans

function ChatAi({ problem }) {
    const storageKey = `chat_history_${problem?._id}`;

    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [
            { role: 'model', parts: [{ text: `Hi! I'm your AI Copilot. I've analyzed "${problem?.title || 'this problem'}". How can I assist your logic today?` }] }
        ];
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (problem?._id) {
            localStorage.setItem(storageKey, JSON.stringify(messages));
        }
    }, [messages, problem, storageKey]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleClearChat = () => {
        const defaultMsg = [{ role: 'model', parts: [{ text: "Context reset. Ready for new questions." }] }];
        setMessages(defaultMsg);
        localStorage.setItem(storageKey, JSON.stringify(defaultMsg));
    };

    // Helper to highlight text within quotes
    const formatMessage = (text) => {
        // This regex finds text between quotes and wraps it in a styled span
        return text.replace(/"([^"]*)"/g, '<span class="text-cyan-400 font-bold italic">"$1"</span>');
    };

    const onSubmit = async (data) => {
        const userMessage = { role: 'user', parts: [{ text: data.message }] };
        const newMessages = [...messages, userMessage];
        
        setMessages(newMessages);
        reset();
        setIsLoading(true);

        try {
            const response = await axiosClient.post("/ai/chat", {
                messages: newMessages,
                title: problem.title,
                description: problem.description,
                testCases: problem.visibleTestCases,
                startCode: problem.startCode
            });

            setMessages(prev => [...prev, { 
                role: 'model', 
                parts: [{ text: response.data.message }] 
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'model', 
                parts: [{ text: "**System Error:** Connection timed out. Please verify your network and try again." }] 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#020617] border-l border-white/5 relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-[#020617]/95 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-100 tracking-tight">AI Debugger</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Active Session</span>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleClearChat}
                    className="group p-2 rounded-md hover:bg-rose-500/10 transition-all duration-200"
                    title="Clear History"
                >
                    <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-rose-400" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/[0.03] via-transparent to-transparent">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        {/* Avatar */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center shadow-2xl ${
                            msg.role === "user" 
                            ? "bg-slate-800 border-white/10" 
                            : "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30"
                        }`}>
                            {msg.role === "user" ? <User className="w-4 h-4 text-slate-400" /> : <Sparkles className="w-4 h-4 text-cyan-400" />}
                        </div>

                        {/* Bubble Container */}
                        <div className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                            <div 
                                className={`relative group px-4 py-3 rounded-2xl text-[13px] leading-relaxed transition-all duration-200 ${
                                    msg.role === "user" 
                                    ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-none shadow-[0_10px_20px_-10px_rgba(6,182,212,0.3)]" 
                                    : "bg-[#1E293B]/40 border border-white/5 text-slate-200 rounded-tl-none backdrop-blur-md shadow-xl"
                                }`}
                            >
                                {msg.role === "user" ? (
                                    <p className="whitespace-pre-wrap font-medium">{msg.parts[0].text}</p>
                                ) : (
                                    <div className="prose prose-invert prose-sm max-w-none 
                                        prose-p:text-slate-300 prose-p:leading-relaxed
                                        prose-code:text-cyan-300 prose-code:bg-slate-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                                        prose-pre:bg-[#020617] prose-pre:border prose-pre:border-white/5 prose-pre:shadow-2xl
                                        prose-strong:text-white">
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                            {formatMessage(msg.parts[0].text)}
                                        </ReactMarkdown>
                                    </div>
                                )}
                            </div>
                            <span className="mt-2 text-[9px] font-mono text-slate-600 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                {msg.role === "user" ? "Verified User" : "Copilot Core v3.0"}
                            </span>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="bg-[#1E293B]/40 border border-white/5 px-5 py-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"></span>
                            </div>
                            <span className="text-[11px] text-cyan-500/50 font-mono tracking-widest uppercase">Analyzing Code</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-[#020617]/95 border-t border-white/5 backdrop-blur-xl relative z-10">
                <form 
                    onSubmit={handleSubmit(onSubmit)} 
                    className="relative group"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                    
                    <div className="relative flex items-center">
                        <input 
                            placeholder={isLoading ? "Generating response..." : "Describe your logic or ask for a hint..."}
                            className="w-full bg-[#0F172A] border border-white/10 text-slate-200 placeholder-slate-600 rounded-xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:border-cyan-500/40 focus:ring-0 transition-all disabled:opacity-50 shadow-inner"
                            {...register("message", { required: true })}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`absolute right-2.5 p-2.5 rounded-lg transition-all duration-300 ${
                                isLoading 
                                ? "bg-slate-800 text-slate-500" 
                                : "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95"
                            }`}
                        >
                            {isLoading ? <StopCircle className="w-4 h-4 animate-spin-slow" /> : <Send className="w-4 h-4" />}
                        </button>
                    </div>
                </form>
                <div className="flex justify-between items-center mt-3 px-1">
                    <p className="text-[10px] text-slate-600 font-medium">Shift + Enter for new line</p>
                    <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                        <p className="text-[10px] text-slate-600 font-medium uppercase tracking-tighter">AI may hallucinate code</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatAi;