import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest, getTrendyolCredentials } from '../../GenericFunctions';
import { buildWebhookSellerEndpoint, WEBHOOK_ENDPOINTS } from '../../endpoints';

/**
 * Get all webhooks for a seller
 */
export async function getManyWebhooks(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);

	// Build the seller-specific webhook endpoint
	const endpoint = buildWebhookSellerEndpoint(credentials.supplierId, WEBHOOK_ENDPOINTS.GET_ALL);

	const response = await trendyolApiRequest.call(this, 'GET', endpoint);

	console.log(response);

	return response;
}
