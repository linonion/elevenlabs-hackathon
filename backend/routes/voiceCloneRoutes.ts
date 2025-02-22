import express from "express";
import multer from "multer";
import { cloneVoice } from "../controllers/voiceCloneController";

const voiceRoutes = express.Router();
const upload = multer({ dest: "uploads/" });

voiceRoutes.post("/clone", upload.single("audio"), async (req, res, next) => {
    console.log("File Received:", req.file);
    console.log("Request Body:", req.body);

    try {
        await cloneVoice(req, res, next);
    } catch (error) {
        next(error);
    }
});

voiceRoutes.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

export default voiceRoutes;