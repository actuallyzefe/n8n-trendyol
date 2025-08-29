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
			name: 'Get Many',
			value: 'getMany',
			description: 'Get many brands',
			action: 'Get many brands',
		},
		{
			name: 'Get By Name',
			value: 'getByName',
			description: 'Get brand by name',
			action: 'Get brand by name',
		},
	],
	default: 'getMany',
};
