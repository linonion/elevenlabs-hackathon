"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Loader2, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceUploadProps {
  onVoiceCreated: (voiceId: string) => void;
}

const VoiceUpload = ({ onVoiceCreated }: VoiceUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [clonedAudioUrl, setClonedAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [stability, setStability] = useState(0.5); // test param
  const [similarityBoost, setSimilarityBoost] = useState(0.5); // test param

  useEffect(() => {
    return () => {
      if (clonedAudioUrl) {
        URL.revokeObjectURL(clonedAudioUrl);
      }
    };
  }, [clonedAudioUrl]);


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    setUploadedAudio(file);
    setClonedAudioUrl(null);
    
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await fetch('http://localhost:3001/api/voice-clone', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to clone voice');
      }

      const { voiceId } = data;
      setVoiceId(voiceId);
      onVoiceCreated(voiceId);
      
      setProgress(100);
      toast({
        title: "Success!",
        description: "Voice has been successfully uploaded.",
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Upload Error:', error);
      toast({
        title: "Error",
        description: "Failed to upload voice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // handle cloned voice output
  const handleGenerateClonedVoice = async () => {
    if (!voiceId) {
      toast({
        title: "Missing Data",
        description: "Please upload a voice first",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
  
    try {
      const response = await fetch(`http://localhost:3001/api/voice-clone/generate/${voiceId}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate cloned voice');
      }
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setClonedAudioUrl(audioUrl);
  
      toast({
        title: "Success",
        description: "Cloned voice has been generated successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate cloned voice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // handle voice edit
  const handleEditVoice = async() => {
    if(!voiceId) {
      toast({
        title: "Missing Data",
        description: "Please generate a voice first",
        variant: "destructive",
      });
      return;
    }
    const newSettings = {
      name: "updated voice",
      description: "Adjust stability and similarity boost",
      removeBackgroundNoise: false,
      stability: stability,
      similarityBoost: similarityBoost
    };
    try {
      const response = await fetch(`http://localhost:3001/api/voice-clone/edit/${voiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || 'failed to edit cloned voice');
      }

      toast({
        title: "Success",
        description: "Cloned voice has been generated successfully",
      });
      await handleGenerateClonedVoice(); //generate voice after editing automatically
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate cloned voice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-8 border-2 border-dashed border-primary/20 rounded-lg 
        hover:border-primary/40 transition-colors">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
          id="voice-upload"
          disabled={isUploading}
        />
        <Button asChild variant="outline" disabled={isUploading}>
          <label htmlFor="voice-upload" className="cursor-pointer text-white">
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
      
      {/* generate button */}
      {voiceId && (
         <div className="text-center mt-4">
        <Button
          onClick={handleGenerateClonedVoice}
          disabled={isGenerating}
          variant="outline"
          className="cursor-pointer text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating ... 
            </>
          ) : (
            <>
              Generate
            </>
          )}
        </Button>
          <p className="text-sm text-gray-600">Click to hear your cloned voice!</p>
        </div>
      )}

        {/*         
        {voiceId && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Stability</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={stability}
              onChange={(e) => setStability(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-600">Current Stability: {stability}</span>
            
            <Button
              onClick={handleEditVoice}
              className="w-28 btn-edit mt-4"
            >
              Edit Voice
            </Button>
          </div>
        )} */}

        {/* sliders */}
        {voiceId && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" >Stability</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={stability}
            onChange={(e) => setStability(parseFloat(e.target.value))}
            className="w-full custom-slider"
          />
          <span className="text-sm text-gray-600">Current Stability: {stability}</span>

          <label className="block text-sm font-medium text-gray-700 mt-4">Similarity Boost</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={similarityBoost}
            onChange={(e) => setSimilarityBoost(parseFloat(e.target.value))}
            className="w-full custom-slider"
          />
          <span className="text-sm text-gray-600">Current Similarity Boost: {similarityBoost}</span>
          
          <Button
            onClick={handleEditVoice}
            className="flex cursor-pointer text-white"
            variant="outline"
          >
            Edit Voice
          </Button>
        </div>
    )}
      
      {/* cloned voice playback */}
      {clonedAudioUrl && (
        <div className="mt-6 p-4 bg-accent rounded-lg animate-fade-in">
          <p className="text-sm text-gray-600">Cloned voice playback</p>
          <audio key={clonedAudioUrl}
            controls
            className="w-full">
            <source src={clonedAudioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default VoiceUpload;
