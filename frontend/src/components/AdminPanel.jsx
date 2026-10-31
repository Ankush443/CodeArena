// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import axiosClient from '../utils/axiosClient';
// import { useNavigate } from 'react-router';

// // Zod schema matching the problem schema
// const problemSchema = z.object({
//   title: z.string().min(1, 'Title is required'),
//   description: z.string().min(1, 'Description is required'),
//   difficulty: z.enum(['easy', 'medium', 'hard']),
//   tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
//   visibleTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required'),
//       explanation: z.string().min(1, 'Explanation is required')
//     })
//   ).min(1, 'At least one visible test case required'),
//   hiddenTestCases: z.array(
//     z.object({
//       input: z.string().min(1, 'Input is required'),
//       output: z.string().min(1, 'Output is required')
//     })
//   ).min(1, 'At least one hidden test case required'),
//   startCode: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       initialCode: z.string().min(1, 'Initial code is required')
//     })
//   ).length(3, 'All three languages required'),
//   referenceSolution: z.array(
//     z.object({
//       language: z.enum(['C++', 'Java', 'JavaScript']),
//       completeCode: z.string().min(1, 'Complete code is required')
//     })
//   ).length(3, 'All three languages required')
// });

// function AdminPanel() {
//   const navigate = useNavigate();
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     resolver: zodResolver(problemSchema),
//     defaultValues: {
//       startCode: [
//         { language: 'C++', initialCode: '' },
//         { language: 'Java', initialCode: '' },
//         { language: 'JavaScript', initialCode: '' }
//       ],
//       referenceSolution: [
//         { language: 'C++', completeCode: '' },
//         { language: 'Java', completeCode: '' },
//         { language: 'JavaScript', completeCode: '' }
//       ]
//     }
//   });

//   const {
//     fields: visibleFields,
//     append: appendVisible,
//     remove: removeVisible
//   } = useFieldArray({
//     control,
//     name: 'visibleTestCases'
//   });

//   const {
//     fields: hiddenFields,
//     append: appendHidden,
//     remove: removeHidden
//   } = useFieldArray({
//     control,
//     name: 'hiddenTestCases'
//   });

//   const onSubmit = async (data) => {
//     try {
//       await axiosClient.post('/problem/create', data);
//       alert('Problem created successfully!');
//       navigate('/');
//     } catch (error) {
//       alert(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Create New Problem</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Basic Information */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//           <div className="space-y-4">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Title</span>
//               </label>
//               <input
//                 {...register('title')}
//                 className={`input input-bordered ${errors.title && 'input-error'}`}
//               />
//               {errors.title && (
//                 <span className="text-error">{errors.title.message}</span>
//               )}
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Description</span>
//               </label>
//               <textarea
//                 {...register('description')}
//                 className={`textarea textarea-bordered h-32 ${errors.description && 'textarea-error'}`}
//               />
//               {errors.description && (
//                 <span className="text-error">{errors.description.message}</span>
//               )}
//             </div>

//             <div className="flex gap-4">
//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Difficulty</span>
//                 </label>
//                 <select
//                   {...register('difficulty')}
//                   className={`select select-bordered ${errors.difficulty && 'select-error'}`}
//                 >
//                   <option value="easy">Easy</option>
//                   <option value="medium">Medium</option>
//                   <option value="hard">Hard</option>
//                 </select>
//               </div>

//               <div className="form-control w-1/2">
//                 <label className="label">
//                   <span className="label-text">Tag</span>
//                 </label>
//                 <select
//                   {...register('tags')}
//                   className={`select select-bordered ${errors.tags && 'select-error'}`}
//                 >
//                   <option value="array">Array</option>
//                   <option value="linkedList">Linked List</option>
//                   <option value="graph">Graph</option>
//                   <option value="dp">DP</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Test Cases */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Test Cases</h2>
          
//           {/* Visible Test Cases */}
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Visible Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Visible Case
//               </button>
//             </div>
            
//             {visibleFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeVisible(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`visibleTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`visibleTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
                
//                 <textarea
//                   {...register(`visibleTestCases.${index}.explanation`)}
//                   placeholder="Explanation"
//                   className="textarea textarea-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Hidden Test Cases */}
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="font-medium">Hidden Test Cases</h3>
//               <button
//                 type="button"
//                 onClick={() => appendHidden({ input: '', output: '' })}
//                 className="btn btn-sm btn-primary"
//               >
//                 Add Hidden Case
//               </button>
//             </div>
            
//             {hiddenFields.map((field, index) => (
//               <div key={field.id} className="border p-4 rounded-lg space-y-2">
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => removeHidden(index)}
//                     className="btn btn-xs btn-error"
//                   >
//                     Remove
//                   </button>
//                 </div>
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.input`)}
//                   placeholder="Input"
//                   className="input input-bordered w-full"
//                 />
                
//                 <input
//                   {...register(`hiddenTestCases.${index}.output`)}
//                   placeholder="Output"
//                   className="input input-bordered w-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Code Templates */}
//         <div className="card bg-base-100 shadow-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Code Templates</h2>
          
//           <div className="space-y-6">
//             {[0, 1, 2].map((index) => (
//               <div key={index} className="space-y-2">
//                 <h3 className="font-medium">
//                   {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
//                 </h3>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Initial Code</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`startCode.${index}.initialCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
                
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Reference Solution</span>
//                   </label>
//                   <pre className="bg-base-300 p-4 rounded-lg">
//                     <textarea
//                       {...register(`referenceSolution.${index}.completeCode`)}
//                       className="w-full bg-transparent font-mono"
//                       rows={6}
//                     />
//                   </pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Create Problem
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminPanel;




