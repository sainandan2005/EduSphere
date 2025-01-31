import { marked } from 'marked';
import DOMPurify from 'dompurify';

export function formatResponse(text) {
  // Pre-process the text to ensure proper markdown formatting
  const processedText = text
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
    .replace(/^(-|\d+\.) /gm, '\n$&') // Ensure list items have newlines before them
    .trim();

  // Convert markdown to HTML
  const rawHtml = marked(processedText, {
    breaks: true,
    gfm: true
  });

  // Sanitize HTML to prevent XSS
  const cleanHtml = DOMPurify.sanitize(rawHtml);

  return cleanHtml;
}