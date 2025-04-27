// utils/cacheUtils.ts
const CACHE_PREFIX = 'media_cache_';
const CACHE_EXPIRATION_DAYS = 7;

// Simplified caching that only caches successful responses
export const fetchWithCache = async (url: string): Promise<string> => {
  // First check if we have a cached version
  const cacheKey = CACHE_PREFIX + url;
  const cachedItem = localStorage.getItem(cacheKey);
  
  if (cachedItem) {
    const { data, timestamp } = JSON.parse(cachedItem);
    // Check if cache is still valid
    if (Date.now() - timestamp < CACHE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000) {
      return data;
    }
    // Remove expired cache
    localStorage.removeItem(cacheKey);
  }

  try {
    const response = await fetch(url);
    
    // Only cache successful responses
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // For images, use the URL directly (no base64 conversion)
    if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
      // Cache the URL only (not the content)
      localStorage.setItem(cacheKey, JSON.stringify({
        data: url, // Store original URL
        timestamp: Date.now()
      }));
      return url;
    }
    // For videos, just return the URL
    else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return url;
    }
    
    return url;
  } catch (error) {
    console.error('Failed to fetch media:', error);
    // Return original URL as fallback
    return url;
  }
};

// Clean up expired cache items
export const cleanupCache = () => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      const item = localStorage.getItem(key);
      if (item) {
        const { timestamp } = JSON.parse(item);
        if (Date.now() - timestamp > CACHE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000) {
          localStorage.removeItem(key);
        }
      }
    }
  });
};

// Run cleanup on initialization
cleanupCache();