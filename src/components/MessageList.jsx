"use client"

import MessageWithSources from "./MessageWithSources"

const MessageList = ({ messages }) => {
  return (
      <div className="space-y-4">
        {messages.map((message, index) => (
            <MessageWithSources 
                key={index}
                message={message}
                index={index}
            />
        ))}
      </div>
  )
}

export default MessageList
