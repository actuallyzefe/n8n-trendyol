import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

import { nodeProperties } from './node-definition';
import {
	executeProductGetAll,
	executeProductGet,
	executeOrderGetAll,
	executeOrderGet,
	executeBrandGetAll,
	executeBrandGetByName,
	executeCategoryGetAll,
} from './operations';
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
				'={{$credentials.environment === "sandbox" ? "https://stageapi.trendyol.com" : "https://api.trendyol.com"}}',
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
						responseData = await executeProductGetAll.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeProductGet.call(this, i);
					}
				} else if (resource === 'order') {
					if (operation === 'getAll') {
						responseData = await executeOrderGetAll.call(this, i);
					} else if (operation === 'get') {
						responseData = await executeOrderGet.call(this, i);
					}
				} else if (resource === 'brand') {
					if (operation === 'getAll') {
						responseData = await executeBrandGetAll.call(this, i);
					} else if (operation === 'getByName') {
						responseData = await executeBrandGetByName.call(this, i);
					}
				} else if (resource === 'category') {
					if (operation === 'getAll') {
						responseData = await executeCategoryGetAll.call(this, i);
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
