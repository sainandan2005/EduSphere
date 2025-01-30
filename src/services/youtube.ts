import { YOUTUBE_API_KEY } from '../config';
import { YouTubeVideo } from '../types';

export async function searchVideos(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(
        query
      )}&type=video&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();
    
    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}