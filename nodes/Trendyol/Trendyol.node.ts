import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestMethods,
	IRequestOptions,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class Trendyol implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Trendyol',
		name: 'trendyol',
		icon: 'file:trendyol.svg',
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
		properties: [
			{
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
				],
				default: 'product',
			},

			// Product Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all products',
						action: 'Get all products',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a product by ID',
						action: 'Get a product',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a product',
						action: 'Create a product',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a product',
						action: 'Update a product',
					},
					{
						name: 'Update Price and Stock',
						value: 'updatePriceStock',
						description: 'Update product price and stock',
						action: 'Update product price and stock',
					},
				],
				default: 'getAll',
			},

			// Order Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all orders',
						action: 'Get all orders',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an order by ID',
						action: 'Get an order',
					},
					{
						name: 'Update Status',
						value: 'updateStatus',
						description: 'Update order status',
						action: 'Update order status',
					},
				],
				default: 'getAll',
			},

			// Brand Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['brand'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all brands',
						action: 'Get all brands',
					},
					{
						name: 'Get By Name',
						value: 'getByName',
						description: 'Get brand by name',
						action: 'Get brand by name',
					},
				],
				default: 'getAll',
			},

			// Category Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['category'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all categories',
						action: 'Get all categories',
					},
				],
				default: 'getAll',
			},

			// Product ID field
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'The ID of the product',
			},

			// Order ID field
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['get', 'updateStatus'],
					},
				},
				default: '',
				description: 'The ID of the order',
			},

			// Brand Name field
			{
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
			},

			// Pagination fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				options: [
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
					{
						displayName: 'Approved',
						name: 'approved',
						type: 'boolean',
						default: true,
						description: 'Filter by approval status',
						displayOptions: {
							show: {
								'/resource': ['product'],
							},
						},
					},
					{
						displayName: 'Archived',
						name: 'archived',
						type: 'boolean',
						default: false,
						description: 'Include archived products',
						displayOptions: {
							show: {
								'/resource': ['product'],
							},
						},
					},
					{
						displayName: 'Start Date',
						name: 'startDate',
						type: 'dateTime',
						default: '',
						description: 'Start date for filtering orders',
						displayOptions: {
							show: {
								'/resource': ['order'],
							},
						},
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
						description: 'End date for filtering orders',
						displayOptions: {
							show: {
								'/resource': ['order'],
							},
						},
					},
				],
			},

			// Product data for create/update operations
			{
				displayName: 'Product Data',
				name: 'productData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Product data as JSON',
			},

			// Price and Stock data for updatePriceStock operation
			{
				displayName: 'Items',
				name: 'items',
				type: 'fixedCollection',
				required: true,
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['updatePriceStock'],
					},
				},
				default: {},
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'item',
						displayName: 'Item',
						values: [
							{
								displayName: 'Barcode',
								name: 'barcode',
								type: 'string',
								required: true,
								default: '',
								description: 'Product barcode',
							},
							{
								displayName: 'Quantity',
								name: 'quantity',
								type: 'number',
								required: true,
								default: 0,
								description: 'Stock quantity',
							},
							{
								displayName: 'Sale Price',
								name: 'salePrice',
								type: 'number',
								required: true,
								default: 0,
								description: 'Sale price',
							},
							{
								displayName: 'List Price',
								name: 'listPrice',
								type: 'number',
								default: 0,
								description: 'List price (optional)',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('trendyolApi');

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;

				if (resource === 'product') {
					if (operation === 'getAll') {
						responseData = await executeProductGetAll.call(this, i, credentials);
					} else if (operation === 'get') {
						responseData = await executeProductGet.call(this, i, credentials);
					} else if (operation === 'create') {
						responseData = await executeProductCreate.call(this, i, credentials);
					} else if (operation === 'update') {
						responseData = await executeProductUpdate.call(this, i, credentials);
					} else if (operation === 'updatePriceStock') {
						responseData = await executeProductUpdatePriceStock.call(this, i, credentials);
					}
				} else if (resource === 'order') {
					if (operation === 'getAll') {
						responseData = await executeOrderGetAll.call(this, i, credentials);
					} else if (operation === 'get') {
						responseData = await executeOrderGet.call(this, i, credentials);
					}
				} else if (resource === 'brand') {
					if (operation === 'getAll') {
						responseData = await executeBrandGetAll.call(this, i, credentials);
					} else if (operation === 'getByName') {
						responseData = await executeBrandGetByName.call(this, i, credentials);
					}
				} else if (resource === 'category') {
					if (operation === 'getAll') {
						responseData = await executeCategoryGetAll.call(this, i, credentials);
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

async function makeRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: any,
	qs?: any,
	credentials?: any,
): Promise<any> {
	const options: IRequestOptions = {
		method,
		url: endpoint,
		json: true,
		auth: {
			username: credentials.apiKey,
			password: credentials.apiSecret,
		},
	};

	if (body) {
		options.body = body;
	}

	if (qs) {
		options.qs = qs;
	}

	try {
		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeOperationError(this.getNode(), error);
	}
}

// Product Operations
async function executeProductGetAll(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;
	const qs: any = {};

	if (additionalFields.page !== undefined) {
		qs.page = additionalFields.page;
	}
	if (additionalFields.size !== undefined) {
		qs.size = additionalFields.size;
	}
	if (additionalFields.approved !== undefined) {
		qs.approved = additionalFields.approved;
	}
	if (additionalFields.archived !== undefined) {
		qs.archived = additionalFields.archived;
	}

	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/products`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, qs, credentials);
}

async function executeProductGet(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const productId = this.getNodeParameter('productId', index) as string;
	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/products/${productId}`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, undefined, credentials);
}

async function executeProductCreate(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const productData = this.getNodeParameter('productData', index) as string;
	const body = JSON.parse(productData);
	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/v2/products`;
	return await makeRequest.call(this, 'POST', endpoint, body, undefined, credentials);
}

async function executeProductUpdate(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const productId = this.getNodeParameter('productId', index) as string;
	const productData = this.getNodeParameter('productData', index) as string;
	const body = JSON.parse(productData);
	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/v2/products/${productId}`;
	return await makeRequest.call(this, 'PUT', endpoint, body, undefined, credentials);
}

async function executeProductUpdatePriceStock(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const items = this.getNodeParameter('items', index) as any;
	const body = { items: items.item };
	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/products/price-and-inventory`;
	return await makeRequest.call(this, 'POST', endpoint, body, undefined, credentials);
}

// Order Operations
async function executeOrderGetAll(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;
	const qs: any = {};

	if (additionalFields.page !== undefined) {
		qs.page = additionalFields.page;
	}
	if (additionalFields.size !== undefined) {
		qs.size = additionalFields.size;
	}
	if (additionalFields.startDate) {
		qs.startDate = new Date(additionalFields.startDate).getTime();
	}
	if (additionalFields.endDate) {
		qs.endDate = new Date(additionalFields.endDate).getTime();
	}

	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/orders`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, qs, credentials);
}

async function executeOrderGet(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const orderId = this.getNodeParameter('orderId', index) as string;
	const endpoint = `/sapigw/suppliers/${credentials.supplierId}/orders/${orderId}`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, undefined, credentials);
}

// Brand Operations
async function executeBrandGetAll(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const additionalFields = this.getNodeParameter('additionalFields', index) as any;
	const qs: any = {};

	if (additionalFields.page !== undefined) {
		qs.page = additionalFields.page;
	}
	if (additionalFields.size !== undefined) {
		qs.size = additionalFields.size;
	}

	const endpoint = `/sapigw/brands`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, qs, credentials);
}

async function executeBrandGetByName(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const brandName = this.getNodeParameter('brandName', index) as string;
	const qs = { name: brandName };
	const endpoint = `/sapigw/brands/by-name`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, qs, credentials);
}

// Category Operations
async function executeCategoryGetAll(
	this: IExecuteFunctions,
	index: number,
	credentials: any,
): Promise<any> {
	const endpoint = `/sapigw/product-categories`;
	return await makeRequest.call(this, 'GET', endpoint, undefined, undefined, credentials);
}
