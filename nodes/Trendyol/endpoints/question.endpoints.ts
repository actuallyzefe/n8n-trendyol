/**
 * Question Module Endpoints
 * All customer Q&A related API endpoints for Trendyol
 */

// Base paths for question module
export const QUESTION_BASE_PATHS = {
	INTEGRATION: '/integration/qna',
	SELLERS: '/integration/qna/sellers',
} as const;

// Question endpoints (seller-specific)
export const QUESTION_ENDPOINTS = {
	GET_ALL: '/questions/filter',
	ANSWER_QUESTION: '/questions/{questionId}/answers',
} as const;

/**
 * Build question seller-specific endpoint
 */
export function buildQuestionSellerEndpoint(sellerId: string, path: string): string {
	return `${QUESTION_BASE_PATHS.SELLERS}/${sellerId}${path}`;
}

/**
 * Build question endpoint for getting questions
 */
export function buildQuestionEndpoint(sellerId: string): string {
	return buildQuestionSellerEndpoint(sellerId, QUESTION_ENDPOINTS.GET_ALL);
}

/**
 * Build question answer endpoint
 */
export function buildQuestionAnswerEndpoint(sellerId: string, questionId: string): string {
	const endpoint = QUESTION_ENDPOINTS.ANSWER_QUESTION.replace('{questionId}', questionId);
	return buildQuestionSellerEndpoint(sellerId, endpoint);
}
