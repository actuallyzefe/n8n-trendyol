import type { INodeProperties } from 'n8n-workflow';
import { productGetAllFields } from './fields/product';
import { orderGetAllFields } from './fields/order';
import { brandNameField, brandGetAllFields } from './fields/brand';
import { categoryGetAllFields } from './fields/category';

/**
 * Export individual required field components for specific operations
 * These are used for operations that need a specific ID or name parameter
 */
export { brandNameField };

/**
 * Helper function to add resource-specific display options to field arrays
 *
 * This function takes an array of field definitions and adds display conditions
 * so they only show when a specific resource is selected in the UI
 *
 * @param fields - Array of field definitions to modify
 * @param resource - The resource name that should trigger displaying these fields
 * @returns Modified array of fields with resource-specific display conditions
 */
const addResourceDisplayOptions = (
	fields: INodeProperties[],
	resource: string,
): INodeProperties[] =>
	fields.map((field) => ({
		...field,
		displayOptions: {
			show: {
				'/resource': [resource], // Only show when this specific resource is selected
			},
		},
	}));

/**
 * Main additional fields collection for 'getAll' operations
 *
 * This creates a collection of optional fields that users can configure
 * when performing 'getAll' operations. Each resource (product, order, brand, category)
 * has its own set of filters and parameters that are dynamically shown
 * based on the selected resource.
 *
 * The collection includes:
 * - Product filters: pagination, approval status, dates, brand IDs, etc.
 * - Order filters: pagination, dates, status, order number, supplier ID, etc.
 * - Brand filters: pagination only
 * - Category filters: pagination only
 */
export const additionalFieldsCollection: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			operation: ['getAll'], // Currently only show for 'getAll' operations
		},
	},
	options: [
		// Product-specific fields (filters for product getAll operation)
		...addResourceDisplayOptions(productGetAllFields, 'product'),

		// Order-specific fields (filters for order getAll operation)
		...addResourceDisplayOptions(orderGetAllFields, 'order'),

		// Brand-specific fields (filters for brand getAll operation)
		...addResourceDisplayOptions(brandGetAllFields, 'brand'),

		// Category-specific fields (filters for category getAll operation)
		...addResourceDisplayOptions(categoryGetAllFields, 'category'),
	],
};
