import { useState } from 'react';
import { Copy, Check, Code2, Lock, FileCode, Terminal } from 'lucide-react';

const Solutions = ({ solutions }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // 1. Empty / Locked State
  if (!solutions || solutions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"></div>
          <div className="relative w-16 h-16 bg-[#0B1121] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <Lock className="w-8 h-8 text-slate-500" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-2">Solutions Locked</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
          Solve the problem to unlock the official reference solutions, or wait for the editorial to be released.
        </p>
      </div>
    );
  }

  // 2. Solutions List
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" /> 
          Official Solutions
        </h2>
        <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
          {solutions.length} Available
        </span>
      </div>

      {solutions.map((solution, index) => (
        <div 
          key={index} 
          className="group relative bg-[#0B1121] border border-white/10 rounded-xl overflow-hidden shadow-sm hover:border-cyan-500/30 transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#020617]/50 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-200">
                {solution.language || 'Unknown Language'}
              </span>
            </div>
            
            <button
              onClick={() => handleCopy(solution.completeCode, index)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Block */}
          <div className="relative group-hover:bg-[#020617]/30 transition-colors">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <pre className="p-5 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300 custom-scrollbar">
              <code>{solution.completeCode}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Solutions;