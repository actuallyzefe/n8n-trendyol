import type { INodeProperties } from 'n8n-workflow';
import { resourceField } from './resources';
import {
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
	questionOperationsField,
	webhookOperationsField,
} from './operations';
import {
	brandNameField,
	additionalFieldsCollection,
	questionAnswerFieldsCollection,
	webhookDeleteFieldsCollection,
} from './fields';

export const nodeProperties: INodeProperties[] = [
	resourceField,
	productOperationsField,
	orderOperationsField,
	brandOperationsField,
	categoryOperationsField,
	questionOperationsField,
	webhookOperationsField,
	brandNameField,
	...questionAnswerFieldsCollection,
	...webhookDeleteFieldsCollection,
	additionalFieldsCollection,
];
