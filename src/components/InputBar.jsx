"use client"

import { Send } from "lucide-react"

const InputBar = ({ inputValue, setInputValue, handleSendMessage, handleKeyDown, inputRef, isLoading }) => {
    return (
        <div className="relative flex items-center">
            <div className="absolute inset-0 bg-slate-800/70 backdrop-blur-md rounded-full border border-slate-700/50"></div>
            <input
                disabled={isLoading}
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Om..."
                className="flex-1 bg-transparent text-white placeholder-slate-400 px-4 py-3 outline-none z-10"
            />
            <button

                onClick={handleSendMessage}
                disabled={isLoading||!inputValue.trim()}
                className={`p-2 mr-2 rounded-full z-10 transition-all duration-200 ${
                    inputValue.trim()
                        ? "bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 text-white"
                        : "bg-slate-700/50 text-slate-400"
                }`}
            >
                <Send size={20} />
            </button>
        </div>
    )
}

export default InputBar
