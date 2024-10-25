import React from 'react';
import { User, Bot } from 'lucide-react';

type MessageProps = {
  text: string;
  isBot: boolean;
};

export default function ChatMessage({ text, isBot }: MessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-blue-50' : ''} p-4 rounded-lg`}>
      {isBot ? (
        <Bot className="w-8 h-8 text-blue-600 flex-shrink-0" />
      ) : (
        <User className="w-8 h-8 text-gray-600 flex-shrink-0" />
      )}
      <div className="flex-1">
        <p className={`text-sm ${isBot ? 'text-blue-900' : 'text-gray-900'}`}>{text}</p>
      </div>
    </div>
  );
}