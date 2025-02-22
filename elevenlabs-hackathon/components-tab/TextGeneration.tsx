"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextGenerationProps {
  voiceId: string;
}

const TextGeneration = ({ voiceId }: TextGenerationProps) => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!voiceId) {
      toast({
        title: "No Voice Selected",
        description: "Please upload and create a voice first.",
        variant: "destructive",
      });
      return;
    }

    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to generate speech.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // TODO: Implement actual text-to-speech with ElevenLabs API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate successful audio generation
      setAudioUrl("");
      
      toast({
        title: "Success!",
        description: "Audio has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
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
          onClick={handleGenerate}
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

        {audioUrl && !isGenerating && (
          <Button variant="outline" className={`w-40 btn-generate`}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        )}
      </div>

      {audioUrl && !isGenerating && (
        <div className="mt-6 p-4 bg-accent rounded-lg animate-fade-in">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextGeneration;