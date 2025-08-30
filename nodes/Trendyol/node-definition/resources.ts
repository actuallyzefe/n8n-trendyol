import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Brand',
			value: 'brand',
		},
		{
			name: 'Category',
			value: 'category',
		},
		{
			name: 'Order',
			value: 'order',
		},
		{
			name: 'Product',
			value: 'product',
		},
		{
			name: 'Question',
			value: 'question',
		},
		{
			name: 'Webhook',
			value: 'webhook',
		},
	],
	default: 'product',
};
