// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { ChevronLeft } from 'lucide-react';
// import axiosClient from '../utils/axiosClient';
// import debounce from 'lodash.debounce';
// import { Tldraw, getSnapshot, loadSnapshot } from '@tldraw/tldraw';
// import '@tldraw/tldraw/tldraw.css';

// const NotesPanel = () => {
//     const { problemId } = useParams();
//     const navigate = useNavigate();
//     const [textContent, setTextContent] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [editor, setEditor] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
    
//     const currentTextRef = useRef("");
//     const drawingDataRef = useRef(null);
//     const isInitialLoad = useRef(true);

//     // 1. Fetch data from DB
//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const { data } = await axiosClient.get(`/notes/${problemId}`);
//                 if (data) {
//                     setTextContent(data.textContent || "");
//                     currentTextRef.current = data.textContent || "";
//                     console.log("📥 Fetched from Backend:", data.textContent);
//                     console.log("📥 Fetched from Backend:", data.drawingData);
//                     if (data.drawingData ) {
//                         console.log("📥 Valid drawing data found, setting ref");
//                         drawingDataRef.current = data.drawingData;
//                     }
//                     console.log("Drwaingdata.curent", drawingDataRef.current);
//                 }
//             } catch (err) { console.error("Fetch error:", err); }
//             finally { setIsLoading(false); }
//         };
//         loadData();
//     }, [problemId]);

//     // 2. Optimized Save Function
//     const saveToBackend = useCallback(
//         debounce(async (text, drawingData) => {
//             // Guard: Don't save if we are still loading the initial drawing
//             if (isInitialLoad.current) return;

//             setIsSaving(true);
//             try {
//                 console.log("📡 Sending to Backend...", );
//                 await axiosClient.patch('/notes', {
//                     problemId,
//                     textContent: text,
//                     drawingData: drawingData // This is the full snapshot object
//                 });
//                 console.log("✅ Sync Complete");
//             } catch (error) {
//                 console.error("❌ Save failed:", error);
//             } finally {
//                 setTimeout(() => setIsSaving(false), 500);
//             }
//         }, 2000), // 2 second debounce
//         [problemId]
//     );

//     // 3. Text Change Handler
//     const handleTextChange = (e) => {
//         const val = e.target.value;
//         setTextContent(val);
//         currentTextRef.current = val;
//         if (editor) {
//             saveToBackend(val, getSnapshot(editor.store));
//         }
//     };

//     // 4. Editor Mount Handler
//   const handleMount = useCallback((mountedEditor) => {
//     setEditor(mountedEditor);

//     if (drawingDataRef.current) {
//         try {
//             const snapshot = drawingDataRef.current;
//             const store = snapshot.store || snapshot;

//             // 1. DEEP SANITIZE: Loop through every record and force a meta object
//             // This fixes document.meta, page.meta, and shape.meta errors all at once.
//             Object.keys(store).forEach((key) => {
//                 const record = store[key];
//                 if (record && typeof record === 'object' && record.meta === undefined) {
//                     record.meta = {};
//                 }
//             });

//             // 2. Load the cleaned snapshot
//             loadSnapshot(mountedEditor.store, snapshot);
//             console.log("📥 Loaded and Sanitized drawing from DB");
//         } catch (e) {
//             console.error("🚨 Load error:", e);
//             // Fallback: If it still fails, the data might be too corrupted.
//             // You could optionally call mountedEditor.updateConfig(...) here.
//         }
//     }

//     setTimeout(() => { isInitialLoad.current = false; }, 500);

//     const unsubscribe = mountedEditor.store.listen(() => {
//         if (isInitialLoad.current) return;
//         const snapshot = getSnapshot(mountedEditor.store);
//         saveToBackend(currentTextRef.current, snapshot);
//     }, { scope: 'document', source: 'user' });

//     return () => unsubscribe();
// }, [saveToBackend]);

