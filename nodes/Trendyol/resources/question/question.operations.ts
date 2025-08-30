import type { IExecuteFunctions } from 'n8n-workflow';
import { trendyolApiRequest, getTrendyolCredentials } from '../../GenericFunctions';
import { buildPaginationParams, dateTimeToGMTTimestamp } from '../../utils';
import { buildQuestionEndpoint, buildQuestionAnswerEndpoint } from '../../endpoints';
import type { QuestionFilters } from '../../types';

/**
 * Get customer questions
 */
export async function getManyQuestions(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const additionalFields = this.getNodeParameter('additionalFields', index) as QuestionFilters;

	const qs = buildPaginationParams(additionalFields);

	// Required supplierId parameter - use from additionalFields or fall back to credentials
	qs.supplierId = additionalFields.supplierId || parseInt(credentials.supplierId, 10);

	// Date filters (convert to GMT timestamp for createdDate fields)
	if (additionalFields.startDate) {
		qs.startDate = dateTimeToGMTTimestamp(additionalFields.startDate);
	}
	if (additionalFields.endDate) {
		qs.endDate = dateTimeToGMTTimestamp(additionalFields.endDate);
	}

	// Status filter
	if (additionalFields.status) {
		qs.status = additionalFields.status;
	}

	// Barcode filter
	if (additionalFields.barcode) {
		qs.barcode = additionalFields.barcode;
	}

	// Sorting options
	if (additionalFields.orderByField) {
		qs.orderByField = additionalFields.orderByField;
	}
	if (additionalFields.orderByDirection) {
		qs.orderByDirection = additionalFields.orderByDirection;
	}

	const endpoint = buildQuestionEndpoint(credentials.supplierId);
	return await trendyolApiRequest.call(this, 'GET', endpoint, undefined, qs);
}

/**
 * Answer a customer question
 */
export async function answerQuestion(this: IExecuteFunctions, index: number): Promise<any> {
	const credentials = await getTrendyolCredentials.call(this);
	const questionId = this.getNodeParameter('questionId', index) as string;
	const answerText = this.getNodeParameter('answerText', index) as string;

	// Validate answer text length (minimum 10, maximum 2000 characters)
	if (answerText.length < 10) {
		throw new Error('Answer text must be at least 10 characters long');
	}
	if (answerText.length > 2000) {
		throw new Error('Answer text must not exceed 2000 characters');
	}

	const body = {
		text: answerText,
	};

	const endpoint = buildQuestionAnswerEndpoint(credentials.supplierId, questionId);
	return await trendyolApiRequest.call(this, 'POST', endpoint, body);
}
