import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { CheckCircle2, XCircle, Clock, FileCode, X, AlertCircle } from 'lucide-react';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': 
        return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <CheckCircle2 className="w-4 h-4" /> };
      case 'wrong': 
        return { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: <XCircle className="w-4 h-4" /> };
      case 'error': 
        return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: <AlertCircle className="w-4 h-4" /> };
      default: 
        return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: <Clock className="w-4 h-4" /> };
    }
  };

  const formatMemory = (memory) => {
    if (!memory) return 'N/A';
    if (memory < 1024) return `${memory} KB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2 text-sm">
        <AlertCircle className="w-4 h-4" /> {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.02] rounded-xl border border-white/5">
          <FileCode className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No submissions yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/5 bg-[#020617]/50 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase font-bold text-slate-500">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3 hidden sm:table-cell">Runtime</th>
                <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 text-right">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {submissions.map((sub) => {
                const status = getStatusConfig(sub.status);
                return (
                  <tr key={sub._id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.color} ${status.border}`}>
                        {status.icon}
                        <span className="capitalize">{sub.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">
                        {sub.language}
                    </td>
                    <td className="px-4 py-3 text-slate-400 hidden sm:table-cell font-mono text-xs">
                      {sub.runtime ? `${sub.runtime}s` : '-'}
                    </td>
                    <td className="px-4 py-3 text-slate-500 hidden sm:table-cell text-xs">
                      {formatDate(sub.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => setSelectedSubmission(sub)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        title="View Code"
                      >
                        <FileCode className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Code Modal - Floating Glass Window */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl bg-[#0B1121] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#020617]">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Submission Details
                  <span className={`text-xs px-2 py-0.5 rounded border ${getStatusConfig(selectedSubmission.status).color} ${getStatusConfig(selectedSubmission.status).border} bg-transparent`}>
                    {selectedSubmission.status.toUpperCase()}
                  </span>
                </h3>
                <div className="flex gap-4 mt-1 text-xs text-slate-400 font-mono">
                    <span>Lang: {selectedSubmission.language}</span>
                    <span>Time: {selectedSubmission.runtime}s</span>
                    <span>Mem: {formatMemory(selectedSubmission.memory)}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message if any */}
            {selectedSubmission.errorMessage && (
                <div className="px-6 py-3 bg-rose-500/10 border-b border-rose-500/20 text-rose-300 text-xs font-mono whitespace-pre-wrap">
                    {selectedSubmission.errorMessage}
                </div>
            )}

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-6 bg-[#0B1121] custom-scrollbar">
              <pre className="font-mono text-sm text-slate-300 leading-relaxed">
                <code>{selectedSubmission.code}</code>
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#020617] flex justify-end">
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-white/5"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;