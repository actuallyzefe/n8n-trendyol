import type { INodeProperties } from 'n8n-workflow';
import { resourceField } from './resources';
import {
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
} from './operations';
import { brandNameField, additionalFieldsCollection } from './fields';

export const nodeProperties: INodeProperties[] = [
	resourceField,
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
	brandNameField,
	additionalFieldsCollection,
];
