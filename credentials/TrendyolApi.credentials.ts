import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class TrendyolApi implements ICredentialType {
	name = 'trendyolApi';
	displayName = 'Trendyol API';
	documentationUrl = 'https://developers.trendyol.com/docs/authorization';
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{ $credentials.apiKey }}',
				password: '={{ $credentials.apiSecret }}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{ $credentials.environment === "sandbox" ? "https://stageapi.trendyol.com" : "https://api.trendyol.com" }}',
			url: '/sapigw/suppliers/={{ $credentials.supplierId }}/addresses',
			method: 'GET',
		},
	};
}
