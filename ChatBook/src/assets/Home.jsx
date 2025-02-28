import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello Nice" },
    {
      sender: "bot",
      text: "Welcome to LiveChat\nI was made with AI. Pick a topic from the list or type down a question!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-screen-lg flex flex-col h-[80vh] relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`p-3 max-w-[75%] rounded-lg text-xl sm:text-base ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-500 shadow-md rounded-bl-none"
                }`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} className="text-lg sm:text-2xl">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box (Sticky at Bottom) */}
        <div className="absolute bottom-0 left-0 w-full p-2  flex items-start gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 p-3 text-gray-700 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-lg sm:text-xl resize-none h-20 max-h-48 overflow-y-auto"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg sm:text-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