//     return (
//         <div className="h-screen w-screen bg-[#020617] flex flex-col overflow-hidden text-white">
//             <div className="h-14 border-b border-white/5 bg-slate-950 flex items-center justify-between px-6">
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5"/></button>
//                     <span className="text-xs font-bold uppercase text-cyan-500">Scratchpad</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                     {isSaving && <div className="w-1 h-1 bg-cyan-500 rounded-full animate-ping"></div>}
//                     <span className="text-[10px] text-slate-500 uppercase">{isSaving ? "Saving..." : "Saved"}</span>
//                 </div>
//             </div>

//             <div className="flex-1 flex overflow-hidden">
//                 <textarea 
//                     className="w-80 bg-slate-950/50 p-4 border-r border-white/5 outline-none text-sm font-mono resize-none"
//                     value={textContent}
//                     onChange={handleTextChange}
//                     placeholder="Notes..."
//                 />
//                 <div className="flex-1 relative">
//                     {!isLoading && <Tldraw onMount={handleMount} inferDarkMode />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotesPanel;

//below code is working react sketch canva

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { ChevronLeft, Eraser, Undo, Pencil, Redo, Trash2 } from 'lucide-react';
// import axiosClient from '../utils/axiosClient';
// import debounce from 'lodash.debounce';
// import { ReactSketchCanvas } from 'react-sketch-canvas';

// const NotesPanel = () => {
//     const { problemId } = useParams();
//     const navigate = useNavigate();
//     const [textContent, setTextContent] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [eraseMode, setEraseMode] = useState(false);

//     const canvasRef = useRef(null);
//     const currentTextRef = useRef("");

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const { data } = await axiosClient.get(`/notes/${problemId}`);
//                 if (data) {
//                     setTextContent(data.textContent || "");
//                     currentTextRef.current = data.textContent || "";
                    
//                     // CRITICAL FIX: Ensure drawingData is an array
//                     let paths = [];
//                     if (data.drawingData) {
//                         paths = Array.isArray(data.drawingData) 
//                             ? data.drawingData 
//                             : (typeof data.drawingData === 'string' ? JSON.parse(data.drawingData) : []);
//                     }

//                     // Only load if there are paths to avoid the 'length' error
//                     if (paths.length > 0 && canvasRef.current) {
//                         canvasRef.current.loadPaths(paths);
//                     }
//                 }
//             } catch (err) {
//                 console.error("Fetch error:", err);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadData();
//     }, [problemId]);

//     const saveToBackend = useCallback(
//         debounce(async (text, paths) => {
//             setIsSaving(true);
//             try {
//                 await axiosClient.patch('/notes', {
//                     problemId,
//                     textContent: text,
//                     drawingData: paths // Paths is already an array from exportPaths()
//                 });
//             } catch (error) {
//                 console.error("❌ Save failed:", error);
//             } finally {
//                 setTimeout(() => setIsSaving(false), 800);
//             }
//         }, 1000),
//         [problemId]
//     );

//     const triggerSave = async () => {
//         if (canvasRef.current) {
//             const paths = await canvasRef.current.exportPaths();
//             saveToBackend(currentTextRef.current, paths);
//         }
//     };

//     if (isLoading) return <div className="h-screen bg-slate-950 flex items-center justify-center">Initializing...</div>;

//     return (
//         <div className="h-screen w-screen bg-[#020617] flex flex-col overflow-hidden text-white">
//             <div className="h-14 border-b border-white/5 bg-slate-950 flex items-center justify-between px-6 shrink-0">
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5"/></button>
//                     <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Scratchpad</span>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                     <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 shadow-lg">
//                         <button onClick={() => { setEraseMode(false); canvasRef.current.eraseMode(false); }} className={`p-2 rounded ${!eraseMode ? 'bg-cyan-500' : 'text-slate-400'}`}><Pencil className="w-4 h-4"/></button>
//                         <button onClick={() => { setEraseMode(true); canvasRef.current.eraseMode(true); }} className={`p-2 rounded ${eraseMode ? 'bg-cyan-500' : 'text-slate-400'}`}><Eraser className="w-4 h-4"/></button>
//                         <div className="w-px bg-white/10 mx-1" />
//                         <button onClick={() => canvasRef.current.undo()} className="p-2 text-slate-400"><Undo className="w-4 h-4"/></button>
//                         <button onClick={() => canvasRef.current.clearCanvas()} className="p-2 text-slate-400"><Trash2 className="w-4 h-4"/></button>
//                     </div>
//                     <span className="text-[10px] text-slate-500 uppercase font-bold">{isSaving ? "Syncing" : "Saved"}</span>
//                 </div>
//             </div>

