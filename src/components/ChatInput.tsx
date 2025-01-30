import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
        placeholder="Ask me anything..."
        className="flex-1 bg-gray-900/50 text-white rounded-xl px-4 py-3 border border-blue-900/50 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-xl transition-colors flex items-center gap-2 disabled:cursor-not-allowed"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};