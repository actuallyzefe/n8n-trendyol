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
			name: 'Get All',
			value: 'getAll',
			description: 'Get all products',
			action: 'Get all products',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get a product by ID',
			action: 'Get a product',
		},
	],
	default: 'getAll',
};
