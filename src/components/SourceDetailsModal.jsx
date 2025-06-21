"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SourceDetailsModal = ({ isOpen, onClose, sources, sourceDetails }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">Sources & References</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
            {sources && sources.length > 0 ? (
              <div className="space-y-4">
                {sources.map((source, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-sky-600 text-white">
                        {source.displayId}
                      </span>
                      <span className="text-slate-300 text-sm font-medium">Source Reference</span>
                    </div>
                    
                    {sourceDetails && sourceDetails[source.id] ? (
                      <div className="text-slate-200 text-sm">
                        <p className="mb-2">{sourceDetails[source.id].title || 'No title available'}</p>
                        {sourceDetails[source.id].url && (
                          <a 
                            href={sourceDetails[source.id].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:text-sky-300 underline text-xs"
                          >
                            View Source
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400 text-sm">
                        <p>Source details not available</p>
                        <p className="text-xs mt-1">This reference points to source {source.displayId}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <p>No sources available</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SourceDetailsModal 