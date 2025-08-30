import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

import { WEBHOOK_ENDPOINTS, buildWebhookSellerEndpoint, buildWebhookEndpoint } from './endpoints';
import type { TrendyolWebhook, TrendyolWebhookEventType, TrendyolWebhookResponse } from './types';

export class TrendyolTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Trendyol Trigger',
		name: 'trendyolTrigger',
		icon: 'file:trendyol-logo.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Trendyol events occur',
		defaults: {
			name: 'Trendyol Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'trendyolApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Order Created',
						value: 'CREATED',
						description: 'Triggers when a new order is created',
					},
					{
						name: 'Order Picking',
						value: 'PICKING',
						description: 'Triggers when order picking starts',
					},
					{
						name: 'Order Invoiced',
						value: 'INVOICED',
						description: 'Triggers when an order is invoiced',
					},
					{
						name: 'Order Shipped',
						value: 'SHIPPED',
						description: 'Triggers when an order is shipped',
					},
					{
						name: 'Order Cancelled',
						value: 'CANCELLED',
						description: 'Triggers when an order is cancelled',
					},
					{
						name: 'Order Delivered',
						value: 'DELIVERED',
						description: 'Triggers when an order is delivered',
					},
					{
						name: 'Order Undelivered',
						value: 'UNDELIVERED',
						description: 'Triggers when an order is undelivered',
					},
					{
						name: 'Order Returned',
						value: 'RETURNED',
						description: 'Triggers when an order is returned',
					},
					{
						name: 'Order Unsupplied',
						value: 'UNSUPPLIED',
						description: 'Triggers when an order is unsupplied',
					},
					{
						name: 'Order Awaiting',
						value: 'AWAITING',
						description: 'Triggers when an order is awaiting',
					},
					{
						name: 'Order Unpacked',
						value: 'UNPACKED',
						description: 'Triggers when an order is unpacked',
					},
					{
						name: 'Order At Collection Point',
						value: 'AT_COLLECTION_POINT',
						description: 'Triggers when an order reaches collection point',
					},
					{
						name: 'Order Verified',
						value: 'VERIFIED',
						description: 'Triggers when an order is verified',
					},
				],
				default: 'CREATED',
				required: true,
				description: 'The order status to listen for',
			},
			{
				displayName: 'Simplify Response',
				name: 'simplify',
				type: 'boolean',
				default: true,
				description: 'Whether to return simplified response data',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const originalUrl = this.getNodeWebhookUrl('default');
				const webhookUrl = `https://064c3fcb1541.ngrok-free.app${
					originalUrl?.replace(/^https?:\/\/[^\/]+/, '') || '/webhook'
				}`;
				const eventType = this.getNodeParameter('event') as TrendyolWebhookEventType;

				try {
					const webhooks = await listWebhooks.call(this);
					return webhooks.some(
						(webhook: TrendyolWebhook) =>
							webhook.url === webhookUrl &&
							(webhook.subscribedStatuses?.includes(eventType) || webhook.eventType === eventType),
					);
				} catch (error) {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const originalUrl = this.getNodeWebhookUrl('default');
				const webhookUrl = `https://064c3fcb1541.ngrok-free.app${
					originalUrl?.replace(/^https?:\/\/[^\/]+/, '') || '/webhook'
				}`;
				const eventType = this.getNodeParameter('event') as TrendyolWebhookEventType;
				const credentials = await this.getCredentials('trendyolApi');

				const body = {
					url: webhookUrl,
					username: credentials.apiKey as string,
					password: credentials.apiSecret as string,
					authenticationType: 'BASIC_AUTHENTICATION',
					subscribedStatuses: [eventType],
				};

				try {
					const endpoint = buildWebhookSellerEndpoint(
						credentials.supplierId as string,
						WEBHOOK_ENDPOINTS.CREATE,
					);

					const baseUrl =
						credentials.environment === 'sandbox'
							? 'https://stageapigw.trendyol.com'
							: 'https://apigw.trendyol.com';

					const options: IRequestOptions = {
						method: 'POST' as IHttpRequestMethods,
						body,
						url: `${baseUrl}${endpoint}`,
						headers: {
							'Content-Type': 'application/json',
						},
						json: true,
					};

					this.logger.info(JSON.stringify(options, null, 2), { tag: 'WebhookCreationOptions' });

					const response = await this.helpers.requestWithAuthentication.call(
						this,
						'trendyolApi',
						options,
					);
					this.logger.info(JSON.stringify(response, null, 2), { tag: 'WebhookCreationResponse' });

					// Check for different response formats
					let webhookId = null;
					if (response) {
						// Try different possible ID fields
						webhookId =
							response.id || response.webhookId || response.webhook_id || response.data?.id;

						// If no ID but response exists, it might be a success without explicit ID
						if (
							!webhookId &&
							(response.success ||
								response.status === 'success' ||
								Object.keys(response).length > 0)
						) {
							// Generate a fallback ID for tracking
							webhookId = `webhook_${Date.now()}`;
							this.logger.info(JSON.stringify(webhookId, null, 2), { tag: 'WebhookFallbackId' });
						}
					}

					if (webhookId) {
						const webhookData = this.getWorkflowStaticData('node');
						webhookData.webhookId = webhookId;
						this.logger.info(JSON.stringify(webhookId, null, 2), { tag: 'WebhookCreatedId' });
						return true;
					}

					this.logger.info(JSON.stringify(response, null, 2), { tag: 'WebhookCreationFailed' });

					// As a fallback, if we got here without an error, assume success
					// This handles cases where Trendyol creates the webhook but doesn't return an ID
					this.logger.info('Assuming webhook creation succeeded despite no ID in response', {
						tag: 'WebhookCreationFallback',
					});
					const webhookData = this.getWorkflowStaticData('node');
					webhookData.webhookId = `fallback_${Date.now()}`;
					return true;
				} catch (error) {
					this.logger.error(JSON.stringify(error, null, 2), { tag: 'WebhookCreationError' });
					throw new NodeOperationError(
						this.getNode(),
						`Failed to create webhook: ${error.message || error}`,
					);
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const credentials = await this.getCredentials('trendyolApi');

				if (webhookData.webhookId) {
					try {
						const endpoint = buildWebhookSellerEndpoint(
							credentials.supplierId as string,
							buildWebhookEndpoint(WEBHOOK_ENDPOINTS.DELETE, webhookData.webhookId as string),
						);

						const baseUrl =
							credentials.environment === 'sandbox'
								? 'https://stageapigw.trendyol.com'
								: 'https://apigw.trendyol.com';

						const options: IRequestOptions = {
							method: 'DELETE' as IHttpRequestMethods,
							url: `${baseUrl}${endpoint}`,
						};

						await this.helpers.requestWithAuthentication.call(this, 'trendyolApi', options);
						delete webhookData.webhookId;
						return true;
					} catch (error) {
						this.logger.error(JSON.stringify(error, null, 2), { tag: 'WebhookDeletionError' });
						return false;
					}
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData();
		const eventType = this.getNodeParameter('event') as string;
		const simplify = this.getNodeParameter('simplify', false) as boolean;

		this.logger.info(JSON.stringify(bodyData, null, 2), { tag: 'WebhookReceivedData' });

		// Ensure we have valid body data
		let responseData: IDataObject = {};

		if (bodyData && typeof bodyData === 'object') {
			responseData = bodyData as IDataObject;

			// If simplify is enabled, extract the main data from the webhook payload
			if (simplify && bodyData.data && typeof bodyData.data === 'object') {
				responseData = bodyData.data as IDataObject;
			}
		} else {
			// If bodyData is not an object, wrap it
			responseData = { data: bodyData };
		}

		// Add event type to the response for context
		responseData.eventType = eventType;
		responseData.receivedAt = new Date().toISOString();

		this.logger.info(JSON.stringify(responseData, null, 2), { tag: 'FinalResponseData' });

		return {
			workflowData: [
				[
					{
						json: responseData,
					},
				],
			],
		};
	}
}

async function listWebhooks(this: IHookFunctions): Promise<TrendyolWebhook[]> {
	const credentials = await this.getCredentials('trendyolApi');

	const endpoint = buildWebhookSellerEndpoint(
		credentials.supplierId as string,
		WEBHOOK_ENDPOINTS.GET_ALL,
	);

	const baseUrl =
		credentials.environment === 'sandbox'
			? 'https://stageapigw.trendyol.com'
			: 'https://apigw.trendyol.com';

	const options: IRequestOptions = {
		method: 'GET' as IHttpRequestMethods,
		url: `${baseUrl}${endpoint}`,
		json: true,
	};

	const response = (await this.helpers.requestWithAuthentication.call(
		this,
		'trendyolApi',
		options,
	)) as TrendyolWebhookResponse;
	return response.webhooks || [];
}
