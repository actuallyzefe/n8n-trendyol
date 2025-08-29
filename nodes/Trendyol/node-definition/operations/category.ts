import type { INodeProperties } from 'n8n-workflow';

export const categoryOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['category'],
		},
	},
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'Get all categories',
			action: 'Get all categories',
		},
	],
	default: 'getAll',
};
