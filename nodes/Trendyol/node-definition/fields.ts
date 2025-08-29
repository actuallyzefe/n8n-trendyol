import type { INodeProperties } from 'n8n-workflow';

export const productIdField: INodeProperties = {
	displayName: 'Product ID',
	name: 'productId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['product'],
			operation: ['get'],
		},
	},
	default: '',
	description: 'The ID of the product',
};

export const orderIdField: INodeProperties = {
	displayName: 'Order ID',
	name: 'orderId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['order'],
			operation: ['get'],
		},
	},
	default: '',
	description: 'The ID of the order',
};

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

export const additionalFieldsCollection: INodeProperties = {
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
			displayName: 'Brand IDs',
			name: 'brandIds',
			type: 'string',
			default: '',
			description: 'Used to list products with the specified brand ID (comma-separated array)',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Barcode',
			name: 'barcode',
			type: 'string',
			default: '',
			description: 'Used to query a specific barcode',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Stock Code',
			name: 'stockCode',
			type: 'string',
			default: '',
			description: 'The stock code information of the relevant supplier',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Start Date',
			name: 'startDate',
			type: 'number',
			default: '',
			description: 'Gets products after a specific date. Must be sent as timestamp.',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'End Date',
			name: 'endDate',
			type: 'number',
			default: '',
			description: 'Gets products before a specific date. Must be sent as timestamp.',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Date Query Type',
			name: 'dateQueryType',
			type: 'options',
			default: 'CREATED_DATE',
			description: 'The date on which the date filter will work can be sent as CREATED_DATE or LAST_MODIFIED_DATE',
			options: [
				{
					name: 'Created Date',
					value: 'CREATED_DATE',
				},
				{
					name: 'Last Modified Date',
					value: 'LAST_MODIFIED_DATE',
				},
			],
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Supplier ID',
			name: 'supplierId',
			type: 'number',
			default: '',
			description: 'The ID information of the relevant supplier',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Product Main ID',
			name: 'productMainId',
			type: 'string',
			default: '',
			description: 'The productMainId information of the relevant supplier',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'On Sale',
			name: 'onSale',
			type: 'boolean',
			default: '',
			description: 'To list products on sale, send only onSale=true',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Rejected',
			name: 'rejected',
			type: 'boolean',
			default: '',
			description: 'To list rejected products, send rejected=true or false',
			displayOptions: {
				show: {
					'/resource': ['product'],
				},
			},
		},
		{
			displayName: 'Blacklisted',
			name: 'blacklisted',
			type: 'boolean',
			default: '',
			description: 'To list blacklisted products, send blacklisted=true or false',
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
};
