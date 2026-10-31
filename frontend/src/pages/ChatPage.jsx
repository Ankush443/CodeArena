// import { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import axiosClient from '../utils/axiosClient';
// import { Send, Users, Plus, Hash } from 'lucide-react';

// const socket = io('http://localhost:3000', { withCredentials: true });

// export default function ChatPage() {
//     const { user } = useSelector((state) => state.auth);
//     const [rooms, setRooms] = useState([]);
//     const [activeRoom, setActiveRoom] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const scrollRef = useRef();

//      const joinExistingRoom = async () => {
//     const roomId = prompt("Paste the Room ID to join:");
//     if (roomId) {
//         try {
//             const res = await axiosClient.post('/chat/rooms/join', { roomId });
//             // Add the new room to the sidebar list
//             setRooms(prev => [...prev, res.data]);
//             setActiveRoom(res.data);
//             alert("Joined successfully!");
//         } catch (err) {
//             alert("Could not join room. Check the ID.");
//         }
//     }
// };
// const copyRoomId = () => {
//     if (activeRoom && activeRoom.name !== "General") {
//         navigator.clipboard.writeText(activeRoom._id);
//         alert("Room ID copied! Share this with your friends.");
//     }
// };

//     useEffect(() => {
//         fetchRooms();
//     }, []);

//     // Effect to handle socket messages
//     useEffect(() => {
//         if (activeRoom) {
//             socket.emit('joinRoom', activeRoom._id);
//             fetchMessages(activeRoom._id);
//         }

//         socket.on('receiveMessage', (message) => {
//             if (message.roomId === activeRoom?._id) {
//                 setMessages((prev) => [...prev, message]);
//             }
//         });

//         return () => socket.off('receiveMessage');
//     }, [activeRoom]);

//     // Auto-scroll to bottom
//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const fetchRooms = async () => {
//         const res = await axiosClient.get('/chat/rooms');
//         setRooms(res.data);
//         // Set General as default active room
//         const general = res.data.find(r => r.name === 'General');
//         if (general) setActiveRoom(general);
//     };

//     const fetchMessages = async (roomId) => {
//         const res = await axiosClient.get(`/chat/rooms/${roomId}/messages`);
//         setMessages(res.data);
//     };

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;

//         const messageData = {
//             roomId: activeRoom._id,
//             senderId: user._id,
//             senderName: user.firstName,
//             text: newMessage
//         };

//         socket.emit('sendMessage', messageData);
//         setNewMessage('');
//     };

