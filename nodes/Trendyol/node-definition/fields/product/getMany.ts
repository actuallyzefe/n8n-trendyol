import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../common';

export const productGetManyFields: INodeProperties[] = [
	...paginationFields,
	{
		displayName: 'Approved',
		name: 'approved',
		type: 'boolean',
		default: true,
		description: 'Whether to filter by approval status',
	},
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		default: false,
		description: 'Whether to include archived products',
	},
	{
		displayName: 'Brand IDs',
		name: 'brandIds',
		type: 'string',
		default: '',
		description: 'Used to list products with the specified brand ID (comma-separated array)',
	},
	{
		displayName: 'Barcode',
		name: 'barcode',
		type: 'string',
		default: '',
		description: 'Used to query a specific barcode',
	},
	{
		displayName: 'Stock Code',
		name: 'stockCode',
		type: 'string',
		default: '',
		description: 'The stock code information of the relevant supplier',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		default: '',
		description:
			'Gets products after a specific date (Timestamp GMT - for createdDate/lastModifiedDate)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		default: '',
		description:
			'Gets products before a specific date (Timestamp GMT - for createdDate/lastModifiedDate)',
	},
	{
		displayName: 'Date Query Type',
		name: 'dateQueryType',
		type: 'options',
		default: 'CREATED_DATE',
		description:
			'The date on which the date filter will work can be sent as CREATED_DATE or LAST_MODIFIED_DATE',
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
	},
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'number',
		default: '',
		description: 'The ID information of the relevant supplier',
	},
	{
		displayName: 'Product Main ID',
		name: 'productMainId',
		type: 'string',
		default: '',
		description: 'The productMainId information of the relevant supplier',
	},
	{
		displayName: 'On Sale',
		name: 'onSale',
		type: 'boolean',
		default: false,
		description: 'Whether to list products on sale',
	},
	{
		displayName: 'Rejected',
		name: 'rejected',
		type: 'boolean',
		default: false,
		description: 'Whether to list rejected products',
	},
	{
		displayName: 'Blacklisted',
		name: 'blacklisted',
		type: 'boolean',
		default: false,
		description: 'Whether to list blacklisted products',
	},
];
