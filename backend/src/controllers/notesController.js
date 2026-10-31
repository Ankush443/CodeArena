const Notes = require('../models/notes');

exports.getNote = async (req, res) => {
    try {
        const note = await Notes.findOne({ 
            userId: req.result._id, 
            problemId: req.params.problemId 
        });
        res.status(200).json(note || { textContent: "", drawingData: {} });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// works for react canva

// exports.upsertNote = async (req, res) => {
//    try {
//         const { problemId, textContent, drawingData } = req.body;
        
//         // CRITICAL: If drawingData is empty, store it as an empty array []
//         // never store it as {} for this specific library.
//         const finalizedData = (drawingData && Array.isArray(drawingData)) ? drawingData : [];
        
//         const note = await Notes.findOneAndUpdate(
//             { userId: req.result._id, problemId }, 
//             { 
//                 textContent, 
//                 drawingData: finalizedData 
//             },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//         );
//         res.status(200).json(note);
//     } catch (err) {
//         res.status(500).json({ message: "Sync error: " + err.message });
//     }
// };

// for fabric
exports.upsertNote = async (req, res) => {
   try {
        const { problemId, textContent, drawingData } = req.body;
        
        // Fabric.js saves as an Object { version: ..., objects: [...] }
        // We just need to ensure it's a valid object and not undefined
        const cleanDrawingData = drawingData ? JSON.parse(JSON.stringify(drawingData)) : {};
        
        const note = await Notes.findOneAndUpdate(
            { userId: req.result._id, problemId }, 
            { 
                textContent, 
                drawingData: cleanDrawingData 
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: "Sync error: " + err.message });
    }
};