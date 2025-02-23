"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ModifyClonedVoiceProps {
  voiceId: string;
}

const ModifyClonedVoice = ({ voiceId }: ModifyClonedVoiceProps) => {
  const [newVoiceSettings, setNewVoiceSettings] = useState("");
  const { toast } = useToast();

  const handleModify = async () => {
    if (!voiceId || !newVoiceSettings.trim()) {
      toast({
        title: "Missing Data",
        description: "Please provide the new voice settings.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/modify-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voiceId, newVoiceSettings }),
      });

      if (!response.ok) {
        throw new Error('Failed to modify cloned voice');
      }

      toast({
        title: "Success!",
        description: "Voice has been modified successfully.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to modify voice. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Modify Cloned Voice</h2>
      <h3>
        add audio param ui here
			</h3>
      <Button onClick={handleModify}>Apply Modifications</Button>
    </div>
  );
};

export default ModifyClonedVoice;
