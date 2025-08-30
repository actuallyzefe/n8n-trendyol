import type { INodeProperties } from 'n8n-workflow';

export const webhookOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['webhook'],
		},
	},
	options: [
		{
			name: 'Get Many',
			value: 'getMany',
			description: 'Get all webhooks',
			action: 'Get all webhooks',
		},
	],
	default: 'getMany',
};
