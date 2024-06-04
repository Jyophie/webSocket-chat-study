import React, { useEffect, useState } from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://43.201.114.52:8080/chat/rooms/1");

    socket.onopen = () => {
      console.log("WebSocket is connected.");
    };

    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log("WebSocket is closed.");
    };

    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const socket = new WebSocket("ws://43.201.114.52:8080/chat/rooms/1");
    socket.onopen = () => {
      socket.send(input);
      setInput("");
    };
  };

  return (
    <div>
      <MessageContainer messages={messages} />
      <InputField input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default App;
