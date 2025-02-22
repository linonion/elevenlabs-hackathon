import express from "express";
import voiceRoutes from "./routes/voiceCloneRoutes";

const app = express();
app.use(express.json());
app.use("/voice", voiceRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
