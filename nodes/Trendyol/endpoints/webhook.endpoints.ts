/**
 * Webhook Module Endpoints
 * All webhook-related API endpoints for Trendyol
 */

// Base paths for webhook module
export const WEBHOOK_BASE_PATHS = {
	INTEGRATION: '/integration/webhook',
	SELLERS: '/integration/webhook/sellers',
} as const;

// Webhook endpoints
export const WEBHOOK_ENDPOINTS = {
	// Webhook management
	CREATE: '/webhooks',
	GET_ALL: '/webhooks',
	GET_BY_ID: '/webhooks/{webhookId}',
	UPDATE: '/webhooks/{webhookId}',
	DELETE: '/webhooks/{webhookId}',
	ACTIVATE: '/webhooks/{webhookId}/activate',
	DEACTIVATE: '/webhooks/{webhookId}/deactivate',
} as const;

/**
 * Build webhook seller-specific endpoint
 */
export function buildWebhookSellerEndpoint(sellerId: string, path: string): string {
	return `${WEBHOOK_BASE_PATHS.SELLERS}/${sellerId}${path}`;
}

/**
 * Build webhook endpoint with ID
 */
export function buildWebhookEndpoint(path: string, webhookId: string): string {
	return path.replace('{webhookId}', webhookId);
}
