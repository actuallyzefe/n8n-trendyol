import type { INodeProperties } from 'n8n-workflow';

export const questionAnswerFields: INodeProperties[] = [
	{
		displayName: 'Question ID',
		name: 'questionId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the question to answer',
	},
	{
		displayName: 'Answer Text',
		name: 'answerText',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		required: true,
		default: '',
		description: 'The answer text for the customer question (minimum 10, maximum 2000 characters)',
		placeholder: 'Enter your answer to the customer question (min 10 chars, max 2000 chars)...',
	},
];
