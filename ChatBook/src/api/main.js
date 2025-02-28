import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
// Load conversation history from localStorage
export const loadChatHistory = () => {
  const storedMessages = localStorage.getItem("chatHistory");
  return storedMessages ? JSON.parse(storedMessages) : [];
};

// Save conversation history to localStorage
export const saveChatHistory = (messages) => {
  localStorage.setItem("chatHistory", JSON.stringify(messages));
};

// Clear conversation history
export const clearChatHistory = () => {
  localStorage.removeItem("chatHistory");
};

// Maintain user input and response state
let userInputState = "";
let responseState = "";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to send message to Gemini API
export const sendMessageToGemini = async (userMessage) => {
  if (!userMessage.trim()) return "Message cannot be empty.";

  userInputState = userMessage; // Store user input

  try {
    const result = await model.generateContent(userMessage);
    const botReply =
      result.response.text() || "Sorry, I couldn't understand that.";

    responseState = botReply; // Store bot response

    // Update chat history
    const chatHistory = loadChatHistory();
    const updatedHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
      { role: "bot", text: botReply },
    ];
    saveChatHistory(updatedHistory);

    return botReply;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};
