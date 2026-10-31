

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Editor from "@monaco-editor/react";
import { useParams, NavLink } from "react-router"; 
import axiosClient from "../utils/axiosClient";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';
import NotesPanel from '../components/NotesPanel';
import { useNavigate } from 'react-router'; 
import Solutions from "../components/Solution";
import { 
  Play, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  FileText, 
  MessageSquare, 
  List, 
  Clock, 
  Cpu, 
  Code2, 
  Maximize2,
  AlertTriangle,
  VideoOff
} from "lucide-react";

const langMap = {
  cpp: "C++",
  java: "Java",
  javascript: "JavaScript",
};

const ProblemPage = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState("code");
  
  // Mobile-specific state to toggle between Problem view and Editor view
  const [mobileView, setMobileView] = useState("problem"); 

  const editorRef = useRef(null);
  let { problemId } = useParams();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );
        const initialCode = response.data.startCode.find(
          (sc) => sc.language === langMap[selectedLanguage],
        ).initialCode;
        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const startCodeObj = problem.startCode.find(
        (sc) => sc.language === langMap[selectedLanguage],
      );
      if (startCodeObj) {
        setCode(startCodeObj.initialCode);
      }
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    monaco.editor.defineTheme("pro-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "22d3ee" },
        { token: "string", foreground: "34d399" },
        { token: "number", foreground: "a78bfa" },
        { token: "type", foreground: "fbbf24" },
      ],
      colors: {
        "editor.background": "#02061700",
        "editor.foreground": "#e2e8f0",
        "editorLineNumber.foreground": "#334155",
        "editorLineNumber.activeForeground": "#22d3ee",
        "editor.lineHighlightBackground": "#1e293b40",
        "editor.selectionBackground": "#22d3ee20",
        "editorCursor.foreground": "#22d3ee",
        "editorIndentGuide.background": "#1e293b",
        "editorIndentGuide.activeBackground": "#334155",
      },
    });

    monaco.editor.setTheme("pro-dark");
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage,
      });
      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab("testcase");
    } catch (error) {
      console.error("Error running code:", error);
      const backendMessage = error.response?.data?.message || error.response?.data?.error || "Internal server error";
      setRunResult({ success: false, error: backendMessage });
      setLoading(false);
      setActiveRightTab("testcase");
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    try {
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code,
          language: selectedLanguage,
        },
      );
      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab("result");
    } catch (error) {
      console.error("Error submitting code:", error);
      const backendMessage = error.response?.data?.message || error.response?.data?.error || "Submission failed due to server error";
      setSubmitResult({ accepted: false, error: backendMessage });
      setLoading(false);
      setActiveRightTab("result");
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "javascript": return "javascript";
      case "java": return "java";
      case "cpp": return "cpp";
      default: return "javascript";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
      case "medium": return "text-amber-400 border-amber-500/20 bg-amber-500/10";
      case "hard": return "text-rose-400 border-rose-500/20 bg-rose-500/10";
      default: return "text-slate-400 border-slate-500/20 bg-slate-500/10";
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center h-screen w-full relative z-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <span className="text-cyan-500 font-mono text-xs tracking-widest animate-pulse">
            LOADING IDE...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden text-slate-300 font-sans relative z-10">
      
      {/* MOBILE NAVIGATION BAR */}
      <div className="lg:hidden flex items-center justify-center p-2 bg-[#020617] border-b border-white/5 gap-2">
        <button 
          onClick={() => setMobileView("problem")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${mobileView === "problem" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-500"}`}
        >
          <FileText className="w-4 h-4" /> Problem
        </button>
        <button 
          onClick={() => setMobileView("code")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${mobileView === "code" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-500"}`}
        >
          <Code2 className="w-4 h-4" /> Code Editor
        </button>
      </div>

      {/* --- Left Panel (Content) --- */}
      <div className={`${mobileView === "problem" ? "flex" : "hidden"} lg:flex w-full lg:w-1/2 flex-col border-r border-white/5 bg-[#0B1121]/60 backdrop-blur-md h-full`}>
        <div className="flex items-center bg-[#020617]/50 border-b border-white/5 pr-2">
          <NavLink
            to="/"
            className="flex items-center justify-center w-12 h-[46px] border-r border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <Code2 className="w-5 h-5" />
          </NavLink>

          <div className="flex items-center overflow-x-auto no-scrollbar flex-1">
            <TabButton active={activeLeftTab === "description"} onClick={() => setActiveLeftTab("description")} icon={<FileText className="w-4 h-4" />} label="Description" />
            <TabButton active={activeLeftTab === "editorial"} onClick={() => setActiveLeftTab("editorial")} icon={<List className="w-4 h-4" />} label="Editorial" />
            <TabButton active={activeLeftTab === "solutions"} onClick={() => setActiveLeftTab("solutions")} icon={<Code2 className="w-4 h-4" />} label="Solutions" />
            <TabButton active={activeLeftTab === "submissions"} onClick={() => setActiveLeftTab("submissions")} icon={<Clock className="w-4 h-4" />} label="Submissions" />
            <TabButton active={activeLeftTab === 'notes'} onClick={() => setActiveLeftTab('notes')} icon={<Clock className="w-4 h-4" />} label="Notes" />
            <TabButton active={activeLeftTab === 'chatAI'} onClick={() => setActiveLeftTab('chatAI')} icon={<MessageSquare className="w-4 h-4" />} label="AI Assistant" isSpecial />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar scroll-smooth">
          {problem && (
            <>
              {activeLeftTab === "description" && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-3">{problem.title}</h1>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty ? problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1) : "Unknown"}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {problem.tags}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none prose-p:text-slate-300">
                    <div className="whitespace-pre-wrap text-sm leading-7">{problem.description}</div>
                  </div>
                  <div className="mt-8 space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-cyan-400" /> Examples
                    </h3>
                    {problem.visibleTestCases.map((example, index) => (
                      <div key={index} className="bg-slate-900/50 border border-white/5 rounded-xl overflow-hidden">
                        <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400">Example {index + 1}</span>
                        </div>
                        <div className="p-4 space-y-3 font-mono text-sm">
                          <div>
                            <span className="text-slate-500 block text-xs uppercase font-bold mb-1">Input</span>
                            <div className="bg-[#020617]/80 p-3 rounded-lg border border-white/5 text-slate-300">{example.input}</div>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-xs uppercase font-bold mb-1">Output</span>
                            <div className="bg-[#020617]/80 p-3 rounded-lg border border-white/5 text-emerald-400">{example.output}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeLeftTab === "editorial" && (
                <div className="prose prose-invert max-w-none animate-in fade-in h-full">
                  <h2 className="text-xl font-bold mb-6 text-white">Video Editorial</h2>
                  {problem.secureUrl && problem.secureUrl.trim().length > 0 ? (
                    <Editorial
                      secureUrl={problem.secureUrl}
                      thumbnailUrl={problem.thumbnailUrl}
                      duration={problem.duration}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02] text-center px-4">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                        <VideoOff className="w-8 h-8 text-slate-500" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">Video not uploaded yet by admin</h3>
                      <p className="text-slate-500 text-sm max-w-xs">
                        The video walkthrough for this problem is currently being prepared. Check back later!
                      </p>
                    </div>
                  )}
                </div>
              )}
              {activeLeftTab === "solutions" && <Solutions solutions={problem.referenceSolution} />}
              {activeLeftTab === "submissions" && <SubmissionHistory problemId={problemId} />}
              {activeLeftTab === 'notes' && (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in space-y-6">
                  <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                    <Maximize2 className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="max-w-xs">
                    <h2 className="text-xl font-bold text-white mb-2">Problem Scratchpad</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">Stable workspace for logic and dry-runs.</p>
                    <p className="mt-3 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-md px-3 py-2">
    ⚠️ Works best on desktop for an optimal experience.
  </p>
                  </div>
                  <button onClick={() => navigate(`/problem/${problemId}/notes`)} className="group flex items-center gap-3 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all">
                    Open Fullscreen Workspace
                  </button>
                </div>
              )}
              {activeLeftTab === "chatAI" && <ChatAi problem={problem} />}
            </>
          )}
        </div>
      </div>

      {/* --- Right Panel (IDE) --- */}
      <div className={`${mobileView === "code" ? "flex" : "hidden"} lg:flex w-full lg:w-1/2 flex-col relative bg-[#020617]/40 backdrop-blur-sm h-full`}>
        <div className="h-[47px] border-b border-white/5 flex items-center justify-between px-4 bg-[#020617]/50">
          <div className="flex items-center gap-1 bg-slate-900/50 p-1 rounded-lg border border-white/5">
            {["javascript", "java", "cpp"].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${selectedLanguage === lang ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-500 hover:text-slate-300"}`}
              >
                {lang === "cpp" ? "C++" : lang === "javascript" ? "JS" : "Java"}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 relative">
          <Editor
            height="100%"
            language={getLanguageForMonaco(selectedLanguage)}
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            theme="pro-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 2, wordWrap: "on" }}
          />
        </div>

        {/* Bottom Panel (Console/Result) */}
        <div className="h-1/3 border-t border-white/5 bg-[#0B1121]/80 backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#020617]/50">
            <div className="flex gap-4">
              <button onClick={() => setActiveRightTab("testcase")} className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeRightTab === "testcase" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}><Terminal className="w-3.5 h-3.5" /> Testcase</button>
              <button onClick={() => setActiveRightTab("result")} className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${activeRightTab === "result" ? "text-white" : "text-slate-500 hover:text-slate-300"}`}><FileText className="w-3.5 h-3.5" /> Result</button>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleRun} disabled={loading} className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all flex items-center gap-2 disabled:opacity-50">
                {loading ? <span className="loading loading-spinner loading-xs"></span> : <Play className="w-3 h-3 fill-current" />} Run
              </button>
              <button onClick={handleSubmitCode} disabled={loading} className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
                {loading ? <span className="loading loading-spinner loading-xs"></span> : <Send className="w-3 h-3" />} Submit
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar font-mono text-sm">
            {activeRightTab === "testcase" && (
              <div className="space-y-4">
                {!runResult ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 pt-8">
                    <Terminal className="w-8 h-8 mb-2" />
                    <p className="text-xs">Run code to see output</p>
                  </div>
                ) : runResult.error ? (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl animate-in fade-in">
                    <div className="flex items-center gap-3 text-rose-400 font-bold mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>API Error</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{runResult.error}</p>
                  </div>
                ) : (
                  <div className="animate-in fade-in">
                    <div className={`flex items-center gap-2 mb-4 font-bold ${runResult.success ? "text-emerald-400" : "text-rose-400"}`}>
                      {runResult.success ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      {runResult.success ? "All Test Cases Passed" : "Execution Error"}
                    </div>
                    <div className="space-y-4">
                      {runResult.testCases?.map((tc, i) => (
                        <div key={i} className="bg-[#020617]/50 border border-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-500 font-bold uppercase">Case {i + 1}</span>
                            <span className={`text-xs font-bold ${tc.status_id === 3 ? "text-emerald-500" : "text-rose-500"}`}>{tc.status_id === 3 ? "PASSED" : "FAILED"}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div><span className="text-slate-600 block mb-1">Input</span><div className="text-slate-300 bg-black/20 p-2 rounded">{tc.stdin}</div></div>
                            <div><span className="text-slate-600 block mb-1">Output</span><div className="text-slate-300 bg-black/20 p-2 rounded">{tc.stdout}</div></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeRightTab === "result" && (
              <div className="space-y-4">
                {!submitResult ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 pt-8">
                    <Send className="w-8 h-8 mb-2" />
                    <p className="text-xs">Submit to see results</p>
                  </div>
                ) : submitResult.error ? (
                  <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl animate-in fade-in">
                    <div className="flex items-center gap-3 text-rose-400 font-bold mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Submission Failed</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{submitResult.error}</p>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom-2">
                    <div className={`p-4 rounded-xl border ${submitResult.accepted ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"}`}>
                      <h4 className={`text-xl font-bold flex items-center gap-3 ${submitResult.accepted ? "text-emerald-400" : "text-rose-400"}`}>
                        {submitResult.accepted ? "Accepted" : "Wrong Answer"}
                      </h4>
                      <div className="flex gap-6 mt-4 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-400" /><span>{submitResult.runtime || "N/A"}</span></div>
                        <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-purple-400" /><span>{submitResult.memory || "N/A"} KB</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, isSpecial }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 whitespace-nowrap
      ${active ? "border-cyan-500 text-white bg-white/[0.02]" : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]"}
      ${isSpecial ? "text-purple-400 hover:text-purple-300" : ""}`}
  >
    {icon} {label}
  </button>
);

export default ProblemPage;
