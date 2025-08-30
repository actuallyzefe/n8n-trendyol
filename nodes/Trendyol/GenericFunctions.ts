import type { IExecuteFunctions, IHttpRequestMethods, IRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { TrendyolCredentials } from './types';

/**
 * Make an API request to Trendyol
 */
export async function trendyolApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
	qs?: any,
): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);

	/**
	 * Build the complete URL according to Trendyol API documentation
	 * Production: https://apigw.trendyol.com
	 * Staging: https://stageapigw.trendyol.com
	 */

	const baseUrl =
		credentials.environment === 'sandbox'
			? 'https://stageapigw.trendyol.com'
			: 'https://apigw.trendyol.com';

	const options: IRequestOptions = {
		method,
		url: `${baseUrl}${endpoint}`,
		json: true,
	};

	if (body) {
		options.body = body;
	}

	if (qs) {
		options.qs = qs;
	}

	this.logger.info(JSON.stringify(options, null, 2), { tag: 'TrendyolApiRequest' });

	try {
		const response = await this.helpers.requestWithAuthentication.call(
			this,
			'trendyolApi',
			options,
		);
		return response;
	} catch (error) {
		throw new NodeOperationError(this.getNode(), error);
	}
}

/**
 * Get Trendyol credentials
 */
export async function getTrendyolCredentials(
	this: IExecuteFunctions,
): Promise<TrendyolCredentials> {
	return (await this.getCredentials('trendyolApi')) as TrendyolCredentials;
}
