import type { INodeProperties } from 'n8n-workflow';

export const brandNameField: INodeProperties = {
	displayName: 'Brand Name',
	name: 'brandName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['brand'],
			operation: ['getByName'],
		},
	},
	default: '',
	description: 'The name of the brand',
};
