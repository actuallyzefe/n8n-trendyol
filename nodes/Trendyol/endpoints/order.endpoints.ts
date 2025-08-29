/**
 * Order Module Endpoints
 * All order-related API endpoints for Trendyol
 */

// Base paths for order module
export const ORDER_BASE_PATHS = {
	INTEGRATION: '/integration/order',
	SELLERS: '/integration/order/sellers',
} as const;

// Order endpoints (seller-specific)
export const ORDER_ENDPOINTS = {
	GET_ALL: '/orders',
	GET_BY_ID: '/orders',
	// Shipment package endpoints
	SHIPMENT_PACKAGES: '/shipment-packages',
	SHIPMENT_PACKAGE_ITEMS_UNSUPPLIED: '/shipment-packages/{packageId}/items/unsupplied',
	SHIPMENT_PACKAGE_SPLIT: '/shipment-packages/{packageId}/split-packages',
} as const;

/**
 * Build order seller-specific endpoint
 */
export function buildOrderSellerEndpoint(sellerId: string, path: string): string {
	return `${ORDER_BASE_PATHS.SELLERS}/${sellerId}${path}`;
}

/**
 * Build order endpoint with optional ID
 */
export function buildOrderEndpoint(sellerId: string, orderId?: string): string {
	const basePath = buildOrderSellerEndpoint(sellerId, ORDER_ENDPOINTS.GET_ALL);
	return orderId ? `${basePath}/${orderId}` : basePath;
}

/**
 * Build shipment package endpoint
 */
export function buildShipmentPackageEndpoint(sellerId: string, packageId?: string): string {
	const basePath = buildOrderSellerEndpoint(sellerId, ORDER_ENDPOINTS.SHIPMENT_PACKAGES);
	return packageId ? `${basePath}/${packageId}` : basePath;
}

/**
 * Build shipment package items unsupplied endpoint
 */
export function buildShipmentPackageItemsUnsuppliedEndpoint(
	sellerId: string,
	packageId: string,
): string {
	const endpoint = ORDER_ENDPOINTS.SHIPMENT_PACKAGE_ITEMS_UNSUPPLIED.replace(
		'{packageId}',
		packageId,
	);
	return buildOrderSellerEndpoint(sellerId, endpoint);
}

/**
 * Build shipment package split endpoint
 */
export function buildShipmentPackageSplitEndpoint(sellerId: string, packageId: string): string {
	const endpoint = ORDER_ENDPOINTS.SHIPMENT_PACKAGE_SPLIT.replace('{packageId}', packageId);
	return buildOrderSellerEndpoint(sellerId, endpoint);
}