//             <div className="flex-1 flex overflow-hidden">
//                 <textarea 
//                     className="w-80 bg-slate-950/50 p-6 border-r border-white/5 outline-none text-sm font-mono resize-none text-slate-300 placeholder:text-slate-800"
//                     value={textContent}
//                     onChange={(e) => { setTextContent(e.target.value); currentTextRef.current = e.target.value; triggerSave(); }}
//                     placeholder="Problem-solving notes..."
//                 />
                
//                 <div className="flex-1 bg-[#020617] relative">
//                     <ReactSketchCanvas
//                         ref={canvasRef}
//                         strokeWidth={3}
//                         strokeColor="#22d3ee"
//                         canvasColor="transparent"
//                         onStroke={triggerSave}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotesPanel;

//using fabric
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { 
//     ChevronLeft, Square, Type, Pencil, Trash2, 
//     MousePointer2, Circle, Highlighter, Hand, 
//     Eraser, Undo, Redo, Minus, 
//     ArrowUpRight, Download, Hash
// } from 'lucide-react';
// import axiosClient from '../utils/axiosClient';
// import debounce from 'lodash.debounce';
// import * as fabric from 'fabric';

// const NotesPanel = () => {
//     const { problemId } = useParams();
//     const navigate = useNavigate();
//     const [textContent, setTextContent] = useState("");
//     const [isSaving, setIsSaving] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
    
//     // UI States
//     const [activeTool, setActiveTool] = useState('pen');
//     const [activeColor, setActiveColor] = useState('#22d3ee');
//     const [strokeWidth, setStrokeWidth] = useState(3);
    
//     const canvasElementRef = useRef(null);
//     const fabricCanvasRef = useRef(null);
//     const currentTextRef = useRef("");

//     // History Stack
//     const history = useRef([]);
//     const historyStep = useRef(-1);
//     const isHistoryAction = useRef(false);

//     // 1. Initialize Canvas & Load Data
//     useEffect(() => {
//         let isMounted = true;
//         const initCanvas = async () => {
//             if (!canvasElementRef.current) return;

//             const canvas = new fabric.Canvas(canvasElementRef.current, {
//                 width: window.innerWidth - 320,
//                 height: window.innerHeight - 56,
//                 backgroundColor: 'transparent',
//                 isDrawingMode: true,
//             });

//             // Set default brush
//             canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
//             canvas.freeDrawingBrush.color = activeColor;
//             canvas.freeDrawingBrush.width = strokeWidth;
//             fabricCanvasRef.current = canvas;

//             try {
//                 const { data } = await axiosClient.get(`/notes/${problemId}`);
//                 if (isMounted && data) {
//                     setTextContent(data.textContent || "");
//                     currentTextRef.current = data.textContent || "";
                    
//                     if (data.drawingData && data.drawingData.objects) {
//                         await canvas.loadFromJSON(data.drawingData);
//                         canvas.renderAll();
//                     }
//                 }
//             } catch (err) {
//                 console.error("Canvas init error:", err);
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false);
//                     saveToHistory(); // Capture the initial state
//                 }
//             }

//             // Sync Listeners
//             canvas.on('object:added', () => !isHistoryAction.current && saveToHistory());
//             canvas.on('object:modified', () => !isHistoryAction.current && saveToHistory());
//             canvas.on('object:removed', () => !isHistoryAction.current && saveToHistory());
//         };

