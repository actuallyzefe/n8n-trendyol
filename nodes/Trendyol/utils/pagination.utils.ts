/**
 * Pagination Utilities
 * Helper functions for handling pagination parameters
 */

/**
 * Build query parameters for pagination
 */
export function buildPaginationParams(additionalFields: any): any {
	const qs: any = {};

	if (additionalFields.page !== undefined) {
		qs.page = additionalFields.page;
	}
	if (additionalFields.size !== undefined) {
		qs.size = additionalFields.size;
	}

	return qs;
}
