import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import FormData from "form-data";

dotenv.config();

// update later
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_URL = "https://api.elevenlabs.io/v1/voices/add";


interface MulterRequest extends Request {
    file?: Express.Multer.File;
  }

// Clone a voice
export const cloneVoice = async (req: MulterRequest, res: Response, next: Function) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No audio file provided" });
        }

        const formData = new FormData();
        formData.append("name", req.body.name);
        formData.append("files", fs.createReadStream(req.file.path));
        formData.append("remove_background_noise", req.body.remove_background_noise || "false");
        if (req.body.description) formData.append("description", req.body.description);
        if (req.body.labels) formData.append("labels", req.body.labels);

        const response = await axios.post(ELEVENLABS_URL, formData, {
            headers: {
                "xi-api-key": ELEVENLABS_API_KEY,
                ...formData.getHeaders(),
            },
        });

        return res.json(response.data);
    } catch (error: any) {
        next(error);
    }
};
  