/**
 * Date Utilities
 * Helper functions for handling date conversions
 */

/**
 * Convert date to timestamp for Trendyol API
 */
export function dateToTimestamp(date: string): number {
	return new Date(date).getTime();
}
