import type { INodeProperties } from 'n8n-workflow';

export const paginationFields: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 0,
		description: 'Page number for pagination (0-based)',
	},
	{
		displayName: 'Size',
		name: 'size',
		type: 'number',
		default: 50,
		description: 'Number of items per page',
	},
];
