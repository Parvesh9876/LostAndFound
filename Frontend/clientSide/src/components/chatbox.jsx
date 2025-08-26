import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3001');

const ChatBox = ({ userId, contactId }) => {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = [userId, contactId].sort().join('_');
    setRoomId(room);
    socket.emit('joinRoom', { roomId: room });

    axios.get(`http://localhost:3001/messages/${room}`).then(res => {
      setMessages(res.data);
    });

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off('receiveMessage');
  }, [userId, contactId]);

  const sendMessage = () => {
    const data = {
      sender: userId,
      receiver: contactId,
      roomId,
      message,
    };
    socket.emit('sendMessage', data);
    axios.post('http://localhost:3001/messages', data);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <div className="messages" style={{ height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === userId ? 'text-end' : 'text-start'}>
            <strong>{msg.sender === userId ? 'You' : 'Them'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="input-group mt-2">
        <input
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
