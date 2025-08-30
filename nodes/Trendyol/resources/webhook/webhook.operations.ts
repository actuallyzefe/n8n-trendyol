import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest, getTrendyolCredentials } from '../../GenericFunctions';
import {
	buildWebhookSellerEndpoint,
	buildWebhookEndpoint,
	WEBHOOK_ENDPOINTS,
} from '../../endpoints';

/**
 * Get all webhooks for a seller
 */
export async function getManyWebhooks(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);

	// Build the seller-specific webhook endpoint
	const endpoint = buildWebhookSellerEndpoint(credentials.supplierId, WEBHOOK_ENDPOINTS.GET_ALL);

	const response = await trendyolApiRequest.call(this, 'GET', endpoint);

	return response;
}

/**
 * Delete a webhook by ID
 */
export async function deleteWebhook(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const webhookId = this.getNodeParameter('webhookId', index) as string;

	// Use seller-specific webhook delete endpoint
	const endpoint = buildWebhookSellerEndpoint(
		credentials.supplierId,
		buildWebhookEndpoint(WEBHOOK_ENDPOINTS.DELETE, webhookId),
	);

	await trendyolApiRequest.call(this, 'DELETE', endpoint);

	return { success: true, webhookId, message: 'Webhook deleted successfully' };
}