//     const createNewRoom = async () => {
//         const name = prompt("Enter room name:");
//         if (name) {
//             const res = await axiosClient.post('/chat/rooms', { name });
//             setRooms([...rooms, res.data]);
//             setActiveRoom(res.data);
//         }
//     };

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-[#020617] text-white overflow-hidden relative">
//       {/* --- Sidebar: My Rooms --- */}
//       <div className="w-72 border-r border-white/5 bg-slate-950/80 backdrop-blur-md p-4 flex flex-col">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="font-bold text-sm uppercase tracking-widest text-slate-400 flex items-center gap-2">
//             <Users className="w-4 h-4" /> My Rooms
//           </h2>
//           <div className="flex gap-2">
//             {/* Join Room Button */}
//             <button 
//               onClick={joinExistingRoom} 
//               title="Join by ID"
//               className="p-2 hover:bg-cyan-500/10 text-cyan-400 rounded-lg border border-white/5 transition-all"
//             >
//               <Hash className="w-4 h-4" />
//             </button>
//             {/* Create Room Button */}
//             <button 
//               onClick={createNewRoom} 
//               title="Create New Room"
//               className="p-2 hover:bg-emerald-500/10 text-emerald-400 rounded-lg border border-white/5 transition-all"
//             >
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//         </div>

//         {/* List of joined rooms */}
//         <div className="flex-1 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
//           {rooms.map(room => (
//             <button 
//               key={room._id}
//               onClick={() => setActiveRoom(room)}
//               className={`w-full text-left px-4 py-3 rounded-xl transition-all group relative ${
//                 activeRoom?._id === room._id 
//                   ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
//                   : 'hover:bg-white/5 text-slate-400 border border-transparent'
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <span className="truncate font-medium flex items-center gap-2">
//                    <Hash className={`w-3 h-3 ${activeRoom?._id === room._id ? 'text-cyan-400' : 'text-slate-600'}`} />
//                    {room.name}
//                 </span>
//                 {room.isGeneral && (
//                   <span className="text-[9px] uppercase font-bold bg-white/5 px-1.5 py-0.5 rounded text-slate-500">Public</span>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* --- Main Chat Interface --- */}
//       <div className="flex-1 flex flex-col bg-[#020617] relative">
        
//         {/* Chat Header */}
//         <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/30 backdrop-blur-sm">
//           <div className="flex flex-col">
//             <h2 className="font-bold text-lg flex items-center gap-2 text-white">
//               # {activeRoom?.name || 'Select a Room'}
//             </h2>
//             {activeRoom && !activeRoom.isGeneral && (
//               <p className="text-[10px] text-slate-500 font-mono">Room ID: {activeRoom._id}</p>
//             )}
//           </div>

//           {activeRoom && !activeRoom.isGeneral && (
//             <button 
//               onClick={copyRoomId}
//               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-400 text-xs transition-all border border-white/5"
//             >
//               Copy ID to Invite
//             </button>
//           )}
//         </div>

//         {/* Message Feed */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
//           {messages.length > 0 ? (
//             messages.map((msg, idx) => {
//               const isMe = msg.senderId === user._id;
//               return (
//                 <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2`}>
//                   <div className={`flex items-center gap-2 mb-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
//                     <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{msg.senderName}</span>
//                     <span className="text-[9px] text-slate-600 font-mono">
//                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                   </div>
//                   <div className={`px-4 py-2.5 rounded-2xl max-w-[70%] text-sm shadow-sm border ${
//                     isMe 
//                       ? 'bg-cyan-600 text-white rounded-tr-none border-cyan-500' 
//                       : 'bg-slate-900 text-slate-200 rounded-tl-none border-white/5'
//                   }`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="h-full flex flex-col items-center justify-center opacity-20">
//               <Hash className="w-16 h-16 mb-4" />
//               <p className="font-mono text-sm uppercase tracking-widest">No signals detected in this sector</p>
//             </div>
//           )}
//           <div ref={scrollRef} />
//         </div>

//         {/* Chat Input Field */}
//         <div className="p-6 bg-transparent">
//           <form 
//             onSubmit={handleSendMessage} 
//             className="relative group bg-slate-900/50 border border-white/10 rounded-2xl flex items-center p-2 focus-within:border-cyan-500/50 transition-all shadow-2xl"
//           >
//             <input 
//               type="text" 
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder={`Communicate in #${activeRoom?.name || '...'}`}
//               className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-600 px-4 py-2"
//             />
//             <button 
//               type="submit" 
//               disabled={!newMessage.trim()}
//               className="p-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20"
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import axiosClient from '../utils/axiosClient';
// import { Send, Users, Plus, Hash, MessageSquare, Sparkles, Copy, CheckCircle, X, AlertCircle, Loader } from 'lucide-react';

// const socket = io('http://localhost:3000', { withCredentials: true });

// export default function ChatPage() {
//     const { user } = useSelector((state) => state.auth);
//     const [rooms, setRooms] = useState([]);
//     const [activeRoom, setActiveRoom] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [copied, setCopied] = useState(false);
//     const [showJoinModal, setShowJoinModal] = useState(false);
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [roomIdInput, setRoomIdInput] = useState('');
//     const [roomNameInput, setRoomNameInput] = useState('');
//     const [modalError, setModalError] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const scrollRef = useRef();

//     const joinExistingRoom = async () => {
//         if (!roomIdInput.trim()) {
//             setModalError('Please enter a valid Room ID');
//             return;
//         }

//         setIsLoading(true);
//         setModalError('');

//         try {
//             const res = await axiosClient.post('/chat/rooms/join', { roomId: roomIdInput.trim() });
//             setRooms(prev => [...prev, res.data]);
//             setActiveRoom(res.data);
//             setShowJoinModal(false);
//             setRoomIdInput('');
//         } catch (err) {
//             setModalError('Could not join room. Please check the Room ID and try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const createNewRoom = async () => {
//         if (!roomNameInput.trim()) {
//             setModalError('Please enter a room name');
//             return;
//         }

//         setIsLoading(true);
//         setModalError('');

//         try {
//             const res = await axiosClient.post('/chat/rooms', { name: roomNameInput.trim() });
//             setRooms([...rooms, res.data]);
//             setActiveRoom(res.data);
//             setShowCreateModal(false);
//             setRoomNameInput('');
//         } catch (err) {
//             setModalError('Could not create room. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const closeModals = () => {
//         setShowJoinModal(false);
//         setShowCreateModal(false);
//         setRoomIdInput('');
//         setRoomNameInput('');
//         setModalError('');
//     };

//     const copyRoomId = () => {
//         if (activeRoom && activeRoom.name !== "General") {
//             navigator.clipboard.writeText(activeRoom._id);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         }
//     };

//     useEffect(() => {
//         fetchRooms();
//     }, []);

//     useEffect(() => {
//         if (activeRoom) {
//             socket.emit('joinRoom', activeRoom._id);
//             fetchMessages(activeRoom._id);
//         }

//         socket.on('receiveMessage', (message) => {
//             if (message.roomId === activeRoom?._id) {
//                 setMessages((prev) => [...prev, message]);
//             }
//         });

//         return () => socket.off('receiveMessage');
//     }, [activeRoom]);

//     useEffect(() => {
//         scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     const fetchRooms = async () => {
//         const res = await axiosClient.get('/chat/rooms');
//         setRooms(res.data);
//         const general = res.data.find(r => r.name === 'General');
//         if (general) setActiveRoom(general);
//     };

//     const fetchMessages = async (roomId) => {
//         const res = await axiosClient.get(`/chat/rooms/${roomId}/messages`);
//         setMessages(res.data);
//     };

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;

//         const messageData = {
//             roomId: activeRoom._id,
//             senderId: user._id,
//             senderName: user.firstName,
//             text: newMessage
//         };

//         socket.emit('sendMessage', messageData);
//         setNewMessage('');
//     };

//     return (
//         <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
//             {/* Sidebar */}
//             <div className="w-80 border-r border-white/10 bg-gradient-to-b from-slate-950/90 to-slate-900/90 backdrop-blur-xl flex flex-col shadow-2xl">
//                 {/* Sidebar Header */}
//                 <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-950/30 to-blue-950/30">
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20">
//                             <MessageSquare className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                             <h2 className="font-bold text-lg text-white">My Rooms</h2>
//                             <p className="text-xs text-slate-400">Connect & Collaborate</p>
//                         </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="grid grid-cols-2 gap-3">
//                         <button 
//                             onClick={() => setShowJoinModal(true)}
//                             className="group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                             <div className="relative flex flex-col items-center gap-2">
//                                 <Hash className="w-5 h-5 text-cyan-400" />
//                                 <span className="text-xs font-semibold text-cyan-400">Join Room</span>
//                             </div>
//                         </button>

//                         <button 
//                             onClick={() => setShowCreateModal(true)}
//                             className="group relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//                             <div className="relative flex flex-col items-center gap-2">
//                                 <Plus className="w-5 h-5 text-emerald-400" />
//                                 <span className="text-xs font-semibold text-emerald-400">Create Room</span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Rooms List */}
//                 <div className="flex-1 overflow-y-auto p-4">
//                     {rooms.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
//                             <div className="relative mb-6">
//                                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
//                                 <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border border-white/10">
//                                     <Users className="w-12 h-12 text-slate-600" />
//                                 </div>
//                             </div>
//                             <h3 className="text-lg font-bold text-white mb-2">No Rooms Yet</h3>
//                             <p className="text-sm text-slate-400 mb-6 leading-relaxed">
//                                 Start your journey by creating a new room or joining an existing one
//                             </p>
//                             <div className="flex items-center gap-2 text-xs text-slate-500">
//                                 <Sparkles className="w-4 h-4" />
//                                 <span>Ready when you are</span>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="space-y-2">
//                             {rooms.map(room => (
//                                 <button 
//                                     key={room._id}
//                                     onClick={() => setActiveRoom(room)}
//                                     className={`w-full group relative overflow-hidden text-left px-4 py-4 rounded-xl transition-all duration-300 ${
//                                         activeRoom?._id === room._id 
//                                             ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/10' 
//                                             : 'bg-slate-800/40 hover:bg-slate-800/60 border-2 border-transparent hover:border-white/10'
//                                     }`}
//                                 >
//                                     {activeRoom?._id === room._id && (
//                                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
//                                     )}
//                                     <div className="relative flex items-center justify-between">
//                                         <div className="flex items-center gap-3 flex-1 min-w-0">
//                                             <div className={`p-2 rounded-lg ${
//                                                 activeRoom?._id === room._id 
//                                                     ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/20' 
//                                                     : 'bg-slate-700/50'
//                                             }`}>
//                                                 <Hash className={`w-4 h-4 ${
//                                                     activeRoom?._id === room._id ? 'text-white' : 'text-slate-400'
//                                                 }`} />
//                                             </div>
//                                             <div className="flex-1 min-w-0">
//                                                 <p className={`font-semibold truncate ${
//                                                     activeRoom?._id === room._id ? 'text-white' : 'text-slate-300'
//                                                 }`}>
//                                                     {room.name}
//                                                 </p>
//                                                 {room.isGeneral && (
//                                                     <p className="text-xs text-slate-500">Public Room</p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         {room.isGeneral && (
//                                             <span className="text-[10px] uppercase font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-2 py-1 rounded-full text-amber-400">
//                                                 Public
//                                             </span>
//                                         )}
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Main Chat Area */}
//             <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900/50 to-slate-950/50 backdrop-blur-sm">
//                 {/* Chat Header */}
//                 <div className="h-20 flex items-center justify-between px-8 border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-xl shadow-lg">
//                     <div className="flex items-center gap-4">
//                         <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/20">
//                             <Hash className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                             <h2 className="font-bold text-xl text-white flex items-center gap-2">
//                                 {activeRoom?.name || 'Select a Room'}
//                             </h2>
//                             {activeRoom && !activeRoom.isGeneral && (
//                                 <p className="text-xs text-slate-500 font-mono mt-0.5">
//                                     ID: {activeRoom._id.substring(0, 16)}...
//                                 </p>
//                             )}
//                         </div>
//                     </div>

//                     {activeRoom && !activeRoom.isGeneral && (
//                         <button 
//                             onClick={copyRoomId}
//                             className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-400 text-sm font-medium transition-all duration-300 shadow-lg shadow-cyan-500/10"
//                         >
//                             {copied ? (
//                                 <>
//                                     <CheckCircle className="w-4 h-4" />
//                                     <span>Copied!</span>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                                     <span>Copy Room ID</span>
//                                 </>
//                             )}
//                         </button>
//                     )}
//                 </div>

//                 {/* Messages Area */}
//                 <div className="flex-1 overflow-y-auto p-8 space-y-6">
//                     {messages.length > 0 ? (
//                         messages.map((msg, idx) => {
//                             const isMe = msg.senderId === user._id;
//                             return (
//                                 <div 
//                                     key={idx} 
//                                     className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-3 duration-300`}
//                                 >
//                                     <div className={`flex items-center gap-2 mb-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
//                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
//                                             isMe 
//                                                 ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20' 
//                                                 : 'bg-gradient-to-br from-slate-700 to-slate-600 text-slate-300'
//                                         }`}>
//                                             {msg.senderName.charAt(0).toUpperCase()}
//                                         </div>
//                                         <div className={`flex items-center gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
//                                             <span className={`text-xs font-semibold ${
//                                                 isMe ? 'text-cyan-400' : 'text-slate-400'
//                                             }`}>
//                                                 {msg.senderName}
//                                             </span>
//                                             <span className="text-[10px] text-slate-600 font-mono">
//                                                 {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className={`group relative px-5 py-3 rounded-2xl max-w-[70%] text-sm shadow-xl backdrop-blur-sm ${
//                                         isMe 
//                                             ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white rounded-tr-md shadow-cyan-500/20' 
//                                             : 'bg-gradient-to-br from-slate-800 to-slate-700 text-slate-100 rounded-tl-md border border-white/5'
//                                     }`}>
//                                         <p className="leading-relaxed">{msg.text}</p>
//                                         {isMe && (
//                                             <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-sm transform rotate-45"></div>
//                                         )}
//                                         {!isMe && (
//                                             <div className="absolute -left-1 -bottom-1 w-3 h-3 bg-gradient-to-br from-slate-800 to-slate-700 rounded-sm transform rotate-45 border-l border-b border-white/5"></div>
//                                         )}
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div className="h-full flex flex-col items-center justify-center">
//                             <div className="relative mb-6">
//                                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
//                                 <div className="relative p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-full border border-white/5">
//                                     <MessageSquare className="w-16 h-16 text-slate-700" />
//                                 </div>
//                             </div>
//                             <h3 className="text-lg font-bold text-slate-400 mb-2">No Messages Yet</h3>
//                             <p className="text-sm text-slate-600 font-mono">Start the conversation in #{activeRoom?.name || '...'}</p>
//                         </div>
//                     )}
//                     <div ref={scrollRef} />
//                 </div>