//         initCanvas();
//         return () => {
//             isMounted = false;
//             fabricCanvasRef.current?.dispose();
//         };
//     }, [problemId]);

//     // 2. Toolbar & Tool Logic (Fixed Colors/Highlighter/Eraser)
//     const updateTool = (tool, color = activeColor, width = strokeWidth) => {
//         const canvas = fabricCanvasRef.current;
//         if (!canvas) return;
        
//         setActiveTool(tool);
//         setActiveColor(color);
//         setStrokeWidth(width);

//         if (tool === 'pen' || tool === 'highlighter' || tool === 'eraser') {
//             canvas.isDrawingMode = true;
//             if (tool === 'eraser') {
//                 canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
//                 canvas.freeDrawingBrush.width = 10;
//             } else if (tool === 'highlighter') {
//                 canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
//                 canvas.freeDrawingBrush.color = `${color}55`; // 33% transparency
//                 canvas.freeDrawingBrush.width = 20;
//             } else {
//                 canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
//                 canvas.freeDrawingBrush.color = color;
//                 canvas.freeDrawingBrush.width = width;
//             }
//         } else {
//             canvas.isDrawingMode = false;
//         }
//     };

//     // 3. History Management (Undo/Redo)
//     const saveToHistory = () => {
//         if (!fabricCanvasRef.current) return;
//         const json = JSON.stringify(fabricCanvasRef.current.toJSON());
//         history.current = history.current.slice(0, historyStep.current + 1);
//         history.current.push(json);
//         historyStep.current = history.current.length - 1;
//         triggerSave();
//     };

//     const handleUndo = async () => {
//         if (historyStep.current <= 0) return;
//         isHistoryAction.current = true;
//         historyStep.current--;
//         await fabricCanvasRef.current.loadFromJSON(JSON.parse(history.current[historyStep.current]));
//         fabricCanvasRef.current.renderAll();
//         isHistoryAction.current = false;
//         triggerSave();
//     };

//     const handleRedo = async () => {
//         if (historyStep.current >= history.current.length - 1) return;
//         isHistoryAction.current = true;
//         historyStep.current++;
//         await fabricCanvasRef.current.loadFromJSON(JSON.parse(history.current[historyStep.current]));
//         fabricCanvasRef.current.renderAll();
//         isHistoryAction.current = false;
//         triggerSave();
//     };

//     // 4. Shapes & Export
//     const addShape = (type) => {
//         const canvas = fabricCanvasRef.current;
//         updateTool('select');
//         const props = { left: 100, top: 100, fill: 'transparent', stroke: activeColor, strokeWidth: strokeWidth };
//         let obj;

//         if (type === 'rect') obj = new fabric.Rect({ ...props, width: 100, height: 100 });
//         else if (type === 'circle') obj = new fabric.Circle({ ...props, radius: 50 });
//         else if (type === 'line') obj = new fabric.Line([50, 50, 200, 50], { ...props });
//         else if (type === 'arrow') obj = new fabric.Path('M 0 0 L 50 0 M 50 0 L 40 -5 M 50 0 L 40 5', { ...props, scaleX: 2, scaleY: 2 });
//         else if (type === 'text') obj = new fabric.IText('Edit me', { ...props, fill: activeColor, strokeWidth: 0, fontSize: 20 });
        
//         canvas.add(obj);
//         canvas.setActiveObject(obj);
//     };

//     const downloadPNG = () => {
//         const url = fabricCanvasRef.current.toDataURL({ format: 'png', multiplier: 2 });
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `notes-${problemId}.png`;
//         a.click();
//     };

//     // 5. Backend Sync
//     const triggerSave = useCallback(debounce(async () => {
//         if (!fabricCanvasRef.current || isLoading) return;
//         setIsSaving(true);
//         try {
//             await axiosClient.patch('/notes', {
//                 problemId,
//                 textContent: currentTextRef.current,
//                 drawingData: fabricCanvasRef.current.toJSON()
//             });
//         } catch (err) { console.error(err); }
//         finally { setTimeout(() => setIsSaving(false), 500); }
//     }, 1500), [problemId, isLoading]);

