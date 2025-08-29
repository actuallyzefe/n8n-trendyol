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

	// Build the complete URL according to Trendyol API documentation
	// Production: https://apigw.trendyol.com
	// Staging: https://stageapigw.trendyol.com
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

	try {
		return await this.helpers.requestWithAuthentication.call(this, 'trendyolApi', options);
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

/**
 * Build endpoint URL with seller ID (according to Trendyol API documentation)
 */
export function buildSellerEndpoint(sellerId: string, path: string): string {
	return `/integration/product/sellers/${sellerId}${path}`;
}

/**
 * Build query parameters for pagination
 */
export function buildPaginationParams(additionalFields: any): any {
	const qs: any = {};

	if (additionalFields.page !== undefined) {
		qs.page = additionalFields.page;
	}
	if (additionalFields.size !== undefined) {
		qs.size = additionalFields.size;
	}

	return qs;
}

/**
 * Convert date to timestamp for Trendyol API
 */
export function dateToTimestamp(date: string): number {
	return new Date(date).getTime();
}

/**
 * Validate required parameter
 */
export function validateRequiredParameter(value: any, parameterName: string): void {
	if (!value) {
		throw new NodeOperationError(
			{} as any,
			`Required parameter "${parameterName}" is missing or empty`,
		);
	}
}

/**
 * Parse JSON data safely
 */
export function parseJsonSafely(jsonString: string, parameterName: string): any {
	try {
		return JSON.parse(jsonString);
	} catch (error) {
		throw new NodeOperationError(
			{} as any,
			`Invalid JSON in parameter "${parameterName}": ${error.message}`,
		);
	}
}
