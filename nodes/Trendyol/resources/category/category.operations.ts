import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest } from '../../GenericFunctions';
import { CATEGORY_ENDPOINTS } from '../../endpoints';

/**
 * Get all categories
 */
export async function getManyCategories(this: IExecuteFunctions, index: number): Promise<any> {
	return await trendyolApiRequest.call(this, 'GET', CATEGORY_ENDPOINTS.GET_ALL);
}
