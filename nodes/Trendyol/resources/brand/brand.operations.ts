import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest } from '../../GenericFunctions';
import { buildPaginationParams, validateRequiredParameter } from '../../utils';
import { BRAND_ENDPOINTS } from '../../endpoints';
import type { PaginationParams } from '../../types';

/**
 * Get all brands
 */
export async function getManyBrands(this: IExecuteFunctions, index: number): Promise<any> {
	const additionalFields = this.getNodeParameter('additionalFields', index) as PaginationParams;

	const qs = buildPaginationParams(additionalFields);

	return await trendyolApiRequest.call(this, 'GET', BRAND_ENDPOINTS.GET_ALL, undefined, qs);
}

/**
 * Get brand by name
 */
export async function getBrandByName(this: IExecuteFunctions, index: number): Promise<any> {
	const brandName = this.getNodeParameter('brandName', index) as string;

	validateRequiredParameter(brandName, 'brandName');

	const qs = { name: brandName };

	return await trendyolApiRequest.call(this, 'GET', BRAND_ENDPOINTS.GET_BY_NAME, undefined, qs);
}
