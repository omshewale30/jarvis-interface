"use client"

import { useRef, useEffect } from "react"
import MessageList from "./MessageList"
import InputBar from "./InputBar"
import SuggestionChips from "./SuggestionChips"

const ChatContainer = ({
                           hasSentFirstMessage,
                           messages,
                           inputValue,
                           setInputValue,
                           handleSendMessage,
                           bottomRef,
                           isLoading,
                           suggestions,
                           handleSuggestionClick,

                       }) => {
    const inputRef = useRef(null)

    // Focus input on component mount
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // Handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }


    return (
        <div className="relative w-full max-w-3xl h-[85vh] mx-4 rounded-2xl overflow-hidden flex flex-col z-10">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-[0_0_25px_rgba(15,23,42,0.5)] z-0"></div>

            {/* Header */}
            <div className="relative p-4 border-b border-slate-700/50 z-10">
                <h1 className="text-xl font-semibold text-white flex items-center">
                    <div className="w-3 h-3 rounded-full bg-sky-400 mr-2 animate-pulse"></div>
                    Jarvis
                </h1>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto p-4 z-10 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                <MessageList messages={messages} />
                {isLoading && (
                    <div className="flex items-center space-x-2 text-white/70 mt-4 ml-2">
                        <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                )}
                <div ref={bottomRef} className="h-0" />
            </div>

            {/* Suggestions */}
            <div className="relative px-4 pt-2 z-10">
                {!hasSentFirstMessage && (
                    <SuggestionChips suggestions={suggestions} handleSuggestionClick={handleSuggestionClick} />
                )}

            </div>

            {/* Input */}
            <div className="relative p-4 z-10">
                <InputBar
                    isLoading={isLoading}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleSendMessage={handleSendMessage}
                    handleKeyDown={handleKeyDown}
                    inputRef={inputRef}
                />
            </div>
        </div>
    )
}

export default ChatContainer