//                 {/* Message Input */}
//                 <div className="p-6 bg-gradient-to-t from-slate-950/90 to-transparent backdrop-blur-sm">
//                     <form 
//                         onSubmit={handleSendMessage} 
//                         className="relative group"
//                     >
//                         <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-20 transition-opacity duration-500"></div>
//                         <div className="relative flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 border-2 border-white/10 group-focus-within:border-cyan-500/50 rounded-2xl p-2 transition-all duration-300 shadow-2xl">
//                             <input 
//                                 type="text" 
//                                 value={newMessage}
//                                 onChange={(e) => setNewMessage(e.target.value)}
//                                 placeholder={`Send a message to #${activeRoom?.name || '...'}`}
//                                 className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-500 px-4 py-3 outline-none"
//                             />
//                             <button 
//                                 type="submit" 
//                                 disabled={!newMessage.trim()}
//                                 className="group/btn relative overflow-hidden p-4 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:shadow-none"
//                             >
//                                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
//                                 <Send className="w-5 h-5 relative z-10" />
//                             </button>
//                         </div>
//                     </form>
//                     <p className="text-xs text-slate-600 text-center mt-3 font-mono">
//                         Press Enter to send • Shift + Enter for new line
//                     </p>
//                 </div>
//             </div>

//             {/* Join Room Modal */}
//             {showJoinModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
//                     {/* Backdrop */}
//                     <div 
//                         className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//                         onClick={closeModals}
//                     ></div>
                    
