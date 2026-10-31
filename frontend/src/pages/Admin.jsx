// import React, { useState } from 'react';
// import { Plus, Edit, Trash2, Home, RefreshCw, Zap,Video } from 'lucide-react';
// import { NavLink } from 'react-router';

// function Admin() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const adminOptions = [
//     {
//       id: 'create',
//       title: 'Create Problem',
//       description: 'Add a new coding problem to the platform',
//       icon: Plus,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/create'
//     },
//     {
//       id: 'update',
//       title: 'Update Problem',
//       description: 'Edit existing problems and their details',
//       icon: Edit,
//       color: 'btn-warning',
//       bgColor: 'bg-warning/10',
//       route: '/admin/update'
//     },
//     {
//       id: 'delete',
//       title: 'Delete Problem',
//       description: 'Remove problems from the platform',
//       icon: Trash2,
//       color: 'btn-error',
//       bgColor: 'bg-error/10',
//       route: '/admin/delete'
//     },
//     {
//       id: 'video',
//       title: 'Video Problem',
//       description: 'Upload And Delete Videos',
//       icon: Video,
//       color: 'btn-success',
//       bgColor: 'bg-success/10',
//       route: '/admin/video'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-base-content mb-4">
//             Admin Panel
//           </h1>
//           <p className="text-base-content/70 text-lg">
//             Manage coding problems on your platform
//           </p>
//         </div>

//         {/* Admin Options Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {adminOptions.map((option) => {
//             const IconComponent = option.icon;
//             return (
//               <div
//                 key={option.id}
//                 className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
//               >
//                 <div className="card-body items-center text-center p-8">
//                   {/* Icon */}
//                   <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
//                     <IconComponent size={32} className="text-base-content" />
//                   </div>
                  
//                   {/* Title */}
//                   <h2 className="card-title text-xl mb-2">
//                     {option.title}
//                   </h2>
                  
//                   {/* Description */}
//                   <p className="text-base-content/70 mb-6">
//                     {option.description}
//                   </p>
                  
//                   {/* Action Button */}
//                   <div className="card-actions">
//                     <div className="card-actions">
//                     <NavLink 
//                     to={option.route}
//                    className={`btn ${option.color} btn-wide`}
//                    >
//                    {option.title}
//                    </NavLink>
//                    </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Admin;

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video, Shield } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem to the platform',
      icon: Plus,
      gradient: 'from-green-500 to-emerald-600',
      glowColor: 'green-500',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing problems and their details',
      icon: Edit,
      gradient: 'from-yellow-500 to-orange-600',
      glowColor: 'yellow-500',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove problems from the platform',
      icon: Trash2,
      gradient: 'from-red-500 to-pink-600',
      glowColor: 'red-500',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Problem',
      description: 'Upload and delete videos',
      icon: Video,
      gradient: 'from-cyan-500 to-blue-600',
      glowColor: 'cyan-500',
      route: '/admin/video'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header with animated background */}
      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center">
            {/* Shield Icon with Glow */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gray-900 p-4 rounded-full border border-purple-500/30">
                  <Shield className="w-12 h-12 text-purple-400" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Admin Panel
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Manage coding problem and platform content with full control
            </p>
          </div>
        </div>
      </div>

      {/* Admin Options Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${option.gradient} rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Card */}
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-${option.glowColor}/50 rounded-xl shadow-xl overflow-hidden transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                  {/* Top accent line */}
                  <div className={`h-1 bg-gradient-to-r ${option.gradient}`}></div>
                  
                  <div className="p-6">
                    {/* Icon with glow */}
                    <div className="flex justify-center mb-6">
                      <div className={`relative bg-gradient-to-r ${option.gradient} p-0.5 rounded-2xl`}>
                        <div className="bg-gray-900 p-4 rounded-2xl">
                          <IconComponent size={40} className="text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white text-center mb-3">
                      {option.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm text-center mb-6">
                      {option.description}
                    </p>
                    
                    {/* Action Button */}
                    <NavLink 
                      to={option.route}
                      className={`btn w-full bg-gradient-to-r ${option.gradient} border-0 text-white font-semibold hover:shadow-lg hover:shadow-${option.glowColor}/50 transition-all duration-300`}
                    >
                      <IconComponent size={18} className="mr-2" />
                      {option.title}
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <Zap className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Quick</h3>
            <p className="text-gray-400 text-sm">Fast problem management</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Secure</h3>
            <p className="text-gray-400 text-sm">Protected admin access</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-pink-500/30 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <RefreshCw className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Live</h3>
            <p className="text-gray-400 text-sm">Real-time updates</p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <NavLink 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
          >
            <Home size={18} />
            Back to Homepage
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Admin;