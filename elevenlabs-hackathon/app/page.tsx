"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import VoiceUpload from "@/components-ym/VoiceUpload";
import TextGeneration from "@/components-ym/TextGeneration";
import { BookAudio, Mic } from "lucide-react";

const Index = () => {
  const [voiceId, setVoiceId] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-2">Voice Story Creator</h1>
          <p className="text-secondary text-lg">Create your own audiobooks with custom voices!</p>
        </div>

        <div className="relative">
          {/* book spine and shadow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r 
            from-gray-900/20 to-transparent transform -translate-x-1/2"></div>
          {/* main content */}
          <div className="flex justify-center gap-2">
            {/* left */}
            <Card className="w-1/2 p-6 backdrop-blur-sm bg-white/95 rounded-l-lg shadow-2xl 
              relative before:absolute before:inset-y-0 before:right-0 before:w-12 
              before:bg-gradient-to-l before:from-gray-200/50 before:to-transparent">
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-primary mb-4">Voice Upload</h2>
                <VoiceUpload onVoiceCreated={setVoiceId} />
              </div>
            </Card>

            {/* right */}
            <Card className="w-1/2 p-6 backdrop-blur-sm bg-white/95 rounded-r-lg 
              shadow-2xl relative before:absolute before:inset-y-0 before:left-0 before:w-12 
              before:bg-gradient-to-r before:from-gray-200/50 before:to-transparent">
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-primary mb-4">Text to Speech</h2>
                <TextGeneration voiceId={voiceId} />
              </div>
            </Card>
          </div>

          {/* bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-8 
            bg-gradient-to-b from-transparent to-gray-900/20 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;