//                     {/* Modal Card */}
//                     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
//                         <div className="relative p-8">
//                             {/* Header */}
//                             <div className="flex items-center justify-between mb-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-3 bg-slate-700 rounded-xl">
//                                         <Hash className="w-6 h-6 text-cyan-400" />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-xl font-bold text-white">Join Room</h3>
//                                         <p className="text-sm text-slate-400">Enter room ID to connect</p>
//                                     </div>
//                                 </div>
//                                 <button 
//                                     onClick={closeModals}
//                                     className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             {/* Input */}
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                                         Room ID
//                                     </label>
//                                     <input 
//                                         type="text"
//                                         value={roomIdInput}
//                                         onChange={(e) => {
//                                             setRoomIdInput(e.target.value);
//                                             setModalError('');
//                                         }}
//                                         onKeyPress={(e) => e.key === 'Enter' && joinExistingRoom()}
//                                         placeholder="Paste the room ID here..."
//                                         className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-cyan-600 rounded-xl text-white placeholder-slate-500 outline-none transition-all"
//                                         autoFocus
//                                     />
//                                 </div>

//                                 {/* Error Message */}
//                                 {modalError && (
//                                     <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800/50 rounded-lg animate-in slide-in-from-top-2">
//                                         <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
//                                         <p className="text-sm text-red-300">{modalError}</p>
//                                     </div>
//                                 )}