//     return (
//         <div className="h-screen w-screen bg-[#020617] flex flex-col overflow-hidden text-white font-sans">
//             <header className="h-14 border-b border-white/5 bg-slate-950 flex items-center justify-between px-6 shrink-0">
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400"><ChevronLeft className="w-5 h-5"/></button>
//                     <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Workspace</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                     {/* Size Selector */}
//                     <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 gap-1 mr-2">
//                         {[2, 5, 12].map(s => (
//                             <button key={s} onClick={() => updateTool(activeTool, activeColor, s)} className={`p-1 px-2 rounded text-[10px] ${strokeWidth === s ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}>{s}px</button>
//                         ))}
//                     </div>

//                     {/* Colors */}
//                     <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 mr-2">
//                         {['#22d3ee', '#f87171', '#4ade80', '#ffffff'].map(c => (
//                             <button key={c} onClick={() => updateTool(activeTool, c)} className={`w-4 h-4 rounded-full m-1 border ${activeColor === c ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
//                         ))}
//                     </div>

//                     {/* Tools */}
//                     <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 gap-0.5">
//                         <button onClick={handleUndo} className="p-2 text-slate-400 hover:text-white"><Undo className="w-4 h-4"/></button>
//                         <button onClick={handleRedo} className="p-2 text-slate-400 hover:text-white"><Redo className="w-4 h-4"/></button>
//                         <div className="w-px bg-white/10 mx-1" />
//                         <button onClick={() => updateTool('pen')} className={`p-2 rounded ${activeTool === 'pen' ? 'bg-cyan-500/20 text-cyan-500' : 'text-slate-400'}`}><Pencil className="w-4 h-4"/></button>
//                         <button onClick={() => updateTool('highlighter')} className={`p-2 rounded ${activeTool === 'highlighter' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-400'}`}><Highlighter className="w-4 h-4"/></button>
//                         <button onClick={() => updateTool('eraser')} className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}><Eraser className="w-4 h-4"/></button>
//                         <button onClick={() => updateTool('select')} className={`p-2 rounded ${activeTool === 'select' ? 'bg-white/10 text-white' : 'text-slate-400'}`}><MousePointer2 className="w-4 h-4"/></button>
//                         <div className="w-px bg-white/10 mx-1" />
//                         <button onClick={() => addShape('rect')} className="p-2 text-slate-400 hover:text-white"><Square className="w-4 h-4"/></button>
//                         <button onClick={() => addShape('circle')} className="p-2 text-slate-400 hover:text-white"><Circle className="w-4 h-4"/></button>
//                         <button onClick={() => addShape('arrow')} className="p-2 text-slate-400 hover:text-white"><ArrowUpRight className="w-4 h-4"/></button>
//                         <button onClick={() => addShape('text')} className="p-2 text-slate-400 hover:text-white"><Type className="w-4 h-4"/></button>
//                         <div className="w-px bg-white/10 mx-1" />
//                         <button onClick={downloadPNG} className="p-2 text-slate-400 hover:text-cyan-400" title="Download"><Download className="w-4 h-4"/></button>
//                         <button onClick={() => { fabricCanvasRef.current.remove(...fabricCanvasRef.current.getActiveObjects()); fabricCanvasRef.current.discardActiveObject(); }} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
//                     </div>
//                 </div>
//             </header>

//             <div className="flex-1 flex overflow-hidden relative">
//                 {isLoading && (
//                     <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
//                         <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
//                         <span className="text-[10px] tracking-widest text-cyan-500 uppercase font-bold">Mounting Canvas...</span>
//                     </div>
//                 )}
                
