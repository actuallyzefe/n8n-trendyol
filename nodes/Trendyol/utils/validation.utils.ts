/**
 * Validation Utilities
 * Helper functions for parameter validation
 */

import { NodeOperationError } from 'n8n-workflow';

/**
 * Validate required parameter
 */
export function validateRequiredParameter(value: any, parameterName: string): void {
	if (!value) {
		throw new NodeOperationError(
			{} as any,
			`Required parameter "${parameterName}" is missing or empty`,
		);
	}
}
