// import { useParams } from 'react-router';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import axiosClient from '../utils/axiosClient'

// function AdminUpload(){
    
//     const {problemId}  = useParams();
    
//     const [uploading, setUploading] = useState(false);
//     const [uploadProgress, setUploadProgress] = useState(0);
//     const [uploadedVideo, setUploadedVideo] = useState(null);
    
//       const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//         reset,
//         setError,
//         clearErrors
//       } = useForm();
    
//       const selectedFile = watch('videoFile')?.[0];
    
//       // Upload video to Cloudinary
//       const onSubmit = async (data) => {
//         const file = data.videoFile[0];
        
//         setUploading(true);
//         setUploadProgress(0);
//         clearErrors();
    
//         try {
//           // Step 1: Get upload signature from backend
//           const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
//           const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;
    
//           // Step 2: Create FormData for Cloudinary upload
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('signature', signature);
//           formData.append('timestamp', timestamp);
//           formData.append('public_id', public_id);
//           formData.append('api_key', api_key);
    
//           // Step 3: Upload directly to Cloudinary
//           const uploadResponse = await axios.post(upload_url, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//               const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//               setUploadProgress(progress);
//             },
//           });
    
//           const cloudinaryResult = uploadResponse.data;
    
//           // Step 4: Save video metadata to backend
//           const metadataResponse = await axiosClient.post('/video/save', {
//             problemId:problemId,
//             cloudinaryPublicId: cloudinaryResult.public_id,
//             secureUrl: cloudinaryResult.secure_url,
//             duration: cloudinaryResult.duration,
//           });
    
//           setUploadedVideo(metadataResponse.data.videoSolution);
//           reset(); // Reset form after successful upload
          
//         } catch (err) {
//           console.error('Upload error:', err);
//           setError('root', {
//             type: 'manual',
//             message: err.response?.data?.message || 'Upload failed. Please try again.'
//           });
//         } finally {
//           setUploading(false);
//           setUploadProgress(0);
//         }
//       };
    
//       // Format file size
//       const formatFileSize = (bytes) => {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//       };
    
//       // Format duration
//       const formatDuration = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = Math.floor(seconds % 60);
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//       };
    
//       return (
//         <div className="max-w-md mx-auto p-6">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body">
//               <h2 className="card-title">Upload Video</h2>
              
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* File Input */}
//                 <div className="form-control w-full">
//                   <label className="label">
//                     <span className="label-text">Choose video file</span>
//                   </label>
//                   <input
//                     type="file"
//                     accept="video/*"
//                     {...register('videoFile', {
//                       required: 'Please select a video file',
//                       validate: {
//                         isVideo: (files) => {
//                           if (!files || !files[0]) return 'Please select a video file';
//                           const file = files[0];
//                           return file.type.startsWith('video/') || 'Please select a valid video file';
//                         },
//                         fileSize: (files) => {
//                           if (!files || !files[0]) return true;
//                           const file = files[0];
//                           const maxSize = 100 * 1024 * 1024; // 100MB
//                           return file.size <= maxSize || 'File size must be less than 100MB';
//                         }
//                       }
//                     })}
//                     className={`file-input file-input-bordered w-full ${errors.videoFile ? 'file-input-error' : ''}`}
//                     disabled={uploading}
//                   />
//                   {errors.videoFile && (
//                     <label className="label">
//                       <span className="label-text-alt text-error">{errors.videoFile.message}</span>
//                     </label>
//                   )}
//                 </div>
    
//                 {/* Selected File Info */}
//                 {selectedFile && (
//                   <div className="alert alert-info">
//                     <div>
//                       <h3 className="font-bold">Selected File:</h3>
//                       <p className="text-sm">{selectedFile.name}</p>
//                       <p className="text-sm">Size: {formatFileSize(selectedFile.size)}</p>
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Upload Progress */}
//                 {uploading && (
//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Uploading...</span>
//                       <span>{uploadProgress}%</span>
//                     </div>
//                     <progress 
//                       className="progress progress-primary w-full" 
//                       value={uploadProgress} 
//                       max="100"
//                     ></progress>
//                   </div>
//                 )}
    
//                 {/* Error Message */}
//                 {errors.root && (
//                   <div className="alert alert-error">
//                     <span>{errors.root.message}</span>
//                   </div>
//                 )}
    
//                 {/* Success Message */}
//                 {uploadedVideo && (
//                   <div className="alert alert-success">
//                     <div>
//                       <h3 className="font-bold">Upload Successful!</h3>
//                       <p className="text-sm">Duration: {formatDuration(uploadedVideo.duration)}</p>
//                       <p className="text-sm">Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 )}
    
//                 {/* Upload Button */}
//                 <div className="card-actions justify-end">
//                   <button
//                     type="submit"
//                     disabled={uploading}
//                     className={`btn btn-primary ${uploading ? 'loading' : ''}`}
//                   >
//                     {uploading ? 'Uploading...' : 'Upload Video'}
//                   </button>
//                 </div>
//               </form>
            
