"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import VoiceUpload from "@/components-tab/VoiceUpload";
import TextGeneration from "@/components-tab/TextGeneration";
import { motion } from "framer-motion";
import Image from "next/image";

const Index = () => {
  const [voiceId, setVoiceId] = useState<string>("");

  return (
    <div className="min-h-screen overflow-hidden relative">

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Left side - Whale */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
            }}
            className="relative group"
          >
            <Image
              src="/images/whale.png"
              alt="whale"
              width={1600}
              height={800}
              objectFit="contain"
            />
          </motion.div>

          {/* Right side - words */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-white space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm">
              <span className="text-sm font-medium">Discover LullAI</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Explore AI powered voice cloning and Text-to-Speech
            </h1>
            <p className="text-lg text-gray-300">
            Allowing parents to preserve their unique voice and use it to read stories to their children
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-lg backdrop-blur-sm hover:from-blue-500/80 hover:to-purple-500/80 transition-colors duration-300"
            >
              Try LullAI Now! 
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* main content */}
      <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.5,
      }}
      className="flex justify-center gap-2">
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
          </motion.div>  

      {/* Decorative floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 opacity-60"
      >
        <div className="w-4 h-4 rounded-full bg-blue-400/30 blur-sm" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-40 left-20 opacity-40"
      >
        <div className="w-6 h-6 rounded-full bg-purple-400/30 blur-sm" />
      </motion.div>
    </div>
  );
};

export default Index;
