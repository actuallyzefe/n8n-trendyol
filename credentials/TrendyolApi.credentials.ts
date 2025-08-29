import { BINARY_ENCODING } from 'n8n-workflow';
import type {
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

export class TrendyolApi implements ICredentialType {
	name = 'trendyolApi';
	displayName = 'Trendyol API';
	documentationUrl = 'https://developers.trendyol.com/docs/authorization';
	icon = 'file:trendyol-logo.svg' as const;
	properties: INodeProperties[] = [
		{
			displayName: 'Supplier ID',
			name: 'supplierId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Trendyol Supplier ID',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Trendyol API Key',
		},
		{
			displayName: 'API Secret',
			name: 'apiSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Trendyol API Secret',
		},
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
			],
			default: 'production',
			description: 'The environment to use',
		},
	];

	async authenticate(
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> {
		requestOptions.headers = {
			...requestOptions.headers,
			Authorization: `Basic ${Buffer.from(
				`${credentials.apiKey}:${credentials.apiSecret}`,
			).toString(BINARY_ENCODING)}`,
		};
		return requestOptions;
	}

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{$credentials.environment === "sandbox" ? "https://stageapigw.trendyol.com" : "https://apigw.trendyol.com"}}',
			url: '/integration/product/brands',
			method: 'GET',
		},
	};
}
