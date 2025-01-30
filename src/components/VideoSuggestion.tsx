import React from 'react';
import { YouTubeVideo } from '../types';
import { ExternalLink } from 'lucide-react';

interface VideoSuggestionProps {
  video: YouTubeVideo;
}

export const VideoSuggestion: React.FC<VideoSuggestionProps> = ({ video }) => {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-gray-900/50 border border-blue-900/50 overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-blue-300/80 text-sm flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          {video.channelTitle}
        </p>
      </div>
    </a>
  );
};