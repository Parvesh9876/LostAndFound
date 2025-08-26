import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:3000"); // Update with your backend URL

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, idx) => (
          <div key={idx} className="chat-msg">
            {msg}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
        />
        <button type="submit" className="chat-send-btn">Send</button>
      </form>
    </div>
  );
};

export default Chat;
