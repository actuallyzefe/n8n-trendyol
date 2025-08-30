import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Product',
			value: 'product',
		},
		{
			name: 'Order',
			value: 'order',
		},
		{
			name: 'Brand',
			value: 'brand',
		},
		{
			name: 'Category',
			value: 'category',
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
