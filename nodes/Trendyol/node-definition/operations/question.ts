import type { INodeProperties } from 'n8n-workflow';

export const questionOperationsField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['question'],
		},
	},
	options: [
		{
			name: 'Get Many',
			value: 'getMany',
			description: 'Get many customer questions',
			action: 'Get many customer questions',
		},
		{
			name: 'Answer',
			value: 'answer',
			description: 'Answer a customer question',
			action: 'Answer a customer question',
		},
	],
	default: 'getMany',
};