//             </div>
//           </div>
//         </div>
//     );
// }


// export default AdminUpload;

import { useParams, NavLink } from 'react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../utils/axiosClient'
import { Upload, CheckCircle, XCircle, Film, ArrowLeft, FileVideo } from 'lucide-react';

function AdminUpload(){
    
    const {problemId}  = useParams();
    
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    
      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setError,
        clearErrors
      } = useForm();
    
      const selectedFile = watch('videoFile')?.[0];
    
      // Upload video to Cloudinary
      const onSubmit = async (data) => {
        const file = data.videoFile[0];
        
        setUploading(true);
        setUploadProgress(0);
        clearErrors();
    
        try {
          // Step 1: Get upload signature from backend
          const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
          const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;
    
          // Step 2: Create FormData for Cloudinary upload
          const formData = new FormData();
          formData.append('file', file);
          formData.append('signature', signature);
          formData.append('timestamp', timestamp);
          formData.append('public_id', public_id);
          formData.append('api_key', api_key);
    
          // Step 3: Upload directly to Cloudinary
          const uploadResponse = await axios.post(upload_url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            },
          });
    
          const cloudinaryResult = uploadResponse.data;
    
          // Step 4: Save video metadata to backend
          const metadataResponse = await axiosClient.post('/video/save', {
            problemId:problemId,
            cloudinaryPublicId: cloudinaryResult.public_id,
            secureUrl: cloudinaryResult.secure_url,
            duration: cloudinaryResult.duration,
          });
    
          setUploadedVideo(metadataResponse.data.videoSolution);
          reset(); // Reset form after successful upload
          
        } catch (err) {
          console.error('Upload error:', err);
          setError('root', {
            type: 'manual',
            message: err.response?.data?.message || 'Upload failed. Please try again.'
          });
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      };
    
      // Format file size
      const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };
    
      // Format duration
      const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-6">
            <NavLink 
              to="/admin/video" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200 mb-4"
            >
              <ArrowLeft size={18} />
              Back to Video Management
            </NavLink>
          </div>

          {/* Main Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20"></div>
              
              {/* Card */}
              <div className="relative bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                
                <div className="p-8">
                  {/* Title */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50"></div>
                      <div className="relative bg-gray-900 p-2 rounded-lg border border-cyan-500/30">
                        <Film className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                      Upload Video Solution
                    </h2>
                  </div>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* File Input */}
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text text-gray-300 font-medium">Choose video file</span>
                        <span className="label-text-alt text-gray-500">Max 100MB</span>
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        {...register('videoFile', {
                          required: 'Please select a video file',
                          validate: {
                            isVideo: (files) => {
                              if (!files || !files[0]) return 'Please select a video file';
                              const file = files[0];
                              return file.type.startsWith('video/') || 'Please select a valid video file';
                            },
                            fileSize: (files) => {
                              if (!files || !files[0]) return true;
                              const file = files[0];
                              const maxSize = 100 * 1024 * 1024; // 100MB
                              return file.size <= maxSize || 'File size must be less than 100MB';
                            }
                          }
                        })}
                        className={`file-input w-full bg-gray-800/50 border-gray-700 text-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 ${errors.videoFile ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
                        disabled={uploading}
                      />
                      {errors.videoFile && (
                        <label className="label">
                          <span className="label-text-alt text-red-400 flex items-center gap-1">
                            <XCircle size={14} />
                            {errors.videoFile.message}
                          </span>
                        </label>
                      )}
                    </div>
        
                    {/* Selected File Info */}
                    {selectedFile && (
                      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <FileVideo className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-cyan-400 mb-1">Selected File</h3>
                            <p className="text-sm text-gray-300">{selectedFile.name}</p>
                            <p className="text-sm text-gray-400 mt-1">Size: {formatFileSize(selectedFile.size)}</p>
                          </div>
                        </div>
                      </div>
                    )}
        
                    {/* Upload Progress */}
                    {uploading && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Uploading...</span>
                          <span className="text-cyan-400 font-semibold">{uploadProgress}%</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 relative"
                              style={{ width: `${uploadProgress}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
        
                    {/* Error Message */}
                    {errors.root && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <span className="text-red-400">{errors.root.message}</span>
                        </div>
                      </div>
                    )}
        
                    {/* Success Message */}
                    {uploadedVideo && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-green-400 mb-2">Upload Successful!</h3>
                            <div className="space-y-1 text-sm text-gray-300">
                              <p>Duration: {formatDuration(uploadedVideo.duration)}</p>
                              <p>Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
        
                    {/* Upload Button */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="btn flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 border-0 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {uploading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Upload size={18} />
                            Upload Video
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default AdminUpload;