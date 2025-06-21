"use client"

import { useState, useEffect, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import ChatContainer from "./components/ChatContainer"
import AnimatedBackground from "./components/AnimatedBackground"
import { submitChat } from "./chat.js"

function App() {

  const [sessionId, setSessionId] = useState(null);
  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId){
      setSessionId(storedSessionId);
    }else{
      const newSessionId = crypto.randomUUID();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, [])  //create a new session id if one does not exist

  const [messages, setMessages] = useState([
    { role: "model", content: "Hello! How can I assist you today?" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef(null)
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false)



  // Simulate API call to get bot response


  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage = { role: "user", content: inputValue }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    if(!hasSentFirstMessage) {
        setHasSentFirstMessage(true)
    }

    try {
      // Get bot response
      const sessionId = localStorage.getItem('sessionId');
      const response = await submitChat(sessionId, inputValue)
      
      // Add bot message with source details if available
      const botMessage = { 
        id: uuidv4(), 
        role: "model", 
        content: response['response'],
        sourceDetails: response['source_details'] || null // Add source details if provided by backend
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error getting response:", error)
      const errorMessage = {
        id: uuidv4(),
        role: "model",
        content: "Sorry, I encountered an error. Please try again.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages])

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
  }

  // Sample suggestions
  const suggestions = [
    "What is Om's educational background?",
    "Tell me about Om's projects.",
    "What are Om's skills in AI/ML?",
    "What are Om's hobbies?",
  ]

  return (
      <div className="relative min-h-screen w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <ChatContainer
            hasSentFirstMessage={hasSentFirstMessage}
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            bottomRef={bottomRef}
            isLoading={isLoading}
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
        />
      </div>
  )
}

export default App
