/**
 * Parses sources from chatbot response text
 * @param {string} content - The raw response content with source markers
 * @returns {object} - Object containing cleaned content and sources array
 */
export const parseSources = (content) => {
  if (!content || typeof content !== 'string') {
    return { content: content, sources: [] };
  }

  // Regex to match source patterns like 【4:1†source】, 【4:0†source】, etc.
  const sourceRegex = /【(\d+):(\d+)†source】/g;
  const sources = [];
  let match;

  // Extract all sources
  while ((match = sourceRegex.exec(content)) !== null) {
    sources.push({
      id: `${match[1]}:${match[2]}`,
      displayId: `${match[1]}:${match[2]}`,
      fullMatch: match[0]
    });
  }

  // Remove source markers from content
  const cleanedContent = content.replace(sourceRegex, '').trim();

  return {
    content: cleanedContent,
    sources: sources
  };
};

/**
 * Formats sources for display
 * @param {Array} sources - Array of source objects
 * @returns {string} - Formatted sources string
 */
export const formatSources = (sources) => {
  if (!sources || sources.length === 0) return '';
  
  const uniqueSources = [...new Set(sources.map(s => s.displayId))];
  return `Sources: ${uniqueSources.join(', ')}`;
}; 