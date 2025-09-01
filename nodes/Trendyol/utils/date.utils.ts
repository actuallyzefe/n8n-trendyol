/**
 * Date Utilities
 * Helper functions for handling date conversions using native JavaScript Date
 */

/**
 * Check if a date string is valid
 */
function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return !isNaN(date.getTime());
}

/**
 * Convert a date string to GMT+3 timestamp
 * Handles various date formats and timezone specifications
 */
function convertToGMT3(dateString: string): number {
	// Remove any trailing 'Z' or timezone offset for consistent parsing
	const cleanDateString = dateString.replace(/[Zz]$/, '').replace(/[+-]\d{2}:?\d{2}$/, '');

	// Parse the date string
	const date = new Date(cleanDateString);

	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateString}`);
	}

	// Get the local time components
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();

	// Create a new date object representing this time in GMT+3
	// We'll use the Date constructor with UTC methods to ensure proper timezone handling
	const gmt3Date = new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));

	// Adjust for GMT+3 (3 hours ahead of UTC)
	// Subtract 3 hours from UTC to get the correct GMT+3 timestamp
	return gmt3Date.getTime() - 3 * 60 * 60 * 1000;
}

/**
 * Convert date to timestamp for Trendyol API
 * Trendyol API expects timestamps in GMT+3 timezone
 */
export function dateToTimestamp(date: string): number {
	// Check if the date is valid
	if (!isValidDate(date)) {
		throw new Error(`Invalid date format: ${date}`);
	}

	// If no timezone is specified, treat as GMT+3
	if (!/[+-]\d{2}:?\d{2}|Z$/i.test(date)) {
		// No timezone specified - treat as GMT+3
		return convertToGMT3(date);
	}

	// Timezone was specified - convert to GMT+3
	return convertToGMT3(date);
}

/**
 * Convert dateTime input to GMT+3 timestamp for Trendyol API
 * This handles n8n's dateTime field type properly for orderDate fields
 */
export function dateTimeToGMT3Timestamp(dateTime: string): number {
	if (!dateTime) {
		throw new Error('Date time is required');
	}

	// Check if the date is valid
	if (!isValidDate(dateTime)) {
		throw new Error(`Invalid date format: ${dateTime}`);
	}

	// The user selects a time like "2025-08-30 11:00:00"
	// We want this to be interpreted as "11:00 AM on August 30th in GMT+3"
	//
	// Strategy: Treat the user input as if it's already in GMT+3 timezone
	// Convert the input to GMT+3 timestamp

	return convertToGMT3(dateTime);
}

/**
 * Convert dateTime input to GMT timestamp for Trendyol API
 * This handles n8n's dateTime field type properly for createdDate fields
 */
export function dateTimeToGMTTimestamp(dateTime: string): number {
	if (!dateTime) {
		throw new Error('Date time is required');
	}

	// Check if the date is valid
	if (!isValidDate(dateTime)) {
		throw new Error(`Invalid date format: ${dateTime}`);
	}

	// The user selects a time like "2025-08-30 11:00:00"
	// We want this to be interpreted as "11:00 AM on August 30th in GMT (UTC)"
	//
	// Strategy: Treat the user input as if it's already in GMT timezone
	// Parse the input as UTC timestamp

	// Remove any trailing 'Z' or timezone offset for consistent parsing
	const cleanDateString = dateTime.replace(/[Zz]$/, '').replace(/[+-]\d{2}:?\d{2}$/, '');

	// Parse the date string
	const date = new Date(cleanDateString);

	if (isNaN(date.getTime())) {
		throw new Error(`Invalid date format: ${dateTime}`);
	}

	// Get the local time components
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();

	// Create a UTC timestamp for this time
	return Date.UTC(year, month, day, hours, minutes, seconds, milliseconds);
}
