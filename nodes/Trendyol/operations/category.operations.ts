import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest } from '../GenericFunctions';

/**
 * Get all categories
 */
export async function executeCategoryGetAll(
	this: IExecuteFunctions,
	index: number,
): Promise<any> {
	const endpoint = '/integration/product-categories';
	
	return await trendyolApiRequest.call(this, 'GET', endpoint);
}
