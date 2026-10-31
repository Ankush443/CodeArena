// import { useEffect, useState } from 'react';
// import axiosClient from '../utils/axiosClient'
// import { NavLink } from 'react-router';

// const AdminVideo = () => {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   const fetchProblems = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axiosClient.get('/problem/getAllProblem');
//       setProblems(data);
//     } catch (err) {
//       setError('Failed to fetch problems');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this problem?')) return;
    
//     try {
//       await axiosClient.delete(`/video/delete/${id}`);
//       setProblems(problems.filter(problem => problem._id !== id));
//     } catch (err) {
//       setError(err);
//       console.log(err);
//     }
//   };


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-error shadow-lg my-4">
//         <div>
//           <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{error.response.data.error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Video Upload and Delete</h1>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th className="w-1/12">#</th>
//               <th className="w-4/12">Title</th>
//               <th className="w-2/12">Difficulty</th>
//               <th className="w-3/12">Tags</th>
//               <th className="w-2/12">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problems.map((problem, index) => (
//               <tr key={problem._id}>
//                 <th>{index + 1}</th>
//                 <td>{problem.title}</td>
//                 <td>
//                   <span className={`badge ${
//                     problem.difficulty === 'Easy' 
//                       ? 'badge-success' 
//                       : problem.difficulty === 'Medium' 
//                         ? 'badge-warning' 
//                         : 'badge-error'
//                   }`}>
//                     {problem.difficulty}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge badge-outline">
//                     {problem.tags}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex space-x-1">
//                      <NavLink 
//                         to={`/admin/upload/${problem._id}`}
//                         className={`btn bg-blue-600`}
//                         >
//                         Upload
//                     </NavLink>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <button 
//                       onClick={() => handleDelete(problem._id)}
//                       className="btn btn-sm btn-error"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminVideo;


import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient'
import { NavLink } from 'react-router';
import { Upload, Trash2, Video, ArrowLeft } from 'lucide-react';

const AdminVideo = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get('/problem/getAllProblem');
      setProblems(data);
    } catch (err) {
      setError('Failed to fetch problems');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    
    try {
      await axiosClient.delete(`/video/delete/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex justify-center items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex justify-center items-center p-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-400">{error.response?.data?.error || error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-cyan-500/20 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NavLink 
                to="/admin" 
                className="btn btn-sm bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <ArrowLeft size={16} />
                Back
              </NavLink>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                  <Video className="text-cyan-400" size={32} />
                  Video Management
                </h1>
                <p className="text-gray-400 text-sm mt-1">Upload and manage problem solution videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {problems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No problems found</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="bg-transparent text-gray-400 font-semibold w-16">#</th>
                  <th className="bg-transparent text-gray-400 font-semibold">Title</th>
                  <th className="bg-transparent text-gray-400 font-semibold">Difficulty</th>
                  <th className="bg-transparent text-gray-400 font-semibold">Tags</th>
                  <th className="bg-transparent text-gray-400 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem, index) => (
                  <tr 
                    key={problem._id}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <td className="text-gray-400">{index + 1}</td>
                    <td className="text-gray-200 font-medium">{problem.title}</td>
                    <td>
                      <span className={`badge border-0 ${
                        problem.difficulty === 'Easy' || problem.difficulty === 'easy'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                          : problem.difficulty === 'Medium' || problem.difficulty === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {problem.tags}
                      </span>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <NavLink 
                          to={`/admin/upload/${problem._id}`}
                          className="btn btn-sm bg-gradient-to-r from-cyan-500 to-blue-600 border-0 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                        >
                          <Upload size={16} className="mr-1" />
                          Upload
                        </NavLink>
                        <button 
                          onClick={() => handleDelete(problem._id)}
                          className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-600 border-0 text-white hover:from-red-400 hover:to-pink-500 hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300"
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Stats */}
        {problems.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Showing {problems.length} problem{problems.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideo;