import React, { useState } from 'react';
import { Message, YouTubeVideo } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { VideoSuggestion } from './components/VideoSuggestion';
import { Brain, Youtube, Loader2 } from 'lucide-react';
import { generateResponse } from './services/gemini';
import { searchVideos } from './services/youtube';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content,
        role: 'user',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setLoading(true);

      // Generate AI response
      const response = await generateResponse(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);

      // Search for relevant videos
      const newVideos = await searchVideos(content);
      setVideos(newVideos);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-4">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              EduSphere
            </h1>
          </div>
          <p className="text-blue-300/80 text-lg">Your AI-powered learning companion</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-blue-900/50 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
              <div className="relative min-h-[600px] max-h-[600px] overflow-y-auto p-6 space-y-4">
                {messages.map(message => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[500px] text-center space-y-4">
                    <div className="p-4 rounded-full bg-blue-500/10">
                      <Brain className="h-12 w-12 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white mb-2">Welcome to EduSphere</p>
                      <p className="text-blue-300/80">Ask questions, get explanations, or generate quizzes</p>
                    </div>
                  </div>
                )}
                {loading && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                )}
              </div>
              <div className="border-t border-blue-900/50 p-4 bg-gray-900/50">
                <ChatInput onSend={handleSendMessage} disabled={loading} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-900/50 border border-blue-900/50">
              <Youtube className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Recommended Videos</h2>
            </div>
            <div className="space-y-4">
              {videos.map(video => (
                <VideoSuggestion key={video.id} video={video} />
              ))}
              {videos.length === 0 && (
                <div className="rounded-xl bg-gray-900/50 border border-blue-900/50 p-6 text-center">
                  <p className="text-blue-300/80">Video suggestions will appear here based on your conversation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;