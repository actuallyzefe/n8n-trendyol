import type { INodeProperties } from 'n8n-workflow';
import { paginationFields } from '../common';

export const questionGetManyFields: INodeProperties[] = [
	...paginationFields,
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		default: '',
		description: 'Start date for filtering questions (Timestamp GMT - for createdDate)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		default: '',
		description: 'End date for filtering questions (Timestamp GMT - for createdDate)',
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'WAITING_FOR_ANSWER',
		description: 'Filter questions by status',
		options: [
			{
				name: 'Waiting for Answer',
				value: 'WAITING_FOR_ANSWER',
			},
			{
				name: 'Waiting for Approve',
				value: 'WAITING_FOR_APPROVE',
			},
			{
				name: 'Answered',
				value: 'ANSWERED',
			},
			{
				name: 'Reported',
				value: 'REPORTED',
			},
			{
				name: 'Rejected',
				value: 'REJECTED',
			},
		],
	},
	{
		displayName: 'Barcode',
		name: 'barcode',
		type: 'string',
		default: '',
		description: 'Filter questions by specific product barcode',
	},
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'number',
		default: '',
		description:
			'Supplier ID (required parameter - will use credential supplierId if not specified)',
	},
	{
		displayName: 'Order By Field',
		name: 'orderByField',
		type: 'options',
		default: 'LastModifiedDate',
		description: 'Field to sort results by',
		options: [
			{
				name: 'Last Modified Date',
				value: 'LastModifiedDate',
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
				name: 'Ascending (Old to New)',
				value: 'ASC',
			},
			{
				name: 'Descending (New to Old)',
				value: 'DESC',
			},
		],
	},
];
