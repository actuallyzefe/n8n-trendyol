import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { nodeProperties } from './node-definition';
import {
	getAllProducts,
	getProduct,
	getAllOrders,
	getOrder,
	getAllBrands,
	getBrandByName,
	getAllCategories,
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
					if (operation === 'getAll') {
						responseData = await getAllProducts.call(this, i);
					} else if (operation === 'get') {
						responseData = await getProduct.call(this, i);
					}
				} else if (resource === 'order') {
					if (operation === 'getAll') {
						responseData = await getAllOrders.call(this, i);
					} else if (operation === 'get') {
						responseData = await getOrder.call(this, i);
					}
				} else if (resource === 'brand') {
					if (operation === 'getAll') {
						responseData = await getAllBrands.call(this, i);
					} else if (operation === 'getByName') {
						responseData = await getBrandByName.call(this, i);
					}
				} else if (resource === 'category') {
					if (operation === 'getAll') {
						responseData = await getAllCategories.call(this, i);
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
