import type { IExecuteFunctions } from 'n8n-workflow';
import {
	trendyolApiRequest,
	getTrendyolCredentials,
	buildSellerEndpoint,
	buildPaginationParams,
	dateToTimestamp,
	validateRequiredParameter,
} from '../GenericFunctions';
import type { OrderFilters } from '../types';

/**
 * Get all orders
 */
export async function executeOrderGetAll(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const additionalFields = this.getNodeParameter('additionalFields', index) as OrderFilters;
	
	const qs = buildPaginationParams(additionalFields);

	if (additionalFields.startDate) {
		qs.startDate = dateToTimestamp(additionalFields.startDate);
	}
	if (additionalFields.endDate) {
		qs.endDate = dateToTimestamp(additionalFields.endDate);
	}

	const endpoint = buildSellerEndpoint(credentials.supplierId, '/orders');
	
	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}

/**
 * Get a single order by ID
 */
export async function executeOrderGet(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const orderId = this.getNodeParameter('orderId', index) as string;
	
	validateRequiredParameter(orderId, 'orderId');
	
	const endpoint = buildSellerEndpoint(credentials.supplierId, `/orders/${orderId}`);
	
	return await trendyolApiRequest.call(this, 'GET', endpoint);
}
