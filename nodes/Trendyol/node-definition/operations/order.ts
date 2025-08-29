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
			name: 'Get All',
			value: 'getAll',
			description: 'Get all orders',
			action: 'Get all orders',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Get an order by ID',
			action: 'Get an order',
		},
	],
	default: 'getAll',
};
