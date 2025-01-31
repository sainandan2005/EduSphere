import React from 'react';
import { Bot, User } from 'lucide-react';
import clsx from 'clsx';

const ChatMessage = ({ message }) => {
  const isBot = message.role === 'assistant';

  return (
    <div
      className={clsx(
        'flex gap-4 p-4 rounded-xl transition-colors',
        isBot ? 'bg-gray-900/50 border border-blue-900/50' : 'bg-blue-600/10'
      )}
    >
      <div className="flex-shrink-0">
        <div className={clsx(
          'p-2 rounded-lg',
          isBot ? 'bg-blue-500/10' : 'bg-blue-600/10'
        )}>
          {isBot ? (
            <Bot className="h-5 w-5 text-blue-400" />
          ) : (
            <User className="h-5 w-5 text-blue-400" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div 
          className={clsx(
            'prose prose-invert max-w-none',
            'prose-headings:text-blue-300 prose-headings:font-semibold prose-headings:mt-2 prose-headings:mb-4',
            'prose-p:text-blue-50 prose-p:leading-relaxed',
            'prose-code:text-blue-300 prose-code:bg-blue-950/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
            'prose-strong:text-blue-300',
            'prose-ul:text-blue-50 prose-ul:leading-relaxed',
            'prose-ol:text-blue-50 prose-ol:leading-relaxed',
            'prose-li:marker:text-blue-400'
          )}
          dangerouslySetInnerHTML={{ __html: message.content }} // Ensure content is sanitized
        />
      </div>
    </div>
  );
};

export default ChatMessage;