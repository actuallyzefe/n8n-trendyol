import type { IExecuteFunctions } from 'n8n-workflow';
import {
	trendyolApiRequest,
	buildPaginationParams,
	validateRequiredParameter,
} from '../GenericFunctions';
import type { PaginationParams } from '../types';

/**
 * Get all brands
 */
export async function executeBrandGetAll(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const additionalFields = this.getNodeParameter('additionalFields', index) as PaginationParams;
	
	const qs = buildPaginationParams(additionalFields);
	const endpoint = '/integration/product/brands';
	
	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}

/**
 * Get brand by name
 */
export async function executeBrandGetByName(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const brandName = this.getNodeParameter('brandName', index) as string;
	
	validateRequiredParameter(brandName, 'brandName');
	
	const qs = { name: brandName };
	const endpoint = '/integration/product/brands/by-name';
	
	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}
