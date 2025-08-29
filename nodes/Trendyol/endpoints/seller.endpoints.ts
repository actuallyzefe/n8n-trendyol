/**
 * Seller Module Endpoints
 * All seller-related API endpoints for Trendyol
 */

// Base paths for seller module
export const SELLER_BASE_PATHS = {
	INTEGRATION: '/integration/sellers',
} as const;

// Seller common endpoints
export const SELLER_ENDPOINTS = {
	COMMON_LABEL: '/common-label',
} as const;

/**
 * Build common seller-specific endpoint
 */
export function buildCommonSellerEndpoint(sellerId: string, path: string): string {
	return `${SELLER_BASE_PATHS.INTEGRATION}/${sellerId}${path}`;
}

/**
 * Build common label endpoint
 */
export function buildCommonLabelEndpoint(sellerId: string, cargoTrackingNumber: string): string {
	return buildCommonSellerEndpoint(
		sellerId,
		`${SELLER_ENDPOINTS.COMMON_LABEL}/${cargoTrackingNumber}`,
	);
}
