import type { INodeProperties } from 'n8n-workflow';

export const orderOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['order'],
		},
	},
	options: [
		{
			name: 'Get Many',
			value: 'getMany',
			description: 'Get many orders',
			action: 'Get many orders',
		},
	],
	default: 'getMany',
};
