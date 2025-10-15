/**
 * Simple in-memory rate limiting for spam protection
 * For production with multiple servers, consider using Redis
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

/**
 * Rate limiting function
 * @param identifier - Unique identifier (e.g., IP address or email)
 * @param config - Rate limit configuration
 * @returns Object with isAllowed flag and remaining attempts
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 3, windowMs: 60 * 60 * 1000 } // 3 requests per hour by default
): { isAllowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // No existing entry or window has expired
  if (!entry || entry.resetTime < now) {
    const resetTime = now + config.windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });
    return {
      isAllowed: true,
      remaining: config.maxRequests - 1,
      resetTime,
    };
  }

  // Within the rate limit window
  if (entry.count < config.maxRequests) {
    entry.count++;
    return {
      isAllowed: true,
      remaining: config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Rate limit exceeded
  return {
    isAllowed: false,
    remaining: 0,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Check common headers for real IP (useful when behind proxies/CDN)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (cfConnectingIp) return cfConnectingIp;
  if (realIp) return realIp;
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  
  return 'unknown';
}

