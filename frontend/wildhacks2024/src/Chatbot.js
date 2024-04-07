import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();
    const botMessage = { text: data.answer, sender: "bot" };
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <Box>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.text} secondary={message.sender} />
          </ListItem>
        ))}
      </List>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        fullWidth
        placeholder="Ask me anything..."
      />
      <Button onClick={sendMessage}>Send</Button>
    </Box>
  );
};

export default Chatbot;
