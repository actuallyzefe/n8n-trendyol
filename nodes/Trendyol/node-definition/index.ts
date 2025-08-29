import type { INodeProperties } from 'n8n-workflow';
import { resourceField } from './resources';
import {
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
} from './operations';
import {
	productIdField,
	orderIdField,
	brandNameField,
	additionalFieldsCollection,
} from './fields';

export const nodeProperties: INodeProperties[] = [
	resourceField,
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
	productIdField,
	orderIdField,
	brandNameField,
	additionalFieldsCollection,
];