//                                 {/* Action Buttons */}
//                                 <div className="flex gap-3 pt-2">
//                                     <button 
//                                         onClick={closeModals}
//                                         className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-all"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button 
//                                         onClick={joinExistingRoom}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-3 bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <Loader className="w-4 h-4 animate-spin" />
//                                                 <span>Joining...</span>
//                                             </>
//                                         ) : (
//                                             <span>Join Room</span>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Create Room Modal */}
//             {showCreateModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
//                     {/* Backdrop */}
//                     <div 
//                         className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//                         onClick={closeModals}
//                     ></div>
                    
//                     {/* Modal Card */}
//                     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
//                         <div className="relative p-8">
//                             {/* Header */}
//                             <div className="flex items-center justify-between mb-6">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-3 bg-slate-700 rounded-xl">
//                                         <Plus className="w-6 h-6 text-emerald-400" />
//                                     </div>
//                                     <div>
//                                         <h3 className="text-xl font-bold text-white">Create Room</h3>
//                                         <p className="text-sm text-slate-400">Start a new conversation</p>
//                                     </div>
//                                 </div>
//                                 <button 
//                                     onClick={closeModals}
//                                     className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-white"
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             {/* Input */}
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-slate-300 mb-2">
//                                         Room Name
//                                     </label>
//                                     <input 
//                                         type="text"
//                                         value={roomNameInput}
//                                         onChange={(e) => {
//                                             setRoomNameInput(e.target.value);
//                                             setModalError('');
//                                         }}
//                                         onKeyPress={(e) => e.key === 'Enter' && createNewRoom()}
//                                         placeholder="Enter a name for your room..."
//                                         className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-emerald-600 rounded-xl text-white placeholder-slate-500 outline-none transition-all"
//                                         autoFocus
//                                     />
//                                 </div>

//                                 {/* Error Message */}
//                                 {modalError && (
//                                     <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800/50 rounded-lg animate-in slide-in-from-top-2">
//                                         <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
//                                         <p className="text-sm text-red-300">{modalError}</p>
//                                     </div>
//                                 )}

//                                 {/* Info Box */}
//                                 <div className="flex items-start gap-2 p-3 bg-emerald-900/20 border border-emerald-800/40 rounded-lg">
//                                     <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
//                                     <p className="text-xs text-emerald-300">
//                                         You'll get a unique Room ID to share with others after creation
//                                     </p>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="flex gap-3 pt-2">
//                                     <button 
//                                         onClick={closeModals}
//                                         className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-all"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button 
//                                         onClick={createNewRoom}
//                                         disabled={isLoading}
//                                         className="flex-1 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
//                                     >
//                                         {isLoading ? (
//                                             <>
//                                                 <Loader className="w-4 h-4 animate-spin" />
//                                                 <span>Creating...</span>
//                                             </>
//                                         ) : (
//                                             <span>Create Room</span>
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axiosClient from '../utils/axiosClient';
import { 
    Send, Users, Plus, Hash, MessageSquare, Sparkles, 
    Copy, CheckCircle, X, AlertCircle, Loader, Menu, ChevronLeft 
} from 'lucide-react';