import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../utils/axiosClient';
import { useNavigate, NavLink } from 'react-router';
import { Plus, Trash2, Code, TestTube, Info, ArrowLeft, CheckCircle } from 'lucide-react';

// Zod schema matching the problem schema
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

function AdminPanel() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <NavLink 
          to="/admin" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Admin Panel
        </NavLink>
        
        <div className="flex items-center gap-4 mt-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur opacity-50"></div>
            <div className="relative bg-gray-900 p-3 rounded-lg border border-green-500/30">
              <Plus className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Create New Problem
            </h1>
            <p className="text-gray-400 mt-1">Add a new coding challenge to the platform</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto space-y-6">
        {/* Basic Information */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                Basic Information
              </h2>
            </div>
            
            <div className="space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-medium">Title</span>
                </label>
                <input
                  {...register('title')}
                  placeholder="Enter problem title..."
                  className={`input w-full bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <span className="text-red-400 text-xs mt-1.5">{errors.title.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300 font-medium">Description</span>
                </label>
                <textarea
                  {...register('description')}
                  placeholder="Enter problem description..."
                  className={`textarea w-full h-32 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <span className="text-red-400 text-xs mt-1.5">{errors.description.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Difficulty</span>
                  </label>
                  <select
                    {...register('difficulty')}
                    className={`select ml-2 bg-gray-800/50 border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${errors.difficulty ? 'border-red-500' : ''}`}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300 font-medium">Tag</span>
                  </label>
                  <select
                    {...register('tags')}
                    className={`select ml-2 bg-gray-800/50 border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${errors.tags ? 'border-red-500' : ''}`}
                  >
                    <option value="array">Array</option>
                    <option value="linkedList">Linked List</option>
                    <option value="graph">Graph</option>
                    <option value="dp">DP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Cases */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <TestTube className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Test Cases
              </h2>
            </div>
            
            {/* Visible Test Cases */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-300">Visible Test Cases</h3>
                <button
                  type="button"
                  onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                  className="btn btn-sm bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  <Plus size={16} className="mr-1" />
                  Add Visible Case
                </button>
              </div>
              
              {visibleFields.map((field, index) => (
                <div key={field.id} className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Test Case #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="btn btn-xs bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <input
                    {...register(`visibleTestCases.${index}.input`)}
                    placeholder="Input"
                    className="input input-sm w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                  
                  <input
                    {...register(`visibleTestCases.${index}.output`)}
                    placeholder="Output"
                    className="input input-sm w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                  
                  <textarea
                    {...register(`visibleTestCases.${index}.explanation`)}
                    placeholder="Explanation"
                    className="textarea textarea-sm w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                    rows={2}
                  />
                </div>
              ))}
            </div>

            {/* Hidden Test Cases */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-300">Hidden Test Cases</h3>
                <button
                  type="button"
                  onClick={() => appendHidden({ input: '', output: '' })}
                  className="btn btn-sm bg-gradient-to-r from-cyan-500 to-blue-600 border-0 text-white hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  <Plus size={16} className="mr-1" />
                  Add Hidden Case
                </button>
              </div>
              
              {hiddenFields.map((field, index) => (
                <div key={field.id} className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Hidden Test Case #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="btn btn-xs bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <input
                    {...register(`hiddenTestCases.${index}.input`)}
                    placeholder="Input"
                    className="input input-sm w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                  
                  <input
                    {...register(`hiddenTestCases.${index}.output`)}
                    placeholder="Output"
                    className="input input-sm w-full bg-gray-900/50 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Templates */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 rounded-xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                Code Templates
              </h2>
            </div>
            
            <div className="space-y-6">
              {[0, 1, 2].map((index) => (
                <div key={index} className="bg-gray-800/30 border border-gray-700 rounded-lg p-5 space-y-4">
                  <h3 className="font-semibold text-lg text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                    {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                  </h3>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-400 text-sm">Initial Code</span>
                    </label>
                    <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                      <textarea
                        {...register(`startCode.${index}.initialCode`)}
                        placeholder={`Enter ${index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'} starter code...`}
                        className="w-full bg-transparent font-mono text-sm text-gray-200 placeholder-gray-600 focus:outline-none resize-none"
                        rows={6}
                      />
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-400 text-sm">Reference Solution</span>
                    </label>
                    <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                      <textarea
                        {...register(`referenceSolution.${index}.completeCode`)}
                        placeholder={`Enter ${index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'} reference solution...`}
                        className="w-full bg-transparent font-mono text-sm text-gray-200 placeholder-gray-600 focus:outline-none resize-none"
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="btn w-full bg-gradient-to-r from-green-500 to-emerald-600 border-0 text-white font-semibold text-lg hover:from-green-400 hover:to-emerald-500 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 py-4 h-auto"
        >
          <CheckCircle size={20} className="mr-2" />
          Create Problem
        </button>
      </form>
    </div>
  );
}

export default AdminPanel;