//                 <textarea 
//                     className="w-80 bg-slate-950 p-6 border-r border-white/5 outline-none text-sm font-mono text-slate-300 resize-none"
//                     value={textContent}
//                     onChange={(e) => { setTextContent(e.target.value); currentTextRef.current = e.target.value; triggerSave(); }}
//                     placeholder="Enter logic notes..."
//                 />
//                 <div className="flex-1 bg-[#020617] relative">
//                     <canvas ref={canvasElementRef} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotesPanel;
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
    ChevronLeft, Square, Type, Pencil, Trash2, 
    MousePointer2, Circle, Highlighter, 
    Eraser, Undo, Redo, Minus, 
    ArrowUpRight, Download, Diamond,
    ZoomIn, ZoomOut, RotateCcw
} from 'lucide-react';
import axiosClient from '../utils/axiosClient';
import debounce from 'lodash.debounce';
import * as fabric from 'fabric';

const NotesPanel = () => {
    const { problemId } = useParams();
    const navigate = useNavigate();
    const [textContent, setTextContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [activeTool, setActiveTool] = useState('pen');
    const [activeColor, setActiveColor] = useState('#22d3ee');
    const [strokeWidth, setStrokeWidth] = useState(3);
    const [zoomLevel, setZoomLevel] = useState(1);
    
    const canvasElementRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const currentTextRef = useRef("");
    const history = useRef([]);
    const historyStep = useRef(-1);
    const isProcessingHistory = useRef(false);

    // 1. Initialize Canvas & Load Data
    useEffect(() => {
        let isMounted = true;
        const initCanvas = async () => {
            if (!canvasElementRef.current) return;

            const canvas = new fabric.Canvas(canvasElementRef.current, {
                width: window.innerWidth - 320,
                height: window.innerHeight - 80,
                backgroundColor: 'transparent',
                isDrawingMode: true,
            });

            fabricCanvasRef.current = canvas;

            try {
                const { data } = await axiosClient.get(`/notes/${problemId}`);
                if (isMounted && data) {
                    setTextContent(data.textContent || "");
                    currentTextRef.current = data.textContent || "";
                    let dData = data.drawingData;
                    if (typeof dData === 'string') dData = JSON.parse(dData);

                    if (dData && dData.objects && dData.objects.length > 0) {
                        await canvas.loadFromJSON(dData);
                        canvas.renderAll();
                    }
                }
            } catch (err) {
                console.error("Canvas Load Error:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                    saveToHistory();
                }
            }

            // Sync Listeners
            const handleChange = () => { if (!isProcessingHistory.current) saveToHistory(); };
            canvas.on('object:added', handleChange);
            canvas.on('object:modified', handleChange);
            canvas.on('object:removed', handleChange);
            canvas.on('path:created', handleChange);

            // Wheel Zoom Logic
            canvas.on('mouse:wheel', (opt) => {
                const delta = opt.e.deltaY;
                let zoom = canvas.getZoom() * (0.999 ** delta);
                if (zoom > 5) zoom = 5;
                if (zoom < 0.1) zoom = 0.1;
                canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
                setZoomLevel(zoom);
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
        };

        initCanvas();
        const timer = setTimeout(() => { if (isMounted) setIsLoading(false); }, 3000);
        return () => { isMounted = false; clearTimeout(timer); fabricCanvasRef.current?.dispose(); };
    }, [problemId]);

    // 2. Zoom Functions for Buttons
    const handleManualZoom = (type) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        let newZoom = canvas.getZoom();

        if (type === 'in') newZoom *= 1.2;
        else if (type === 'out') newZoom /= 1.2;
        else newZoom = 1; // Reset

        if (newZoom > 5) newZoom = 5;
        if (newZoom < 0.1) newZoom = 0.1;

        if (type === 'reset') {
            canvas.setViewportTransform([newZoom, 0, 0, newZoom, 0, 0]);
        } else {
            // Zoom into the center of the current view
            const center = canvas.getVpCenter();
            canvas.zoomToPoint({ x: center.x, y: center.y }, newZoom);
        }
        
        setZoomLevel(newZoom);
    };

    const triggerSave = useCallback(debounce(async (json) => {
        setIsSaving(true);
        try {
            await axiosClient.patch('/notes', {
                problemId, textContent: currentTextRef.current, drawingData: json
            });
        } catch (err) { console.error(err); } 
        finally { setTimeout(() => setIsSaving(false), 500); }
    }, 1500), [problemId]);

    const saveToHistory = () => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        const json = canvas.toJSON();
        history.current = history.current.slice(0, historyStep.current + 1);
        history.current.push(JSON.stringify(json));
        historyStep.current = history.current.length - 1;
        triggerSave(json);
    };

    const undo = async () => {
        if (historyStep.current <= 0) return;
        isProcessingHistory.current = true;
        historyStep.current--;
        await fabricCanvasRef.current.loadFromJSON(JSON.parse(history.current[historyStep.current]));
        fabricCanvasRef.current.renderAll();
        isProcessingHistory.current = false;
        triggerSave(fabricCanvasRef.current.toJSON());
    };

    const redo = async () => {
        if (historyStep.current >= history.current.length - 1) return;
        isProcessingHistory.current = true;
        historyStep.current++;
        await fabricCanvasRef.current.loadFromJSON(JSON.parse(history.current[historyStep.current]));
        fabricCanvasRef.current.renderAll();
        isProcessingHistory.current = false;
        triggerSave(fabricCanvasRef.current.toJSON());
    };

    const updateTool = (tool, color = activeColor, width = strokeWidth) => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        setActiveTool(tool);
        setActiveColor(color);
        setStrokeWidth(width);
        if (tool === 'pen' || tool === 'eraser' || tool === 'highlighter') {
            canvas.isDrawingMode = true;
            const brush = new fabric.PencilBrush(canvas);
            if (tool === 'eraser') { brush.color = '#020617'; brush.width = 30; }
            else if (tool === 'highlighter') { brush.color = `${color}44`; brush.width = 20; }
            else { brush.color = color; brush.width = width; }
            canvas.freeDrawingBrush = brush;
        } else { canvas.isDrawingMode = false; }
    };

    const addShape = (type) => {
        const canvas = fabricCanvasRef.current;
        updateTool('select');
        const props = { left: 100, top: 100, fill: 'transparent', stroke: activeColor, strokeWidth };
        let obj;
        if (type === 'rect') obj = new fabric.Rect({ ...props, width: 100, height: 100 });
        else if (type === 'circle') obj = new fabric.Circle({ ...props, radius: 50 });
        else if (type === 'diamond') obj = new fabric.Rect({ ...props, width: 80, height: 80, angle: 45 });
        else if (type === 'text') obj = new fabric.IText('Double click', { ...props, fill: activeColor, strokeWidth: 0, fontSize: 20 });
        canvas.add(obj);
        canvas.setActiveObject(obj);
    };

    const deleteSelected = () => {
        const canvas = fabricCanvasRef.current;
        const active = canvas.getActiveObjects();
        if (active.length > 0) { canvas.discardActiveObject(); canvas.remove(...active); canvas.renderAll(); }
    };

    return (
        <div className="h-screen w-screen bg-[#020617] flex flex-col overflow-hidden text-white">
            <header className="h-14 border-b border-white/10 bg-slate-950 flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-lg"><ChevronLeft className="w-5 h-5"/></button>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Workspace</span>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* ZOOM BUTTONS */}
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 mr-2">
                        <button onClick={() => handleManualZoom('out')} className="p-1.5 text-slate-400 hover:text-white" title="Zoom Out"><ZoomOut className="w-4 h-4"/></button>
                        <span className="flex items-center px-1 text-[10px] text-slate-500 font-mono min-w-[35px] justify-center">{Math.round(zoomLevel * 100)}%</span>
                        <button onClick={() => handleManualZoom('in')} className="p-1.5 text-slate-400 hover:text-white" title="Zoom In"><ZoomIn className="w-4 h-4"/></button>
                        <button onClick={() => handleManualZoom('reset')} className="p-1.5 text-slate-400 hover:text-white border-l border-white/5 ml-1" title="Reset"><RotateCcw className="w-4 h-4"/></button>
                    </div>

                    <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 gap-1 mr-2">
                        {[2, 5, 10].map(s => (
                            <button key={s} onClick={() => updateTool(activeTool, activeColor, s)} className={`p-1 px-2 rounded text-[10px] ${strokeWidth === s ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}>{s}px</button>
                        ))}
                    </div>

                    <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 mr-2">
                        {['#22d3ee', '#f87171', '#4ade80', '#ffffff'].map(c => (
                            <button key={c} onClick={() => updateTool(activeTool, c)} className={`w-4 h-4 rounded-full m-1 border ${activeColor === c ? 'border-white scale-110' : 'border-transparent'}`} style={{ backgroundColor: c }} />
                        ))}
                    </div>

                    <div className="flex bg-slate-900 rounded-lg p-1 border border-white/10 gap-0.5">
                        <button onClick={undo} className="p-2 text-slate-400 hover:text-white"><Undo className="w-4 h-4"/></button>
                        <button onClick={redo} className="p-2 text-slate-400 hover:text-white"><Redo className="w-4 h-4"/></button>
                        <div className="w-px bg-white/10 mx-1" />
                        <button onClick={() => updateTool('pen')} className={`p-2 rounded ${activeTool === 'pen' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}><Pencil className="w-4 h-4"/></button>
                        <button onClick={() => updateTool('highlighter')} className={`p-2 rounded ${activeTool === 'highlighter' ? 'bg-amber-500/20 text-amber-500' : 'text-slate-400'}`}><Highlighter className="w-4 h-4"/></button>
                        <button onClick={() => updateTool('eraser')} className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-red-500/20 text-red-400' : 'text-slate-400'}`}><Eraser className="w-4 h-4"/></button>
                        <button onClick={() => updateTool('select')} className={`p-2 rounded ${activeTool === 'select' ? 'bg-white/10 text-white' : 'text-slate-400'}`}><MousePointer2 className="w-4 h-4"/></button>
                        <div className="w-px bg-white/10 mx-1" />
                        <button onClick={() => addShape('rect')} className="p-2 text-slate-400 hover:text-white"><Square className="w-4 h-4"/></button>
                        <button onClick={() => addShape('circle')} className="p-2 text-slate-400 hover:text-white"><Circle className="w-4 h-4"/></button>
                        <button onClick={() => addShape('diamond')} className="p-2 text-slate-400 hover:text-white"><Diamond className="w-4 h-4"/></button>
                        <button onClick={() => addShape('text')} className="p-2 text-slate-400 hover:text-white"><Type className="w-4 h-4"/></button>
                        <button onClick={deleteSelected} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4"/></button>
                    </div>
                </div>
            </header>

            <div className="flex h-8 bg-slate-900/50 border-b border-white/5 items-center">
                <div className="w-80 px-6 border-r border-white/10 text-[10px] font-bold uppercase text-slate-500">Notes</div>
                <div className="flex-1 px-4 text-[10px] font-bold uppercase text-slate-500">Scribble Pad</div>
            </div>

            <div className="flex-1 flex overflow-hidden relative">
                {isLoading && (
                    <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center">
                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
                        <span className="text-[10px] tracking-widest text-cyan-500 uppercase font-bold">Mounting Canvas...</span>
                    </div>
                )}
                
                <textarea 
                    className="w-80 bg-slate-950 p-6 border-r border-white/20 outline-none text-sm font-mono text-slate-300 resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
                    value={textContent}
                    onChange={(e) => { setTextContent(e.target.value); currentTextRef.current = e.target.value; triggerSave(fabricCanvasRef.current.toJSON()); }}
                    placeholder="Enter notes..."
                />

                {/* UPDATED DIV CLASS FOR GRID PERSISTENCE */}
                <div className="flex-1 grid-bg-container relative overflow-hidden">
                    <canvas ref={canvasElementRef} />
                </div>
            </div>
        </div>
    );
};

export default NotesPanel;