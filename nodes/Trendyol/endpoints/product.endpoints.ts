/**
 * Product Module Endpoints
 * All product-related API endpoints for Trendyol
 */

// Base paths for product module
export const PRODUCT_BASE_PATHS = {
	INTEGRATION: '/integration/product',
	SELLERS: '/integration/product/sellers',
} as const;

// Brand endpoints (global product module)
export const BRAND_ENDPOINTS = {
	GET_ALL: `${PRODUCT_BASE_PATHS.INTEGRATION}/brands`,
	GET_BY_NAME: `${PRODUCT_BASE_PATHS.INTEGRATION}/brands/by-name`,
} as const;

// Category endpoints (global product module)
export const CATEGORY_ENDPOINTS = {
	GET_ALL: `${PRODUCT_BASE_PATHS.INTEGRATION}/product-categories`,
} as const;

// Product endpoints (seller-specific)
export const PRODUCT_ENDPOINTS = {
	GET_ALL: '/products',
	GET_BY_ID: '/products',
} as const;

/**
 * Build product seller-specific endpoint
 */
export function buildProductSellerEndpoint(sellerId: string, path: string): string {
	return `${PRODUCT_BASE_PATHS.SELLERS}/${sellerId}${path}`;
}

/**
 * Build product endpoint with optional ID
 */
export function buildProductEndpoint(sellerId: string, productId?: string): string {
	const basePath = buildProductSellerEndpoint(sellerId, PRODUCT_ENDPOINTS.GET_ALL);
	return productId ? `${basePath}/${productId}` : basePath;
}
