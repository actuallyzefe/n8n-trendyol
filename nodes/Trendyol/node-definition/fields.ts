import type { INodeProperties } from 'n8n-workflow';
import { productGetManyFields } from './fields/product';
import { orderGetManyFields } from './fields/order';
import { brandNameField, brandGetManyFields } from './fields/brand';
import { categoryGetManyFields } from './fields/category';

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
 * Main additional fields collection for 'getMany' operations
 *
 * This creates a collection of optional fields that users can configure
 * when performing 'getMany' operations. Each resource (product, order, brand, category)
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
			operation: ['getMany'], // Currently only show for 'getMany' operations
		},
	},
	options: [
		// Product-specific fields (filters for product getMany operation)
		...addResourceDisplayOptions(productGetManyFields, 'product'),

		// Order-specific fields (filters for order getMany operation)
		...addResourceDisplayOptions(orderGetManyFields, 'order'),

		// Brand-specific fields (filters for brand getMany operation)
		...addResourceDisplayOptions(brandGetManyFields, 'brand'),

		// Category-specific fields (filters for category getMany operation)
		...addResourceDisplayOptions(categoryGetManyFields, 'category'),
	],
};