const socket = io('https://codearena-jbx9.onrender.com', { withCredentials: true });

export default function ChatPage() {
    const { user } = useSelector((state) => state.auth);
    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [roomIdInput, setRoomIdInput] = useState('');
    const [roomNameInput, setRoomNameInput] = useState('');
    const [modalError, setModalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
    const scrollRef = useRef();

    // --- LOGIC PRESERVED ---
    const joinExistingRoom = async () => {
        if (!roomIdInput.trim()) {
            setModalError('Please enter a valid Room ID');
            return;
        }
        setIsLoading(true);
        setModalError('');
        try {
            const res = await axiosClient.post('/chat/rooms/join', { roomId: roomIdInput.trim() });
            setRooms(prev => [...prev, res.data]);
            setActiveRoom(res.data);
            setShowJoinModal(false);
            setRoomIdInput('');
            setIsSidebarOpen(false); // Close sidebar on join (mobile)
        } catch (err) {
            setModalError('Could not join room. Please check the Room ID and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const createNewRoom = async () => {
        if (!roomNameInput.trim()) {
            setModalError('Please enter a room name');
            return;
        }
        setIsLoading(true);
        setModalError('');
        try {
            const res = await axiosClient.post('/chat/rooms', { name: roomNameInput.trim() });
            setRooms([...rooms, res.data]);
            setActiveRoom(res.data);
            setShowCreateModal(false);
            setRoomNameInput('');
            setIsSidebarOpen(false); // Close sidebar on create (mobile)
        } catch (err) {
            setModalError('Could not create room. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModals = () => {
        setShowJoinModal(false);
        setShowCreateModal(false);
        setRoomIdInput('');
        setRoomNameInput('');
        setModalError('');
    };

    const copyRoomId = () => {
        if (activeRoom && activeRoom.name !== "General") {
            navigator.clipboard.writeText(activeRoom._id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (activeRoom) {
            socket.emit('joinRoom', activeRoom._id);
            fetchMessages(activeRoom._id);
        }
        socket.on('receiveMessage', (message) => {
            if (message.roomId === activeRoom?._id) {
                setMessages((prev) => [...prev, message]);
            }
        });
        return () => socket.off('receiveMessage');
    }, [activeRoom]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchRooms = async () => {
        const res = await axiosClient.get('/chat/rooms');
        setRooms(res.data);
        const general = res.data.find(r => r.name === 'General');
        if (general) setActiveRoom(general);
    };

    const fetchMessages = async (roomId) => {
        const res = await axiosClient.get(`/chat/rooms/${roomId}/messages`);
        setMessages(res.data);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const messageData = {
            roomId: activeRoom._id,
            senderId: user._id,
            senderName: user.firstName,
            text: newMessage
        };
        socket.emit('sendMessage', messageData);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-[#020617] text-white overflow-hidden relative">
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1121] border-r border-white/10 transition-transform duration-300 transform 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:relative md:translate-x-0 md:flex md:flex-col shadow-2xl
            `}>
                {/* Sidebar Header */}
                <div className="p-4 md:p-6 border-b border-white/10 bg-slate-900/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="font-bold text-base">My Rooms</h2>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-1 hover:bg-white/10 rounded">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setShowJoinModal(true)} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all">
                            <Hash className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-bold text-cyan-400 uppercase">Join</span>
                        </button>
                        <button onClick={() => setShowCreateModal(true)} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all">
                            <Plus className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-400 uppercase">Create</span>
                        </button>
                    </div>
                </div>

                {/* Rooms List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    {rooms.map(room => (
                        <button 
                            key={room._id}
                            onClick={() => {
                                setActiveRoom(room);
                                setIsSidebarOpen(false); // Close menu on select for mobile
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                                activeRoom?._id === room._id 
                                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-white' 
                                    : 'text-slate-400 hover:bg-white/5'
                            }`}
                        >
                            <Hash className={`w-4 h-4 ${activeRoom?._id === room._id ? 'text-cyan-400' : 'text-slate-600'}`} />
                            <span className="text-sm font-medium truncate">{room.name}</span>
                            {room.isGeneral && <span className="ml-auto text-[8px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 uppercase">Public</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#020617]">
                {/* Chat Header */}
                <div className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 border-b border-white/10 bg-slate-900/30 backdrop-blur-md">
                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        {/* Toggle Sidebar Button (Mobile) */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 -ml-2 md:hidden hover:bg-white/5 rounded-lg"
                        >
                            <Menu className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="hidden md:block p-2.5 bg-slate-800 rounded-lg">
                            <Hash className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="truncate">
                            <h2 className="font-bold text-sm md:text-lg truncate">
                                {activeRoom?.name || 'Select a Room'}
                            </h2>
                            {activeRoom && !activeRoom.isGeneral && (
                                <p className="text-[10px] text-slate-500 font-mono hidden md:block">ID: {activeRoom._id}</p>
                            )}
                        </div>
                    </div>

                    {activeRoom && !activeRoom.isGeneral && (
                        <button onClick={copyRoomId} className="p-2 md:px-3 md:py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 text-xs flex items-center gap-2 hover:bg-white/10 transition-all shrink-0">
                            {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span className="hidden sm:inline">{copied ? 'Copied' : 'Invite'}</span>
                        </button>
                    )}
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6">
                    {messages.length > 0 ? (
                        messages.map((msg, idx) => {
                            const isMe = msg.senderId === user._id;
                            return (
                                <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`flex items-center gap-2 mb-1.5 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <span className="text-[10px] font-bold text-slate-500">{msg.senderName}</span>
                                        <span className="text-[9px] text-slate-600">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm max-w-[85%] md:max-w-[70%] shadow-lg ${
                                        isMe ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none border border-white/5'
                                    }`}>
                                        <p className="leading-relaxed break-words">{msg.text}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600">
                            <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                            <p className="text-sm">No messages yet</p>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 md:p-6 bg-gradient-to-t from-[#020617] to-transparent">
                    <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto flex items-center gap-2 md:gap-3 bg-slate-900/80 border border-white/10 rounded-2xl p-1.5 md:p-2 focus-within:border-cyan-500/50 transition-all shadow-xl">
                        <input 
                            type="text" 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-3 md:px-4 py-2 outline-none"
                        />
                        <button 
                            type="submit" 
                            disabled={!newMessage.trim()}
                            className="p-2.5 md:p-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all shrink-0"
                        >
                            <Send className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Modals - Preserved logic, added width responsiveness */}
            {(showJoinModal || showCreateModal) && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModals}></div>
                    <div className="relative bg-[#0B1121] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">{showJoinModal ? 'Join Room' : 'Create Room'}</h3>
                            <button onClick={closeModals} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        
                        <input 
                            type="text"
                            value={showJoinModal ? roomIdInput : roomNameInput}
                            onChange={(e) => showJoinModal ? setRoomIdInput(e.target.value) : setRoomNameInput(e.target.value)}
                            placeholder={showJoinModal ? "Enter Room ID" : "Room Name"}
                            className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl mb-4 outline-none focus:border-cyan-500 transition-all"
                        />

                        {modalError && <p className="text-xs text-red-400 mb-4 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> {modalError}</p>}

                        <button 
                            onClick={showJoinModal ? joinExistingRoom : createNewRoom}
                            disabled={isLoading}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                showJoinModal ? 'bg-cyan-600 hover:bg-cyan-500' : 'bg-emerald-600 hover:bg-emerald-500'
                            }`}
                        >
                            {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : (showJoinModal ? 'Join Now' : 'Create Now')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}