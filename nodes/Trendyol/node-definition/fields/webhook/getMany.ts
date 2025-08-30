import type { INodeProperties } from 'n8n-workflow';

export const getManyWebhooksFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getMany'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to the limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 50,
				description: 'Max number of results to return',
			},
		],
	},
];
