import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../common';

export const orderGetAllFields: INodeProperties[] = [
	...paginationFields,
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		default: '',
		description: 'Start date for filtering orders (Timestamp GMT+3)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		default: '',
		description: 'End date for filtering orders (Timestamp GMT+3)',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: '',
		description: 'Filter orders by status',
		options: [
			{
				name: 'Created',
				value: 'Created',
			},
			{
				name: 'Picking',
				value: 'Picking',
			},
			{
				name: 'Invoiced',
				value: 'Invoiced',
			},
			{
				name: 'Shipped',
				value: 'Shipped',
			},
			{
				name: 'Cancelled',
				value: 'Cancelled',
			},
			{
				name: 'Delivered',
				value: 'Delivered',
			},
			{
				name: 'UnDelivered',
				value: 'UnDelivered',
			},
			{
				name: 'Returned',
				value: 'Returned',
			},
			{
				name: 'At Collection Point',
				value: 'AtCollectionPoint',
			},
			{
				name: 'UnPacked',
				value: 'UnPacked',
			},
			{
				name: 'UnSupplied',
				value: 'UnSupplied',
			},
		],
	},
	{
		displayName: 'Order Number',
		name: 'orderNumber',
		type: 'string',
		default: '',
		description: 'Filter by specific order number',
	},
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'number',
		default: '',
		description: 'Filter by supplier ID (İlgili tedarikçinin ID bilgisi)',
	},
	{
		displayName: 'Shipment Package IDs',
		name: 'shipmentPackageIds',
		type: 'number',
		default: '',
		description: 'Filter by shipment package ID (Paket numarasıyla sorgu)',
	},
	{
		displayName: 'Order By Field',
		name: 'orderByField',
		type: 'options',
		default: '',
		description: 'Field to sort results by',
		options: [
			{
				name: 'Package Last Modified Date',
				value: 'PackageLastModifiedDate',
			},
			{
				name: 'Created Date',
				value: 'CreatedDate',
			},
		],
	},
	{
		displayName: 'Order By Direction',
		name: 'orderByDirection',
		type: 'options',
		default: 'DESC',
		description: 'Sort direction',
		options: [
			{
				name: 'Ascending',
				value: 'ASC',
			},
			{
				name: 'Descending',
				value: 'DESC',
			},
		],
	},
];
