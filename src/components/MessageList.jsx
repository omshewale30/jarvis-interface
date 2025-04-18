"use client"

import { motion } from "framer-motion"

const MessageList = ({ messages }) => {
  return (
      <div className="space-y-4">
        {messages.map((message,index) => (
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
                {message.content}
              </div>
            </motion.div>
        ))}
      </div>
  )
}

export default MessageList
