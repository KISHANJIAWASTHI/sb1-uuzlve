import React, { useState, useRef, useEffect } from 'react';
import { Send, HeartPulse } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import { findCondition } from './data/medicalData';

function App() {
  const [messages, setMessages] = useState([{
    text: "Hello! I'm MediBot, your medical assistant. Please describe your symptoms, and I'll suggest some remedies. Remember: This is for educational purposes only and not a substitute for professional medical advice.",
    isBot: true
  }]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Get bot response
    const responses = findCondition(input);
    responses.forEach((response, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, isBot: true }]);
      }, index * 500); // Stagger responses for natural feel
    });

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">MediBot Assistant</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Get preliminary medical suggestions based on your symptoms
          </p>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Messages Area */}
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms..."
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold">⚠️ Important Disclaimer</p>
          <p>This chatbot is for educational purposes only and not a substitute for professional medical advice.</p>
          <p>Always consult with a qualified healthcare provider for medical concerns.</p>
        </div>
      </main>
    </div>
  );
}

export default App;