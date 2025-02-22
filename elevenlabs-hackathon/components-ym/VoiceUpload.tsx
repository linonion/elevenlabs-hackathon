"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceUploadProps {
  onVoiceCreated: (voiceId: string) => void;
}

const VoiceUpload = ({ onVoiceCreated }: VoiceUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // Simulated upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    try {
      // TODO: add voice cloning API
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      // simulate voice creation
      const mockVoiceId = "mock-voice-id-" + Date.now();
      onVoiceCreated(mockVoiceId);
      
      setProgress(100);
      toast({
        title: "Success!",
        description: "Voice has been successfully cloned.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clone voice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      clearInterval(interval);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-8 border-2 border-dashed border-primary/20 rounded-lg hover:border-primary/40 transition-colors">
        <div className="mb-4">
          <Upload className="w-12 h-12 mx-auto text-primary mb-2" />
          <h3 className="text-lg font-semibold mb-2">Upload Voice Sample</h3>
          <p className="text-sm text-gray-600">
            Upload a clear voice recording (MP3 or WAV)
          </p>
        </div>
        
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
          id="voice-upload"
          disabled={isUploading}
        />
        <Button asChild variant="outline" disabled={isUploading}>
          <label htmlFor="voice-upload" className="cursor-pointer">
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Choose File"
            )}
          </label>
        </Button>
      </div>

      {isUploading && (
        <div className="space-y-2 animate-fade-in">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center text-gray-600">
            {progress < 100 ? "Processing voice..." : "Voice created successfully!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceUpload;