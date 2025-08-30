import type { INodeProperties } from 'n8n-workflow';

export const deleteWebhookFields: INodeProperties[] = [
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the webhook to delete',
	},
];
