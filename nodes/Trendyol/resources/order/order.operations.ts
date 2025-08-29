import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest, getTrendyolCredentials } from '../../GenericFunctions';
import { buildPaginationParams, dateToTimestamp, validateRequiredParameter } from '../../utils';
import { buildOrderEndpoint } from '../../endpoints';
import type { OrderFilters } from '../../types';

/**
 * Get all orders
 */
export async function getAllOrders(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const additionalFields = this.getNodeParameter('additionalFields', index) as OrderFilters;

	const qs = buildPaginationParams(additionalFields);

	// Date filters (convert to timestamp as required by API)
	if (additionalFields.startDate) {
		qs.startDate = dateToTimestamp(additionalFields.startDate);
	}
	if (additionalFields.endDate) {
		qs.endDate = dateToTimestamp(additionalFields.endDate);
	}

	// Status filter
	if (additionalFields.status) {
		qs.status = additionalFields.status;
	}

	// Order number filter
	if (additionalFields.orderNumber) {
		qs.orderNumber = additionalFields.orderNumber;
	}

	// Supplier filter
	if (additionalFields.supplierId) {
		qs.supplierId = additionalFields.supplierId;
	}

	// Shipment package filter
	if (additionalFields.shipmentPackageIds) {
		qs.shipmentPackageIds = additionalFields.shipmentPackageIds;
	}

	// Sorting options
	if (additionalFields.orderByField) {
		qs.orderByField = additionalFields.orderByField;
	}
	if (additionalFields.orderByDirection) {
		qs.orderByDirection = additionalFields.orderByDirection;
	}

	const endpoint = buildOrderEndpoint(credentials.supplierId);
	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}

/**
 * Get a single order by ID
 */
export async function getOrder(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const orderId = this.getNodeParameter('orderId', index) as string;

	validateRequiredParameter(orderId, 'orderId');

	const endpoint = buildOrderEndpoint(credentials.supplierId, orderId);
	return await trendyolApiRequest.call(this, 'GET', endpoint);
}
