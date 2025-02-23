"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ModifyClonedVoice from "./ModifyClonedAudio";

interface TextGenerationProps {
  voiceId: string;
  pitchParam: (newPitch: number) => void;
}
const TextGeneration = ({ voiceId }: TextGenerationProps) => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [ShowModifyComponent, setShowModifyComponent] = useState(false);
  const [pitch, setPitch] = useState(1);
  const { toast } = useToast();

  const handleGenerate = async () => {
    // console.log("generate button clicked");
  
    if (!voiceId || !text.trim()) {
      toast({
        title: "Missing Data",
        description: "Please upload a voice and enter text.",
        variant: "destructive",
      });
      return;
    }
  
    setIsGenerating(true);
  
    try {
      const response = await fetch('http://localhost:3001/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voiceId, text }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }
  
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
  
      toast({
        title: "Success!",
        description: "Audio has been generated successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePitch = (newPitch: number) => {
    setPitch(newPitch);
    console.log("newpitch: ", newPitch);
  };
  

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <Textarea
          placeholder="Enter your story here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] text-lg leading-relaxed"
          maxLength={1000}
        />
        <p className="text-sm text-gray-600 mt-2 text-right">
          {text.length}/500 characters
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            // console.log("button clicked");
            handleGenerate();
          }}
          disabled={isGenerating || !text.trim()}
          className= {`w-40 btn-generate`}
        >
          
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Play className={`w-40 btn-generate`} />
              Generate
            </>
          )}
        </Button>

        {/* {audioUrl && !isGenerating && (
          <Button variant="outline" className={`w-40 btn-generate`}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        )} */}

        {/* add modify button for editing cloned voice tab
        <Button 
          onClick={() => setShowModifyComponent((prev) => !prev)}
          variant="outline"
          className="text-white"
        >
          {ShowModifyComponent ? "Close Modify" : "Modify Cloned Voice"}
        </Button> */}
      </div>

      {audioUrl && !isGenerating && (
        <div className="mt-6 p-4 bg-accent rounded-lg animate-fade-in">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* {ShowModifyComponent && 
      // <ModifyClonedVoice voiceId={voiceId} pitchParam={handlePitch}/>}
      <ModifyClonedVoice voiceId={voiceId}/>} */}
    </div>
  );
};

export default TextGeneration;