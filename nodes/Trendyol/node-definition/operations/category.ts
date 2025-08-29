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
			name: 'Get Many',
			value: 'getMany',
			description: 'Get many categories',
			action: 'Get many categories',
		},
	],
	default: 'getMany',
};
