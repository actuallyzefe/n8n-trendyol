import type { INodeProperties } from 'n8n-workflow';

export const productOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['product'],
		},
	},
	options: [
		{
			name: 'Get Many',
			value: 'getMany',
			description: 'Get many products',
			action: 'Get many products',
		},
	],
	default: 'getMany',
};
