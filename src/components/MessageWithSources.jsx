"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { parseSources } from "../utils/sourceParser"
import SourceDetailsModal from "./SourceDetailsModal"

const MessageWithSources = ({ message, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { content, sources } = parseSources(message.content);
  const hasSources = sources && sources.length > 0;

  const handleSourceClick = () => {
    if (hasSources) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80%] px-4 py-3 rounded-2xl ${
            message.role === "user"
              ? "bg-gradient-to-r from-sky-600 to-blue-800 text-white shadow-lg shadow-sky-900/30"
              : "bg-slate-800/80 backdrop-blur-sm text-white border border-slate-700/50 shadow-md"
          }`}
        >
          {/* Main content */}
          <div className="whitespace-pre-wrap">{content}</div>
          
          {/* Sources section */}
          {hasSources && message.role === "model" && (
            <div className="mt-3 pt-3 border-t border-slate-600/50">
              <div className="flex flex-wrap gap-1">
                {sources.map((source, sourceIndex) => (
                  <button
                    key={sourceIndex}
                    onClick={handleSourceClick}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600/30 hover:bg-slate-700/70 hover:text-white transition-colors cursor-pointer"
                    title={`View source ${source.displayId} details`}
                  >
                    {source.displayId}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Click on source numbers to view references
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Source Details Modal */}
      <SourceDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sources={sources}
        sourceDetails={message.sourceDetails} // This can be populated from your backend
      />
    </>
  )
}

export default MessageWithSources 