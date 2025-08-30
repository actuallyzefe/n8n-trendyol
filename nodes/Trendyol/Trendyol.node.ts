import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { nodeProperties } from './node-definition';
import {
	getManyProducts,
	getManyOrders,
	getManyBrands,
	getBrandByName,
	getManyCategories,
	getManyQuestions,
	answerQuestion,
	getManyWebhooks,
	deleteWebhook,
} from './resources';
import type { TrendyolResource, TrendyolOperation } from './types';

export class Trendyol implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Trendyol',
		name: 'trendyol',
		icon: 'file:trendyol-logo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Trendyol Marketplace API integration',
		defaults: {
			name: 'Trendyol',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'trendyolApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL:
				'={{$credentials.environment === "sandbox" ? "https://stageapigw.trendyol.com" : "https://apigw.trendyol.com"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: nodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as TrendyolResource;
		const operation = this.getNodeParameter('operation', 0) as TrendyolOperation;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'product') {
					if (operation === 'getMany') {
						responseData = await getManyProducts.call(this, i);
					}
				} else if (resource === 'order') {
					if (operation === 'getMany') {
						responseData = await getManyOrders.call(this, i);
					}
				} else if (resource === 'brand') {
					if (operation === 'getMany') {
						responseData = await getManyBrands.call(this, i);
					} else if (operation === 'getByName') {
						responseData = await getBrandByName.call(this, i);
					}
				} else if (resource === 'category') {
					if (operation === 'getMany') {
						responseData = await getManyCategories.call(this, i);
					}
				} else if (resource === 'question') {
					if (operation === 'getMany') {
						responseData = await getManyQuestions.call(this, i);
					} else if (operation === 'answer') {
						responseData = await answerQuestion.call(this, i);
					}
				} else if (resource === 'webhook') {
					if (operation === 'getMany') {
						responseData = await getManyWebhooks.call(this, i);
					} else if (operation === 'delete') {
						responseData = await deleteWebhook.call(this, i);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					Array.isArray(responseData)
						? responseData.map((item: any) => ({ json: item }))
						: [{ json: responseData }],
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						[{ json: { error: error.message } }],
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
