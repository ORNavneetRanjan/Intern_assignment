import { useState, useRef, useEffect } from "react";
import {
  sendMessageToGemini,
  loadChatHistory,
  saveChatHistory,
} from "../api/main";

export default function Home() {
  const [messages, setMessages] = useState(loadChatHistory());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const botReply = await sendMessageToGemini(input);
      const botMessage = { sender: "bot", text: botReply };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveChatHistory(newMessages);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 min-h-screen">
      <div className="w-full max-w-screen-lg h-[90vh] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 overflow-auto scrollbar-hide ">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`p-3 max-w-[75%] rounded-lg text-lg sm:text-xl leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 shadow-md rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} className="mb-20" />
        </div>

        {/* Input Box */}
        <div className="w-full p-3 bg-gray-100 flex items-start gap-2">
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
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className={`px-6 py-3 rounded-lg text-lg sm:text-xl ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
