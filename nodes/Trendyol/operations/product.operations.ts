import type { IExecuteFunctions } from 'n8n-workflow';
import {
	trendyolApiRequest,
	getTrendyolCredentials,
	buildSellerEndpoint,
	buildPaginationParams,
	validateRequiredParameter,
} from '../GenericFunctions';
import type { ProductFilters } from '../types';

/**
 * Get all products
 */
export async function executeProductGetAll(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const additionalFields = this.getNodeParameter('additionalFields', index) as ProductFilters;
	
	const qs = buildPaginationParams(additionalFields);

	// Basic status filters
	if (additionalFields.approved !== undefined) {
		qs.approved = additionalFields.approved;
	}
	if (additionalFields.archived !== undefined) {
		qs.archived = additionalFields.archived;
	}

	// Brand filters (array parameter)
	if (additionalFields.brandIds) {
		qs.brandIds = additionalFields.brandIds;
	}

	// Product identification filters
	if (additionalFields.barcode) {
		qs.barcode = additionalFields.barcode;
	}
	if (additionalFields.stockCode) {
		qs.stockCode = additionalFields.stockCode;
	}

	// Date range filters (already timestamps from UI)
	if (additionalFields.startDate) {
		qs.startDate = additionalFields.startDate;
	}
	if (additionalFields.endDate) {
		qs.endDate = additionalFields.endDate;
	}
	if (additionalFields.dateQueryType) {
		qs.dateQueryType = additionalFields.dateQueryType;
	}

	// Supplier and product filters
	if (additionalFields.supplierId) {
		qs.supplierId = additionalFields.supplierId;
	}
	if (additionalFields.productMainId) {
		qs.productMainId = additionalFields.productMainId;
	}

	// Status filters
	if (additionalFields.onSale !== undefined) {
		qs.onSale = additionalFields.onSale;
	}
	if (additionalFields.rejected !== undefined) {
		qs.rejected = additionalFields.rejected;
	}
	if (additionalFields.blacklisted !== undefined) {
		qs.blacklisted = additionalFields.blacklisted;
	}

	const endpoint = buildSellerEndpoint(credentials.supplierId, '/products');

	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}

/**
 * Get a single product by ID
 */
export async function executeProductGet(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const productId = this.getNodeParameter('productId', index) as string;
	
	validateRequiredParameter(productId, 'productId');
	
	const endpoint = buildSellerEndpoint(credentials.supplierId, `/products/${productId}`);
	
	return await trendyolApiRequest.call(this, 'GET', endpoint);
}
