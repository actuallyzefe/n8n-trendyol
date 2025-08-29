import type { INodeProperties } from 'n8n-workflow';

export const brandOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['brand'],
		},
	},
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'Get all brands',
			action: 'Get all brands',
		},
		{
			name: 'Get By Name',
			value: 'getByName',
			description: 'Get brand by name',
			action: 'Get brand by name',
		},
	],
	default: 'getAll',
};
