/**
 * Date Utilities
 * Helper functions for handling date conversions using dayjs
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Convert date to timestamp for Trendyol API
 * Trendyol API expects timestamps in GMT+3 timezone
 */
export function dateToTimestamp(date: string): number {
	// Parse the input date string using dayjs
	const inputDate = dayjs(date);

	// Check if the date is valid
	if (!inputDate.isValid()) {
		throw new Error(`Invalid date format: ${date}`);
	}

	// If no timezone is specified, treat as GMT+3
	if (!/[+-]\d{2}:?\d{2}|Z$/i.test(date)) {
		// No timezone specified - treat as GMT+3
		return inputDate.tz('Europe/Istanbul').valueOf();
	}

	// Timezone was specified - convert to GMT+3
	return inputDate.tz('Europe/Istanbul').valueOf();
}

/**
 * Convert dateTime input to GMT+3 timestamp for Trendyol API
 * This handles n8n's dateTime field type properly for orderDate fields
 */
export function dateTimeToGMT3Timestamp(dateTime: string): number {
	if (!dateTime) {
		throw new Error('Date time is required');
	}

	// Parse the datetime using dayjs
	const date = dayjs(dateTime);

	if (!date.isValid()) {
		throw new Error(`Invalid date format: ${dateTime}`);
	}

	// The user selects a time like "2025-08-30 11:00:00"
	// We want this to be interpreted as "11:00 AM on August 30th in GMT+3"
	//
	// Strategy: Treat the user input as if it's already in GMT+3 timezone
	// dayjs makes this much simpler and more reliable

	// Parse the input as if it's in GMT+3 (Europe/Istanbul timezone)
	// This will create the correct UTC timestamp for that local time
	const gmt3Date = dayjs.tz(dateTime, 'Europe/Istanbul');

	return gmt3Date.valueOf();
}

/**
 * Convert dateTime input to GMT timestamp for Trendyol API
 * This handles n8n's dateTime field type properly for createdDate fields
 */
export function dateTimeToGMTTimestamp(dateTime: string): number {
	if (!dateTime) {
		throw new Error('Date time is required');
	}

	// Parse the datetime using dayjs
	const date = dayjs(dateTime);

	if (!date.isValid()) {
		throw new Error(`Invalid date format: ${dateTime}`);
	}

	// The user selects a time like "2025-08-30 11:00:00"
	// We want this to be interpreted as "11:00 AM on August 30th in GMT (UTC)"
	//
	// Strategy: Treat the user input as if it's already in GMT timezone
	// dayjs makes this much simpler and more reliable

	// Parse the input as if it's in GMT (UTC timezone)
	// This will create the correct UTC timestamp for that time
	const gmtDate = dayjs.utc(dateTime);

	return gmtDate.valueOf();
}
