import type { INodeProperties } from 'n8n-workflow';

export const productOperationsField: INodeProperties = {
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
	],
	default: 'getAll',
};

export const orderOperationsField: INodeProperties = {
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
	],
	default: 'getAll',
};

export const brandOperationsField: INodeProperties = {
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
};

export const categoryOperationsField: INodeProperties = {
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
};
